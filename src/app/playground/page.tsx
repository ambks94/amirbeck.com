import type { Metadata } from "next";
import PermissionsPlayground from "@/playground/PermissionsPlayground";
import DirectoryNav from "@/components/DirectoryNav";
import { playgroundGroups, type PlaygroundItem } from "@/content/playground";
import caseStyles from "@/components/CaseStudy.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Playground",
  description: "Live UI grouped by company work and personal work.",
  alternates: { canonical: "/playground" },
};

function Stage({ item }: { item: PlaygroundItem }) {
  switch (item.slug) {
    case "permissions":
      return <PermissionsPlayground />;
    default:
      return null;
  }
}

function Experiment({ item }: { item: PlaygroundItem }) {
  const kicker = item.kind === "company" ? item.company : "Personal";

  return (
    <div id={item.slug} className={styles.experiment}>
      <p className={`label ${styles.kicker}`}>{kicker}</p>
      <h3 className={styles.experimentTitle}>{item.title}</h3>

      <div className={styles.brief}>
        <div className={caseStyles.flowGroup}>
          <span className={caseStyles.flow} aria-hidden="true">
            <span className={caseStyles.flowRail}>
              <span className={caseStyles.flowShine} />
            </span>
          </span>
          <p className={caseStyles.meta}>
            <span className={caseStyles.metaLabel}>Problem</span>
            {item.problem}
          </p>
          <p className={`${caseStyles.meta} ${caseStyles.result}`}>
            <span className={caseStyles.metaLabel}>Solution</span>
            {item.solution}
          </p>
        </div>
      </div>

      <div className={styles.stage}>
        <Stage item={item} />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  const groups = playgroundGroups();

  return (
    <article>
      <h1 className={`rise ${styles.title}`}>Playground</h1>
      <p className={styles.intro}>
        Live UI grouped by company work and personal work.
      </p>

      <div className={styles.directory}>
        {groups.map((group) => (
          <DirectoryNav
            key={group.id}
            label={group.label}
            items={group.items.map((item) => ({
              href: `#${item.slug}`,
              name: item.title,
              summary: item.blurb,
            }))}
          />
        ))}
      </div>

      <div className={styles.groups}>
        {groups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className={styles.group}
            aria-labelledby={`playground-${group.id}`}
          >
            <h2
              id={`playground-${group.id}`}
              className={`label ${styles.groupLabel}`}
            >
              {group.label}
            </h2>
            {group.items.map((item) => (
              <Experiment key={item.slug} item={item} />
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
