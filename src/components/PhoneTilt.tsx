"use client";

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "motion/react";

/** A phone frame that leans a few degrees toward the pointer. Transform only,
 *  the same vocabulary as MagneticIllo, and inert without a hover pointer or
 *  under prefers-reduced-motion. */
export default function PhoneTilt({
  className,
  children,
  max = 5,
  radius = 520,
}: {
  className?: string;
  children: ReactNode;
  /** Peak rotation in degrees on either axis. */
  max?: number;
  /** Distance from the frame's centre at which the lean fades to nothing. */
  radius?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.5 };
  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);
  const transform = useMotionTemplate`perspective(1100px) rotateX(${srx}deg) rotateY(${sry}deg)`;

  useEffect(() => {
    if (reduce) return;
    // Touch pointers would leave the frame stuck mid-lean after a scroll.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
      const nx = Math.max(-1, Math.min(1, dx / (r.width / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (r.height / 2)));
      ry.set(nx * max * falloff);
      rx.set(-ny * max * falloff);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, max, radius, rx, ry]);

  if (reduce) return <figure className={className}>{children}</figure>;

  return (
    <motion.figure ref={ref} className={className} style={{ transform }}>
      {children}
    </motion.figure>
  );
}
