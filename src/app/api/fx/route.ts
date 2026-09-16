import { NextResponse } from "next/server";
import { FX_CODES } from "@/playground/withdrawalModel";
import { fetchWithTimeout, readJson } from "@/lib/net";
import { logWarn } from "@/lib/log";

// Two upstreams run back to back, so each deadline has to fit inside the
// platform's function budget with room for the second attempt.
const UPSTREAM_TIMEOUT_MS = 3500;

type RateTable = {
  result?: string;
  rates?: Record<string, number>;
};

function isFxCode(value: string): boolean {
  return /^[A-Z]{3}$/.test(value) && FX_CODES.has(value);
}

async function rateFromOpenEr(
  from: string,
  to: string,
): Promise<number | null> {
  const res = await fetchWithTimeout(
    `https://open.er-api.com/v6/latest/${from}`,
    {
      next: { revalidate: 900 },
      headers: { Accept: "application/json" },
      timeoutMs: UPSTREAM_TIMEOUT_MS,
      event: "fx_open_er_failed",
    },
  );
  if (!res) return null;
  if (!res.ok) {
    logWarn("fx_open_er_status", { status: res.status, from, to });
    return null;
  }
  const data = await readJson<RateTable>(res, "fx_open_er_bad_body");
  if (!data) return null;
  if (data.result && data.result !== "success") return null;
  const rate = data.rates?.[to];
  return typeof rate === "number" && rate > 0 ? rate : null;
}

async function rateFromCurrencyApi(
  from: string,
  to: string,
): Promise<number | null> {
  const base = from.toLowerCase();
  const quote = to.toLowerCase();
  const res = await fetchWithTimeout(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.min.json`,
    {
      next: { revalidate: 900 },
      headers: { Accept: "application/json" },
      timeoutMs: UPSTREAM_TIMEOUT_MS,
      event: "fx_currency_api_failed",
    },
  );
  if (!res) return null;
  if (!res.ok) {
    logWarn("fx_currency_api_status", { status: res.status, from, to });
    return null;
  }
  const data = await readJson<Record<string, unknown>>(
    res,
    "fx_currency_api_bad_body",
  );
  if (!data) return null;
  const table = data[base];
  if (!table || typeof table !== "object") return null;
  const rate = (table as Record<string, unknown>)[quote];
  return typeof rate === "number" && rate > 0 ? rate : null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const from = (url.searchParams.get("from") ?? "").toUpperCase();
  const to = (url.searchParams.get("to") ?? "").toUpperCase();

  if (!isFxCode(from) || !isFxCode(to)) {
    return NextResponse.json({ error: "bad pair" }, { status: 400 });
  }

  if (from === to) {
    return NextResponse.json({ from, to, rate: 1 });
  }

  const rate =
    (await rateFromOpenEr(from, to)) ?? (await rateFromCurrencyApi(from, to));

  if (rate == null) {
    // Both providers are down or slow. Worth knowing about, not worth a 500.
    logWarn("fx_all_providers_failed", { from, to });
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }

  return NextResponse.json(
    { from, to, rate },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    },
  );
}
