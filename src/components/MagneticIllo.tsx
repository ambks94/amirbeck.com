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
  /** The element's own resting transform (from its CSS class), preserved so the
   *  repulsion and drift compose with it instead of overriding it. */
  base?: string;
  strength?: number;
  radius?: number;
  driftAmp?: number;
};

// A background line illustration that drifts gently on its own and leans away
// from the pointer — a light magnetic-repulsion read on the "iron filings" idea.
// Transform-only (GPU); springs keep the repulsion interruptible.
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

  // Slow, autonomous drift so the illustration has life at rest.
  useAnimationFrame((t) => {
    if (reduce) return;
    const s = t / 1000;
    dx.set(Math.sin(s * 0.18) * driftAmp);
    dy.set(Math.cos(s * 0.14) * driftAmp);
  });

  // Pointer repulsion, tracked on the window so it works behind content.
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
      // Decorative SVG illustration; next/image adds no value for an inline,
      // animated SVG and would only add overhead.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        className={className}
        src={src}
        alt=""
        aria-hidden="true"
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
