import { NextRequest, NextResponse } from "next/server";
import { searchGooglePlaces } from "@/lib/google-places";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();
    const location = searchParams.get("location")?.trim();
    const limitStr = searchParams.get("limit");

    if (!query) {
      return NextResponse.json(
        { error: "Please enter a business keyword (e.g. dentist, salon)." },
        { status: 400 }
      );
    }
    if (!location) {
      return NextResponse.json(
        { error: "Please enter a location (e.g. Indiranagar, Bengaluru)." },
        { status: 400 }
      );
    }

    const limit = limitStr ? parseInt(limitStr, 10) : 20;
    if (isNaN(limit) || limit <= 0) {
      return NextResponse.json(
        { error: "Invalid limit parameter. Must be a positive integer." },
        { status: 400 }
      );
    }

    // Verify key presence before calling the service
    if (!process.env.GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: "Google Maps API Key is missing. Please set the GOOGLE_MAPS_API_KEY environment variable." },
        { status: 500 }
      );
    }
    
    const results = await searchGooglePlaces({
      query,
      location,
      limit,
    });

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
