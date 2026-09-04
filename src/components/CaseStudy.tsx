import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "./Footer";
import styles from "./CaseStudy.module.css";
import { site } from "@/content/site";
import type { CaseBlock, CaseImage, CaseSection, CaseStudy } from "@/content/caseStudies";

const VIDEO_MP4 = new Set([
  "/images/skyslope/digisign-usability.webm",
  "/images/skyslope/digisign-behavior.webm",
]);

function LoopVideo({ src }: { src: string }) {
  const mp4 = VIDEO_MP4.has(src) ? src.replace(/\.webm$/, ".mp4") : null;
  return (
    <video className={styles.video} autoPlay muted loop playsInline preload="metadata">
      <source src={src} type="video/webm" />
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    </video>
  );
}

function Frame({ image, sizes }: { image: CaseImage; sizes: string }) {
  return (
    <div className={styles.shot}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={85}
      />
    </div>
  );
}

function Figure({ image, caption, sizes }: { image: CaseImage; caption?: string; sizes: string }) {
  return (
    <figure className={styles.figure}>
      <Frame image={image} sizes={sizes} />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

// media for the micro layout (video / before-after / grid)
function Media({ section }: { section: CaseSection }) {
  if (section.video) return <LoopVideo src={section.video} />;
  const imgs = section.images ?? [];
  if (!imgs.length) return null;
  if (section.beforeAfter && imgs.length >= 2) {
    return (
      <div className={styles.beforeAfter}>
        <Frame image={imgs[0]} sizes="(max-width: 760px) 100vw, 500px" />
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={22} strokeWidth={1.5} />
        </span>
        <Frame image={imgs[1]} sizes="(max-width: 760px) 100vw, 500px" />
      </div>
    );
  }
  if (imgs.length === 1) return <Frame image={imgs[0]} sizes="(max-width: 1120px) 100vw, 1040px" />;
  return (
    <div className={imgs.length >= 3 ? styles.grid3 : styles.grid2}>
      {imgs.map((im) => (
        <Frame key={im.src} image={im} sizes="(max-width: 760px) 100vw, 340px" />
      ))}
    </div>
  );
}

// media for a story block (images with captions)
function BlockMedia({ block }: { block: CaseBlock }) {
  if (block.video) return <LoopVideo src={block.video} />;
  const imgs = block.images ?? [];
  if (!imgs.length) return null;
  if (imgs.length === 1) {
    return <Figure image={imgs[0]} caption={block.captions?.[0]} sizes="(max-width: 1120px) 100vw, 1040px" />;
  }
  return (
    <div className={imgs.length >= 3 ? styles.grid3 : styles.grid2}>
      {imgs.map((im, i) => (
        <Figure key={im.src} image={im} caption={block.captions?.[i]} sizes="(max-width: 760px) 100vw, 500px" />
      ))}
    </div>
  );
}

export default function CaseStudyView({ study }: { study: CaseStudy }) {
  const story = study.layout === "story";
  return (
    <>
      <header className={styles.nav}>
        <div className={`wrap ${styles.navInner}`}>
          <Link className={styles.mark} href="/" aria-label={site.name}>
            <Image src="/logo.png" alt={site.name} width={30} height={30} priority />
          </Link>
          <Link className={styles.back} href="/#work">
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> Work
          </Link>
          <a className="btn" href={`mailto:${site.email}`}>Contact Me</a>
        </div>
      </header>

      <main className={styles.main}>
        <article className={`wrap ${styles.article}`}>
          <p className={`label ${styles.kicker}`}>
            {study.category} · {study.years} · {study.role}
          </p>
          <h1 className={styles.title}>{study.name}</h1>
          <p className={styles.intro}>{study.intro}</p>

          {study.hero && (
            <div className={styles.heroShot}>
              <Frame image={study.hero} sizes="(max-width: 1120px) 100vw, 1040px" />
            </div>
          )}

          {story ? (
            <>
              <div className={styles.overview}>
                {study.overview?.map((p) => (
                  <p key={p.slice(0, 20)} className={styles.body}>
                    {p}
                  </p>
                ))}
                <div className={styles.details}>
                  {study.impact && study.impact.length > 0 && (
                    <div className={styles.detailCol}>
                      <span className={styles.detailLabel}>Impact</span>
                      <ul className={styles.detailList}>
                        {study.impact.map((im) => (
                          <li key={im}>{im}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className={styles.detailCol}>
                    <span className={styles.detailLabel}>Role</span>
                    <p className={styles.detailText}>{study.role}</p>
                    {study.workIncluded && (
                      <>
                        <span className={styles.detailLabel}>Work included</span>
                        <p className={styles.detailText}>{study.workIncluded}</p>
                      </>
                    )}
                  </div>
                </div>
                {study.goals && study.goals.length > 0 && (
                  <div className={styles.goals}>
                    <span className={styles.detailLabel}>Goals</span>
                    <ul className={styles.goalList}>
                      {study.goals.map((g) => (
                        <li key={g}>{g}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {study.chapters?.map((ch) => (
                <section key={ch.title} className={styles.chapter}>
                  <h2 className={styles.chapterTitle}>{ch.title}</h2>
                  {ch.blocks.map((b, i) => (
                    <div key={i} className={styles.block}>
                      {b.heading && <h3 className={styles.blockHead}>{b.heading}</h3>}
                      {b.body && <p className={styles.body}>{b.body}</p>}
                      {b.list && (
                        <ul className={styles.outcomeList}>
                          {b.list.map((li) => (
                            <li key={li}>{li}</li>
                          ))}
                        </ul>
                      )}
                      <BlockMedia block={b} />
                      {b.callout && <p className={styles.callout}>{b.callout}</p>}
                    </div>
                  ))}
                </section>
              ))}
            </>
          ) : (
            <div className={styles.sections}>
              {study.sections?.map((s, i) => (
                <section key={s.heading} className={styles.section}>
                  <div className={styles.head}>
                    <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                    <h2 className={styles.h2}>{s.heading}</h2>
                  </div>
                  {s.tags && (
                    <ul className={styles.tags}>
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <Media section={s} />
                  <div className={styles.copy}>
                    {s.problem && (
                      <p className={styles.meta}>
                        <span className={styles.metaLabel}>Problem</span>
                        {s.problem}
                      </p>
                    )}
                    <p className={styles.body}>{s.body}</p>
                    {s.result && (
                      <p className={`${styles.meta} ${styles.result}`}>
                        <span className={styles.metaLabel}>Result</span>
                        {s.result}
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          )}

          <div className={styles.links}>
            {study.links.map((l) => (
              <a
                key={l.href}
                className="btn btn--ghost"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label} <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            ))}
            <Link className="btn" href="/#work">
              <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> All work
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
