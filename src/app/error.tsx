"use client";

import { useEffect } from "react";
import Link from "next/link";
import Notice from "@/components/Notice";
import { logError } from "@/lib/log";
import { site } from "@/content/site";

/**
 * Catches a throw from anywhere under the root layout. Errors in the layout
 * itself fall through to global-error.tsx.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError("render_error", error, { digest: error.digest });
  }, [error]);

  return (
    <Notice
      code="Error"
      title="Something on this page broke."
      body={
        <>
          Not your fault. Try again, and if it keeps happening I would genuinely
          like to know — <a href={`mailto:${site.email}`}>{site.email}</a>.
        </>
      }
      detail={error.digest}
    >
      <button className="btn" type="button" onClick={reset}>
        Try again
      </button>
      <Link className="btn btn--ghost" href="/">
        Back to the homepage
      </Link>
    </Notice>
  );
}
