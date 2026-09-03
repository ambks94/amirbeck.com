import styles from "./ContribGraph.module.css";

type Day = { date: string; count: number };

// Public contributions API (no auth). Returns [] on any failure so the section
// simply hides rather than breaking the page.
async function fetchUser(user: string): Promise<Day[]> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.com/v4/${user}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { contributions?: Day[] };
    return data.contributions ?? [];
  } catch {
    return [];
  }
}

const usernames = ["amirbecklumanu", "ambks94"];
const CELL = 12;
const GAP = 3;

export default async function ContribGraph() {
  const all = await Promise.all(usernames.map(fetchUser));

  // merge both accounts by date
  const totals = new Map<string, number>();
  for (const days of all) for (const d of days) totals.set(d.date, (totals.get(d.date) ?? 0) + d.count);
  if (totals.size === 0) return null;

  const days = [...totals.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const max = Math.max(...days.map((d) => d.count), 1);
  const total = days.reduce((s, d) => s + d.count, 0);

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
  const level = (c: number) => {
    if (c <= 0) return 0;
    const r = c / max;
    if (r <= 0.25) return 1;
    if (r <= 0.5) return 2;
    if (r <= 0.75) return 3;
    return 4;
  };

  return (
    <div className={styles.root} aria-label="GitHub contributions">
      <p className={`label ${styles.label}`}>On GitHub</p>
      <p className={styles.caption}>
        {total.toLocaleString()} contributions in the last year across{" "}
        <a href="https://github.com/amirbecklumanu" target="_blank" rel="noopener noreferrer">amirbecklumanu</a>{" "}
        and{" "}
        <a href="https://github.com/ambks94" target="_blank" rel="noopener noreferrer">ambks94</a>.
      </p>
      <div className={styles.scroll}>
        <svg className={styles.graph} viewBox={`0 0 ${w} ${h}`} width={w} height={h} role="img" aria-label={`${total} GitHub contributions in the last year`}>
          {weeks.map((col, x) =>
            col.map((d, y) => {
              if (!d) return null;
              const lv = level(d.count);
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
    </div>
  );
}
