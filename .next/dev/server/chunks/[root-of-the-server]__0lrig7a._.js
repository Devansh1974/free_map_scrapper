module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$places$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/google-places.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query")?.trim();
        const location = searchParams.get("location")?.trim();
        const limitStr = searchParams.get("limit");
        if (!query) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Please enter a business keyword (e.g. dentist, salon)."
            }, {
                status: 400
            });
        }
        if (!location) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Please enter a location (e.g. Indiranagar, Bengaluru)."
            }, {
                status: 400
            });
        }
        const limit = limitStr ? parseInt(limitStr, 10) : 20;
        if (isNaN(limit) || limit <= 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid limit parameter. Must be a positive integer."
            }, {
                status: 400
            });
        }
        // Verify key presence before calling the service
        if (!process.env.GOOGLE_MAPS_API_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Google Maps API Key is missing. Please set the GOOGLE_MAPS_API_KEY environment variable."
            }, {
                status: 500
            });
        }
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$google$2d$places$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchGooglePlaces"])({
            query,
            location,
            limit
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results
        });
    } catch (error) {
        console.error("Search API Error:", error);
        // Map raw Google responses to user friendly, concise messages
        const errorMsg = error.message || "";
        let userFriendlyMessage = "Unable to fetch results. Please try again.";
        if (errorMsg.includes("API key not valid") || errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("Invalid credentials")) {
            userFriendlyMessage = "Invalid Google Maps API Key. Please verify your configuration.";
        } else if (errorMsg.includes("quota") || errorMsg.includes("Quota") || errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("limit exceeded")) {
            userFriendlyMessage = "Google Places API quota exceeded or request blocked.";
        } else if (errorMsg.includes("timed out") || errorMsg.includes("AbortError") || errorMsg.includes("timeout")) {
            userFriendlyMessage = "Connection to Google Places API timed out.";
        } else if (errorMsg) {
            userFriendlyMessage = errorMsg;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: userFriendlyMessage
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/lib/google-places.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchGooglePlaces",
    ()=>searchGooglePlaces
]);
// Helper to limit concurrency of async tasks
async function limitConcurrency(items, limit, fn) {
    const results = new Array(items.length);
    let currentIndex = 0;
    const worker = async ()=>{
        while(currentIndex < items.length){
            const index = currentIndex++;
            results[index] = await fn(items[index]);
        }
    };
    const workers = Array.from({
        length: Math.min(limit, items.length)
    }, worker);
    await Promise.all(workers);
    return results;
}
// Fetch helper with timeout constraint (10 seconds)
async function fetchWithTimeout(url, options, timeoutMs = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
            throw new Error(`Request timed out after ${timeoutMs}ms`);
        }
        throw error;
    }
}
// Map Google API response properties to BusinessResult format
function mapPlaceToBusinessResult(place) {
    const name = place.displayName?.text || "";
    // Beautify type (e.g. "corporate_office" -> "Corporate Office")
    const type = place.primaryType ? place.primaryType.split("_").map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : undefined;
    return {
        id: place.id,
        name,
        type,
        address: place.formattedAddress,
        phone: place.nationalPhoneNumber,
        website: place.websiteUri,
        rating: place.rating,
        reviews: place.userRatingCount,
        mapsUrl: place.googleMapsUri
    };
}
async function searchGooglePlaces(params) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        throw new Error("GOOGLE_MAPS_API_KEY is not configured.");
    }
    const { query, location, limit } = params;
    const textQuery = `${query} in ${location}`;
    const allPlaceIds = [];
    let nextPageToken = undefined;
    let pageCount = 0;
    // Google Places (New) page size limit is 20. Calculate max pages.
    const maxPages = Math.ceil(limit / 20);
    // 1. Call Text Search (New) page-by-page to collect Place IDs
    do {
        const payload = {
            textQuery,
            pageSize: Math.min(20, limit - allPlaceIds.length)
        };
        if (nextPageToken) {
            payload.pageToken = nextPageToken;
        }
        const res = await fetchWithTimeout("https://places.googleapis.com/v1/places:searchText", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "places.id,nextPageToken"
            },
            body: JSON.stringify(payload)
        }, 10000 // 10 seconds timeout
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
        for (const place of places){
            if (place.id) {
                allPlaceIds.push(place.id);
            }
        }
        nextPageToken = data.nextPageToken;
        pageCount++;
    }while (nextPageToken && allPlaceIds.length < limit && pageCount < maxPages)
    // Deduplicate collected Place IDs using Set
    const uniqueIds = Array.from(new Set(allPlaceIds)).slice(0, limit);
    // 2. Fetch Place Details concurrently for each unique Place ID (concurrency limit = 5)
    const detailsResults = await limitConcurrency(uniqueIds, 5, async (placeId)=>{
        try {
            const url = `https://places.googleapis.com/v1/places/${placeId}`;
            const res = await fetchWithTimeout(url, {
                method: "GET",
                headers: {
                    "X-Goog-Api-Key": apiKey,
                    "X-Goog-FieldMask": "id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,rating,userRatingCount,primaryType,googleMapsUri"
                }
            }, 10000 // 10 seconds timeout
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
    return detailsResults.filter((r)=>r !== null);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0lrig7a._.js.map