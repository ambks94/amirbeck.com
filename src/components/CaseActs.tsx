import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import BlockMedia from "./CaseMedia";
import CaseSteps from "./CaseSteps";
import ScrollHint from "./ScrollHint";
import styles from "./CaseActs.module.css";
import type { CaseBlock, CaseChapter } from "@/content/caseStudies";

/** Actors get a lane; the flow steps down them in time order. */
const ACTORS = [
  { key: "agent", name: "Buyer agent" },
  { key: "buyer", name: "Buyer" },
  { key: "system", name: "EasyPeady" },
  { key: "listing", name: "Listing agent" },
] as const;

type ActorKey = (typeof ACTORS)[number]["key"];

/** One envelope, signed once, split and routed. Mail fires where noted. */
const FLOW: { actor: ActorKey; text: string; mail?: string }[] = [
  { actor: "agent", text: "Build the property list" },
  { actor: "agent", text: "Send one envelope", mail: "Emails the buyer" },
  { actor: "buyer", text: "Review the visit details" },
  { actor: "buyer", text: "Sign once", mail: "Emails the buyer agent" },
  { actor: "system", text: "Split into individual PEADs" },
  {
    actor: "listing",
    text: "Receives their own PEAD",
    mail: "Emails each listing agent",
  },
];

const rowOf = (actor: ActorKey) =>
  ACTORS.findIndex((a) => a.key === actor) + 1;

function Lanes({ caption }: { caption?: string }) {
  return (
    <div>
      <div className={styles.lanes}>
        <p className={styles.laneAxis}>
          <span>Who acts</span>
          <span className={styles.laneAxisTime}>Time &rarr;</span>
        </p>

        <ScrollHint className={styles.lanesScroll}>
        <div className={styles.lanesGrid}>
          {ACTORS.map((a, i) => (
            <Fragment key={a.key}>
              <span
                className={styles.laneName}
                style={{ "--r": i + 1 } as React.CSSProperties}
              >
                <i
                  className={styles.swatch}
                  style={{ background: `var(--role-${a.key})` }}
                  aria-hidden="true"
                />
                {a.name}
              </span>
              <span
                className={styles.laneRule}
                style={{ "--r": i + 1 } as React.CSSProperties}
                aria-hidden="true"
              />
            </Fragment>
          ))}

          {FLOW.map((step, i) => (
            <div
              key={step.text}
              className={styles.flowStep}
              style={
                {
                  "--r": rowOf(step.actor),
                  "--c": i + 2,
                  background: `var(--role-${step.actor})`,
                } as React.CSSProperties
              }
            >
              <span className={styles.flowNum}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.flowText}>{step.text}</span>
              <span className={styles.flowActor}>
                {ACTORS.find((a) => a.key === step.actor)?.name}
              </span>
              {step.mail && (
                <span className={styles.flowMail}>{step.mail}</span>
              )}
            </div>
          ))}
        </div>
        </ScrollHint>
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}

function Beat({ block }: { block: CaseBlock }) {
  return (
    <div className={styles.beat}>
      <div className={styles.rail}>
        {block.decision && (
          <span className={styles.decision}>{block.decision}</span>
        )}
        {block.stamp && <span className={styles.stamp}>{block.stamp}</span>}
      </div>

      <div className={styles.beatBody}>
        {block.heading && <h3 className={styles.head}>{block.heading}</h3>}
        {block.body && <p className={styles.text}>{block.body}</p>}

        {block.personas && (
          <div className={styles.personas}>
            {block.personas.map((p) => (
              <div key={p.name} className={styles.persona}>
                <h4 className={styles.personaName}>{p.name}</h4>
                <p className={styles.personaText}>{p.text}</p>
              </div>
            ))}
          </div>
        )}

        {block.table && (
          <table className={styles.table}>
            <caption>Quantitative</caption>
            <tbody>
              {block.table.map((row) => (
                <tr key={row.figure + row.text}>
                  <td className={styles.figure}>{row.figure}</td>
                  <td>{row.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <BlockMedia block={block} />

        {block.steps && <CaseSteps steps={block.steps} />}

        {block.compare && block.compare.length === 2 && (
          <div className={styles.compare}>
            <article className={styles.compareCell}>
              <span className={styles.compareLabel}>
                {block.compare[0].label}
              </span>
              <strong className={styles.compareTitle}>
                {block.compare[0].title}
              </strong>
              <p className={styles.compareText}>{block.compare[0].text}</p>
            </article>
            <div className={styles.compareArrow} aria-hidden="true">
              <ArrowRight size={22} strokeWidth={1.5} />
            </div>
            <article className={styles.compareCell}>
              <span className={styles.compareLabel}>
                {block.compare[1].label}
              </span>
              <strong className={styles.compareTitle}>
                {block.compare[1].title}
              </strong>
              <p className={styles.compareText}>{block.compare[1].text}</p>
            </article>
          </div>
        )}

        {block.callout && (
          <div className={styles.callout}>
            <span className={styles.calloutLabel}>
              {block.calloutLabel ?? "Result"}
            </span>
            <p className={styles.calloutText}>{block.callout}</p>
          </div>
        )}

        {block.call && (
          <dl className={styles.call}>
            {block.call.map((c) => (
              <div key={c.label} className={styles.callCell}>
                <dt className={styles.callLabel}>{c.label}</dt>
                <dd className={styles.callText}>{c.text}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {block.lanes && (
        <div className={styles.laneWrap}>
          <Lanes caption={block.captions?.[0]} />
        </div>
      )}
    </div>
  );
}

export default function CaseActs({
  chapters,
  chapterId,
}: {
  chapters: CaseChapter[];
  chapterId: (ch: CaseChapter) => string;
}) {
  return (
    <>
      {chapters.map((ch, i) => (
        <section
          key={ch.title}
          id={chapterId(ch)}
          className={styles.band}
          data-alt={i % 2 === 1 || undefined}
        >
          <div className={styles.in}>
            <div className={styles.act}>
              <span />
              <h2 className={styles.actTitle}>{ch.title}</h2>
            </div>
            {ch.blocks.map((b, j) => (
              <Beat key={j} block={b} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
