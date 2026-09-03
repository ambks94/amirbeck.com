import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./Contact.module.css";
import { site } from "@/content/site";

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <Image
        className={styles.curves}
        src="/illustrations/curves.svg"
        alt=""
        aria-hidden="true"
        width={880}
        height={909}
      />
      <div className="wrap">
        <h2 className={styles.h2}>Contact Me</h2>
        <div className={styles.actions}>
          <a className="btn" href={`mailto:${site.email}`}>{site.email}</a>
          <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" /></a>
          <a className="btn btn--ghost" href={site.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" /></a>
          <a className="btn btn--ghost" href="/resume.pdf">Résumé (PDF)</a>
        </div>
      </div>
    </section>
  );
}
