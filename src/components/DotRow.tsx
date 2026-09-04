import styles from "./DotRow.module.css";

// The four brand glyphs (target, crescent, eclipse, target) as inline SVG so
// individual dots can animate. `variant` gives each placement a unique hover.
export default function DotRow({
  variant = "a",
  className = "",
}: {
  variant?: "a" | "b" | "c" | "d";
  className?: string;
}) {
  const maskId = `dr-crescent-${variant}`;
  return (
    <svg
      className={`${styles.root} ${styles[`v${variant}`]} ${className}`}
      viewBox="0 0 284 33"
      width={284}
      height={33}
      fill="none"
      aria-hidden="true"
    >
      {/* glyph 1 — target */}
      <g className={styles.g1}>
        <circle
          className={styles.ring}
          cx="12"
          cy="16"
          r="11.625"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
        <circle className={styles.dot} cx="7" cy="16" r="3" fill="var(--ink)" />
      </g>

      {/* glyph 2 — crescent */}
      <mask
        id={maskId}
        width="24"
        height="24"
        x="84"
        y="4"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <circle
          cx="96"
          cy="16"
          r="11.625"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
      </mask>
      <g className={styles.g2} mask={`url(#${maskId})`}>
        <circle
          className={styles.crescent}
          cx="104"
          cy="25"
          r="11.625"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
      </g>

      {/* glyph 3 — eclipse */}
      <g className={styles.g3}>
        <circle
          className={styles.eclipseBack}
          cx="180"
          cy="12"
          r="11.625"
          fill="var(--ink)"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
        <circle
          className={styles.eclipseFront}
          cx="188"
          cy="21"
          r="11.625"
          fill="var(--paper)"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
      </g>

      {/* glyph 4 — target */}
      <g className={styles.g4}>
        <circle
          className={styles.ring}
          cx="272"
          cy="16"
          r="11.625"
          stroke="var(--ink)"
          strokeWidth=".75"
        />
        <circle
          className={styles.dot}
          cx="272"
          cy="13"
          r="3"
          fill="var(--ink)"
        />
      </g>
    </svg>
  );
}
