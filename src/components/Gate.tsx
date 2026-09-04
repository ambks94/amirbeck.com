"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import DotRow from "./DotRow";
import styles from "./Gate.module.css";

const KEY = "ab_gate";
const PASSWORD = "amirbeck";

export default function Gate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setOpen(localStorage.getItem(KEY) === "1");
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("password");
    if (value === PASSWORD) {
      localStorage.setItem(KEY, "1");
      setOpen(true);
      return;
    }
    setError(true);
  }

  if (open === null) return null;
  if (open) return children;

  return (
    <main className={styles.page}>
      <div className={`wrap ${styles.inner}`}>
        <Image
          className={`${styles.logo} rise`}
          src="/logo.png"
          alt=""
          width={30}
          height={30}
          priority
        />
        <DotRow variant="a" className={`${styles.dotRow} rise`} />
        <h1 className={`${styles.h1} rise`} style={{ animationDelay: "0.08s" }}>
          {site.name}
        </h1>
        <form className={`${styles.form} rise`} style={{ animationDelay: "0.16s" }} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span className="label">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              autoFocus
              required
              spellCheck={false}
              aria-invalid={error || undefined}
              aria-describedby={error ? "gate-error" : undefined}
              onChange={() => setError(false)}
            />
          </label>
          <button type="submit" className="btn">
            Enter
          </button>
          {error ? (
            <p id="gate-error" className={styles.error} role="alert">
              That&apos;s not it.
            </p>
          ) : null}
        </form>
      </div>
      <Image
        className={styles.stipple}
        src="/illustrations/stipple.svg"
        alt=""
        aria-hidden="true"
        width={738}
        height={1962}
        priority
      />
    </main>
  );
}
