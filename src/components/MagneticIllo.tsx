"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

type Props = {
  src: string;
  className?: string;
  /** Resting transform from CSS; repulsion and drift compose with it. */
  base?: string;
  strength?: number;
  radius?: number;
  driftAmp?: number;
};

export default function MagneticIllo({
  src,
  className,
  base = "",
  strength = 36,
  radius = 340,
  driftAmp = 8,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLImageElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 130, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 130, damping: 20, mass: 0.6 });

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);

  const cx = useTransform(() => sx.get() + dx.get());
  const cy = useTransform(() => sy.get() + dy.get());
  const transform = useMotionTemplate`translate(${cx}px, ${cy}px) ${base}`;

  useAnimationFrame((t) => {
    if (reduce) return;
    const s = t / 1000;
    dx.set(Math.sin(s * 0.18) * driftAmp);
    dy.set(Math.cos(s * 0.14) * driftAmp);
  });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ddx = e.clientX - (r.left + r.width / 2);
      const ddy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(ddx, ddy) || 1;
      const falloff = Math.max(0, 1 - dist / radius);
      px.set((-ddx / dist) * strength * falloff);
      py.set((-ddy / dist) * strength * falloff);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, radius, strength, px, py]);

  if (reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        className={className}
        src={src}
        alt=""
        aria-hidden="true"
        style={base ? { transform: base } : undefined}
      />
    );
  }
  return (
    <motion.img
      ref={ref}
      className={className}
      src={src}
      alt=""
      aria-hidden="true"
      style={{ transform }}
    />
  );
}
