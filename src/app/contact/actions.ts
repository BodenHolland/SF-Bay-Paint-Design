"use server";

// Contact inquiry handler. Sends Leslie an email via Resend's REST API when
// RESEND_API_KEY is configured. Without it, the submission is logged
// server-side and the form still succeeds so dev works without infra.

import { CONTACT } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  message: string;
} | null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND_API = "https://api.resend.com/emails";

async function sendEmail(opts: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[contact] RESEND_API_KEY not set, logging submission:", opts);
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
      console.error("[contact] Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[contact] Resend threw", err);
    return false;
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const intent = String(formData.get("intent") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (formData.get("website")) {
    return { ok: true, message: "Thanks, we'll be in touch shortly." };
  }

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Please fill in your name, email, and a short message.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "That email address doesn't look right." };
  }

  const subject = `New paint inquiry from ${name}${intent ? `: ${intent}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    intent ? `Looking for: ${intent}` : null,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const ok = await sendEmail({
    to: process.env.CONTACT_TO_EMAIL || CONTACT.email,
    from:
      process.env.CONTACT_FROM_EMAIL ||
      "SF Bay Paint <noreply@sfbaypaintdesign.com>",
    replyTo: email,
    subject,
    text,
  });

  if (!ok) {
    return {
      ok: false,
      message:
        "Something went wrong on our side. Please try again, or email us directly.",
    };
  }
  return { ok: true, message: "Thanks, we'll be in touch shortly." };
}
