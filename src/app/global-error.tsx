"use client";

import { useEffect } from "react";
import Notice from "@/components/Notice";
import { logError } from "@/lib/log";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Last resort: the root layout itself threw, so this replaces it entirely and
 * has to render its own html and body. The font variables live on the layout's
 * <html>, so type here falls back to the stacks declared in globals.css.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError("global_render_error", error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Notice
          code="Error"
          title="The site failed to load."
          body={
            <>
              Something went wrong before the page could render. Reloading
              usually clears it. If it does not, I would like to hear about it
              at <a href={`mailto:${site.email}`}>{site.email}</a>.
            </>
          }
          detail={error.digest}
        >
          <button className="btn" type="button" onClick={reset}>
            Reload the page
          </button>
        </Notice>
      </body>
    </html>
  );
}
