import type { Metadata } from "next";
import {
  Instrument_Serif,
  Geist,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/content/site";
import ScrollReset from "@/components/ScrollReset";
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

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

const title = `${site.name}, ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://amirbeck.com"),
  title: {
    default: title,
    template: "%s, Amir Beck",
  },
  description: site.description,
  keywords: [
    "design engineer",
    "senior design engineer",
    "product designer",
    "fintech",
    "payments",
    "B2B2C",
    "design systems",
    "design to code",
    "Figma to code",
    "React",
    "Next.js",
    "TypeScript",
    "AI product design",
    "AI assisted prototyping",
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
    title,
    description: site.description,
    url: "https://amirbeck.com",
    siteName: site.name,
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/images/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
