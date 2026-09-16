import type { ReactNode } from "react";
import styles from "./Notice.module.css";

type Props = {
  /** Mono eyebrow, e.g. "404" or "Error". */
  code: string;
  title: string;
  body: ReactNode;
  /** Buttons or links; the caller owns them because `reset` is client-only. */
  children?: ReactNode;
  /** A short reference a visitor can quote back. Never a stack trace. */
  detail?: string;
};

/**
 * The page a visitor lands on when something is missing or broken. Shared by
 * not-found, error, and global-error so all three read as the same site.
 */
export default function Notice({ code, title, body, children, detail }: Props) {
  return (
    <main className={styles.shell}>
      <div className="wrap">
        <div className={styles.inner}>
          <p className={`label ${styles.code}`}>{code}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.body}>{body}</p>
          {children && <div className={styles.actions}>{children}</div>}
          {detail && <p className={styles.detail}>Reference: {detail}</p>}
        </div>
      </div>
    </main>
  );
}
