import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Contact from "./Contact";
import DirectoryNav from "./DirectoryNav";
import LoopVideo from "./LoopVideo";
import styles from "./CaseStudy.module.css";
import { site } from "@/content/site";
import { caseStudies } from "@/content/caseStudies";
import CaseShot, { CaseLightbox } from "./CaseShot";
import Shot from "./Shot";
import EmbedFrame from "./EmbedFrame";
import type {
  CaseBlock,
  CaseChapter,
  CaseImage,
  CaseSection,
  CaseStudy,
} from "@/content/caseStudies";

function shouldStack(imgs: CaseImage[]) {
  if (imgs.length < 2) return false;
  const frames = new Set(imgs.map((i) => i.frame ?? "full"));
  return frames.has("wide") || (frames.has("phone") && frames.size > 1);
}

const chId = (ch: CaseChapter) =>
  ch.id ??
  ch.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Copy + media that continues the previous beat, not a new heading. */
const isContinued = (b: CaseBlock, i: number) =>
  i > 0 && !b.heading && !b.problem && !b.callout && !b.finale;

function Video({ src, caption }: { src: string; caption?: string }) {
  const video = <LoopVideo src={src} label={caption} />;
  if (!caption) return video;
  return (
    <figure className={styles.figure}>
      {video}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

function Media({ section }: { section: CaseSection }) {
  if (section.video)
    return <Video src={section.video} caption={section.caption} />;
  const imgs = section.images ?? [];
  if (!imgs.length) return null;
  if (section.beforeAfter && imgs.length >= 2) {
    return (
      <div className={styles.beforeAfter}>
        <CaseShot image={imgs[0]} sizes="(max-width: 760px) 100vw, 500px" />
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={22} strokeWidth={1.5} />
        </span>
        <CaseShot image={imgs[1]} sizes="(max-width: 760px) 100vw, 500px" />
      </div>
    );
  }
  if (imgs.length === 1)
    return (
      <CaseShot image={imgs[0]} sizes="(max-width: 1120px) 100vw, 1040px" />
    );
  if (shouldStack(imgs)) {
    return (
      <div className={styles.stack}>
        {imgs.map((im) => (
          <CaseShot
            key={im.src}
            image={im}
            sizes="(max-width: 1120px) 100vw, 1040px"
          />
        ))}
      </div>
    );
  }
  return (
    <div className={imgs.length >= 3 ? styles.grid3 : styles.grid2}>
      {imgs.map((im) => (
        <CaseShot
          key={im.src}
          image={im}
          sizes="(max-width: 760px) 100vw, 340px"
        />
      ))}
    </div>
  );
}

function BlockMedia({ block }: { block: CaseBlock }) {
  if (block.embed) {
    return <EmbedFrame src={block.embed} url={block.browser} />;
  }
  if (block.video) return <Video src={block.video} caption={block.caption} />;
  const imgs = block.images ?? [];
  if (!imgs.length) return null;
  if (block.beforeAfter && imgs.length >= 2) {
    return (
      <div className={styles.beforeAfter}>
        <CaseShot
          image={imgs[0]}
          caption={block.captions?.[0]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={22} strokeWidth={1.5} />
        </span>
        <CaseShot
          image={imgs[1]}
          caption={block.captions?.[1]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
      </div>
    );
  }
  if (imgs.length === 1) {
    if (block.enlarge) return <Shot image={imgs[0]} />;
    return (
      <CaseShot
        image={imgs[0]}
        caption={block.captions?.[0]}
        sizes="(max-width: 1120px) 100vw, 1040px"
      />
    );
  }
  if (shouldStack(imgs)) {
    return (
      <div className={styles.stack}>
        {imgs.map((im, i) => (
          <CaseShot
            key={im.src}
            image={im}
            caption={block.captions?.[i]}
            sizes="(max-width: 1120px) 100vw, 1040px"
          />
        ))}
      </div>
    );
  }
  return (
    <div className={imgs.length >= 3 ? styles.grid3 : styles.grid2}>
      {imgs.map((im, i) => (
        <CaseShot
          key={im.src}
          image={im}
          caption={block.captions?.[i]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
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
          <Link
            className={styles.mark}
            href="/"
            scroll={false}
            aria-label={site.name}
          >
            <Image
              src="/logo.png"
              alt={site.name}
              width={30}
              height={30}
              priority
            />
          </Link>
          <Link className={styles.back} href="/" scroll={false}>
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> Home
          </Link>
          <a className="btn" href={`mailto:${site.email}`}>
            Contact Me
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <CaseLightbox>
          <article className={styles.article}>
            <div className={styles.col}>
              <p className={`label ${styles.kicker}`}>
                {study.category} · {study.years} · {study.role}
              </p>
              <h1 className={styles.title}>{study.name}</h1>
              <p className={styles.intro}>{study.intro}</p>

              {study.hero && (
                <div className={styles.heroShot}>
                  <CaseShot
                    image={study.hero}
                    sizes="(max-width: 1120px) 100vw, 1040px"
                  />
                </div>
              )}
            </div>

            {story ? (
              <>
                <section className={styles.overviewBand}>
                <div className={`${styles.col} ${styles.overview}`}>
                  {study.overview?.map((p) => (
                    <p key={p.slice(0, 20)} className={styles.body}>
                      {p}
                    </p>
                  ))}
                  {study.problem && study.result && (
                    <div className={styles.flowGroup}>
                      <span className={styles.flow} aria-hidden="true">
                        <span className={styles.flowRail}>
                          <span className={styles.flowShine} />
                        </span>
                      </span>
                      <p className={styles.meta}>
                        <span className={styles.metaLabel}>Problem</span>
                        {study.problem}
                      </p>
                      <p className={`${styles.meta} ${styles.result}`}>
                        <span className={styles.metaLabel}>Solution</span>
                        {study.result}
                      </p>
                    </div>
                  )}
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
                          <span className={styles.detailLabel}>
                            Work included
                          </span>
                          <p className={styles.detailText}>
                            {study.workIncluded}
                          </p>
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
                  {study.chapters && study.chapters.some((c) => c.summary) && (
                    <DirectoryNav
                      label="Featured projects"
                      items={study.chapters
                        .filter((c) => c.summary)
                        .map((ch) => ({
                          href: `#${chId(ch)}`,
                          name: ch.title,
                          summary: ch.summary,
                        }))}
                    />
                  )}
                </div>
                </section>

                <div className={styles.col}>
                {study.chapters?.map((ch) => (
                  <section
                    key={ch.title}
                    id={chId(ch)}
                    className={styles.chapter}
                  >
                    <h2 className={styles.chapterTitle}>{ch.title}</h2>
                    {ch.blocks.map((b, i) =>
                      b.finale ? (
                        <div key={i} className={styles.finale}>
                          <span className={styles.finaleLabel}>
                            {b.heading ?? "The result"}
                          </span>
                          {b.body && (
                            <p className={styles.finaleText}>{b.body}</p>
                          )}
                          <BlockMedia block={b} />
                        </div>
                      ) : (
                      <div
                        key={i}
                        className={
                          isContinued(b, i)
                            ? `${styles.block} ${styles.continue}`
                            : styles.block
                        }
                      >
                        {b.heading && (
                          <h3 className={styles.blockHead}>{b.heading}</h3>
                        )}
                        {b.problem && b.result ? (
                          <div className={styles.flowGroup}>
                            <span className={styles.flow} aria-hidden="true">
                              <span className={styles.flowRail}>
                                <span className={styles.flowShine} />
                              </span>
                            </span>
                            <p className={styles.meta}>
                              <span className={styles.metaLabel}>Problem</span>
                              {b.problem}
                            </p>
                            {b.body && <p className={styles.body}>{b.body}</p>}
                            <p className={`${styles.meta} ${styles.result}`}>
                              <span className={styles.metaLabel}>Solution</span>
                              {b.result}
                            </p>
                          </div>
                        ) : (
                          b.body && <p className={styles.body}>{b.body}</p>
                        )}
                        {b.chips && (
                          <ul className={styles.tags}>
                            {b.chips.map((chip) => (
                              <li key={chip}>{chip}</li>
                            ))}
                          </ul>
                        )}
                        {b.list && (
                          <ul className={styles.outcomeList}>
                            {b.list.map((li) => (
                              <li key={li}>
                                <Check
                                  size={16}
                                  strokeWidth={2.5}
                                  aria-hidden="true"
                                />
                                {li}
                              </li>
                            ))}
                          </ul>
                        )}
                        <BlockMedia block={b} />
                        {b.callout && (
                          <div className={styles.calloutBlock}>
                            <span className={styles.calloutLabel}>
                              {b.calloutLabel ?? "Result"}
                            </span>
                            <p className={styles.callout}>{b.callout}</p>
                          </div>
                        )}
                      </div>
                      ),
                    )}
                  </section>
                ))}
                </div>
              </>
            ) : (
              <div className={`${styles.col} ${styles.sections}`}>
                {study.sections?.map((s, i) => (
                  <section key={s.heading} className={styles.section}>
                    <div className={styles.head}>
                      <span className={styles.index}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
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
                      {s.problem && s.result ? (
                        <span className={styles.flow} aria-hidden="true">
                          <span className={styles.flowRail}>
                            <span className={styles.flowShine} />
                          </span>
                        </span>
                      ) : null}
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

            <nav className={`${styles.col} ${styles.more}`} aria-label="More case studies">
              <span className={styles.detailLabel}>More work</span>
              <ul className={styles.moreList}>
                {caseStudies
                  .filter((c) => c.slug !== study.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        scroll={false}
                        className={styles.moreItem}
                      >
                        <span className={styles.moreName}>{c.name}</span>
                        <span className={styles.moreCat}>{c.category}</span>
                        <ArrowUpRight
                          size={15}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </article>
        </CaseLightbox>
      </main>
      <Contact />
    </>
  );
}
