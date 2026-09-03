import { Github, ArrowUpRight } from "lucide-react";
import styles from "./ContribGraph.module.css";

type Day = { date: string; level: number };

// GitHub's own public contributions calendar (HTML). No auth. Returns empty on
// any failure so the section simply hides rather than breaking the page.
async function fetchUser(user: string): Promise<{ days: Day[]; total: number }> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 86400 },
      headers: { "User-Agent": "amirbeck.com", "x-requested-with": "XMLHttpRequest" },
    });
    if (!res.ok) return { days: [], total: 0 };
    const html = await res.text();

    const days: Day[] = [];
    // day cells carry data-date and data-level (in either attribute order)
    const re =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"|data-level="(\d)"[^>]*?data-date="(\d{4}-\d{2}-\d{2})"/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) {
      if (m[1]) days.push({ date: m[1], level: Number(m[2]) });
      else days.push({ date: m[4]!, level: Number(m[3]) });
    }
    const t = html.match(/([\d,]+)\s+contribution/);
    const total = t ? Number(t[1].replace(/,/g, "")) : 0;
    return { days, total };
  } catch {
    return { days: [], total: 0 };
  }
}

const usernames = ["amirbecklumanu", "ambks94"];
const CELL = 12;
const GAP = 3;

export default async function ContribGraph() {
  const results = await Promise.all(usernames.map(fetchUser));

  // merge both accounts: highest level per date, sum the headline totals
  const levels = new Map<string, number>();
  let total = 0;
  for (const r of results) {
    total += r.total;
    for (const d of r.days) levels.set(d.date, Math.max(levels.get(d.date) ?? 0, d.level));
  }
  if (levels.size === 0) return null;

  const days = [...levels.entries()]
    .map(([date, level]) => ({ date, level }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // columns = weeks, rows = weekday (0 Sun .. 6 Sat)
  const weeks: (Day | null)[][] = [];
  let week: (Day | null)[] = [];
  days.forEach((d, i) => {
    const wd = new Date(`${d.date}T00:00:00Z`).getUTCDay();
    if (i === 0 && wd !== 0) week = Array(wd).fill(null);
    week[wd] = d;
    if (wd === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  const w = weeks.length * (CELL + GAP) - GAP;
  const h = 7 * (CELL + GAP) - GAP;
  const cls = styles as Record<string, string>;

  return (
    <div className={styles.root} aria-label="GitHub contributions">
      <p className={`label ${styles.label}`}>On GitHub</p>
      {total > 0 && (
        <p className={styles.caption}>
          {total.toLocaleString()} contributions in the last year across{" "}
          <a href="https://github.com/amirbecklumanu" target="_blank" rel="noopener noreferrer">amirbecklumanu</a>{" "}
          and{" "}
          <a href="https://github.com/ambks94" target="_blank" rel="noopener noreferrer">ambks94</a>.
        </p>
      )}
      <div className={styles.scroll}>
        <svg className={styles.graph} viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={`${total} GitHub contributions in the last year`}>
          {weeks.map((col, x) =>
            col.map((d, y) => {
              if (!d) return null;
              const lv = d.level;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x * (CELL + GAP)}
                  y={y * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={2.5}
                  className={lv > 0 ? `${cls[`l${lv}`]} ${styles.cell}` : cls.l0}
                  style={lv > 0 ? { animationDelay: `${((x * 13 + y * 7) % 24) / 6}s` } : undefined}
                />
              );
            })
          )}
        </svg>
      </div>
      <a
        className={styles.link}
        href="https://github.com/amirbecklumanu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={14} strokeWidth={2} aria-hidden="true" />
        <span>View on GitHub</span>
        <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}
