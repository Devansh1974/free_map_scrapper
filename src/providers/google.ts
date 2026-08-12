import { BusinessResult, SearchParams, SearchProvider } from "./types";

export class GoogleSearchProvider implements SearchProvider {
  async search(params: SearchParams): Promise<BusinessResult[]> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Google Places API key is not configured. Google Places API integration is scheduled for V2 in the roadmap."
      );
    }

    // Google Places API integration stub for V2:
    // 1. Call Text Search (New) or Place Search API to get initial listings.
    // 2. Fetch Place Details for phone, website, and rating if needed.
    // 3. Return mapped BusinessResult objects.
    
    console.log("Calling real Google Places API for query:", params.query, "in location:", params.location);
    return [];
  }
}
