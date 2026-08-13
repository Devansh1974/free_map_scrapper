export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content: string[];
}

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "How to Get Local Business Leads Using Google Maps",
    slug: "local-maps-leads",
    excerpt: "Extracting local B2B leads from Google Maps is one of the most effective and affordable ways to build cold outreach campaigns. Here is a step-by-step blueprint.",
    date: "August 12, 2026",
    author: "Devansh Singh",
    readTime: "5 min read",
    category: "Lead Generation",
    content: [
      "If you run an agency, offer freelancing services, or manage a local B2B sales team, finding your next client can feel like searching for a needle in a haystack. However, some of the warmest prospects are already listing themselves publicly on Google Maps.",
      "Every dentist, salon, gym, boutique, and clinic in your neighborhood uploads their information to Google Business Profiles to attract customers. But for B2B providers, these profiles are a goldmine of contact details, ratings, and physical locations.",
      "Historically, developers and marketers wrote complex scrapers or paid steep monthly fees for scraper SaaS platforms. FreeMapScrapper solves this by querying the Google Places API directly, extracting places data, and generating a clean spreadsheet in seconds.",
      "To make the most of Google Maps lead generation, follow this outbound strategy:",
      "1. Identify the Niche & Location: Choose a specific service area (e.g., 'gym in Koramangala') rather than a broad term.",
      "2. Query the Details: Focus on businesses that have active websites but lower ratings or reviews. These are prime targets for website design, SEO, or social media management pitches.",
      "3. Export and Filter: Download your lead sheet and sort by rating or missing details to customize your pitch. Personalization is key to double your response rates."
    ]
  },
  {
    id: 2,
    title: "Why Website Profile Enrichment is Key for Cold Outreach",
    slug: "website-profile-enrichment",
    excerpt: "Having a telephone line and business name is a good start, but reaching prospects where they are—via direct emails, Instagram DMs, or Facebook pages—maximizes response rates.",
    date: "August 10, 2026",
    author: "Devansh Singh",
    readTime: "4 min read",
    category: "Sales Strategy",
    content: [
      "In cold outreach, diversification is your unfair advantage. If you only call a business, your message might get blocked by a front-desk gatekeeper. But if you connect across multiple channels—like sending a personalized email and following up on Instagram—your visibility sky-rockets.",
      "This is where website enrichment comes in. While the Google Places API is excellent at returning geographical info and phone numbers, it does not provide social profiles or emails.",
      "By enabling the 'Enrich results' toggle in FreeMapScrapper, the background system crawls the business's website homepage and contact page. Using Cheerio and regex scanners, it parses the HTML to retrieve:",
      "- Direct Email addresses (from mailto tags or body text)",
      "- Instagram profile links",
      "- Facebook page links",
      "- WhatsApp contact APIs",
      "Using this multi-channel approach, your sales team can customize their outreach. For example, if you see a gym has a beautiful website but no Instagram link, you can reach out via email offering to run their social ads. If they have an active Instagram but a broken contact form, you can DM them to point out the issue."
    ]
  },
  {
    id: 3,
    title: "A Developer's Guide to the Google Places API (New)",
    slug: "places-api-developers-guide",
    excerpt: "Google has launched a new set of Places endpoints (v1). Learn the core differences: Field Masks, pageToken paginations, and concurrency controls.",
    date: "August 5, 2026",
    author: "Devansh Singh",
    readTime: "6 min read",
    category: "Engineering",
    content: [
      "Google recently released the Places API (New), also known as the v1 endpoints. This is a complete overhaul of the legacy Places API, offering better performance, cleaner schemas, and more precise pricing models.",
      "If you are developing lead-generation utilities, here are the three critical concepts you must implement to build a production-grade system:",
      "1. X-Goog-FieldMask Header: In the new API, you must specify exactly which fields you want returned (e.g. `places.id,places.displayName`). If you omit a field, Google will not return it. Crucially, if you want pagination to work, you must include `nextPageToken` in your field mask.",
      "2. pageToken Pagination: Unlike the legacy API which used offset numbers, the new API returns a hash string `nextPageToken`. In your next page request, you pass this token as `pageToken` in the JSON request body. Each page returns up to 20 results.",
      "3. Concurrency Promise Pools: When resolving place details (like retrieving the Google Maps URI or specific website links), you must query place details individually for each ID. Running 50 sequential network requests is extremely slow, but running 50 parallel requests will trigger Google rate-limiting or exhaust system sockets. Implementing a concurrency limit of 5 using promise pools (like `p-limit`) ensures fast queries while remaining rate-safe."
    ]
  }
];
