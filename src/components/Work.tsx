"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./Work.module.css";
import Lightbox from "./Lightbox";
import ShimmerImage from "./ShimmerImage";
import DotRow from "./DotRow";
import { projects, workIntro, type Project } from "@/content/site";

// Wrap metric tokens (~50%, 15%, 30%) so they read stronger than the label text.
function emphasizeMetrics(text: string) {
  return text.split(/(~?\d+(?:\.\d+)?%?)/g).map((part, i) =>
    /^~?\d+(?:\.\d+)?%?$/.test(part) ? (
      <b key={i} className={styles.metric}>
        {part}
      </b>
    ) : (
      part
    ),
  );
}

export default function Work() {
  const [open, setOpen] = useState<Project["image"] | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const entries = Array.from(
      list.querySelectorAll<HTMLElement>(`.${styles.entry}`),
    );
    const observer = new IntersectionObserver(
      (obs) =>
        obs.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    entries.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.work}`} id="work">
      <Image
        className={styles.contour}
        src="/illustrations/contour.svg"
        alt=""
        aria-hidden="true"
        width={460}
        height={700}
      />
      <div className={`wrap ${styles.wrap}`}>
        <div className="sectionHead">
          <h2>Work</h2>
          <DotRow variant="b" className="dots" />
        </div>
        <p className={styles.intro}>{workIntro}</p>

        <div className={styles.list} ref={listRef}>
          {projects.map((p, i) => (
            <article key={p.slug} className={styles.entry}>
              <div className={styles.head}>
                <h3 className={styles.name}>{p.name}</h3>
                <span className={styles.wave} aria-hidden="true">
                  {/* one stroke: squiggle, dips down, then runs straight under the
                      label as its underline. Draws in on hover via stroke-dashoffset. */}
                  <svg
                    className={styles.waveSvg}
                    width="380"
                    height="30"
                    fill="none"
                  >
                    <path
                      className={styles.waveLine}
                      pathLength={100}
                      d="M2 14 C 14 6, 24 21, 40 14 S 64 8, 78 16 C 84 21, 88 27, 100 27 L 378 27"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className={`label ${styles.category}`}>{p.category}</p>
                <p className={`label ${styles.years}`}>{p.years}</p>
              </div>

              {/* One fixed 4:3 slot for every project so the entries align.
                  Inset padding keeps the shot centered and gives the hover
                  zoom room before overflow:hidden on the frame. */}
              <button
                type="button"
                className={`${styles.shot} ${p.image.browser ? styles.shotBrowser : ""}`}
                onClick={() => setOpen(p.image)}
                aria-label={`Enlarge: ${p.image.alt}`}
              >
                {p.image.browser ? (
                  <span className={styles.browser}>
                    <span className={styles.bar} aria-hidden="true">
                      <span className={styles.dots}>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={styles.url}>{p.image.browser}</span>
                    </span>
                    <span className={styles.viewport}>
                      <ShimmerImage
                        src={p.image.src}
                        alt={p.image.alt}
                        sizes="(max-width: 1120px) 100vw, 1120px"
                        priority={i === 0}
                        objectFit="cover"
                        objectPosition="center top"
                      />
                    </span>
                  </span>
                ) : (
                  <span className={styles.media}>
                    <ShimmerImage
                      src={p.image.src}
                      alt={p.image.alt}
                      sizes="(max-width: 1120px) 100vw, 1120px"
                      priority={i === 0}
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </span>
                )}
                <span className={styles.zoom}>Enlarge</span>
              </button>

              <div className={styles.body}>
                <div>
                  <p className={styles.copy}>{p.body}</p>
                  <div className={styles.links}>
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        className={l.external ? "btn btn--ghost" : "btn"}
                        href={l.href}
                        {...(l.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {l.label}
                        {l.external ? (
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowRight
                            size={15}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    ))}
                  </div>
                </div>

                <ul className={styles.outcomes}>
                  {p.outcomes.map((o) => (
                    <li key={o}>{emphasizeMetrics(o)}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Lightbox image={open} onClose={() => setOpen(null)} />
    </section>
  );
}
