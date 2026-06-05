"use client";

import { useId, useState, useTransition } from "react";
import { submitContact } from "@/app/contact/actions";
import { TiltButton } from "@/components/tilt-button";

const INTENTS = [
  "Interior painting",
  "Exterior painting",
  "Unit turnover (portfolio)",
  "Commercial painting",
  "Stucco / siding repair",
  "Cabinet repainting",
  "Drywall repair",
  "Power washing only",
  "Become a vendor",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s().\-]{7,20}$/;

type Status = "idle" | "error" | "success";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setError("Please fill in your name, email, and a short message.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("That email address doesn't look right.");
      setStatus("error");
      return;
    }
    if (phone && !PHONE_RE.test(phone)) {
      setError("That phone number doesn't look right.");
      setStatus("error");
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await submitContact(null, data);
      if (res?.ok) {
        setStatus("success");
      } else {
        setError(res?.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    });
  }

  return (
    <div className="relative min-h-[520px]">
      <form
        onSubmit={onSubmit}
        noValidate
        className={`space-y-5 transition-opacity duration-500 ${
          status === "success"
            ? "pointer-events-none absolute inset-0 opacity-0"
            : "relative opacity-100"
        }`}
        aria-hidden={status === "success"}
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" required autoComplete="name" />
          <Field
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            pattern={EMAIL_RE.source}
            inputMode="email"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Phone"
            name="phone"
            type="tel"
            optional
            autoComplete="tel"
            pattern={PHONE_RE.source}
            inputMode="tel"
            placeholder="(415) 555-0123"
          />
          <div>
            <label
              htmlFor="contact-intent"
              className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold"
            >
              Job type
            </label>
            <select
              id="contact-intent"
              name="intent"
              defaultValue=""
              className="w-full border border-line/70 bg-background px-3 py-3 text-foreground/85 outline-none transition-colors focus:border-gold/60"
            >
              <option value="">Select one</option>
              {INTENTS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Building type, unit count, target dates, anything we should know about access or prep."
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "auto";
              el.style.height = el.scrollHeight + "px";
            }}
            className="w-full resize-none overflow-hidden border border-line/70 bg-background px-3 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-gold/60"
          />
        </div>

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
          <TiltButton
            type="submit"
            disabled={pending || status === "success"}
            max={6}
            scale={1.03}
            className="bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-foreground"
          >
            {pending || status === "success" ? "Sending…" : "Send message"}
          </TiltButton>
          {status === "error" && error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>

      <div
        className={`flex items-center justify-center transition-opacity duration-700 ${
          status === "success"
            ? "relative min-h-[520px] opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0"
        }`}
        aria-hidden={status !== "success"}
      >
        <div className="max-w-md px-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </div>
          <h3 className="mt-6 text-3xl font-light leading-tight tracking-tight">
            Message received.
          </h3>
          <p className="mt-4 leading-relaxed text-muted">
            Thanks for reaching out. We&rsquo;ll be in touch personally, by
            email, shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
  pattern,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  pattern?: string;
  inputMode?: "email" | "tel" | "text" | "numeric" | "search" | "url";
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.18em] text-gold"
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
        autoComplete={autoComplete}
        pattern={pattern}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full border border-line/70 bg-background px-3 py-3 text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-gold/60"
      />
    </div>
  );
}
