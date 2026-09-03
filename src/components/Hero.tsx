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
        <p className="label rise" style={{ animationDelay: "0.05s" }}>
          {site.location}
        </p>
        <h1 className={`${styles.h1} rise`} style={{ animationDelay: "0.12s" }}>
          {site.name}
        </h1>
        <p className={`${styles.role} rise`} style={{ animationDelay: "0.19s" }}>
          {site.role}
        </p>
        <p className={`${styles.lead} rise`} style={{ animationDelay: "0.27s" }}>
          {site.lead}
        </p>

        <div className={`${styles.actions} rise`} style={{ animationDelay: "0.36s" }}>
          <a className="btn" href="#work">See Work</a>
          <a className="btn btn--ghost" href="#how">How I work</a>
        </div>

        <div className={`${styles.jump} rise`} style={{ animationDelay: "0.48s" }}>
          <a href="#work">Work ↓</a>
          <a href="#how">How I work ↓</a>
          <a href="#about">About ↓</a>
          <a href="#contact">Contact ↓</a>
        </div>
      </div>

      {/* Gradient lines spanning the full hero height on the right, bleeding off the
          page edge. Capped so it can never push content or scroll the page sideways. */}
      <Image
        className={styles.stipple}
        src="/illustrations/stipple.svg"
        alt=""
        aria-hidden="true"
        width={738}
        height={1962}
        priority
      />
    </section>
  );
}
