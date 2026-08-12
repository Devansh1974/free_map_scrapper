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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/mock.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$google$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/providers/google.ts [app-route] (ecmascript)");
;
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query")?.trim();
        const location = searchParams.get("location")?.trim();
        const limitStr = searchParams.get("limit");
        const providerType = searchParams.get("provider") || "mock";
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
        const provider = providerType === "google" ? new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$google$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleSearchProvider"]() : new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$providers$2f$mock$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MockSearchProvider"]();
        const results = await provider.search({
            query,
            location,
            limit
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results
        });
    } catch (error) {
        console.error("Search API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || "Unable to fetch results. Please try again."
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/providers/google.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GoogleSearchProvider",
    ()=>GoogleSearchProvider
]);
class GoogleSearchProvider {
    async search(params) {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            throw new Error("Google Places API key is not configured. Google Places API integration is scheduled for V2 in the roadmap.");
        }
        // Google Places API integration stub for V2:
        // 1. Call Text Search (New) or Place Search API to get initial listings.
        // 2. Fetch Place Details for phone, website, and rating if needed.
        // 3. Return mapped BusinessResult objects.
        console.log("Calling real Google Places API for query:", params.query, "in location:", params.location);
        return [];
    }
}
}),
"[project]/src/providers/mock.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MockSearchProvider",
    ()=>MockSearchProvider
]);
const MOCK_STREETS = [
    "100 Feet Road",
    "80 Feet Road",
    "12th Main Road",
    "5th Cross Road",
    "Double Road",
    "CMH Road",
    "Park Lane",
    "High Street",
    "MG Road",
    "Residency Road"
];
const MOCK_AREAS = [
    "Stage 1",
    "Stage 2",
    "Block A",
    "Sector 4",
    "Near Metro Station",
    "Opposite City Park",
    "Phase 3"
];
// Contextual business names generators
const NAME_TEMPLATES = {
    dentist: {
        prefixes: [
            "Smile & Shine",
            "Bright Dental",
            "Pearl White",
            "Elite Dental",
            "Modern Dentists",
            "Healthy Teeth"
        ],
        suffixes: [
            "Clinic",
            "Dental Care",
            "Specialists",
            "Practice",
            "Studio",
            "Center"
        ]
    },
    salon: {
        prefixes: [
            "Scissors & Comb",
            "Gloss & Glam",
            "Vogue",
            "Urban Shear",
            "Mirror Mirror",
            "Velvet Touch"
        ],
        suffixes: [
            "Salon",
            "Studio",
            "Spa",
            "Hair & Beauty",
            "Lounge",
            "Barbershop"
        ]
    },
    gym: {
        prefixes: [
            "Iron Empire",
            "Fit & Flex",
            "Peak Performance",
            "Pulse Fitness",
            "Core Strength",
            "Olympia"
        ],
        suffixes: [
            "Gym",
            "Fitness Center",
            "Club",
            "Athletics",
            "Workout Studio",
            "Forge"
        ]
    },
    restaurant: {
        prefixes: [
            "The Golden Spoon",
            "Urban Bites",
            "Savory Junction",
            "Rustic Table",
            "Spicy Delight",
            "Bistro 15"
        ],
        suffixes: [
            "Bistro",
            "Kitchen",
            "Eatery",
            "Grill",
            "Diner",
            "Cafe"
        ]
    },
    default: {
        prefixes: [
            "Apex",
            "Summit",
            "Prime",
            "Universal",
            "Genesis",
            "Matrix",
            "Global",
            "Nova"
        ],
        suffixes: [
            "Hub",
            "Group",
            "Enterprises",
            "Solutions",
            "Services",
            "Center"
        ]
    }
};
class MockSearchProvider {
    async search(params) {
        // Simulate network delay of 1.2 seconds for realistic tool behavior
        await new Promise((resolve)=>setTimeout(resolve, 1200));
        const { query, location, limit } = params;
        const queryLower = query.toLowerCase();
        // Determine category
        let category = "default";
        if (queryLower.includes("dentist") || queryLower.includes("dental") || queryLower.includes("teeth")) {
            category = "dentist";
        } else if (queryLower.includes("salon") || queryLower.includes("hair") || queryLower.includes("spa") || queryLower.includes("beauty")) {
            category = "salon";
        } else if (queryLower.includes("gym") || queryLower.includes("fitness") || queryLower.includes("workout")) {
            category = "gym";
        } else if (queryLower.includes("restaurant") || queryLower.includes("food") || queryLower.includes("cafe") || queryLower.includes("bistro")) {
            category = "restaurant";
        }
        const templates = NAME_TEMPLATES[category];
        const results = [];
        // Deterministic random generator based on a simple hash of the query and index
        const getHashValue = (str, seed)=>{
            let hash = 0;
            const combined = str + seed;
            for(let i = 0; i < combined.length; i++){
                hash = (hash << 5) - hash + combined.charCodeAt(i);
                hash |= 0;
            }
            return Math.abs(hash);
        };
        for(let i = 0; i < limit; i++){
            const id = `mock-place-${getHashValue(queryLower + location, i)}`;
            // Generate deterministic but random-looking elements
            const prefixIdx = getHashValue(query, i * 3) % templates.prefixes.length;
            const suffixIdx = getHashValue(query, i * 7) % templates.suffixes.length;
            const streetIdx = getHashValue(location, i * 11) % MOCK_STREETS.length;
            const areaIdx = getHashValue(location, i * 13) % MOCK_AREAS.length;
            const prefix = templates.prefixes[prefixIdx];
            const suffix = templates.suffixes[suffixIdx];
            // Sometimes capitalize query terms for variation
            const displayName = `${prefix} ${suffix}`;
            // Generate clean addresses
            const street = MOCK_STREETS[streetIdx];
            const area = MOCK_AREAS[areaIdx];
            const fullAddress = `${i + 12}, ${street}, ${area}, ${location}`;
            // Phone number formatting
            const mobileNum = 9000000000 + getHashValue(displayName, i * 17) % 999999999;
            const isMobile = getHashValue(displayName, i * 2) % 2 === 0;
            const phone = isMobile ? `+91 ${mobileNum.toString().slice(0, 5)} ${mobileNum.toString().slice(5)}` : `080 ${20000000 + getHashValue(displayName, i * 19) % 79999999}`;
            // Website generation
            const webBase = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");
            const website = `https://www.${webBase}.com`;
            // Ratings & Reviews
            const ratingHash = getHashValue(displayName, i * 23) % 15; // 0 to 14
            const rating = parseFloat((3.5 + ratingHash * 0.1).toFixed(1));
            const reviews = getHashValue(displayName, i * 29) % 450 + 5; // 5 to 455
            // Business Type
            const businessType = category !== "default" ? category.charAt(0).toUpperCase() + category.slice(1) : query.trim().split(" ").map((w)=>w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
            results.push({
                id,
                name: displayName,
                type: businessType,
                address: fullAddress,
                phone: getHashValue(displayName, i * 5) % 10 < 8 ? phone : undefined,
                website: getHashValue(displayName, i * 6) % 10 < 7 ? website : undefined,
                rating: getHashValue(displayName, i * 8) % 10 < 9 ? rating : undefined,
                reviews: getHashValue(displayName, i * 8) % 10 < 9 ? reviews : undefined
            });
        }
        return results;
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1op8n-5._.js.map