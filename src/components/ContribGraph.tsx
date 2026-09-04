import { ArrowUpRight } from "lucide-react";
import styles from "./ContribGraph.module.css";

type Day = { date: string; level: number };

async function fetchUser(
  user: string,
): Promise<{ days: Day[]; total: number }> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      next: { revalidate: 86400 },
      headers: {
        "User-Agent": "amirbeck.com",
        "x-requested-with": "XMLHttpRequest",
      },
    });
    if (!res.ok) return { days: [], total: 0 };
    const html = await res.text();

    const days: Day[] = [];
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

  const levels = new Map<string, number>();
  let total = 0;
  for (const r of results) {
    total += r.total;
    for (const d of r.days)
      levels.set(d.date, Math.max(levels.get(d.date) ?? 0, d.level));
  }
  if (levels.size === 0) return null;

  const days = [...levels.entries()]
    .map(([date, level]) => ({ date, level }))
    .sort((a, b) => a.date.localeCompare(b.date));

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
          {total.toLocaleString()} contributions in the last year.
        </p>
      )}
      <div className={styles.scroll}>
        <svg
          className={styles.graph}
          viewBox={`0 0 ${w} ${h}`}
          width={w}
          height={h}
          style={{ aspectRatio: `${w} / ${h}` }}
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
        >
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
                  className={lv > 0 ? cls[`l${lv}`] : cls.l0}
                  style={
                    lv === 4
                      ? { animationDelay: `${((x * 13 + y * 7) % 24) / 3}s` }
                      : undefined
                  }
                />
              );
            }),
          )}
        </svg>
      </div>
      <div className={styles.links}>
        {[
          { label: "Work", user: "amirbecklumanu" },
          { label: "Personal", user: "ambks94" },
        ].map(({ label, user }) => (
          <a
            key={user}
            className={styles.link}
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>{label}</span>
            <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
