"use client";

import { useEffect, useState } from "react";
import { fetchWithTimeout, readJson } from "@/lib/net";

const cache = new Map<string, number>();

// Must outlast the route's own two upstream attempts, or the client gives up
// on a request that was about to succeed.
const RATE_TIMEOUT_MS = 9000;

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
    const abort = new AbortController();

    (async () => {
      const res = await fetchWithTimeout(
        `/api/fx?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
        {
          signal: abort.signal,
          timeoutMs: RATE_TIMEOUT_MS,
          event: "fx_rate_request_failed",
        },
      );
      if (cancelled || !res || !res.ok) return;

      const data = await readJson<{ rate?: number }>(res, "fx_rate_bad_body");
      if (cancelled || typeof data?.rate !== "number") return;

      cache.set(pair, data.rate);
      setFetched({ pair, rate: data.rate });
    })();

    return () => {
      cancelled = true;
      abort.abort();
    };
  }, [pair, from, to]);

  if (derived !== null) return derived;
  // Ignore a stale rate if the pair changed while the fetch was in flight.
  if (fetched && fetched.pair === pair) return fetched.rate;
  return null;
}
