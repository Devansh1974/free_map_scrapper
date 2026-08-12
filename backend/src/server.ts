import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from backend/.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface BusinessResult {
  id: string;
  name: string;
  type?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
  mapsUrl?: string;
}

// Concurrency pool helper to run details fetching with a limit of 5 requests
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

// API endpoint for search
app.get("/api/search", async (req, res) => {
  try {
    const query = (req.query.query as string)?.trim();
    const location = (req.query.location as string)?.trim();
    const limitStr = req.query.limit as string;

    if (!query) {
      return res.status(400).json({
        error: "Please enter a business keyword (e.g. dentist, salon).",
      });
    }
    if (!location) {
      return res.status(400).json({
        error: "Please enter a location (e.g. Indiranagar, Bengaluru).",
      });
    }

    const limit = limitStr ? parseInt(limitStr, 10) : 20;
    if (isNaN(limit) || limit <= 0) {
      return res.status(400).json({
        error: "Invalid limit parameter. Must be a positive integer.",
      });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          "Google Maps API Key is missing. Please set the GOOGLE_MAPS_API_KEY environment variable in backend/.env.",
      });
    }

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

      const response = await fetchWithTimeout(
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

      if (!response.ok) {
        let errorMsg = `Google TextSearch API failed with status ${response.status}`;
        try {
          const errData = (await response.json()) as any;
          if (errData?.error?.message) {
            errorMsg = errData.error.message;
          }
        } catch (_) {}
        throw new Error(errorMsg);
      }

      const data = (await response.json()) as any;
      const places = data?.places || [];
      for (const place of places) {
        if (place?.id) {
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
        const response = await fetchWithTimeout(
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

        if (!response.ok) {
          let errorMsg = `Details request failed for ${placeId} (status ${response.status})`;
          try {
            const errData = (await response.json()) as any;
            if (errData?.error?.message) {
              errorMsg = errData.error.message;
            }
          } catch (_) {}
          console.warn(errorMsg);
          return null;
        }

        const place = await response.json();
        return mapPlaceToBusinessResult(place);
      } catch (err) {
        console.error(`Error fetching place details for ID ${placeId}:`, err);
        return null;
      }
    });

    // Filter out failed details fetches (null values)
    const results = detailsResults.filter((r): r is BusinessResult => r !== null);
    return res.json({ results });
  } catch (error: any) {
    console.error("Backend Search API Error:", error);
    
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

    return res.status(500).json({ error: userFriendlyMessage });
  }
});

app.listen(PORT, () => {
  console.log(`[FreeMapScrapper Backend] running on http://localhost:${PORT}`);
});
