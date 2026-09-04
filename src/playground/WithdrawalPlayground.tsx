"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  CreditCard,
  Landmark,
  TriangleAlert,
  WalletMinimal,
} from "lucide-react";
import LiveFrame from "@/components/LiveFrame";
import { FLAG_ART } from "./withdrawalFlags";
import {
  ALL_CURRENCY_CODES,
  COUNTRIES,
  CURRENCIES,
  METHODS,
  SUPPORTED,
  WALLET,
  beneficiaryFields,
  countryLabel,
  currencyOptions,
  methodCopy,
  moneyLine,
  transferOverview,
  withdrawalMethods,
  type ConnectKind,
  type Currency,
  type Method,
  type MethodId,
} from "./withdrawalModel";
import { useFxRate } from "./useFxRate";
import { visitorCountryDefaults } from "./visitorCountry";
import styles from "./WithdrawalPlayground.module.css";

type Device = "desktop" | "mobile";
type Step = "details" | "method";
type AchMode = "plaid" | "manual";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Flag({ code, size }: { code?: string | null; size: number }) {
  const uid = useId().replace(/:/g, "");
  const art = code ? FLAG_ART[code] : undefined;
  if (!art) {
    return (
      <span
        className={styles["flag-blank"]}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={uid}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid})`} dangerouslySetInnerHTML={{ __html: art }} />
    </svg>
  );
}

function PayPalMark({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20.1033 6.20062C20.1439 5.87039 20.1652 5.53416 20.1652 5.19295C20.1652 2.325 17.8402 0 14.9722 0H6.29368C5.74777 0 5.28169 0.394219 5.19113 0.932531L1.99332 19.9392C1.87857 20.6212 2.40432 21.2427 3.09586 21.2427H6.26982C6.81572 21.2427 7.29057 20.8488 7.38108 20.3104C7.38108 20.3104 7.38638 20.2789 7.39594 20.2221H7.39599L6.95368 22.8511C6.85261 23.4522 7.31597 24 7.92549 24H10.7022C11.1834 24 11.5942 23.6525 11.674 23.178L12.4628 18.4896C12.5988 17.6814 13.2985 17.0896 14.1181 17.0896H14.8475C18.8099 17.0896 22.0219 13.8775 22.0219 9.91519C22.0219 8.38195 21.2641 7.02666 20.1033 6.20062Z"
        fill="#002987"
      />
      <path
        d="M20.1039 6.20068C19.6073 10.2403 16.1643 13.3683 11.9905 13.3683H9.56869C9.02208 13.3683 8.55 13.7324 8.40192 14.2472L6.95433 22.8511C6.85322 23.4522 7.31658 24.0001 7.92609 24.0001H10.7028C11.184 24.0001 11.5948 23.6526 11.6746 23.1781L12.4635 18.4897C12.5994 17.6814 13.2991 17.0897 14.1187 17.0897H14.8481C18.8105 17.0897 22.0225 13.8775 22.0225 9.91525C22.0225 8.38201 21.2647 7.02671 20.1039 6.20068Z"
        fill="#0085CC"
      />
      <path
        d="M9.56818 13.3682H11.99C16.1639 13.3682 19.6068 10.2402 20.1034 6.20063C19.3586 5.67066 18.4485 5.35791 17.4648 5.35791H11.1437C10.424 5.35791 9.80954 5.87761 9.6901 6.5873L8.40137 14.247C8.54945 13.7323 9.02157 13.3682 9.56818 13.3682Z"
        fill="#00186A"
      />
    </svg>
  );
}

function MethodGlyph({
  method,
  size,
}: {
  method: Method | ConnectKind | null;
  size: number;
}) {
  if (!method) return null;
  const kind = typeof method === "string" ? method : method.connect;
  const glyph = typeof method === "string" ? null : method.glyph;
  if (kind === "paypal" || glyph === "paypal") {
    return <PayPalMark size={size} />;
  }
  if (kind === "debit" || glyph === "credit-card") {
    return <CreditCard size={size} strokeWidth={2} aria-hidden="true" />;
  }
  return <Landmark size={size} strokeWidth={2} aria-hidden="true" />;
}

function Badges({
  flagCode,
  icon,
}: {
  flagCode?: string | null;
  icon: ReactNode;
}) {
  return (
    <div className={styles.badges}>
      <div className={cx(styles.tile, styles["tile-flag"])}>
        <span className={styles["badge-flag"]}>
          {flagCode ? <Flag code={flagCode} size={16} /> : null}
        </span>
      </div>
      <div className={cx(styles.tile, styles["tile-icon"])}>{icon}</div>
    </div>
  );
}

function Overview({
  variant,
  overview,
  method,
}: {
  variant: Device;
  overview: ReturnType<typeof transferOverview>;
  method: Method | null;
}) {
  const isDesktop = variant === "desktop";
  return (
    <>
      <div className={styles.col}>
        <Badges
          flagCode={WALLET.flagCode}
          icon={
            <WalletMinimal
              size={14}
              strokeWidth={2}
              color="var(--n600)"
              aria-hidden="true"
            />
          }
        />
        <div className={styles["col-text"]}>
          {isDesktop ? <p className={styles.body1}>Your Wallet</p> : null}
          <p className={styles.body2}>
            {moneyLine(WALLET.amount, WALLET.currency)}
          </p>
        </div>
      </div>
      <div className={styles["col-center"]}>
        <ArrowRight
          size={14}
          strokeWidth={2}
          color="var(--n700)"
          aria-hidden="true"
        />
        <div key={overview.centerLabel} className={styles["blur-fade"]}>
          <div className={styles["center-text"]}>
            <p
              className={cx(
                styles.body2,
                styles.medium,
                styles["center-label"],
              )}
            >
              {overview.centerLabel}
            </p>
            <p
              className={cx(styles.body2, styles["center-sub"])}
              hidden={!overview.centerSubLabel}
              aria-live="polite"
            >
              {overview.centerSubLabel ?? ""}
            </p>
          </div>
        </div>
      </div>
      <div className={cx(styles.col, styles["col-recipient"])}>
        <Badges
          flagCode={overview.recipientFlagCode}
          icon={
            <span style={{ color: "var(--n600)", display: "flex" }}>
              <MethodGlyph method={method} size={14} />
            </span>
          }
        />
        <div className={styles["col-text"]}>
          {isDesktop ? (
            <p className={cx(styles.body1, styles["recipient-label"])}>
              {overview.recipientLabel}
            </p>
          ) : null}
          <div key={overview.recipientSubLabel} className={styles.fade}>
            <p
              className={cx(styles.body2, styles["recipient-sub"])}
              aria-live="polite"
            >
              {overview.recipientSubLabel}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Combo({
  id,
  label,
  ariaLabel,
  value,
  adornment,
  options,
  onSelect,
}: {
  id: string;
  label?: string;
  ariaLabel: string;
  value: string;
  adornment?: ReactNode;
  options: { id: string; label: string; iso2?: string | null }[];
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-listbox`;
  const inputId = `${id}-input`;

  const filtered = useMemo(() => {
    const q = (query ?? "").trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const display = query === null ? value : query;

  function commit(idValue: string) {
    setOpen(false);
    setQuery(null);
    setActive(0);
    onSelect(idValue);
  }

  return (
    <div
      ref={rootRef}
      className={styles.field}
      id={`${id}-field`}
      data-open={open}
    >
      {label ? (
        <label className={styles["field-label"]} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={styles.combo} data-focus={open}>
        {adornment ? (
          <span className={styles["combo-adorn"]}>{adornment}</span>
        ) : null}
        <input
          id={inputId}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={ariaLabel}
          value={display}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => {
              if (!rootRef.current?.contains(document.activeElement)) {
                setOpen(false);
                setQuery(null);
              }
            }, 120);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              setQuery(null);
              return;
            }
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              const count = filtered.length;
              if (!count) return;
              const step = event.key === "ArrowDown" ? 1 : -1;
              setActive((current) => (current + step + count) % count);
              return;
            }
            if (event.key === "Enter") {
              event.preventDefault();
              const chosen = filtered[active];
              if (chosen) commit(chosen.id);
            }
          }}
        />
        <button
          type="button"
          className={styles["combo-arrow"]}
          aria-label={`Open ${ariaLabel} list`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setOpen((current) => !current)}
        >
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <ul className={styles.listbox} id={listId} role="listbox">
        {filtered.length === 0 ? (
          <li data-empty="true">No options</li>
        ) : (
          filtered.map((option, idx) => (
            <li
              key={option.id}
              role="option"
              data-active={idx === active}
              aria-selected={idx === active}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => commit(option.id)}
            >
              {option.iso2 ? <Flag code={option.iso2} size={32} /> : null}
              {option.label}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <span className={styles.radio} data-selected={selected} aria-hidden="true">
      {selected ? <span className={styles["radio-dot"]} /> : null}
    </span>
  );
}

function TextField({
  name,
  label,
  wide,
  value,
  onChange,
}: {
  name: string;
  label: string;
  wide?: boolean;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  const id = `f-${name}`;
  return (
    <div className={cx(styles.field, wide && styles["field-wide"])}>
      <label className={styles["field-label"]} htmlFor={id}>
        {label}
      </label>
      <div className={styles.combo}>
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
        />
      </div>
    </div>
  );
}

function RadioRow({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className={styles["radio-row"]}>
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label key={option.value} className={styles["radio-label"]}>
            <span className={styles["mui-radio"]} data-checked={checked} />
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(name, option.value)}
            />
            <span className={styles.body1}>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function CurrencyRow({
  currency,
  selected,
  delay,
  onSelect,
}: {
  currency: Currency & { code: string };
  selected: boolean;
  delay: number;
  onSelect: () => void;
}) {
  const isOther = currency.code === "Other";
  return (
    <div
      className={styles["animate-in"]}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        type="button"
        className={styles["currency-row"]}
        data-selected={selected}
        onClick={onSelect}
      >
        {isOther ? (
          <span className={styles["flag-blank"]} />
        ) : (
          <Flag code={currency.iso2} size={24} />
        )}
        <span className={styles["row-text"]}>
          <span className={cx(styles.body1, styles.medium, styles.code)}>
            {currency.code}
          </span>
          <span className={styles.body2}>{currency.name}</span>
        </span>
        <Radio selected={selected} />
      </button>
    </div>
  );
}

const PHONE_QUERY = "(max-width: 720px)";

function isPhoneViewport() {
  return window.matchMedia(PHONE_QUERY).matches;
}

function LinkFlow() {
  const [device, setDevice] = useState<Device>("desktop");
  const [step, setStep] = useState<Step>("details");
  // LinkFlow only mounts client-side (gated on scroll), so it is safe to seed
  // country state from the browser here without risking a hydration mismatch.
  // A later /api/geo response refines it.
  const [initialDefaults] = useState(visitorCountryDefaults);
  const [country, setCountry] = useState(initialDefaults.country);
  const [currency, setCurrency] = useState<string | null>(
    initialDefaults.currency,
  );
  const [flagCode, setFlagCode] = useState<string | null>(
    initialDefaults.flagCode,
  );
  const [showMoreCurrencies, setShowMoreCurrencies] = useState(false);
  const [otherSelected, setOtherSelected] = useState(false);
  const [otherCurrency, setOtherCurrency] = useState<string | null>(null);
  const [currencyError, setCurrencyError] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<MethodId | null>(null);
  const [showAllMethods, setShowAllMethods] = useState(false);
  const [achMode, setAchMode] = useState<AchMode>("plaid");
  const [values, setValues] = useState<Record<string, string>>({});
  const [acknowledge, setAcknowledge] = useState(false);
  const [linked, setLinked] = useState<string | null>(null);
  const userPickedCountry = useRef(false);
  const located = useRef(initialDefaults);

  function applyCountryDefaults(
    next: ReturnType<typeof visitorCountryDefaults>,
  ) {
    located.current = next;
    setCountry(next.country);
    setCurrency(next.currency);
    setFlagCode(next.flagCode);
    setShowMoreCurrencies(false);
    setOtherSelected(false);
    setOtherCurrency(null);
    setCurrencyError(false);
  }

  useEffect(() => {
    const media = window.matchMedia(PHONE_QUERY);
    const sync = () => setDevice(media.matches ? "mobile" : "desktop");
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Seeded from the browser above; here we only refine it from the edge geo
    // header once the request returns.
    let cancelled = false;
    fetch("/api/geo", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string | null } | null) => {
        if (cancelled || userPickedCountry.current) return;
        if (!data?.country) return;
        applyCountryDefaults(visitorCountryDefaults(data.country));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const method = selectedMethod ? METHODS[selectedMethod] : null;
  const fxRate = useFxRate(WALLET.currency, currency);
  const overview = transferOverview(
    country,
    currency,
    flagCode,
    method,
    fxRate,
  );
  const options = currencyOptions(country);
  const defaultCurrency = options.find((c) => c.exactMatch) ?? options[0];
  const visibleCurrencies = showMoreCurrencies
    ? options
    : defaultCurrency
      ? [defaultCurrency]
      : [];
  const methods = withdrawalMethods(currency, country);
  const recommended = methods.find((m) => m.recommended) ?? methods[0];
  const visibleMethods = showAllMethods
    ? methods
    : recommended
      ? [recommended]
      : [];

  function patchValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function pickCountry(code: string) {
    userPickedCountry.current = true;
    setCountry(code);
    setCurrency(null);
    setFlagCode(null);
    setShowMoreCurrencies(false);
    setOtherSelected(false);
    setOtherCurrency(null);
    setCurrencyError(false);
  }

  function pickCurrency(code: string) {
    setOtherSelected(false);
    setOtherCurrency(null);
    setCurrency(code);
    setFlagCode(CURRENCIES[code]?.iso2 ?? null);
    setCurrencyError(false);
  }

  function resetConnect() {
    setAchMode("plaid");
    setValues({});
    setAcknowledge(false);
  }

  function goToMethods() {
    if (!currency) {
      setCurrencyError(true);
      return;
    }
    setCurrencyError(false);
    setStep("method");
    setSelectedMethod(null);
    setShowAllMethods(false);
    resetConnect();
  }

  function restart() {
    setStep("details");
    setSelectedMethod(null);
    setShowAllMethods(false);
    resetConnect();
    setLinked(null);
  }

  function reset() {
    setDevice(isPhoneViewport() ? "mobile" : "desktop");
    userPickedCountry.current = false;
    applyCountryDefaults(located.current);
    restart();
  }

  const title =
    step === "method"
      ? "Choose your withdrawal method"
      : "What are your method’s details?";

  const chosenType = values.accountType;
  const fields = beneficiaryFields(currency);
  const copy = method ? methodCopy(method.type) : null;

  return (
    <div className={styles.root}>
      <header className={styles.benchHead}>
        <div className={styles.benchLead}>
          <div className={styles.benchCopy}>
            <p className={styles.benchTitle}>Link a withdrawal method</p>
            <p className={styles.benchSub}>
              Set up where you want to be paid. Pick a country and a currency,
              then choose a bank transfer or PayPal. The bar at the top of the
              card shows how the money will travel from your wallet to your
              account.
            </p>
          </div>
          <button type="button" className={styles.benchReset} onClick={reset}>
            Reset
          </button>
        </div>
        <div className={styles.controls}>
          <p className={styles.controlsLabel}>Mobile or Desktop</p>
          <div className={styles.seg}>
            <button
              type="button"
              aria-pressed={device === "desktop"}
              onClick={() => setDevice("desktop")}
            >
              Desktop
            </button>
            <button
              type="button"
              aria-pressed={device === "mobile"}
              onClick={() => setDevice("mobile")}
            >
              Mobile
            </button>
          </div>
        </div>
      </header>

      <div className={styles.stage} data-device={device}>
        <div className={styles.viewport}>
          <div className={styles.page}>
            <div className={styles["page-container"]}>
              <div className={styles["page-center"]}>
                <div className={styles["form-stack"]}>
                  <div className={styles["head-strip"]}>
                    <button
                      type="button"
                      className={styles["icon-btn"]}
                      aria-label="Back"
                      onClick={() => {
                        if (step === "method") {
                          setStep("details");
                          setSelectedMethod(null);
                          setShowAllMethods(false);
                        }
                      }}
                    >
                      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                    <p className={styles.body1}>{title}</p>
                  </div>

                  {linked ? (
                    <div className={styles["body-box"]}>
                      <div className={styles.overview}>
                        <Overview
                          variant="desktop"
                          overview={overview}
                          method={method}
                        />
                      </div>
                      <div className={styles["linked-notice"]}>
                        <p className={cx(styles.body1, styles.medium)}>
                          {linked}
                        </p>
                        <button
                          type="button"
                          className={styles["btn-contained"]}
                          onClick={restart}
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  ) : step === "method" ? (
                    <div className={styles["method-stack"]}>
                      <div className={styles["body-box"]}>
                        <div className={styles.overview}>
                          <Overview
                            variant="desktop"
                            overview={overview}
                            method={method}
                          />
                        </div>
                        <div className={styles["method-list"]}>
                          {visibleMethods.map((item, idx) => {
                            const isRecommended =
                              idx === 0 && item.type !== "bankSwift";
                            const selected = selectedMethod === item.type;
                            const card = (
                              <button
                                type="button"
                                className={styles["method-card"]}
                                data-selected={selected}
                                data-recommended={isRecommended}
                                onClick={() => {
                                  if (selectedMethod === item.type) return;
                                  setSelectedMethod(item.type);
                                  resetConnect();
                                }}
                              >
                                {isRecommended ? (
                                  <span className={styles["recommended-chip"]}>
                                    Recommended
                                  </span>
                                ) : null}
                                <span className={styles["method-radio"]}>
                                  <Radio selected={selected} />
                                </span>
                                <span className={styles["method-top"]}>
                                  <span className={styles["method-glyph"]}>
                                    <MethodGlyph method={item} size={18} />
                                  </span>
                                  <span
                                    className={cx(styles.body1, styles.medium)}
                                  >
                                    {item.title}
                                  </span>
                                </span>
                                <span
                                  className={cx(
                                    styles.body2,
                                    styles["method-desc"],
                                  )}
                                >
                                  {item.description}
                                </span>
                                <span className={styles["method-rule"]} />
                                <span className={styles["method-info"]}>
                                  <span className={styles["info-block"]}>
                                    <span className={styles["info-tile"]}>
                                      <Clock
                                        size={14}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span
                                      className={cx(
                                        styles.body2,
                                        styles.medium,
                                        styles["info-value"],
                                      )}
                                    >
                                      {item.timeLabel}
                                    </span>
                                  </span>
                                </span>
                              </button>
                            );
                            return showAllMethods && idx > 0 ? (
                              <div
                                key={item.type}
                                className={styles["animate-in"]}
                                style={{ animationDelay: `${idx * 50}ms` }}
                              >
                                {card}
                              </div>
                            ) : (
                              <div key={item.type}>{card}</div>
                            );
                          })}
                          {!showAllMethods && methods.length > 1 ? (
                            <p className={styles.body1}>
                              See additional withdrawal method?{" "}
                              <button
                                type="button"
                                className={styles["text-link"]}
                                onClick={() => setShowAllMethods(true)}
                              >
                                Show More
                              </button>
                            </p>
                          ) : null}
                        </div>
                      </div>
                      {method && copy ? (
                        <div className={styles["animate-in"]}>
                          <div className={styles["connect-section"]}>
                            <div className={styles["connect-head"]}>
                              <p className={cx(styles.body1, styles.medium)}>
                                {copy.title}
                              </p>
                            </div>
                            <div className={styles["connect-body"]}>
                              {copy.body ? (
                                <p className={styles.body1}>{copy.body}</p>
                              ) : null}
                              {method.type === "debit" ? (
                                <div className={styles["connect-stack"]}>
                                  <div className={styles["field-grid"]}>
                                    <TextField
                                      name="cardNumber"
                                      label="Card Number"
                                      wide
                                      value={values.cardNumber ?? ""}
                                      onChange={patchValue}
                                    />
                                    <TextField
                                      name="cardExpiry"
                                      label="Expiration"
                                      value={values.cardExpiry ?? ""}
                                      onChange={patchValue}
                                    />
                                    <TextField
                                      name="cardZip"
                                      label="Billing ZIP"
                                      value={values.cardZip ?? ""}
                                      onChange={patchValue}
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    className={styles["btn-contained"]}
                                    onClick={() =>
                                      setLinked("Debit card linked.")
                                    }
                                  >
                                    Add Debit Card
                                  </button>
                                </div>
                              ) : null}
                              {method.type === "bankUs" ? (
                                <div className={styles["connect-stack"]}>
                                  {achMode === "manual" ? (
                                    <>
                                      <p className={styles.body1}>
                                        Enter your bank account details
                                      </p>
                                      <div className={styles["connect-group"]}>
                                        <p
                                          className={cx(
                                            styles.body1,
                                            styles.bold,
                                          )}
                                        >
                                          How is your bank account setup?
                                        </p>
                                        <RadioRow
                                          name="setupType"
                                          value={values.setupType ?? ""}
                                          onChange={patchValue}
                                          options={[
                                            {
                                              label: "Individual",
                                              value: "individual",
                                            },
                                            {
                                              label: "Business",
                                              value: "business",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className={styles["connect-group"]}>
                                        <p
                                          className={cx(
                                            styles.body1,
                                            styles.bold,
                                          )}
                                        >
                                          Account type
                                        </p>
                                        <RadioRow
                                          name="bankAccountType"
                                          value={values.bankAccountType ?? ""}
                                          onChange={patchValue}
                                          options={[
                                            {
                                              label: "Checking",
                                              value: "checking",
                                            },
                                            {
                                              label: "Savings",
                                              value: "saving",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <p
                                        className={cx(
                                          styles.body1,
                                          styles.bold,
                                        )}
                                      >
                                        Bank account details
                                      </p>
                                      <TextField
                                        name="routingNumber"
                                        label="Routing Number"
                                        wide
                                        value={values.routingNumber ?? ""}
                                        onChange={patchValue}
                                      />
                                      <TextField
                                        name="accountNumber"
                                        label="Account Number"
                                        wide
                                        value={values.accountNumber ?? ""}
                                        onChange={patchValue}
                                      />
                                      <TextField
                                        name="confirmAccountNumber"
                                        label="Confirm Account Number"
                                        wide
                                        value={
                                          values.confirmAccountNumber ?? ""
                                        }
                                        onChange={patchValue}
                                      />
                                      <button
                                        type="button"
                                        className={styles["btn-contained"]}
                                        onClick={() =>
                                          setLinked("Bank account linked.")
                                        }
                                      >
                                        Link Bank Account
                                      </button>
                                      <p className={styles.body2}>
                                        Prefer to enter your details with Plaid?{" "}
                                        <button
                                          type="button"
                                          className={styles["text-link"]}
                                          onClick={() => setAchMode("plaid")}
                                        >
                                          Switch to Plaid
                                        </button>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className={styles.body2}>
                                        Securely link your bank account without
                                        entering routing and account numbers.
                                      </p>
                                      <button
                                        type="button"
                                        className={styles["btn-contained"]}
                                        onClick={() =>
                                          setLinked("Bank account linked.")
                                        }
                                      >
                                        Start Linking
                                      </button>
                                      <p className={styles.body2}>
                                        Prefer to enter your details manually?{" "}
                                        <button
                                          type="button"
                                          className={styles["text-link"]}
                                          onClick={() => setAchMode("manual")}
                                        >
                                          Manually link your account
                                        </button>
                                      </p>
                                    </>
                                  )}
                                </div>
                              ) : null}
                              {method.type === "bankLocal" ||
                              method.type === "bankIntl" ? (
                                <div className={styles["connect-stack"]}>
                                  <div className={styles["connect-group"]}>
                                    <p className={styles.body1}>Account type</p>
                                    <RadioRow
                                      name="accountType"
                                      value={values.accountType ?? ""}
                                      onChange={patchValue}
                                      options={[
                                        {
                                          label: "Individual",
                                          value: "individual",
                                        },
                                        { label: "Company", value: "company" },
                                      ]}
                                    />
                                  </div>
                                  {chosenType ? (
                                    <div className={styles["animate-in"]}>
                                      <div className={styles["field-grid"]}>
                                        <div
                                          className={cx(
                                            styles.field,
                                            styles["field-wide"],
                                          )}
                                        >
                                          <label
                                            className={styles["field-label"]}
                                          >
                                            Recipient Bank Country
                                          </label>
                                          <div
                                            className={cx(
                                              styles.combo,
                                              styles["combo-disabled"],
                                            )}
                                          >
                                            <input
                                              type="text"
                                              disabled
                                              value={countryLabel(country)}
                                            />
                                          </div>
                                        </div>
                                        <TextField
                                          name="beneficiary_name"
                                          label="Account Holder Name"
                                          wide
                                          value={values.beneficiary_name ?? ""}
                                          onChange={patchValue}
                                        />
                                        {fields.map((field) => (
                                          <TextField
                                            key={field.name}
                                            name={field.name}
                                            label={field.label}
                                            value={values[field.name] ?? ""}
                                            onChange={patchValue}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ) : null}
                                  <button
                                    type="button"
                                    className={styles["btn-contained"]}
                                    disabled={!chosenType}
                                    onClick={() =>
                                      setLinked("Bank account linked.")
                                    }
                                  >
                                    Next
                                  </button>
                                </div>
                              ) : null}
                              {method.type === "bankSwift" ? (
                                <div className={styles["connect-stack"]}>
                                  <div
                                    className={cx(
                                      styles["info-card"],
                                      styles["info-card-block"],
                                    )}
                                  >
                                    <span className={styles["info-icon"]}>
                                      <TriangleAlert
                                        size={16}
                                        strokeWidth={2}
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className={styles["info-body"]}>
                                      <span
                                        className={cx(
                                          styles.body1,
                                          styles.bold,
                                        )}
                                      >
                                        Lumanu currently doesn’t support direct
                                        conversions to this currency
                                      </span>
                                      <span className={styles.body1}>
                                        Your bank will handle the conversion.
                                        They’ll apply their own exchange rates
                                        and fees. If your bank doesn’t accept
                                        the withdrawal for any reason, they
                                        might charge a fee to return the funds
                                        to Lumanu.
                                      </span>
                                      <label className={styles["check-label"]}>
                                        <span
                                          className={styles["cbx-box"]}
                                          data-checked={acknowledge}
                                        />
                                        <input
                                          type="checkbox"
                                          checked={acknowledge}
                                          onChange={(event) =>
                                            setAcknowledge(event.target.checked)
                                          }
                                        />
                                        <span className={styles.body1}>
                                          I acknowledge and accept the
                                          associated risks.
                                        </span>
                                      </label>
                                    </span>
                                  </div>
                                  <div className={styles["connect-group"]}>
                                    <p className={styles.body1}>Account type</p>
                                    <RadioRow
                                      name="accountType"
                                      value={values.accountType ?? ""}
                                      onChange={patchValue}
                                      options={[
                                        {
                                          label: "Individual",
                                          value: "individual",
                                        },
                                        { label: "Company", value: "company" },
                                      ]}
                                    />
                                  </div>
                                  {chosenType ? (
                                    <div className={styles["animate-in"]}>
                                      <div className={styles["field-grid"]}>
                                        <TextField
                                          name="beneficiary_name"
                                          label="Account Holder Name"
                                          wide
                                          value={values.beneficiary_name ?? ""}
                                          onChange={patchValue}
                                        />
                                        <TextField
                                          name="iban"
                                          label="IBAN or Account Number"
                                          value={values.iban ?? ""}
                                          onChange={patchValue}
                                        />
                                        <TextField
                                          name="bic_swift"
                                          label="BIC/SWIFT"
                                          value={values.bic_swift ?? ""}
                                          onChange={patchValue}
                                        />
                                        <TextField
                                          name="bank_name"
                                          label="Bank Name"
                                          wide
                                          value={values.bank_name ?? ""}
                                          onChange={patchValue}
                                        />
                                        <TextField
                                          name="bank_address"
                                          label="Bank Address"
                                          wide
                                          value={values.bank_address ?? ""}
                                          onChange={patchValue}
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                  <button
                                    type="button"
                                    className={styles["btn-contained"]}
                                    disabled={!chosenType || !acknowledge}
                                    onClick={() =>
                                      setLinked("Bank account linked.")
                                    }
                                  >
                                    Next
                                  </button>
                                </div>
                              ) : null}
                              {method.type === "paypal" ? (
                                <div className={styles["connect-stack"]}>
                                  <button
                                    type="button"
                                    className={styles["paypal-btn"]}
                                    onClick={() =>
                                      setLinked(
                                        "PayPal account linked successfully.",
                                      )
                                    }
                                  >
                                    <PayPalMark size={16} />
                                    <span>Log in with PayPal</span>
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className={styles["body-box"]}>
                      <div className={styles.overview}>
                        <Overview
                          variant="desktop"
                          overview={overview}
                          method={method}
                        />
                      </div>
                      <div className={styles.form}>
                        <div className={styles.section}>
                          <p className={cx(styles.body1, styles.medium)}>
                            Confirm the recipient country
                          </p>
                          <p
                            className={styles.body2}
                            style={{ color: "var(--n600)" }}
                          >
                            Select the country your withdrawal method is located
                            in.
                          </p>
                          <Combo
                            id="country"
                            ariaLabel="Recipient Bank Country"
                            value={countryLabel(country)}
                            options={COUNTRIES.map((item) => ({
                              id: item.value,
                              label: item.label,
                            }))}
                            onSelect={pickCountry}
                          />
                        </div>
                        {country && visibleCurrencies.length > 0 ? (
                          <div className={styles["animate-in"]}>
                            <div className={styles["currency-block"]}>
                              <div className={styles.section}>
                                <p className={cx(styles.body1, styles.medium)}>
                                  Select a recipient currency
                                </p>
                                <p
                                  className={styles.body2}
                                  style={{ color: "var(--n600)" }}
                                >
                                  Choose the currency you want to receive your
                                  withdrawal in.
                                </p>
                              </div>
                              {visibleCurrencies.map((item, idx) => (
                                <CurrencyRow
                                  key={item.code}
                                  currency={item}
                                  selected={
                                    !otherSelected && currency === item.code
                                  }
                                  delay={idx * 50}
                                  onSelect={() => pickCurrency(item.code)}
                                />
                              ))}
                              {showMoreCurrencies ? (
                                <CurrencyRow
                                  currency={{
                                    code: "Other",
                                    name: "Choose any currency",
                                    iso2: "",
                                  }}
                                  selected={otherSelected}
                                  delay={visibleCurrencies.length * 50}
                                  onSelect={() => {
                                    setOtherSelected(true);
                                    setCurrency(null);
                                    setFlagCode(null);
                                  }}
                                />
                              ) : null}
                              {!showMoreCurrencies && options.length > 1 ? (
                                <div className={styles["animate-in"]}>
                                  <p className={styles.body1}>
                                    Want to withdraw in another currency?{" "}
                                    <button
                                      type="button"
                                      className={styles["text-link"]}
                                      onClick={() =>
                                        setShowMoreCurrencies(true)
                                      }
                                    >
                                      See all currencies
                                    </button>
                                  </p>
                                </div>
                              ) : null}
                              {otherSelected ? (
                                <div className={styles["other-picker"]}>
                                  <Combo
                                    id="currency"
                                    label="Currency"
                                    ariaLabel="Currency"
                                    value={
                                      otherCurrency && CURRENCIES[otherCurrency]
                                        ? `${CURRENCIES[otherCurrency].code} - ${CURRENCIES[otherCurrency].name}`
                                        : ""
                                    }
                                    adornment={
                                      otherCurrency &&
                                      CURRENCIES[otherCurrency] ? (
                                        <Flag
                                          code={CURRENCIES[otherCurrency].iso2}
                                          size={20}
                                        />
                                      ) : null
                                    }
                                    options={ALL_CURRENCY_CODES.map((code) => ({
                                      id: code,
                                      label: `${code} - ${CURRENCIES[code].name}`,
                                      iso2: CURRENCIES[code].iso2,
                                    }))}
                                    onSelect={(code) => {
                                      setOtherCurrency(code);
                                      setCurrency(code);
                                      setFlagCode(
                                        CURRENCIES[code]?.iso2 ?? null,
                                      );
                                      setCurrencyError(false);
                                    }}
                                  />
                                  {currency && !SUPPORTED.has(currency) ? (
                                    <div className={styles["info-card"]}>
                                      <span className={styles["info-icon"]}>
                                        <TriangleAlert
                                          size={16}
                                          strokeWidth={2}
                                          aria-hidden="true"
                                        />
                                      </span>
                                      <span className={styles["info-body"]}>
                                        <span
                                          className={cx(
                                            styles.body1,
                                            styles.bold,
                                          )}
                                        >
                                          Lumanu currently doesn’t support
                                          direct conversions to this currency
                                        </span>
                                        <span className={styles.body1}>
                                          Your bank will handle the conversion.
                                          They’ll apply their own exchange rates
                                          and fees.
                                        </span>
                                      </span>
                                    </div>
                                  ) : null}
                                </div>
                              ) : null}
                              {currencyError && !currency ? (
                                <p
                                  className={cx(
                                    styles.body2,
                                    styles["error-text"],
                                  )}
                                >
                                  Please select a currency to continue.
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className={styles["next-box"]}>
                        <button
                          type="button"
                          className={styles["btn-contained"]}
                          onClick={goToMethods}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["overview-mobile"]}>
          <Overview variant="mobile" overview={overview} method={method} />
        </div>
      </div>
    </div>
  );
}

export default function WithdrawalPlayground() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Only mount the flow — and fire its geo / FX requests — once the experiment
  // scrolls near the viewport, so nothing kicks off just by loading the page.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <LiveFrame url="app / wallet / withdraw">
        {ready ? <LinkFlow /> : <div className={styles.flowPlaceholder} />}
      </LiveFrame>
    </div>
  );
}
