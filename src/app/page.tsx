import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { TiltLink } from "@/components/tilt-link";
import { StatsBand } from "@/components/stats-band";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { businessLd, websiteLd, faqLd } from "@/lib/structured-data";
import {
  SERVICES,
  TRUST,
  TESTIMONIALS,
  FAQS,
  LESLIE,
  LOCATIONS,
  CONTACT,
  SOCIALS,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const base = getSiteUrl();

  return (
    <>
      <JsonLd
        data={businessLd(base, {
          contact: CONTACT,
          leslie: LESLIE,
          socials: SOCIALS,
          locations: LOCATIONS,
        })}
      />
      <JsonLd data={websiteLd(base)} />
      <JsonLd data={faqLd(FAQS)} />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <TrustBand />
        <ServicesBlock />
        <EstimatorPromo />
        <CaseStudies />
        <ForPm />
        <Testimonials />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-24 md:pt-32">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow rise" style={{ animationDelay: "0.05s" }}>
              Painting · Turnovers · Bay Area portfolios
            </p>
            <h1
              className="rise mt-6 text-balance text-5xl font-light leading-[1.02] tracking-tight md:text-7xl"
              style={{ animationDelay: "0.15s" }}
            >
              Painting & turnovers, built for property portfolios.
            </h1>
            <p
              className="rise mt-7 max-w-xl text-lg leading-relaxed text-foreground/80"
              style={{ animationDelay: "0.3s" }}
            >
              Interior, exterior, and unit turnovers across the San Francisco
              Bay Area. Run by an operator who manages her own portfolio, so
              the scopes, timing, and paperwork match how property managers
              actually work.
            </p>
            <div
              className="rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-7"
              style={{ animationDelay: "0.45s" }}
            >
              <TiltLink
                href="/estimate"
                max={5}
                scale={1.02}
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:bg-gold-bright"
              >
                Run a portfolio estimate
              </TiltLink>
              <Link
                href="/about#property-managers"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
              >
                <span className="swipe-underline">For property managers</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Decorative swatch block — a visual signature reading industrial,
              not editorial. Three rectangles in the brand neutrals plus the
              champagne accent. */}
          <div className="rise hidden lg:block" style={{ animationDelay: "0.6s" }}>
            <div
              aria-hidden
              className="grid grid-cols-3 border border-line/60"
            >
              <div className="aspect-[2/3] bg-[var(--charcoal)]" />
              <div className="aspect-[2/3] bg-[var(--muted)]/50" />
              <div className="aspect-[2/3] bg-gold/80" />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-muted">
              Show up · Paint it · On schedule
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust band ───────────────────────────────────────────────────── */
function TrustBand() {
  return (
    <StatsBand
      stats={[
        { value: TRUST.cslb, label: "California contractors license" },
        { value: TRUST.insurance, label: "General liability coverage" },
        { value: TRUST.yearsOperating, label: "Bay Area operator" },
      ]}
    />
  );
}

/* ── Services ─────────────────────────────────────────────────────── */
function ServicesBlock() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <div className="border-b border-line/60 pb-8">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            Two services. Done well, at portfolio scale.
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-px bg-line/60 sm:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 120}>
            <article className="h-full bg-background p-10">
              <p className="eyebrow">{s.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-normal tracking-tight md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/80">
                {s.summary}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                {s.subservices.map((sub) => (
                  <li key={sub.title} className="flex gap-3">
                    <span aria-hidden className="mt-2 inline-block h-px w-3 flex-none bg-gold/70" />
                    <span>{sub.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/services/${s.slug}`}
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
                >
                  <span className="swipe-underline">More about this service</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href="/estimate"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-bright"
                >
                  <span className="swipe-underline">Estimate this job</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Estimator promo ──────────────────────────────────────────────── */
function EstimatorPromo() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <div>
              <p className="eyebrow">Estimator</p>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                A portfolio quote without the back-and-forth.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                Paste a list of unit addresses and square footage, mark each
                as interior or exterior, and the estimator returns a portfolio
                range you can share with your boss. Final pricing requires a
                walk-through, but this gets you a real number in under a minute.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted">
                <li>· Interior or exterior</li>
                <li>· Volume discount built in</li>
                <li>· Range you can share upstream</li>
                <li>· Sent to your inbox</li>
              </ul>
              <div className="mt-9">
                <TiltLink
                  href="/estimate"
                  max={5}
                  scale={1.02}
                  className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:bg-gold-bright"
                >
                  Open the estimator
                </TiltLink>
              </div>
            </div>
          </Reveal>

          {/* Mock estimator output. Decorative. */}
          <Reveal delay={150}>
            <div className="border border-line/60 bg-background p-7 font-mono text-xs leading-relaxed text-muted">
              <div className="flex items-center justify-between border-b border-line/60 pb-3 text-foreground/80">
                <span>Portfolio estimate</span>
                <span className="text-gold">DRAFT</span>
              </div>
              <table className="mt-4 w-full">
                <thead className="text-[0.65rem] uppercase tracking-[0.18em] text-muted/70">
                  <tr className="border-b border-line/60">
                    <th className="py-2 text-left font-normal">Unit</th>
                    <th className="py-2 text-right font-normal">Sqft</th>
                    <th className="py-2 text-right font-normal">Estimate</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/80 tabular-nums">
                  <tr className="border-b border-line/30">
                    <td className="py-2">1224 Mason · 2A</td>
                    <td className="py-2 text-right">820</td>
                    <td className="py-2 text-right">$4,100</td>
                  </tr>
                  <tr className="border-b border-line/30">
                    <td className="py-2">1224 Mason · 2B</td>
                    <td className="py-2 text-right">680</td>
                    <td className="py-2 text-right">$3,400</td>
                  </tr>
                  <tr className="border-b border-line/30">
                    <td className="py-2">1224 Mason · 3A</td>
                    <td className="py-2 text-right">910</td>
                    <td className="py-2 text-right">$4,550</td>
                  </tr>
                  <tr className="border-b border-line/30">
                    <td className="py-2">1224 Mason · 3B</td>
                    <td className="py-2 text-right">680</td>
                    <td className="py-2 text-right">$3,400</td>
                  </tr>
                </tbody>
                <tfoot className="text-foreground tabular-nums">
                  <tr>
                    <td className="pt-4">Subtotal</td>
                    <td className="pt-4 text-right">3,090</td>
                    <td className="pt-4 text-right">$15,450</td>
                  </tr>
                  <tr className="text-gold">
                    <td className="py-1">Volume discount · 4 units</td>
                    <td></td>
                    <td className="text-right">−$0</td>
                  </tr>
                  <tr className="border-t border-line/60 text-foreground">
                    <td className="pt-3">Portfolio range</td>
                    <td></td>
                    <td className="pt-3 text-right text-gold">$13.1k – $17.8k</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Case studies (placeholders) ──────────────────────────────────── */
const CASE_STUDIES = [
  { headline: "18 units, 12 days", meta: "Multi-family turnover · Marin", detail: "Two crews running in parallel. All units back on market before the lease cycle." },
  { headline: "32,000 sqft exterior", meta: "Low-rise commercial · SF", detail: "Power wash, prep, two coats. Single weather window, on schedule." },
  { headline: "Common areas, occupied building", meta: "Multi-family · East Bay", detail: "Lobby, halls, stairwells repainted around residents. Zero callback." },
];

function CaseStudies() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <div className="border-b border-line/60 pb-8">
          <p className="eyebrow">Recent work</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            Numbers, not pretty rooms.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Three representative jobs. Real case studies and PM logos go here
            once we get permission from clients to publish them.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-px bg-line/60 sm:grid-cols-3">
        {CASE_STUDIES.map((c, i) => (
          <Reveal key={c.headline} delay={i * 110}>
            <div className="h-full bg-background p-8">
              <p className="eyebrow text-muted">{c.meta}</p>
              <p className="mt-5 text-3xl font-light tracking-tight tabular-nums text-foreground">
                {c.headline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {c.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── For Property Managers ────────────────────────────────────────── */
function ForPm() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="eyebrow">For property managers</p>
              <h2 className="mt-4 text-balance text-3xl font-light tracking-tight md:text-5xl">
                Built by an operator who turns her own portfolio.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                We&rsquo;ve been on your side of the table. Scopes are written
                so your accounting can drop them in. Timelines match a lease
                cycle. Crews respect an occupied building.
              </p>
              <div className="mt-9">
                <Link
                  href="/about#property-managers"
                  className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-bright"
                >
                  <span className="swipe-underline">See how we work with PMs</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ul className="grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-2">
              <li className="bg-background p-7">
                <p className="eyebrow">Response SLA</p>
                <p className="mt-4 text-2xl font-light tracking-tight text-foreground">
                  {TRUST.responseSla}
                </p>
              </li>
              <li className="bg-background p-7">
                <p className="eyebrow">Volume</p>
                <p className="mt-4 text-2xl font-light tracking-tight text-foreground">
                  {TRUST.unitsPainted}
                </p>
              </li>
              <li className="bg-background p-7">
                <p className="eyebrow">Vendor packet</p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  W-9, COI, contractor license, references. One PDF, sent on
                  request.
                </p>
              </li>
              <li className="bg-background p-7">
                <p className="eyebrow">Billing</p>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  PO-friendly. Net-30 on portfolio work, card on smaller jobs.
                </p>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <div className="max-w-2xl border-b border-line/60 pb-8">
          <p className="eyebrow">In their words</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            What clients are saying.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Placeholder quotes. We&rsquo;ll swap these for real, named
            references once we have permission from PMs and landlords to
            publish their feedback.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-px bg-line/60 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.author + i} delay={i * 110}>
            <figure className="h-full bg-background p-8">
              <span aria-hidden className="font-display text-5xl leading-none text-gold/70">
                &ldquo;
              </span>
              <blockquote className="mt-2 text-lg font-light leading-snug tracking-tight text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
                {t.author} · {t.meta}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-3xl px-6 py-24">
        <Reveal>
          <div className="text-center">
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
              Frequently asked
            </h2>
          </div>
        </Reveal>
        <div className="mt-12">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <details className="faq" open={i === 0}>
                <summary className="font-normal tracking-tight">{f.q}</summary>
                <p className="pb-6 text-base leading-relaxed text-muted">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section className="border-t border-line/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 text-center">
        <Reveal>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-light leading-tight tracking-tight md:text-6xl">
            Have a portfolio to repaint?
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Reveal delay={150}>
            <TiltLink
              href="/estimate"
              max={5}
              scale={1.02}
              className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:bg-gold-bright"
            >
              Run an estimate
            </TiltLink>
          </Reveal>
          <Reveal delay={300}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
            >
              <span className="swipe-underline">Talk to us</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
