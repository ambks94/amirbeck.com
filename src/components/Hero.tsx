import Image from "next/image";
import styles from "./Hero.module.css";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <Image
          className={`${styles.dotRow} rise`}
          src="/illustrations/dot-row.svg"
          alt=""
          width={284}
          height={33}
          priority
        />
        <p className="label rise" style={{ animationDelay: "0.02s" }}>
          {site.location}
        </p>
        <h1 className={`${styles.h1} rise`} style={{ animationDelay: "0.09s" }}>
          {site.name}
        </h1>
        <p className={`${styles.role} rise`} style={{ animationDelay: "0.16s" }}>
          {site.role}
        </p>
        <p className={`${styles.lead} rise`} style={{ animationDelay: "0.23s" }}>
          {site.lead}
        </p>
        <p className={`${styles.sub} rise`} style={{ animationDelay: "0.3s" }}>
          {site.sub}
        </p>

        <div className={`${styles.actions} rise`} style={{ animationDelay: "0.37s" }}>
          <a className="btn" href="#work">See Work</a>
          <a className="btn btn--ghost" href="#how">How I work</a>
        </div>

        <div className={styles.jump}>
          <a href="#work">Work ↓</a>
          <a href="#how">How I work ↓</a>
          <a href="#about">About ↓</a>
          <a href="#contact">Contact ↓</a>
        </div>
      </div>

      {/* Offset to the side of the page, bleeding past the gutter — capped at every
          breakpoint so it can never push content or scroll the page sideways. */}
      <Image
        className={styles.contour}
        src="/illustrations/contour.svg"
        alt=""
        aria-hidden="true"
        width={265}
        height={419}
        priority
      />
    </section>
  );
}
