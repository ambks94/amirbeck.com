import { site, projects } from "./site";
import type { CaseStudy } from "./caseStudies";

export const ORIGIN = "https://amirbeck.com";
export const PERSON_ID = `${ORIGIN}/#person`;
export const WEBSITE_ID = `${ORIGIN}/#website`;

function abs(path: string) {
  return path.startsWith("http") ? path : `${ORIGIN}${path}`;
}

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    givenName: "Amir",
    familyName: "Beck",
    url: ORIGIN,
    image: abs("/images/og.png"),
    jobTitle: ["Design Engineer", "Product Designer", "Senior Design Engineer"],
    hasOccupation: [
      { "@type": "Occupation", name: "Design Engineer" },
      { "@type": "Occupation", name: "Product Designer" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Lumanu",
      url: "https://lumanu.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github, site.githubPersonal],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of California, Davis",
      url: "https://www.ucdavis.edu",
    },
    knowsAbout: [
      "Design engineering",
      "Product design",
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
    description: site.description,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: ORIGIN,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

export function profilePageNode() {
  return {
    "@type": "ProfilePage",
    "@id": `${ORIGIN}/#profile`,
    url: `${ORIGIN}/`,
    name: `${site.name}, ${site.role}`,
    description: site.description,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

function ogFor(study: CaseStudy) {
  const project = projects.find((p) => p.slug === study.slug);
  return {
    "@type": "ImageObject",
    url: abs(project?.image.src ?? "/images/og.png"),
    width: project?.image.width ?? 1200,
    height: project?.image.height ?? 630,
    caption: project?.image.alt ?? `${study.name}, ${site.name}`,
  };
}

export function articleNode(study: CaseStudy) {
  const url = `${ORIGIN}/${study.slug}`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    url,
    headline: `${study.name}, ${study.category}`,
    description: study.description ?? study.intro,
    image: ogFor(study),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: url,
    about: { "@type": "Thing", name: study.name },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export function breadcrumbNode(study: CaseStudy) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: `${ORIGIN}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: study.name,
        item: `${ORIGIN}/${study.slug}`,
      },
    ],
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode(), profilePageNode()],
  };
}

export function caseStudyGraph(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode(),
      websiteNode(),
      articleNode(study),
      breadcrumbNode(study),
    ],
  };
}
