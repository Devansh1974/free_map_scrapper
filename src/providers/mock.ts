import { BusinessResult, SearchParams, SearchProvider } from "./types";

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
  "Residency Road",
];

const MOCK_AREAS = [
  "Stage 1",
  "Stage 2",
  "Block A",
  "Sector 4",
  "Near Metro Station",
  "Opposite City Park",
  "Phase 3",
];

// Contextual business names generators
const NAME_TEMPLATES: Record<string, { prefixes: string[]; suffixes: string[] }> = {
  dentist: {
    prefixes: ["Smile & Shine", "Bright Dental", "Pearl White", "Elite Dental", "Modern Dentists", "Healthy Teeth"],
    suffixes: ["Clinic", "Dental Care", "Specialists", "Practice", "Studio", "Center"],
  },
  salon: {
    prefixes: ["Scissors & Comb", "Gloss & Glam", "Vogue", "Urban Shear", "Mirror Mirror", "Velvet Touch"],
    suffixes: ["Salon", "Studio", "Spa", "Hair & Beauty", "Lounge", "Barbershop"],
  },
  gym: {
    prefixes: ["Iron Empire", "Fit & Flex", "Peak Performance", "Pulse Fitness", "Core Strength", "Olympia"],
    suffixes: ["Gym", "Fitness Center", "Club", "Athletics", "Workout Studio", "Forge"],
  },
  restaurant: {
    prefixes: ["The Golden Spoon", "Urban Bites", "Savory Junction", "Rustic Table", "Spicy Delight", "Bistro 15"],
    suffixes: ["Bistro", "Kitchen", "Eatery", "Grill", "Diner", "Cafe"],
  },
  default: {
    prefixes: ["Apex", "Summit", "Prime", "Universal", "Genesis", "Matrix", "Global", "Nova"],
    suffixes: ["Hub", "Group", "Enterprises", "Solutions", "Services", "Center"],
  },
};

export class MockSearchProvider implements SearchProvider {
  async search(params: SearchParams): Promise<BusinessResult[]> {
    // Simulate network delay of 1.2 seconds for realistic tool behavior
    await new Promise((resolve) => setTimeout(resolve, 1200));

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
    const results: BusinessResult[] = [];

    // Deterministic random generator based on a simple hash of the query and index
    const getHashValue = (str: string, seed: number) => {
      let hash = 0;
      const combined = str + seed;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash << 5) - hash + combined.charCodeAt(i);
        hash |= 0;
      }
      return Math.abs(hash);
    };

    for (let i = 0; i < limit; i++) {
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
      const mobileNum = 9000000000 + (getHashValue(displayName, i * 17) % 999999999);
      const isMobile = (getHashValue(displayName, i * 2) % 2) === 0;
      const phone = isMobile 
        ? `+91 ${mobileNum.toString().slice(0, 5)} ${mobileNum.toString().slice(5)}`
        : `080 ${20000000 + (getHashValue(displayName, i * 19) % 79999999)}`;

      // Website generation
      const webBase = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");
      const website = `https://www.${webBase}.com`;

      // Ratings & Reviews
      const ratingHash = getHashValue(displayName, i * 23) % 15; // 0 to 14
      const rating = parseFloat((3.5 + ratingHash * 0.1).toFixed(1));
      const reviews = getHashValue(displayName, i * 29) % 450 + 5; // 5 to 455

      // Business Type
      const businessType = category !== "default" 
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : query.trim().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

      results.push({
        id,
        name: displayName,
        type: businessType,
        address: fullAddress,
        phone: (getHashValue(displayName, i * 5) % 10 < 8) ? phone : undefined, // 80% have phone
        website: (getHashValue(displayName, i * 6) % 10 < 7) ? website : undefined, // 70% have website
        rating: (getHashValue(displayName, i * 8) % 10 < 9) ? rating : undefined, // 90% have rating
        reviews: (getHashValue(displayName, i * 8) % 10 < 9) ? reviews : undefined,
      });
    }

    return results;
  }
}
