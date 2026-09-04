"use client";

import { useEffect, useRef } from "react";
import styles from "./LoopVideo.module.css";

const CROP = new Set(["/images/lumanu/buyer-dashboard.webm"]);

export default function LoopVideo({
  src,
  label,
}: {
  src: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const mp4 = src.replace(/\.webm$/, ".mp4");
  const crop = CROP.has(src);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (motion.matches) {
        video.pause();
        video.controls = true;
      } else {
        video.controls = false;
        video.play().catch(() => {});
      }
    };

    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  return (
    <div className={styles.frame}>
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
      >
        <source src={src} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
