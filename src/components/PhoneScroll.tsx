import Image from "next/image";
import styles from "./PhoneScroll.module.css";
import PhoneScroller from "./PhoneScroller";
import PhoneTilt from "./PhoneTilt";
import type { CSSProperties } from "react";
import type { CasePhone } from "@/content/caseStudies";

// Phone frames whose screen scrolls inside a fixed device viewport. The app's
// own top bar and action footer sit outside the scroller, so they hold the
// edges and the scrollbar covers only the screen between them.
export default function PhoneScroll({ phones }: { phones: CasePhone[] }) {
  // Plain mocks stay side by side even on a phone; the Breeze frames scroll and
  // carry their own chrome, so they need the width and stack instead.
  const bare = phones.every((p) => !p.bar && !p.foot);

  // Body, screen and notch are three layers, so the notch can sit over the
  // screenshot's status bar. Every offset is a share of the body's own pixels.
  const chassisVars = (p: CasePhone): CSSProperties | undefined => {
    if (!p.body || !p.bodyWidth || !p.bodyHeight) return undefined;
    const top = p.screenTop ?? (p.bodyHeight - p.height) / 2;
    const pct = (n: number, of: number) => `${(n / of) * 100}%`;
    return {
      "--sx": pct((p.bodyWidth - p.width) / 2, p.bodyWidth),
      "--sy": pct(top, p.bodyHeight),
      "--sw": pct(p.width, p.bodyWidth),
      "--sh": pct(p.height, p.bodyHeight),
      "--nx": pct(p.notchX ?? 0, p.bodyWidth),
      "--ny": pct(p.notchY ?? 0, p.bodyHeight),
      "--nw": pct(p.notchWidth ?? 0, p.bodyWidth),
      "--nh": pct(p.notchHeight ?? 0, p.bodyHeight),
      aspectRatio: `${p.bodyWidth} / ${p.bodyHeight}`,
    } as CSSProperties;
  };

  return (
    <div className={`${styles.row}${bare ? ` ${styles.rowTight}` : ""}`}>
      {phones.map((p) => (
        <PhoneTilt key={p.screen} className={styles.phone}>
          {p.browser && (
            <div className={styles.chrome}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.url}>{p.browser}</span>
            </div>
          )}
          <div
            className={`${styles.device}${!p.bar && !p.foot ? ` ${styles.bare}` : ""}${p.body ? ` ${styles.chassis}` : ""}`}
            style={
              p.body
                ? chassisVars(p)
                : !p.bar && !p.foot
                  ? { aspectRatio: `${p.width} / ${p.height}` }
                  : undefined
            }
          >
            {p.body && (
              <Image
                className={styles.bodyImg}
                src={p.body}
                alt=""
                width={p.bodyWidth}
                height={p.bodyHeight}
                sizes="375px"
                quality={100}
              />
            )}
            {p.bar && (
              <Image
                className={styles.bar}
                src={p.bar}
                alt=""
                width={p.barWidth ?? 1125}
                height={p.barHeight ?? 300}
                sizes="375px"
                quality={100}
              />
            )}
            <PhoneScroller locked={p.noScroll}>
              <Image
                className={styles.screen}
                src={p.screen}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="375px"
                quality={100}
              />
            </PhoneScroller>
            {p.foot && (
              <Image
                className={styles.foot}
                src={p.foot}
                alt=""
                width={p.footWidth ?? 1131}
                height={p.footHeight ?? 222}
                sizes="375px"
                quality={100}
              />
            )}
            {p.notch && (
              <Image
                className={styles.notch}
                src={p.notch}
                alt=""
                width={p.notchWidth}
                height={p.notchHeight}
                sizes="200px"
                quality={100}
              />
            )}
          </div>
        </PhoneTilt>
      ))}
    </div>
  );
}
