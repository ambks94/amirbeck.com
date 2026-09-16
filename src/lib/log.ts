/**
 * One place for things that went wrong.
 *
 * On the server this writes a single-line JSON record to stderr, which Vercel
 * captures in runtime logs and a log drain can parse. On the client it goes to
 * the console, which nobody but the visitor sees — wiring a browser reporter
 * (Sentry, or a beacon to an ingest route) is the seam marked below.
 *
 * The point is that no failure is silent. `catch {}` hides outages.
 */

type Fields = Record<string, unknown>;

function describe(error: unknown): Fields {
  if (error instanceof Error) {
    return {
      error: error.name,
      message: error.message,
      // AbortError from our own timeout is the common case; keep it readable.
      cause: error.cause instanceof Error ? error.cause.message : undefined,
    };
  }
  return { error: "unknown", message: String(error) };
}

export function logError(event: string, error: unknown, fields: Fields = {}) {
  const record = {
    level: "error",
    event,
    at: new Date().toISOString(),
    ...describe(error),
    ...fields,
  };

  if (typeof window === "undefined") {
    console.error(JSON.stringify(record));
    return;
  }

  // Client seam: add a browser reporter here to see these off-machine.
  console.error(`[${event}]`, record);
}

export function logWarn(event: string, fields: Fields = {}) {
  const record = {
    level: "warn",
    event,
    at: new Date().toISOString(),
    ...fields,
  };
  if (typeof window === "undefined") {
    console.warn(JSON.stringify(record));
    return;
  }
  console.warn(`[${event}]`, record);
}
