import styles from "./Stats.module.css";
import { stats } from "@/content/site";

export default function Stats() {
  return (
    <section className={styles.band} aria-label="Results">
      <div className="wrap">
        <div className={styles.grid}>
          {stats.map((s) => (
            <div key={s.source} className={styles.stat}>
              <span className={styles.figure}>{s.figure}</span>
              <span className={styles.text}>{s.text}</span>
              <span className={`label ${styles.source}`}>{s.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
