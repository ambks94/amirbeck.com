import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/CaseStudy";
import JsonLd from "@/components/JsonLd";
import { caseStudies, caseStudyBySlug } from "@/content/caseStudies";
import { caseStudyGraph, ORIGIN } from "@/content/jsonld";
import { projects, site } from "@/content/site";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

function ogImage(slug: string, name: string) {
  const project = projects.find((p) => p.slug === slug);
  return {
    url: project?.image.src ?? "/images/og.png",
    width: project?.image.width ?? 1200,
    height: project?.image.height ?? 630,
    alt: project?.image.alt ?? `${name}, ${site.name}`,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug(slug);
  if (!study) return {};
  const title = `${study.name}, ${study.category}`;
  const image = ogImage(study.slug, study.name);
  return {
    title,
    description: study.description ?? study.intro,
    authors: [{ name: site.name, url: ORIGIN }],
    alternates: { canonical: `/${study.slug}` },
    openGraph: {
      title,
      description: study.description ?? study.intro,
      url: `${ORIGIN}/${study.slug}`,
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: study.description ?? study.intro,
      images: [image.url],
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
  return (
    <>
      <CaseStudyView study={study} />
      <JsonLd data={caseStudyGraph(study)} />
    </>
  );
}
