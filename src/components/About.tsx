import Image from "next/image";
import styles from "./About.module.css";
import { about, kit } from "@/content/site";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sectionHead">
          <h2>About</h2>
          <Image className="dots" src="/illustrations/dot-row.svg" alt="" width={284} height={33} />
        </div>
        <div className={styles.grid}>
          <div>
            {about.map((p) => (
              <p key={p.slice(0, 24)} className={styles.copy}>{p}</p>
            ))}
          </div>
          <div className={styles.kit}>
            {kit.map((k) => (
              <div key={k.label} className={styles.row}>
                <p className="label">{k.label}</p>
                <p>{k.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
