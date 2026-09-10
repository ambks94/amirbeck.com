"use client";

import Image from "next/image";
import { createContext, useContext, useState, type ReactNode } from "react";
import Lightbox from "./Lightbox";
import ScrollHint from "./ScrollHint";
import styles from "./CaseStudy.module.css";
import chrome from "./BrowserFrame.module.css";
import type { CaseImage } from "@/content/caseStudies";

const LightboxCtx = createContext<(img: CaseImage) => void>(() => {});

export function CaseLightbox({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<CaseImage | null>(null);
  return (
    <LightboxCtx.Provider value={setOpen}>
      {children}
      <Lightbox image={open} onClose={() => setOpen(null)} />
    </LightboxCtx.Provider>
  );
}

export default function CaseShot({
  image,
  caption,
  sizes,
}: {
  image: CaseImage;
  caption?: string;
  sizes: string;
}) {
  const enlarge = useContext(LightboxCtx);
  const [loaded, setLoaded] = useState(false);
  const frame = image.frame;
  const pano = frame === "pano";
  const figureClass = [
    styles.figure,
    frame === "phone" ? styles.figurePhone : "",
    frame === "tall" ? styles.figureTall : "",
    pano ? styles.figurePano : "",
  ]
    .filter(Boolean)
    .join(" ");

  const shot = (
    <button
      type="button"
      className={`${styles.shot}${image.browser ? ` ${styles.shotBare}` : ""}`}
      onClick={() => enlarge(image)}
      aria-label={`Enlarge: ${image.alt}`}
    >
      {!loaded && (
        <span className={styles.skeleton} aria-hidden="true">
          <span className={styles.sweep} />
        </span>
      )}
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={
          frame === "phone"
            ? "(max-width: 760px) 70vw, 352px"
            : frame === "tall"
              ? "(max-width: 760px) 100vw, 480px"
              : pano
                ? "2560px"
                : sizes
        }
        quality={100}
        className={styles.shotImg}
        data-loaded={loaded}
        onLoad={() => setLoaded(true)}
      />
      <span className={styles.zoom}>Enlarge</span>
    </button>
  );

  // Browser chrome supplies the border, radius and shadow, so the shot goes bare.
  const framed = image.browser ? (
    <div className={chrome.frame}>
      <div className={chrome.bar}>
        <span className={chrome.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={chrome.url}>{image.browser}</span>
      </div>
      {shot}
    </div>
  ) : (
    shot
  );

  return (
    <figure className={figureClass}>
      {pano ? (
        <ScrollHint
          className={styles.panoRail}
          tabIndex={0}
          role="group"
          aria-label={image.alt}
        >
          {framed}
        </ScrollHint>
      ) : (
        framed
      )}
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
