import { countryDefaults, isSupportedCountry } from "./withdrawalModel";

const CANADA_ZONES = new Set([
  "America/Toronto",
  "America/Vancouver",
  "America/Edmonton",
  "America/Winnipeg",
  "America/Halifax",
  "America/St_Johns",
  "America/Regina",
  "America/Whitehorse",
  "America/Yellowknife",
  "America/Iqaluit",
  "America/Moncton",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Atikokan",
  "America/Thunder_Bay",
  "America/Pangnirtung",
  "America/Resolute",
  "America/Rankin_Inlet",
  "America/Cambridge_Bay",
  "America/Inuvik",
  "America/Dawson",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Creston",
  "America/Swift_Current",
]);

const MEXICO_ZONES = new Set([
  "America/Mexico_City",
  "America/Cancun",
  "America/Merida",
  "America/Monterrey",
  "America/Matamoros",
  "America/Mazatlan",
  "America/Chihuahua",
  "America/Ojinaga",
  "America/Hermosillo",
  "America/Tijuana",
  "America/Bahia_Banderas",
  "America/Ciudad_Juarez",
]);

const BRAZIL_ZONES = new Set([
  "America/Sao_Paulo",
  "America/Rio_Branco",
  "America/Manaus",
  "America/Fortaleza",
  "America/Recife",
  "America/Bahia",
  "America/Belem",
  "America/Campo_Grande",
  "America/Cuiaba",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Maceio",
  "America/Araguaina",
  "America/Santarem",
  "America/Noronha",
]);

const TZ_COUNTRY: Record<string, string> = {
  "Africa/Johannesburg": "ZA",
  "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE",
  "America/Bogota": "CO",
  "Asia/Bangkok": "TH",
  "Asia/Dubai": "AE",
  "Asia/Ho_Chi_Minh": "VN",
  "Asia/Hong_Kong": "HK",
  "Asia/Jakarta": "ID",
  "Asia/Jerusalem": "IL",
  "Asia/Karachi": "PK",
  "Asia/Kolkata": "IN",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Manila": "PH",
  "Asia/Seoul": "KR",
  "Asia/Singapore": "SG",
  "Asia/Tokyo": "JP",
  "Australia/Adelaide": "AU",
  "Australia/Brisbane": "AU",
  "Australia/Darwin": "AU",
  "Australia/Hobart": "AU",
  "Australia/Melbourne": "AU",
  "Australia/Perth": "AU",
  "Australia/Sydney": "AU",
  "Europe/Amsterdam": "NL",
  "Europe/Berlin": "DE",
  "Europe/Brussels": "BE",
  "Europe/Copenhagen": "DK",
  "Europe/Dublin": "IE",
  "Europe/Guernsey": "GG",
  "Europe/Isle_of_Man": "IM",
  "Europe/Istanbul": "TR",
  "Europe/Jersey": "JE",
  "Europe/Lisbon": "PT",
  "Europe/London": "GB",
  "Europe/Madrid": "ES",
  "Europe/Oslo": "NO",
  "Europe/Paris": "FR",
  "Europe/Prague": "CZ",
  "Europe/Rome": "IT",
  "Europe/Stockholm": "SE",
  "Europe/Vienna": "AT",
  "Europe/Warsaw": "PL",
  "Europe/Zurich": "CH",
  "Pacific/Auckland": "NZ",
};

function supported(code: string | null | undefined): string | null {
  if (!code) return null;
  const upper = code.toUpperCase();
  if (upper === "UK") return "GB";
  return isSupportedCountry(upper) ? upper : null;
}

function countryFromTimeZone(timeZone: string): string | null {
  const mapped = supported(TZ_COUNTRY[timeZone]);
  if (mapped) return mapped;
  if (timeZone.startsWith("America/Argentina/")) return "AR";
  if (timeZone.startsWith("Australia/")) return "AU";
  if (CANADA_ZONES.has(timeZone)) return "CA";
  if (MEXICO_ZONES.has(timeZone)) return "MX";
  if (BRAZIL_ZONES.has(timeZone)) return "BR";
  if (timeZone.startsWith("America/")) return "US";
  return null;
}

function countryFromLocales(tags: readonly string[]): string | null {
  for (const tag of tags) {
    try {
      const locale = new Intl.Locale(tag);
      const maximized = locale.maximize();
      const region = supported(maximized.region ?? locale.region);
      if (region) return region;
    } catch {}
  }
  return null;
}

export function detectLocalCountry(): string {
  if (typeof Intl !== "undefined") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fromZone = timeZone ? countryFromTimeZone(timeZone) : null;
    if (fromZone) return fromZone;
  }

  if (typeof navigator !== "undefined") {
    const tags = [navigator.language, ...(navigator.languages ?? [])];
    const fromLocale = countryFromLocales(tags);
    if (fromLocale) return fromLocale;
  }

  return "GB";
}

export function resolveVisitorCountry(preferred?: string | null): string {
  return supported(preferred) ?? detectLocalCountry();
}

export function visitorCountryDefaults(preferred?: string | null) {
  return countryDefaults(resolveVisitorCountry(preferred));
}
