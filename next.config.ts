import type { NextConfig } from "next";
import path from "node:path";

// Conservative hardening headers. No CSP: the Figma prototype iframe, Vercel
// Analytics, and next/image would each need allow-listing, and a wrong CSP
// fails closed. These headers are safe for a static site and add no such risk.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root. iCloud's parent folder has a stray lockfile that
  // Turbopack would otherwise infer as the root.
  turbopack: { root: path.resolve(__dirname) },
  images: {
    // Prefer AVIF, fall back to WebP. Next picks from Accept.
    formats: ["image/avif", "image/webp"],
    // 75 default; 90 for UI screenshots; 100 for the large home masters (the
    // shimmer covers the extra load, so we can afford crisper encodes).
    qualities: [75, 90, 100],
    // Sources cap at 2800. No 3840 variant — that just wastes transforms.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    // Static files. 31 days; change the filename to bust.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
