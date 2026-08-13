import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import pLimit from "p-limit";
import { searchGooglePlaces } from "@/lib/google-places";
import { enrichBusinessResult } from "@/lib/enrichment";

// Zod schema for request query validation
const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Please enter a business keyword (e.g. dentist, salon)."),
  location: z
    .string()
    .trim()
    .min(1, "Please enter a location (e.g. Indiranagar, Bengaluru)."),
  limit: z
    .coerce
    .number()
    .int()
    .positive("Limit must be a positive integer.")
    .default(20),
  enrich: z
    .preprocess((val) => val === "true" || val === true, z.boolean())
    .default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      query: searchParams.get("query"),
      location: searchParams.get("location"),
      limit: searchParams.get("limit"),
      enrich: searchParams.get("enrich"),
    };

    // Validate parameters using Zod
    const parsed = searchSchema.safeParse(queryParams);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input parameters.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { query, location, limit, enrich } = parsed.data;
    console.log(`[API Search] query: "${query}", location: "${location}", limit: ${limit}, enrich: ${enrich}`);

    // Verify key presence before calling the service
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: "Google Maps API Key is missing. Please set the GOOGLE_MAPS_API_KEY environment variable." },
        { status: 500 }
      );
    }
    
    let results = await searchGooglePlaces({
      query,
      location,
      limit,
    });
    console.log(`[API Search] Google Maps returned ${results.length} places.`);

    // Run website enrichment concurrently using p-limit (limit 5) if requested
    if (enrich) {
      console.log(`[API Search] Crawling websites for enrichment details...`);
      const limitPromise = pLimit(5);
      const enrichmentTasks = results.map((business) =>
        limitPromise(() => enrichBusinessResult(business))
      );
      results = await Promise.all(enrichmentTasks);
      console.log(`[API Search] Website profile enrichment completed.`);
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Search API Error:", error);
    
    // Map raw Google responses to user friendly, concise messages
    const errorMsg = error.message || "";
    let userFriendlyMessage = "Unable to fetch results. Please try again.";

    if (
      errorMsg.includes("API key not valid") ||
      errorMsg.includes("API_KEY_INVALID") ||
      errorMsg.includes("Invalid credentials")
    ) {
      userFriendlyMessage = "Invalid Google Maps API Key. Please verify your configuration.";
    } else if (
      errorMsg.includes("quota") ||
      errorMsg.includes("Quota") ||
      errorMsg.includes("RESOURCE_EXHAUSTED") ||
      errorMsg.includes("limit exceeded")
    ) {
      userFriendlyMessage = "Google Places API quota exceeded or request blocked.";
    } else if (
      errorMsg.includes("timed out") ||
      errorMsg.includes("AbortError") ||
      errorMsg.includes("timeout")
    ) {
      userFriendlyMessage = "Connection to Google Places API timed out.";
    } else if (errorMsg) {
      userFriendlyMessage = errorMsg;
    }

    return NextResponse.json(
      { error: userFriendlyMessage },
      { status: 500 }
    );
  }
}
