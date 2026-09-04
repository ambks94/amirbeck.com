import styles from "./Footer.module.css";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <p className={styles.credit}>
          <span className="label">© {new Date().getFullYear()} {site.name}</span>
          {site.colophon}
        </p>
      </div>
    </footer>
  );
}
