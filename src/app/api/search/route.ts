import { NextRequest, NextResponse } from "next/server";
import { MockSearchProvider } from "@/providers/mock";
import { GoogleSearchProvider } from "@/providers/google";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();
    const location = searchParams.get("location")?.trim();
    const limitStr = searchParams.get("limit");
    const providerType = searchParams.get("provider") || "mock";

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

    const provider = providerType === "google" ? new GoogleSearchProvider() : new MockSearchProvider();
    
    const results = await provider.search({
      query,
      location,
      limit,
    });

    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: error.message || "Unable to fetch results. Please try again." },
      { status: 500 }
    );
  }
}
