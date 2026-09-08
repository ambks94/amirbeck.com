"use client";

import { useState } from "react";
import ShimmerImage from "./ShimmerImage";
import Lightbox from "./Lightbox";
import styles from "./Shot.module.css";
import type { CaseImage } from "@/content/caseStudies";

// Shared 4:3 Work shot: browser chrome when `image.browser` is set, otherwise
// a padded contain crop. Click-to-enlarge; manages its own lightbox.
export default function Shot({
  image,
  priority,
}: {
  image: CaseImage;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`${styles.shot} ${image.browser ? styles.shotBrowser : ""}`}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge: ${image.alt}`}
      >
        {image.browser ? (
          <span className={styles.browser}>
            <span className={styles.bar} aria-hidden="true">
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>{image.browser}</span>
            </span>
            <span className={styles.viewport}>
              <ShimmerImage
                src={image.src}
                alt={image.alt}
                sizes="(max-width: 1120px) 100vw, 1120px"
                priority={priority}
                quality={100}
                objectFit="cover"
                objectPosition="center top"
              />
            </span>
          </span>
        ) : (
          <span className={styles.media}>
            <ShimmerImage
              src={image.src}
              alt={image.alt}
              sizes="(max-width: 1120px) 100vw, 1120px"
              priority={priority}
              quality={100}
              objectFit="contain"
              objectPosition="center"
            />
          </span>
        )}
        <span className={styles.zoom}>Enlarge</span>
      </button>
      <Lightbox image={open ? image : null} onClose={() => setOpen(false)} />
    </>
  );
}
