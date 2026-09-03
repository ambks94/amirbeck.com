import Image from "next/image";
import styles from "./HowIWork.module.css";
import { practices } from "@/content/site";

export default function HowIWork() {
  return (
    <section className={`section ${styles.band}`} id="how">
      <Image
        className={styles.arc}
        src="/illustrations/arc.svg"
        alt=""
        aria-hidden="true"
        width={1166}
        height={1195}
      />
      <div className={`wrap ${styles.inner}`}>
        <div className="sectionHead">
          <h2>How I work</h2>
          <Image className="dots" src="/illustrations/dot-row.svg" alt="" width={284} height={33} />
        </div>
        <div className={styles.grid}>
          {practices.map((p) => (
            <div key={p.label} className={styles.item}>
              <p className="label">{p.label}</p>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
