import Image from "next/image";
import DotRow from "./DotRow";
import ContribGraph from "./ContribGraph";
import styles from "./About.module.css";
import { about, kit } from "@/content/site";

export default function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
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
          <h2>About</h2>
          <DotRow variant="d" className="dots" />
        </div>
        <div className={styles.grid}>
          <div>
            {about.map((p) => (
              <p key={p.slice(0, 24)} className={styles.copy}>
                {p}
              </p>
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
        <ContribGraph />
      </div>
    </section>
  );
}
