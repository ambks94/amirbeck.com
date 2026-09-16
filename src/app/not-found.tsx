import type { Metadata } from "next";
import Link from "next/link";
import Notice from "@/components/Notice";
import { caseStudies } from "@/content/caseStudies";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Notice
      code="404"
      title="That page isn't here."
      body="The link may be old, or the address may have a typo. The work is all one click away."
    >
      <Link className="btn" href="/">
        Back to the homepage
      </Link>
      {caseStudies.map((study) => (
        <Link
          key={study.slug}
          className="btn btn--ghost"
          href={`/${study.slug}`}
        >
          {study.name}
        </Link>
      ))}
    </Notice>
  );
}
