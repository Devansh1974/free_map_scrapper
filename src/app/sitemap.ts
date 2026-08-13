import { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freemapscrapper.com";

  // Static site paths
  const staticUrls = [
    "",
    "/privacy",
    "/terms",
    "/faq",
    "/changelog",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic SSG blog paths
  const blogUrls = ARTICLES.map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...blogUrls];
}
