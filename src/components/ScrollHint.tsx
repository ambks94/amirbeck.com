"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { ArrowRight } from "lucide-react";
import styles from "./ScrollHint.module.css";

/** Overlay on a sideways scroller. Same chip as Enlarge; bobs until you scroll. */
export default function ScrollHint({
  children,
  className,
  ...props
}: { children: ReactNode } & ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setOverflows(el.scrollWidth > el.clientWidth + 8);
    if (el.scrollLeft > 8) setScrolled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
      <span
        className={styles.hint}
        data-show={(overflows && !scrolled) || undefined}
        aria-hidden="true"
      >
        <ArrowRight size={12} strokeWidth={2} />
        Scroll right
      </span>
    </div>
  );
}
