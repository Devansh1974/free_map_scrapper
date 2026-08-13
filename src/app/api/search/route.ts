import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import pLimit from "p-limit";
import { searchGooglePlaces } from "@/lib/google-places";
import { enrichBusinessResult } from "@/lib/enrichment";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

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

// Initialize Upstash Redis & Rate Limiter client
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    
    // Configure sliding window rate limit: 5 requests per 10 minutes per IP
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "@upstash/ratelimit",
    });
  } catch (error) {
    console.error("Failed to initialize Upstash Redis rate-limiter:", error);
  }
} else {
  console.warn("Upstash Redis credentials are not configured. Rate limiting is bypassed.");
}

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

    // Apply Rate Limiting if initialized
    if (ratelimit) {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip")?.trim() ||
        "127.0.0.1";

      const { success, limit: rateLimitCount, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          {
            error: "Too many search requests. You have reached your limits (5 searches/10 minutes). Please try again in a few minutes.",
          },
          {
            status: 429,
            headers: {
              "X-RateLimit-Limit": rateLimitCount.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString(),
            },
          }
        );
      }
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

    return NextResponse.json({ error: userFriendlyMessage }, { status: 500 });
  }
}
