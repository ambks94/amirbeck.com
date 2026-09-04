import { ArrowDown } from "lucide-react";
import styles from "./DirectoryNav.module.css";

export type DirectoryItem = {
  href: string;
  name: string;
  summary?: string;
};

export default function DirectoryNav({
  label,
  ariaLabel,
  items,
  className,
}: {
  label?: string;
  ariaLabel?: string;
  items: DirectoryItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav
      className={[styles.root, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel ?? label}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className={styles.item}>
              <span className={styles.name}>{item.name}</span>
              {item.summary ? (
                <span className={styles.summary}>{item.summary}</span>
              ) : null}
              <ArrowDown
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className={styles.arrow}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
