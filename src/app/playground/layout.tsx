import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Contact from "@/components/Contact";
import { site } from "@/content/site";
import styles from "./layout.module.css";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className={styles.nav}>
        <div className={`wrap ${styles.navInner}`}>
          <Link className={styles.mark} href="/" aria-label={site.name}>
            <Image
              src="/logo.png"
              alt={site.name}
              width={30}
              height={30}
              priority
            />
          </Link>
          <Link className={styles.back} href="/">
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> Home
          </Link>
          <a className="btn" href={`mailto:${site.email}`}>
            Contact Me
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={`wrap ${styles.article}`}>{children}</div>
      </main>
      <Contact />
    </>
  );
}
