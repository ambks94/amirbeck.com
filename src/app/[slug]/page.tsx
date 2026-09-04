import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudy";
import { caseStudies, caseStudyBySlug } from "@/content/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.name}, ${study.category}`,
    description: study.intro,
    alternates: { canonical: `/${study.slug}` },
    openGraph: {
      title: `${study.name}, ${study.category}`,
      description: study.intro,
      url: `https://amirbeck.com/${study.slug}`,
      type: "article",
      images: [{ url: "/images/og.png", width: 1200, height: 630, alt: `${study.name}, Amir Beck` }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) notFound();
  return <CaseStudyView study={study} />;
}
