import { BusinessResult, SearchParams, SearchProvider } from "./types";

// Helper to limit concurrency of async tasks
async function limitConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let currentIndex = 0;

  const worker = async () => {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await fn(items[index]);
    }
  };

  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

// Fetch helper with timeout constraint (10 seconds)
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  }
}

// Map Google API response properties to BusinessResult format
function mapPlaceToBusinessResult(place: any): BusinessResult {
  const name = place.displayName?.text || "";

  // Beautify type (e.g. "corporate_office" -> "Corporate Office")
  const type = place.primaryType
    ? place.primaryType
        .split("_")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : undefined;

  return {
    id: place.id,
    name,
    type,
    address: place.formattedAddress,
    phone: place.nationalPhoneNumber,
    website: place.websiteUri,
    rating: place.rating,
    reviews: place.userRatingCount,
    mapsUrl: place.googleMapsUri,
  };
}

export class GoogleSearchProvider implements SearchProvider {
  async search(params: SearchParams): Promise<BusinessResult[]> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new Error("GOOGLE_MAPS_API_KEY is not configured.");
    }

    const { query, location, limit } = params;
    const textQuery = `${query} in ${location}`;
    const allPlaceIds: string[] = [];
    let nextPageToken: string | undefined = undefined;
    let pageCount = 0;
    
    // Google Places (New) page size limit is 20. Calculate max pages.
    const maxPages = Math.ceil(limit / 20);

    // 1. Call Text Search (New) page-by-page to collect Place IDs
    do {
      const payload: any = {
        textQuery,
        pageSize: Math.min(20, limit - allPlaceIds.length),
      };
      if (nextPageToken) {
        payload.pageToken = nextPageToken;
      }

      const res = await fetchWithTimeout(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "places.id,nextPageToken",
          },
          body: JSON.stringify(payload),
        },
        10000 // 10 seconds timeout
      );

      if (!res.ok) {
        let errorMsg = `Google TextSearch API failed with status ${res.status}`;
        try {
          const errData = await res.json();
          if (errData.error?.message) {
            errorMsg = errData.error.message;
          }
        } catch (_) {}
        throw new Error(errorMsg);
      }

      const data = await res.json();
      const places = data.places || [];
      for (const place of places) {
        if (place.id) {
          allPlaceIds.push(place.id);
        }
      }

      nextPageToken = data.nextPageToken;
      pageCount++;
    } while (nextPageToken && allPlaceIds.length < limit && pageCount < maxPages);

    // Deduplicate collected Place IDs using Set
    const uniqueIds = Array.from(new Set(allPlaceIds)).slice(0, limit);

    // 2. Fetch Place Details concurrently for each unique Place ID (concurrency limit = 5)
    const detailsResults = await limitConcurrency(uniqueIds, 5, async (placeId) => {
      try {
        const url = `https://places.googleapis.com/v1/places/${placeId}`;
        const res = await fetchWithTimeout(
          url,
          {
            method: "GET",
            headers: {
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask":
                "id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,rating,userRatingCount,primaryType,googleMapsUri",
            },
          },
          10000 // 10 seconds timeout
        );

        if (!res.ok) {
          let errorMsg = `Details request failed for ${placeId} (status ${res.status})`;
          try {
            const errData = await res.json();
            if (errData.error?.message) {
              errorMsg = errData.error.message;
            }
          } catch (_) {}
          console.warn(errorMsg);
          return null;
        }

        const place = await res.json();
        return mapPlaceToBusinessResult(place);
      } catch (err) {
        console.error(`Error fetching place details for ID ${placeId}:`, err);
        return null;
      }
    });

    // Filter out failed details fetches (null values) and return mapped results
    return detailsResults.filter((r): r is BusinessResult => r !== null);
  }
}
