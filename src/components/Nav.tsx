"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Nav.module.css";
import ScrollProgress from "./ScrollProgress";
import { site } from "@/content/site";

const items = [
  { href: "#work", label: "Work" },
  { href: "#how", label: "How I work" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Lock scroll and close on Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
    <header className={styles.nav}>
      <ScrollProgress />
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.mark} href="#top" aria-label={site.name} onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt={site.name} width={30} height={30} priority />
        </a>

        {/* Inline nav — desktop. */}
        <nav className={styles.links}>
          {items.map((it) => (
            <a key={it.href} href={it.href}>
              {it.label}
            </a>
          ))}
        </nav>
        <a className={`btn ${styles.contact}`} href={`mailto:${site.email}`}>
          Contact Me
        </a>

        {/* Menu trigger — tablet and below. */}
        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} strokeWidth={2} />
        </button>
      </div>
    </header>

    {/* Full-screen overlay menu — sibling of the header so `position: fixed`
        resolves to the viewport, not the backdrop-filtered header. */}
    <div id="nav-menu" className={styles.overlay} data-open={open} aria-hidden={!open}>
        <nav className={styles.overlayLinks}>
          {items.map((it, i) => (
            <a
              key={it.href}
              href={it.href}
              style={{ "--i": i } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <a
          className={styles.overlayContact}
          href={`mailto:${site.email}`}
          style={{ "--i": items.length } as CSSProperties}
          onClick={() => setOpen(false)}
        >
          Contact Me
        </a>
        <button type="button" className={styles.close} aria-label="Close menu" onClick={() => setOpen(false)}>
          <X size={22} strokeWidth={2} />
        </button>
      </div>
    </>
  );
}
