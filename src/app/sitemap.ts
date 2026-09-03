import type { MetadataRoute } from "next";

// Add case-study + about + playground routes here as they ship (Phases 2–4).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://amirbeck.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];
}
