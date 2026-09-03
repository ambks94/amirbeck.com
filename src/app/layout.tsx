import type { Metadata } from "next";
import { Instrument_Serif, Geist, JetBrains_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

const description =
  "Amir Beck is a senior design engineer in San Francisco who both designs and ships fintech products. At Lumanu he leads the design of a B2B2C payments platform and personally builds it in React, Next.js, and TypeScript — bridging Figma to production code on a design system that compounds.";

export const metadata: Metadata = {
  metadataBase: new URL("https://amirbeck.com"),
  title: {
    default: "Amir Beck — Design Engineer",
    template: "%s — Amir Beck",
  },
  description,
  keywords: [
    "design engineer",
    "senior design engineer",
    "product designer",
    "fintech",
    "payments",
    "B2B2C",
    "design systems",
    "design-to-code",
    "Figma to code",
    "React",
    "Next.js",
    "TypeScript",
    "AI product design",
    "AI-assisted prototyping",
    "San Francisco",
  ],
  authors: [{ name: site.name, url: "https://amirbeck.com" }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "Amir Beck — Design Engineer",
    description,
    url: "https://amirbeck.com",
    siteName: site.name,
    locale: "en_US",
    type: "profile",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Amir Beck — Design Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amir Beck — Design Engineer",
    description,
    images: ["/og.png"],
  },
};

// Structured data for search + answer engines (AEO). Facts only; kept in sync with site.ts.
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: "https://amirbeck.com",
  jobTitle: "Senior Design Engineer",
  worksFor: { "@type": "Organization", name: "Lumanu", url: "https://lumanu.com" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  email: `mailto:${site.email}`,
  sameAs: [site.linkedin, site.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of California, Davis" },
  knowsAbout: [
    "Design engineering",
    "Design systems",
    "Fintech",
    "Payments",
    "B2B2C software",
    "Design-to-code",
    "React",
    "Next.js",
    "TypeScript",
    "Figma",
    "AI product design",
    "Prototyping",
  ],
  description,
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: "https://amirbeck.com",
  author: { "@type": "Person", name: site.name },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </body>
    </html>
  );
}
