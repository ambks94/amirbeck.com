"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Work.module.css";
import Lightbox from "./Lightbox";
import { projects, type Project } from "@/content/site";

export default function Work() {
  const [open, setOpen] = useState<Project["image"] | null>(null);

  return (
    <section className={`section ${styles.work}`} id="work">
      <Image
        className={styles.contour}
        src="/illustrations/contour.svg"
        alt=""
        aria-hidden="true"
        width={265}
        height={419}
      />
      <div className={`wrap ${styles.wrap}`}>
        <div className="sectionHead">
          <h2>Work</h2>
          <Image className="dots" src="/illustrations/dot-row.svg" alt="" width={284} height={33} />
        </div>

        <div className={styles.list}>
          {projects.map((p, i) => (
            <article key={p.slug} className={styles.entry}>
              <div className={styles.head}>
                <h3 className={styles.name}>{p.name}</h3>
                <Image
                  className={styles.wave}
                  src="/illustrations/wave.svg"
                  alt=""
                  width={195}
                  height={22}
                />
                <p className="label">{p.category}</p>
                <p className={`label ${styles.years}`}>{p.years}</p>
              </div>

              {/* One fixed 4:3 slot for every project so the entries align.
                  object-fit: contain — nothing crops, nothing distorts. */}
              <button
                type="button"
                className={styles.shot}
                onClick={() => setOpen(p.image)}
                aria-label={`Enlarge: ${p.image.alt}`}
              >
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  sizes="(max-width: 1120px) 100vw, 1120px"
                  priority={i === 0}
                />
                <span className={styles.zoom}>Enlarge</span>
              </button>

              <div className={styles.body}>
                <div>
                  <p className={styles.copy}>{p.body}</p>
                  <div className={styles.links}>
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        className="btn btn--ghost"
                        href={l.href}
                        {...(l.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {l.label}
                        {l.external ? " ↗" : ""}
                      </a>
                    ))}
                  </div>
                </div>

                <ul className={styles.outcomes}>
                  {p.outcomes.map((o) => (
                    <li key={o}>
                      <Image src="/illustrations/dot.svg" alt="" width={24} height={24} />
                      {o}
                    </li>
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
