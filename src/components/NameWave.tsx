import type { ElementType } from "react";
import styles from "./NameWave.module.css";

export default function NameWave({
  name,
  category,
  years,
  as: Title = "p",
  id,
}: {
  name: string;
  category?: string;
  years?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <div className={styles.head}>
      <Title id={id} className={styles.name}>
        {name}
      </Title>
      <span className={styles.wave} aria-hidden="true">
        <svg className={styles.waveSvg} width="380" height="30" fill="none">
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
      {category ? (
        <p className={`label ${styles.category}`}>{category}</p>
      ) : null}
      {years ? <p className={`label ${styles.years}`}>{years}</p> : null}
    </div>
  );
}
