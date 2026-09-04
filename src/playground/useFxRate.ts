"use client";

import { useEffect, useState } from "react";

const cache = new Map<string, number>();

export function useFxRate(from: string, to: string | null): number | null {
  const pair = to && from !== to ? `${from}:${to}` : null;

  const derived: number | null =
    to === null
      ? null
      : from === to
        ? 1
        : pair
          ? (cache.get(pair) ?? null)
          : null;

  const [fetched, setFetched] = useState<{ pair: string; rate: number } | null>(
    null,
  );

  useEffect(() => {
    if (!pair || to === null || cache.has(pair)) return;

    let cancelled = false;
    fetch(
      `/api/fx?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { rate?: number } | null) => {
        if (cancelled || typeof data?.rate !== "number") return;
        cache.set(pair, data.rate);
        setFetched({ pair, rate: data.rate });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [pair, from, to]);

  if (derived !== null) return derived;
  // Ignore a stale rate if the pair changed while the fetch was in flight.
  if (fetched && fetched.pair === pair) return fetched.rate;
  return null;
}
