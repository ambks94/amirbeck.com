"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./LoopVideo.module.css";
import chrome from "./BrowserFrame.module.css";

const CROP = new Set(["/images/lumanu/buyer-dashboard.webm"]);

/** Intrinsic ratio per clip, so the skeleton holds the right box on the first
 *  paint. None of these are 16:9, so nothing here is guessable — the value is
 *  measured from the file. Anything unlisted starts at 16:9 and corrects itself
 *  from the video's own metadata, so a new clip never needs an entry. */
const RATIO: Record<string, string> = {
  "/images/lumanu/buyer-dashboard.webm": "1920 / 1136",
  "/images/lumanu/reporting.webm": "1920 / 1161",
  "/images/skyslope/digisign-selection.webm": "2280 / 1618",
  "/images/skyslope/digisign-reassign.webm": "2280 / 1618",
  "/images/skyslope/digisign-signer-flow.webm": "2280 / 1618",
};

export default function LoopVideo({
  src,
  label,
  browser,
}: {
  src: string;
  label?: string;
  /** Label in the browser chrome, matching the home Work cards. */
  browser?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [ratio, setRatio] = useState(RATIO[src]);
  const reduce = useReducedMotion();
  const mp4 = src.replace(/\.webm$/, ".mp4");
  const crop = CROP.has(src);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // A cached video can be ready before React attaches its handlers.
    if (video.videoWidth)
      setRatio(`${video.videoWidth} / ${video.videoHeight}`);
    if (video.readyState >= 2) setLoaded(true);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (motionQuery.matches) {
        video.pause();
        video.controls = true;
      } else {
        video.controls = false;
        video.play().catch(() => {});
      }
    };

    apply();
    motionQuery.addEventListener("change", apply);
    return () => motionQuery.removeEventListener("change", apply);
  }, []);

  const media = (
    <div
      className={styles.frame}
      data-chrome={browser ? "" : undefined}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!loaded && (
        <span className={styles.skeleton} aria-hidden="true">
          {!reduce && (
            <motion.span
              className={styles.sweep}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          )}
        </span>
      )}
      <video
        ref={ref}
        className={`${styles.video}${crop ? ` ${styles.crop}` : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        title={label}
        data-loaded={loaded}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          if (v.videoWidth) setRatio(`${v.videoWidth} / ${v.videoHeight}`);
        }}
        onLoadedData={() => setLoaded(true)}
      >
        <source src={src} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );

  if (!browser) return media;

  return (
    <div className={chrome.frame}>
      <div className={chrome.bar}>
        <span className={chrome.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={chrome.url}>{browser}</span>
      </div>
      {media}
    </div>
  );
}
