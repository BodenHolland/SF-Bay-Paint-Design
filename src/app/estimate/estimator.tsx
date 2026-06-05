"use client";

import { useId, useMemo, useState, useTransition } from "react";
import { ESTIMATOR, type Surface } from "@/lib/site";
import { submitQuote, type QuoteRow } from "./actions";
import { TiltButton } from "@/components/tilt-button";

type Row = {
  id: string;
  label: string;
  sqft: string;
  surface: Surface;
};

const blankRow = (): Row => ({
  id: Math.random().toString(36).slice(2, 10),
  label: "",
  sqft: "",
  surface: "interior",
});

function rate(surface: Surface) {
  return ESTIMATOR.rates[surface];
}

function compute(rows: Row[]) {
  const enriched: (QuoteRow & { sqftNum: number })[] = rows
    .map((r) => {
      const sqftNum = Math.max(0, parseInt(r.sqft, 10) || 0);
      const estimate = Math.round(sqftNum * rate(r.surface));
      return {
        label: r.label,
        sqft: sqftNum,
        surface: r.surface,
        estimate,
        sqftNum,
      };
    })
    .filter((r) => r.sqftNum > 0);

  const subtotal = enriched.reduce((acc, r) => acc + r.estimate, 0);
  const unitCount = enriched.length;
  const tier = ESTIMATOR.volumeDiscounts.find((d) => unitCount >= d.minUnits);
  const discountPercent = tier?.percent ?? 0;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discountAmount;
  const rangeLow = Math.round(total * (1 - ESTIMATOR.uncertaintyPct));
  const rangeHigh = Math.round(total * (1 + ESTIMATOR.uncertaintyPct));

  return {
    rows: enriched.map(({ sqftNum: _, ...r }) => r),
    unitCount,
    subtotal,
    discountTierLabel: tier?.label ?? null,
    discountPercent,
    discountAmount,
    total,
    rangeLow,
    rangeHigh,
  };
}

const fmt$ = (n: number) => `$${n.toLocaleString()}`;
const fmtK = (n: number) =>
  n >= 10000 ? `$${(n / 1000).toFixed(1)}k` : fmt$(n);

export function Estimator() {
  const [rows, setRows] = useState<Row[]>(() => [blankRow(), blankRow(), blankRow()]);
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const calc = useMemo(() => compute(rows), [rows]);

  function update(id: string, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, blankRow()]);
  }
  function removeRow(id: string) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  }
  function clearAll() {
    setRows([blankRow()]);
    setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (calc.unitCount === 0) {
      setError("Add at least one unit with a square-footage value.");
      setStatus("error");
      return;
    }
    const data = new FormData(e.currentTarget);
    data.set(
      "payload",
      JSON.stringify({
        rows: calc.rows,
        subtotal: calc.subtotal,
        discountPercent: calc.discountPercent,
        total: calc.total,
        rangeLow: calc.rangeLow,
        rangeHigh: calc.rangeHigh,
      }),
    );
    setError(null);
    startTransition(async () => {
      const res = await submitQuote(null, data);
      if (res?.ok) {
        setStatus("success");
      } else {
        setError(res?.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      {/* ── Unit list ─────────────────────────────────────────────── */}
      <div>
        <div className="border border-line/60 bg-charcoal/30">
          <div className="flex items-center justify-between border-b border-line/60 px-5 py-4">
            <div>
              <p className="eyebrow">Units</p>
              <p className="mt-1 text-xs text-muted">
                {calc.unitCount} unit{calc.unitCount === 1 ? "" : "s"} priced
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearAll}
                className="border border-line/70 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:border-line hover:text-foreground/85"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={addRow}
                className="border border-gold/50 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-gold transition-colors hover:border-gold-bright hover:text-gold-bright"
              >
                + Add unit
              </button>
            </div>
          </div>

          <ul className="divide-y divide-line/60">
            {rows.map((r, i) => (
              <UnitRow
                key={r.id}
                row={r}
                index={i}
                canRemove={rows.length > 1}
                onChange={(patch) => update(r.id, patch)}
                onRemove={() => removeRow(r.id)}
              />
            ))}
          </ul>
        </div>

        {/* Rate footnote */}
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Rates: ${ESTIMATOR.rates.interior.toFixed(2)}/sqft interior,{" "}
          ${ESTIMATOR.rates.exterior.toFixed(2)}/sqft exterior. Two coats,
          basic prep included. Final pricing requires a walk-through.
        </p>
      </div>

      {/* ── Summary + send ────────────────────────────────────────── */}
      <div className="sticky top-24 self-start">
        <div className="border border-line/60 bg-background">
          <div className="border-b border-line/60 px-6 py-5">
            <p className="eyebrow">Portfolio estimate</p>
            <p className="mt-3 text-3xl font-light tracking-tight tabular-nums text-gold">
              {fmtK(calc.rangeLow)} – {fmtK(calc.rangeHigh)}
            </p>
            <p className="mt-2 text-xs text-muted">
              Range ±{Math.round(ESTIMATOR.uncertaintyPct * 100)}%. Final pricing
              requires a walk-through.
            </p>
          </div>

          <dl className="divide-y divide-line/60 text-sm tabular-nums">
            <Row label="Units priced" value={String(calc.unitCount)} />
            <Row label="Subtotal" value={fmt$(calc.subtotal)} />
            <Row
              label={
                calc.discountTierLabel
                  ? `Volume discount (${calc.discountTierLabel})`
                  : "Volume discount"
              }
              value={
                calc.discountPercent
                  ? `−${fmt$(calc.discountAmount)} · ${calc.discountPercent}%`
                  : "Not yet — 5+ units"
              }
              accent={calc.discountPercent > 0}
            />
            <Row label="Estimate" value={fmt$(calc.total)} bold />
          </dl>

          {status === "success" ? (
            <div className="border-t border-line/60 p-6 text-center">
              <p className="eyebrow">Sent</p>
              <p className="mt-3 text-base leading-relaxed text-foreground/80">
                Quote sent. Leslie will reach out to schedule a walk-through
                and confirm pricing.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="border-t border-line/60 p-6">
              <p className="eyebrow">Send this to Leslie</p>
              <p className="mt-2 text-xs text-muted">
                We&rsquo;ll reply by email within one business day.
              </p>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="mt-5 space-y-4">
                <SmallField label="Name" name="name" required />
                <SmallField label="Email" name="email" type="email" required />
                <SmallField label="Company" name="company" optional />
                <SmallField label="Phone" name="phone" type="tel" optional />
                <div>
                  <label
                    htmlFor="quote-notes"
                    className="mb-2 block text-[0.65rem] uppercase tracking-[0.18em] text-gold"
                  >
                    Notes <span className="normal-case tracking-normal text-muted/70">(optional)</span>
                  </label>
                  <textarea
                    id="quote-notes"
                    name="notes"
                    rows={3}
                    placeholder="Target dates, building access, anything else."
                    className="w-full resize-none border border-line/70 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-gold/60"
                  />
                </div>
              </div>
              <TiltButton
                type="submit"
                disabled={pending || calc.unitCount === 0}
                max={5}
                scale={1.02}
                className="mt-5 w-full bg-gold px-6 py-3 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gold"
              >
                {pending ? "Sending…" : "Send the quote"}
              </TiltButton>
              {status === "error" && error && (
                <p className="mt-3 text-xs text-red-400" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <dt className="text-muted">{label}</dt>
      <dd
        className={`tabular-nums ${
          bold ? "text-lg text-foreground" : ""
        } ${accent ? "text-gold" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

function UnitRow({
  row,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  row: Row;
  index: number;
  canRemove: boolean;
  onChange: (patch: Partial<Row>) => void;
  onRemove: () => void;
}) {
  const labelId = useId();
  const sqftId = useId();
  const surfaceName = `surface-${row.id}`;
  const sqftNum = Math.max(0, parseInt(row.sqft, 10) || 0);
  const lineEstimate = Math.round(sqftNum * rate(row.surface));

  return (
    <li className="px-5 py-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.6fr_0.7fr_1.2fr_auto] sm:items-end">
        <div>
          <label
            htmlFor={labelId}
            className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-muted"
          >
            Unit · address
          </label>
          <input
            id={labelId}
            type="text"
            value={row.label}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder={`Unit ${index + 1}`}
            className="w-full border border-line/70 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-gold/60"
          />
        </div>
        <div>
          <label
            htmlFor={sqftId}
            className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-muted"
          >
            Sqft
          </label>
          <input
            id={sqftId}
            type="number"
            inputMode="numeric"
            min={0}
            value={row.sqft}
            onChange={(e) => onChange({ sqft: e.target.value })}
            placeholder="800"
            className="w-full border border-line/70 bg-background px-3 py-2 text-sm tabular-nums text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-gold/60"
          />
        </div>
        <fieldset>
          <legend className="mb-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Surface
          </legend>
          <div className="flex">
            {(["interior", "exterior"] as Surface[]).map((s) => (
              <label
                key={s}
                className={`flex-1 cursor-pointer border border-line/70 px-3 py-2 text-center text-xs uppercase tracking-[0.14em] transition-colors ${
                  row.surface === s
                    ? "border-gold/70 bg-gold/10 text-gold"
                    : "text-muted hover:text-foreground/80"
                } ${s === "interior" ? "" : "-ml-px"}`}
              >
                <input
                  type="radio"
                  name={surfaceName}
                  value={s}
                  checked={row.surface === s}
                  onChange={() => onChange({ surface: s })}
                  className="sr-only"
                />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove unit ${index + 1}`}
          className="self-end border border-line/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:border-line hover:text-foreground/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ×
        </button>
      </div>
      {sqftNum > 0 && (
        <p className="mt-3 text-right text-xs tabular-nums text-muted">
          {sqftNum.toLocaleString()} sqft × ${rate(row.surface).toFixed(2)}/sqft ={" "}
          <span className="text-gold">${lineEstimate.toLocaleString()}</span>
        </p>
      )}
    </li>
  );
}

function SmallField({
  label,
  name,
  type = "text",
  required,
  optional,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[0.65rem] uppercase tracking-[0.18em] text-gold"
      >
        {label}
        {optional && (
          <span className="ml-1 normal-case tracking-normal text-muted/70">
            (optional)
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full border border-line/70 bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold/60"
      />
    </div>
  );
}
