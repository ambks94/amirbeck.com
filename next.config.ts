import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF, fall back to WebP. Next picks from Accept.
    formats: ["image/avif", "image/webp"],
    // 75 default; 90 for UI screenshots; 95 for the large home masters (the
    // shimmer covers the extra load, so we can afford crisper encodes).
    qualities: [75, 90, 100],
    // Sources cap at 2800. No 3840 variant — that just wastes transforms.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    // Static files. 31 days; change the filename to bust.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
