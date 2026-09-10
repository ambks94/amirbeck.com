import Image from "next/image";
import styles from "./PhoneScroll.module.css";
import PhoneScroller from "./PhoneScroller";
import type { CasePhone } from "@/content/caseStudies";

// Phone frames whose screen scrolls inside a fixed device viewport. The app's
// own top bar and action footer sit outside the scroller, so they hold the
// edges and the scrollbar covers only the screen between them.
export default function PhoneScroll({ phones }: { phones: CasePhone[] }) {
  return (
    <div className={styles.row}>
      {phones.map((p) => (
        <figure key={p.screen} className={styles.phone}>
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
          <div className={styles.device}>
            <Image
              className={styles.bar}
              src={p.bar}
              alt=""
              width={p.barWidth}
              height={p.barHeight}
              sizes="375px"
              quality={100}
            />
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
          </div>
        </figure>
      ))}
    </div>
  );
}
