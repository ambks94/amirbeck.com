"use client";

import { useEffect, useState } from "react";

const cache = new Map<string, number>();

export function useFxRate(from: string, to: string | null): number | null {
  const key = to ? `${from}:${to}` : null;
  const [rate, setRate] = useState<number | null>(() =>
    key ? (cache.get(key) ?? null) : null,
  );

  useEffect(() => {
    if (!to) {
      setRate(null);
      return;
    }

    if (from === to) {
      setRate(1);
      return;
    }

    const pair = `${from}:${to}`;
    const cached = cache.get(pair);
    if (cached != null) {
      setRate(cached);
      return;
    }

    let cancelled = false;
    setRate(null);

    fetch(
      `/api/fx?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { rate?: number } | null) => {
        if (cancelled || typeof data?.rate !== "number") return;
        cache.set(pair, data.rate);
        setRate(data.rate);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [from, to]);

  return rate;
}
