"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import styles from "./RippleIllo.module.css";

type Props = {
  src: string;
  /** Wrapper class carrying the illustration's position, size and edge fade. */
  className?: string;
};

// Two stacked copies of a line illustration: a dim resting layer and a brighter
// layer that a soft radial mask reveals, rippling outward from the center when
// the surrounding section is hovered (dim -> bright, with a gradient edge).
export default function RippleIllo({ src, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // r = ring radius (loops outward), o = bright-layer opacity (fades with hover).
  const r = useMotionValue(0);
  const o = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 50%, transparent calc(${r}% - 18%), #000 ${r}%, transparent calc(${r}% + 18%))`;

  useEffect(() => {
    if (reduce) return;
    const section = ref.current?.closest("section");
    if (!section) return;
    let loop: ReturnType<typeof animate> | undefined;
    const enter = () => {
      animate(o, 0.55, { duration: 0.3, ease: "easeOut" });
      loop = animate(r, [0, 165], {
        duration: 1.8,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "loop",
      });
    };
    const leave = () => {
      animate(o, 0, { duration: 0.45, ease: "easeOut" });
      loop?.stop();
    };
    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
      loop?.stop();
    };
  }, [reduce, r, o]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.base} src={src} alt="" />
      {reduce ? null : (
        // eslint-disable-next-line @next/next/no-img-element
        <motion.img
          className={styles.bright}
          src={src}
          alt=""
          style={{ opacity: o, WebkitMaskImage: mask, maskImage: mask }}
        />
      )}
    </div>
  );
}
