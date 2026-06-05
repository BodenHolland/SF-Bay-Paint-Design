"use server";

// Quote submission. The estimator computes everything client-side; this action
// just emails the formatted breakdown to Leslie and (optionally) to the PM as
// a copy. Reuses the Resend integration pattern from /contact.

import { CONTACT } from "@/lib/site";

export type QuoteRow = {
  label: string;
  sqft: number;
  surface: "interior" | "exterior";
  estimate: number;
};

export type QuoteState = {
  ok: boolean;
  message: string;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND_API = "https://api.resend.com/emails";

async function send(opts: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[estimate] RESEND_API_KEY not set, logging quote:", opts);
    return true;
  }
  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: opts.to,
        from: opts.from,
        subject: opts.subject,
        text: opts.text,
        reply_to: opts.replyTo,
      }),
    });
    if (!res.ok) {
      console.error("[estimate] Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[estimate] Resend threw", err);
    return false;
  }
}

function formatQuote(opts: {
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
  rows: QuoteRow[];
  subtotal: number;
  discountPercent: number;
  total: number;
  rangeLow: number;
  rangeHigh: number;
}): string {
  const rowLines = opts.rows
    .map(
      (r, i) =>
        `${i + 1}. ${r.label || "(no label)"} — ${r.sqft.toLocaleString()} sqft, ${r.surface} — $${r.estimate.toLocaleString()}`,
    )
    .join("\n");
  return [
    `Quote requested by: ${opts.name}`,
    `Email: ${opts.email}`,
    opts.company ? `Company: ${opts.company}` : null,
    opts.phone ? `Phone: ${opts.phone}` : null,
    "",
    "Units:",
    rowLines,
    "",
    `Subtotal: $${opts.subtotal.toLocaleString()}`,
    opts.discountPercent
      ? `Volume discount: ${opts.discountPercent}% (−$${(opts.subtotal - opts.total).toLocaleString()})`
      : "Volume discount: none",
    `Estimate: $${opts.total.toLocaleString()}`,
    `Range (±15%): $${opts.rangeLow.toLocaleString()} – $${opts.rangeHigh.toLocaleString()}`,
    "",
    opts.notes ? `Notes from PM:\n${opts.notes}` : "",
    "",
    "Final pricing requires a walk-through.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  if (formData.get("website")) {
    return { ok: true, message: "Thanks, we'll be in touch shortly." };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const payloadRaw = String(formData.get("payload") || "").trim();

  if (!name || !email) {
    return {
      ok: false,
      message: "Please include your name and email so we can send the quote.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }
  if (!payloadRaw) {
    return {
      ok: false,
      message: "Add at least one unit to the estimator before sending.",
    };
  }

  let payload: {
    rows: QuoteRow[];
    subtotal: number;
    discountPercent: number;
    total: number;
    rangeLow: number;
    rangeHigh: number;
  };
  try {
    payload = JSON.parse(payloadRaw);
  } catch {
    return { ok: false, message: "Could not read the estimate payload." };
  }

  const text = formatQuote({ name, email, company, phone, notes, ...payload });

  const ok = await send({
    to: process.env.CONTACT_TO_EMAIL || CONTACT.email,
    from:
      process.env.CONTACT_FROM_EMAIL ||
      "SF Bay Paint <noreply@sfbaypaintdesign.com>",
    replyTo: email,
    subject: `Estimator quote · ${payload.rows.length} units · ${company || name}`,
    text,
  });

  if (!ok) {
    return {
      ok: false,
      message:
        "Something went wrong sending the quote. Please try again or email us directly.",
    };
  }

  return {
    ok: true,
    message:
      "Quote sent. Leslie will reach out to schedule a walk-through and confirm pricing.",
  };
}
