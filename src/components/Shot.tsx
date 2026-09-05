"use client";

import { useState } from "react";
import ShimmerImage from "./ShimmerImage";
import Lightbox from "./Lightbox";
import styles from "./Work.module.css";
import type { CaseImage } from "@/content/caseStudies";

// The home Work card's framed, click-to-enlarge image (shimmer load + lightbox),
// reused so case-study images can match it exactly. Manages its own open state.
export default function Shot({ image }: { image: CaseImage }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={styles.shot}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${image.alt}`}
      >
        <span className={styles.media}>
          <ShimmerImage
            src={image.src}
            alt={image.alt}
            sizes="(max-width: 1120px) 100vw, 1120px"
            quality={100}
            objectFit="contain"
            objectPosition="center"
          />
        </span>
        <span className={styles.zoom}>Enlarge</span>
      </button>
      <Lightbox image={open ? image : null} onClose={() => setOpen(false)} />
    </>
  );
}
