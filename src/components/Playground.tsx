"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import RippleIllo from "./RippleIllo";
import MagneticIllo from "./MagneticIllo";
import styles from "./Playground.module.css";
import { playgroundItems } from "@/content/playground";

const TYPE_SPEED = 0.05; // seconds per character
const HOLD_MS = 1500; // pause on a finished word before deleting

export default function Playground() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = playgroundItems.length;
  const current = playgroundItems[index];
  const title = current.title;

  const chars = useMotionValue(0);
  const typed = useTransform(chars, (v) => title.slice(0, Math.round(v)));

  useEffect(() => {
    if (reduce) {
      chars.set(title.length);
      return;
    }
    chars.set(0);
    let holdTimer: ReturnType<typeof setTimeout>;

    const typing = animate(chars, title.length, {
      duration: title.length * TYPE_SPEED,
      ease: "linear",
      onComplete: () => {
        holdTimer = setTimeout(() => {
          animate(chars, 0, {
            duration: Math.max(0.25, title.length * TYPE_SPEED * 0.5),
            ease: "easeIn",
            onComplete: () => setIndex((i) => (i + 1) % count),
          });
        }, HOLD_MS);
      },
    });

    return () => {
      typing.stop();
      clearTimeout(holdTimer);
    };
  }, [index, reduce, title, count, chars]);

  return (
    <section
      className={`section ${styles.section}`}
      id="playground"
      data-theme="dark"
    >
      <div className={styles.ripple} aria-hidden="true">
        <MagneticIllo
          className={styles.rippleArt}
          src="/illustrations/stipple.svg"
          base="translate(-50%, -55%) rotate(90deg) scale(0.7)"
          strength={19}
        />
      </div>
      <RippleIllo
        className={styles.lines}
        src="/illustrations/contour.svg"
        rippleDuration={8}
      />

      <div className={`wrap ${styles.inner}`}>
        <h2 className={styles.heading}>Playground</h2>
        <p className={styles.lede}>Live interactive demos of work I’ve done.</p>

        <div className={styles.frame}>
          <span className={styles.floatWrap}>
            <Link href="/playground" className={`btn ${styles.floatCta}`}>
              View playground
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </span>

          <div className={styles.box}>
            <span className={styles.boxLabel}>Demos</span>

            <p className={styles.cycler} aria-hidden="true">
              <motion.span className={styles.typed}>{typed}</motion.span>
              <span
                className={`${styles.caret} ${reduce ? styles.caretStill : ""}`}
              />
            </p>

            <span className={styles.blurb}>{current.blurb}</span>

            <ul className={styles.srList}>
              {playgroundItems.map((it) => (
                <li key={it.slug}>
                  {it.title} — {it.blurb}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
