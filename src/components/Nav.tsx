"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
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
  const reduce = useReducedMotion();

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

  // Interruptible list: springs carry velocity when the menu is toggled fast.
  const list: Variants = {
    show: { transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.04 } },
    exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  };
  const line: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5, bounce: 0 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.15, ease: [0.19, 1, 0.22, 1] } },
      };

  return (
    <>
      <header className={styles.nav}>
        <ScrollProgress />
        <div className={`wrap ${styles.inner}`}>
          <a className={styles.mark} href="#top" aria-label={site.name} onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt={site.name} width={30} height={30} priority />
          </a>

          {/* Inline nav — tablet and up. */}
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

          {/* Menu trigger — mobile only. */}
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

      {/* Full-screen overlay menu, a sibling of the header so `position: fixed`
          resolves to the viewport rather than the backdrop-filtered header. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-menu"
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.nav
              className={styles.overlayLinks}
              variants={list}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {items.map((it) => (
                <motion.a key={it.href} href={it.href} variants={line} onClick={() => setOpen(false)}>
                  {it.label}
                </motion.a>
              ))}
            </motion.nav>
            <motion.a
              className={styles.overlayContact}
              href={`mailto:${site.email}`}
              variants={line}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={reduce ? undefined : { delay: 0.22, type: "spring", duration: 0.5, bounce: 0 }}
              onClick={() => setOpen(false)}
            >
              Contact Me
            </motion.a>
            <button type="button" className={styles.close} aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={22} strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
