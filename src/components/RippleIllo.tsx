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
  className?: string;
  rippleDuration?: number;
};

export default function RippleIllo({
  src,
  className,
  rippleDuration = 1.8,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
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
        duration: rippleDuration,
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
  }, [reduce, r, o, rippleDuration]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.base} src={src} alt="" />
      {reduce ? null : (
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
