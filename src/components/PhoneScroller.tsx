"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowDown } from "lucide-react";
import styles from "./PhoneScroll.module.css";

/** The screen area of a phone frame. Vertical twin of ScrollHint: the chip
 *  shows only while there is more screen below and nobody has scrolled yet. */
export default function PhoneScroller({
  locked,
  children,
}: {
  locked?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setOverflows(el.scrollHeight > el.clientHeight + 8);
    if (el.scrollTop > 8) setScrolled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || locked) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update, locked]);

  return (
    <div className={styles.scrollWrap}>
      <div
        ref={ref}
        className={`${styles.scroller}${locked ? ` ${styles.locked}` : ""}`}
      >
        {children}
      </div>
      {!locked && (
        <span
          className={styles.hint}
          data-show={(overflows && !scrolled) || undefined}
          aria-hidden="true"
        >
          <ArrowDown size={11} strokeWidth={2} />
          Scroll
        </span>
      )}
    </div>
  );
}
