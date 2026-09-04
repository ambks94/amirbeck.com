"use client";

import { useEffect, useState } from "react";

const cache = new Map<string, number>();

export function useFxRate(from: string, to: string | null): number | null {
  // A conversion is only needed for two different currencies.
  const pair = to && from !== to ? `${from}:${to}` : null;

  // Derive the synchronous answer during render: no rate needed, 1:1, or a
  // value we've already fetched. Only an uncached cross-currency pair is null.
  const derived: number | null =
    to === null ? null : from === to ? 1 : pair ? (cache.get(pair) ?? null) : null;

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
  // Only honor a fetched rate that matches the current pair, so switching
  // currencies never briefly shows the previous rate.
  if (fetched && fetched.pair === pair) return fetched.rate;
  return null;
}
