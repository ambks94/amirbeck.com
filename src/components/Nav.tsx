import Image from "next/image";
import styles from "./Nav.module.css";
import ScrollProgress from "./ScrollProgress";
import { site } from "@/content/site";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <ScrollProgress />
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.mark} href="#top">
          <Image src="/logo.png" alt="" width={30} height={30} priority />
          <b>{site.name}</b>
        </a>
        <nav className={styles.links}>
          <a href="#work">Work</a>
          <a href="#how" className={styles.optional}>How I work</a>
          <a href="#about">About</a>
        </nav>
        <a className="btn" href={`mailto:${site.email}`}>Contact Me</a>
      </div>
    </header>
  );
}
