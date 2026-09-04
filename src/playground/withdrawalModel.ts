export type Currency = {
  code: string;
  name: string;
  iso2: string;
  exactMatch?: boolean;
};

export type Country = { value: string; label: string };

export type MethodId =
  "debit" | "bankUs" | "bankLocal" | "bankIntl" | "bankSwift" | "paypal";

export type ConnectKind = "bank" | "debit" | "paypal";

export type Method = {
  type: MethodId;
  connect: ConnectKind;
  glyph: "credit-card" | "landmark" | "paypal";
  title: string;
  description: string;
  timeLabel: string;
  recommended?: boolean;
};

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: "USD", name: "United States Dollar", iso2: "us" },
  CAD: { code: "CAD", name: "Canadian Dollar", iso2: "ca" },
  SGD: { code: "SGD", name: "Singapore Dollar", iso2: "sg" },
  EUR: { code: "EUR", name: "Euro", iso2: "eu" },
  JPY: { code: "JPY", name: "Japanese Yen", iso2: "jp" },
  GBP: { code: "GBP", name: "British Pound", iso2: "gb" },
  AUD: { code: "AUD", name: "Australian Dollar", iso2: "au" },
  HKD: { code: "HKD", name: "Hong Kong Dollar", iso2: "hk" },
  MXN: { code: "MXN", name: "Mexican Peso", iso2: "mx" },
  AED: { code: "AED", name: "United Arab Emirates Dirham", iso2: "ae" },
  ZAR: { code: "ZAR", name: "South African Rand", iso2: "za" },
  IDR: { code: "IDR", name: "Indonesian rupiah", iso2: "id" },
  INR: { code: "INR", name: "Indian rupee", iso2: "in" },
  NGN: { code: "NGN", name: "Nigerian Naira", iso2: "ng" },
  PHP: { code: "PHP", name: "Philippine peso", iso2: "ph" },
  PKR: { code: "PKR", name: "Pakistani Rupee", iso2: "pk" },
  KRW: { code: "KRW", name: "korean won", iso2: "kr" },
  BRL: { code: "BRL", name: "Brazilian Real", iso2: "br" },
  CHF: { code: "CHF", name: "Swiss Franc", iso2: "ch" },
  NZD: { code: "NZD", name: "New Zealand Dollar", iso2: "nz" },
  THB: { code: "THB", name: "Thai Baht", iso2: "th" },
  VND: { code: "VND", name: "Vietnamese Dong", iso2: "vn" },
  COP: { code: "COP", name: "Colombian Peso", iso2: "co" },
  ARS: { code: "ARS", name: "Argentine Peso", iso2: "ar" },
};

export const SUPPORTED = new Set([
  "AED",
  "AUD",
  "BHD",
  "CAD",
  "CHF",
  "CNH",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "JPY",
  "KES",
  "KWD",
  "MYR",
  "NOK",
  "NZD",
  "OMR",
  "PHP",
  "PLN",
  "QAR",
  "RON",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "UGX",
  "USD",
  "ZAR",
  "KRW",
  "BRL",
  "INR",
  "MXN",
  "PKR",
  "NGN",
]);

export const ALL_CURRENCY_CODES = [
  "AED",
  "ARS",
  "AUD",
  "BRL",
  "CAD",
  "CHF",
  "COP",
  "EUR",
  "GBP",
  "HKD",
  "IDR",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "NGN",
  "NZD",
  "PHP",
  "PKR",
  "SGD",
  "THB",
  "USD",
  "VND",
  "ZAR",
];

const EU = new Set([
  "AT",
  "BE",
  "BG",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "HU",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
]);

const UK = new Set(["GB", "IM", "JE", "GG"]);

export const COUNTRIES: Country[] = [
  { value: "AE", label: "United Arab Emirates" },
  { value: "AR", label: "Argentina" },
  { value: "AT", label: "Austria" },
  { value: "AU", label: "Australia" },
  { value: "BE", label: "Belgium" },
  { value: "BR", label: "Brazil" },
  { value: "CA", label: "Canada" },
  { value: "CH", label: "Switzerland" },
  { value: "CO", label: "Colombia" },
  { value: "CZ", label: "Czechia" },
  { value: "DE", label: "Germany" },
  { value: "DK", label: "Denmark" },
  { value: "ES", label: "Spain" },
  { value: "FR", label: "France" },
  { value: "GB", label: "United Kingdom" },
  { value: "GG", label: "Guernsey" },
  { value: "HK", label: "Hong Kong" },
  { value: "ID", label: "Indonesia" },
  { value: "IE", label: "Ireland" },
  { value: "IL", label: "Israel" },
  { value: "IM", label: "Isle of Man" },
  { value: "IN", label: "India" },
  { value: "IT", label: "Italy" },
  { value: "JE", label: "Jersey" },
  { value: "JP", label: "Japan" },
  { value: "KE", label: "Kenya" },
  { value: "KR", label: "South Korea" },
  { value: "MX", label: "Mexico" },
  { value: "MY", label: "Malaysia" },
  { value: "NG", label: "Nigeria" },
  { value: "NL", label: "Netherlands" },
  { value: "NO", label: "Norway" },
  { value: "NZ", label: "New Zealand" },
  { value: "PH", label: "Philippines" },
  { value: "PK", label: "Pakistan" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "SE", label: "Sweden" },
  { value: "SG", label: "Singapore" },
  { value: "TH", label: "Thailand" },
  { value: "TR", label: "Turkey" },
  { value: "US", label: "United States" },
  { value: "VN", label: "Vietnam" },
  { value: "XK", label: "Kosovo" },
  { value: "ZA", label: "South Africa" },
].sort((a, b) => a.label.localeCompare(b.label));

function exact(currency: Currency): Currency {
  return { ...currency, exactMatch: true };
}

const C = CURRENCIES;

export function currencyOptions(countryCode: string): Currency[] {
  if (!countryCode) return [];
  if (EU.has(countryCode)) return [C.EUR, C.GBP, C.USD];
  if (UK.has(countryCode)) return [exact(C.GBP), C.EUR, C.USD];

  const map: Record<string, Currency[]> = {
    CA: [exact(C.CAD), C.USD, C.EUR],
    SG: [exact(C.SGD), C.JPY, C.USD, C.EUR],
    JP: [exact(C.JPY), C.SGD, C.USD, C.EUR],
    AU: [exact(C.AUD), C.USD, C.EUR],
    HK: [exact(C.HKD), C.USD, C.EUR],
    AE: [exact(C.AED), C.EUR, C.USD],
    US: [exact(C.USD), C.EUR],
    MX: [exact(C.MXN), C.USD, C.EUR],
    IN: [exact(C.INR), C.USD, C.EUR],
    BR: [exact(C.BRL), C.USD, C.EUR],
    KR: [exact(C.KRW), C.USD, C.EUR],
    PK: [exact(C.PKR), C.USD, C.EUR],
    NG: [exact(C.NGN), C.USD, C.EUR],
    PH: [exact(C.PHP), C.USD, C.EUR],
    ID: [exact(C.IDR), C.USD, C.EUR],
    XK: [exact(C.EUR), C.USD],
    ZA: [exact(C.ZAR), C.USD],
  };

  return map[countryCode] ?? [C.USD, C.EUR];
}

export function isSupportedCountry(code: string): boolean {
  return COUNTRIES.some((country) => country.value === code);
}

export function countryDefaults(country: string): {
  country: string;
  currency: string | null;
  flagCode: string | null;
} {
  const options = currencyOptions(country);
  const currency =
    options.find((item) => item.exactMatch)?.code ?? options[0]?.code ?? null;
  return {
    country,
    currency,
    flagCode: currency ? (CURRENCIES[currency]?.iso2 ?? null) : null,
  };
}

export const METHODS: Record<MethodId, Method> = {
  debit: {
    type: "debit",
    connect: "debit",
    glyph: "credit-card",
    title: "Instant Debit Card",
    description:
      "Use any Visa or Mastercard debit card to withdraw instantly for a small fee.",
    timeLabel: "Timeline",
    recommended: true,
  },
  bankLocal: {
    type: "bankLocal",
    connect: "bank",
    glyph: "landmark",
    title: "Bank Transfer",
    description: "Withdraw to your bank account.",
    timeLabel: "Timeline",
    recommended: true,
  },
  bankUs: {
    type: "bankUs",
    connect: "bank",
    glyph: "landmark",
    title: "Bank Transfer",
    description:
      "Securely link a US bank account or enter your details manually.",
    timeLabel: "Timeline",
  },
  bankIntl: {
    type: "bankIntl",
    connect: "bank",
    glyph: "landmark",
    title: "Bank Transfer",
    description: "Withdraw to your checking or savings account.",
    timeLabel: "Timeline",
  },
  bankSwift: {
    type: "bankSwift",
    connect: "bank",
    glyph: "landmark",
    title: "SWIFT Bank Transfer",
    description: "International transfer via SWIFT network.",
    timeLabel: "Timeline",
  },
  paypal: {
    type: "paypal",
    connect: "paypal",
    glyph: "paypal",
    title: "PayPal",
    description: "Withdraw to your PayPal Account.",
    timeLabel: "Timeline",
  },
};

const LOCAL_CURRENCIES = new Set([
  "BRL",
  "EUR",
  "IDR",
  "INR",
  "MXN",
  "KRW",
  "PHP",
  "PKR",
  "NGN",
  "CAD",
  "GBP",
  "JPY",
]);

const LOCAL_COUNTRIES = new Set([
  "IN",
  "MX",
  "US",
  "EC",
  "SV",
  "KR",
  "BR",
  "PK",
  "NG",
  "CA",
  "GB",
  "GG",
  "JE",
  "GI",
  "IM",
  "JP",
  "AL",
  "AD",
  "AT",
  "BE",
  "BA",
  "BG",
  "HR",
  "CY",
  "EE",
  "FI",
  "FR",
  "GF",
  "PF",
  "TF",
  "DE",
  "GR",
  "GP",
  "VA",
  "HU",
  "IS",
  "IE",
  "IT",
  "XK",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "MQ",
  "YT",
  "MC",
  "ME",
  "NL",
  "NC",
  "NO",
  "PL",
  "PT",
  "RE",
  "RO",
  "BL",
  "MF",
  "PM",
  "SM",
  "RS",
  "SK",
  "SI",
  "ES",
  "SE",
  "CH",
  "WF",
  "ID",
  "PH",
]);

export function withdrawalMethods(
  currency: string | null,
  country: string | null,
): Method[] {
  if (!currency || !country) return [];

  const methods: Method[] = [];

  if (currency === "USD" && country === "US") {
    methods.push(METHODS.debit, METHODS.bankUs);
  } else if (LOCAL_CURRENCIES.has(currency) && LOCAL_COUNTRIES.has(country)) {
    methods.push(METHODS.bankLocal);
  } else if (SUPPORTED.has(currency)) {
    methods.push(METHODS.bankIntl);
  } else {
    methods.push(METHODS.bankSwift);
  }

  methods.push(METHODS.paypal);
  return methods;
}

export function methodCopy(type: MethodId): { title: string; body?: string } {
  if (type === "debit") {
    return {
      title: "Connect your debit card",
      body: "Link your U.S. debit card to receive instant withdrawals directly to your bank account, available 24/7, including weekends and holidays.",
    };
  }
  if (type === "paypal") {
    return {
      title: "Connect your PayPal account",
      body: "Log in to send withdrawals to the PayPal account you want to get paid in.",
    };
  }
  if (type === "bankUs") {
    return { title: "Connect your bank account" };
  }
  if (type === "bankSwift") {
    return {
      title: "Connect your bank account",
      body: "Provide your international bank account details for a SWIFT transfer.",
    };
  }
  return {
    title: "Connect your bank account",
    body: "Enter the recipient bank account details for this transfer.",
  };
}

export const METHOD_LABELS: Record<ConnectKind, string> = {
  bank: "Bank Account",
  debit: "Debit Card",
  paypal: "PayPal",
};

export const BENEFICIARY_FIELDS: Record<
  string,
  { name: string; label: string }[]
> = {
  EUR: [
    { name: "iban", label: "IBAN" },
    { name: "bic_swift", label: "BIC/SWIFT" },
  ],
  GBP: [
    { name: "account_number", label: "Account Number" },
    { name: "sort_code", label: "Sort Code" },
  ],
  CAD: [
    { name: "account_number", label: "Account Number" },
    { name: "institution_no", label: "Institution Number" },
    { name: "transit_no", label: "Transit Number" },
  ],
  INR: [
    { name: "account_number", label: "Account Number" },
    { name: "ifsc", label: "IFSC Code" },
  ],
  MXN: [{ name: "clabe", label: "CLABE" }],
  BRL: [
    { name: "account_number", label: "Account Number" },
    { name: "branch_code", label: "Branch Code" },
    { name: "cpf_cnpj", label: "CPF / CNPJ" },
  ],
  JPY: [
    { name: "account_number", label: "Account Number" },
    { name: "bank_name", label: "Bank Name" },
    { name: "branch_name", label: "Branch Name" },
  ],
  PHP: [
    { name: "account_number", label: "Account Number" },
    { name: "bic_swift", label: "BIC/SWIFT" },
  ],
  AUD: [
    { name: "account_number", label: "Account Number" },
    { name: "bsb_code", label: "BSB Code" },
  ],
};

export const DEFAULT_BENEFICIARY_FIELDS = [
  { name: "account_number", label: "Account Number" },
  { name: "bic_swift", label: "BIC/SWIFT" },
  { name: "bank_name", label: "Bank Name" },
];

export function beneficiaryFields(currency: string | null) {
  if (!currency) return DEFAULT_BENEFICIARY_FIELDS;
  return BENEFICIARY_FIELDS[currency] ?? DEFAULT_BENEFICIARY_FIELDS;
}

export const WALLET = {
  amount: 1000,
  currency: "USD",
  flagCode: "us",
};

export const FX_CODES = new Set<string>([...ALL_CURRENCY_CODES, ...SUPPORTED]);

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}

export function moneyLine(amount: number, currency: string): string {
  return `${formatMoney(amount, currency)} · ${currency}`;
}

export function formatFxRate(rate: number): string {
  if (!Number.isFinite(rate) || rate <= 0) return "";
  const digits = rate >= 1000 ? 0 : rate >= 10 ? 2 : rate >= 1 ? 3 : 4;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(rate);
}

export function countryLabel(code: string | null) {
  if (!code) return "";
  return COUNTRIES.find((c) => c.value === code)?.label ?? code;
}

export type Overview = {
  centerLabel: string;
  centerSubLabel?: string;
  recipientLabel: string;
  recipientSubLabel: string;
  recipientFlagCode: string | null;
  recipientConnect: ConnectKind | null;
};

export function transferOverview(
  country: string | null,
  currency: string | null,
  flagCode: string | null,
  method: Method | null,
  rate: number | null = null,
): Overview {
  const options = country ? currencyOptions(country) : [];
  const match = options.find((c) => c.exactMatch);
  const localCurrency = match?.code ?? options[0]?.code ?? null;
  const isCrossBorder = Boolean(country) && localCurrency !== WALLET.currency;
  const isConversion = Boolean(currency) && currency !== WALLET.currency;

  let centerLabel = "Fill recipient account info";
  if (isConversion) centerLabel = "Conversion";
  else if (isCrossBorder) centerLabel = "Cross Border Transfer";
  else if (currency) centerLabel = "Local Withdrawal";

  let recipientSubLabel = "Select currency";
  if (currency === WALLET.currency) {
    recipientSubLabel = moneyLine(WALLET.amount, currency);
  } else if (currency && rate) {
    recipientSubLabel = moneyLine(WALLET.amount * rate, currency);
  } else if (currency) {
    recipientSubLabel = currency;
  }

  return {
    centerLabel,
    centerSubLabel: isConversion
      ? rate
        ? `(1 ${WALLET.currency} to ${formatFxRate(rate)} ${currency})`
        : `(1 ${WALLET.currency} to ${currency})`
      : undefined,
    recipientLabel: method
      ? METHOD_LABELS[method.connect]
      : "Recipient Account",
    recipientSubLabel,
    recipientFlagCode: flagCode,
    recipientConnect: method?.connect ?? null,
  };
}
