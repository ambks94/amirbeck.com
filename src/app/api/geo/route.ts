import { NextResponse } from "next/server";

function headerCountry(request: Request): string | null {
  const raw = (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    ""
  ).toUpperCase();

  if (!/^[A-Z]{2}$/.test(raw) || raw === "XX") return null;
  return raw;
}

export async function GET(request: Request) {
  return NextResponse.json(
    { country: headerCountry(request) },
    {
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}
