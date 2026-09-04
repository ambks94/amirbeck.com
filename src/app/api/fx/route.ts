import { NextResponse } from "next/server";
import { FX_CODES } from "@/playground/withdrawalModel";

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
  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
    next: { revalidate: 900 },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as RateTable;
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
  const res = await fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.min.json`,
    {
      next: { revalidate: 900 },
      headers: { Accept: "application/json" },
    },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as Record<string, unknown>;
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
