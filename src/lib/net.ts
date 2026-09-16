import { logError, logWarn } from "./log";

/**
 * fetch that is guaranteed to settle.
 *
 * Every network call on this site has a fallback for "no answer", but without
 * a deadline a hung upstream never reaches that fallback — the server function
 * runs until the platform kills it, and a client spinner never resolves.
 *
 * Returns `null` for any failure (timeout, DNS, connection reset), so callers
 * have one branch to handle instead of three. Non-2xx responses come back as a
 * normal Response — checking `res.ok` stays the caller's job.
 */

const DEFAULT_TIMEOUT_MS = 4000;

type Options = RequestInit & { timeoutMs?: number; event?: string };

export async function fetchWithTimeout(
  url: string,
  {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    event = "fetch_failed",
    ...init
  }: Options = {},
): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Let a caller's own signal (unmount, navigation) abort us too.
  const external = init.signal;
  const forward = () => controller.abort();
  if (external) {
    if (external.aborted) forward();
    else external.addEventListener("abort", forward, { once: true });
  }

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    // A caller-initiated abort is normal teardown, not an incident.
    if (external?.aborted) return null;

    // Keep the caller's event name so a log filter finds all of one call
    // site, and put the distinction in `reason`.
    const timedOut = controller.signal.aborted;
    if (timedOut) logWarn(event, { url, timeoutMs, reason: "timeout" });
    else logError(event, error, { url, reason: "network" });
    return null;
  } finally {
    clearTimeout(timer);
    external?.removeEventListener("abort", forward);
  }
}

/**
 * Parse a JSON body without letting a malformed one become a 500.
 * A provider that answers 200 with HTML (captive portal, error page) is a
 * real failure mode, and it should land on the same fallback as a timeout.
 */
export async function readJson<T>(
  res: Response,
  event = "json_parse_failed",
): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch (error) {
    logError(event, error, { url: res.url });
    return null;
  }
}
