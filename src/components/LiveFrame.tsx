import type { ReactNode } from "react";
import styles from "./BrowserFrame.module.css";

export default function LiveFrame({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <figure className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{url}</span>
      </div>
      <div className={styles.live}>{children}</div>
    </figure>
  );
}
