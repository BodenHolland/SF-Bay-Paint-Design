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
  CATEGORIES,
  CONTACT,
  FAQS,
  LESLIE,
  LOCATIONS,
  SOCIALS,
  TESTIMONIALS,
  TRUST,
  servicesByCategory,
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
                href="/contact"
                max={5}
                scale={1.02}
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:bg-gold-bright"
              >
                Contact us for a quote
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

          {/* Decorative swatch block — three brand neutrals plus the
              champagne accent. Reads industrial, not editorial. */}
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

/* ── Services (flat catalog grouped by category) ──────────────────── */
function ServicesBlock() {
  return (
    <section id="services" className="mx-auto w-full max-w-6xl px-6 py-24">
      <Reveal>
        <div className="border-b border-line/60 pb-8">
          <p className="eyebrow">What we do</p>
          <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
            The painting trades, done at portfolio scale.
          </h2>
        </div>
      </Reveal>

      {CATEGORIES.map((cat, ci) => {
        const items = servicesByCategory(cat.key);
        return (
          <div key={cat.key} className={ci === 0 ? "mt-12" : "mt-16"}>
            <Reveal>
              <p className="eyebrow">{cat.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-light tracking-tight md:text-3xl">
                {cat.title} painting
              </h3>
            </Reveal>
            <div className="mt-8 grid gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s, i) => (
                <Reveal key={s.slug} delay={(i % 3) * 80}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col bg-background p-7 transition-colors hover:bg-charcoal/40"
                  >
                    <p className="text-sm uppercase tracking-[0.14em] text-gold transition-colors group-hover:text-gold-bright">
                      {s.title}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">
                      {s.summary}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/60">
                      <span className="swipe-underline">Learn more</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}

      <Reveal delay={150}>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line/60 pt-8">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-bright"
          >
            <span className="swipe-underline">Full services catalog</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright"
          >
            Contact us for a quote
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Case studies (placeholders) ──────────────────────────────────── */
const CASE_STUDIES = [
  {
    headline: "18 units, 12 days",
    meta: "Multi-family turnover · Marin",
    detail:
      "Two crews running in parallel. All units back on market before the lease cycle.",
  },
  {
    headline: "32,000 sqft exterior",
    meta: "Low-rise commercial · SF",
    detail:
      "Power wash, prep, two coats. Single weather window, on schedule.",
  },
  {
    headline: "Common areas, occupied building",
    meta: "Multi-family · East Bay",
    detail:
      "Lobby, halls, stairwells repainted around residents. Zero callback.",
  },
];

function CaseStudies() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
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
      </div>
    </section>
  );
}

/* ── For Property Managers ────────────────────────────────────────── */
function ForPm() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <p className="eyebrow">For property managers</p>
            <h2 className="mt-4 text-balance text-3xl font-light tracking-tight md:text-5xl">
              Built by an operator who turns her own portfolio.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              We&rsquo;ve been on your side of the table. Scopes are written so
              your accounting can drop them in. Timelines match a lease cycle.
              Crews respect an occupied building.
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
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
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
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-24">
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
              <p className="pb-6 text-base leading-relaxed text-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 text-center">
        <Reveal>
          <p className="eyebrow">Next step</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-light leading-tight tracking-tight md:text-6xl">
            Have a property to repaint?
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Reveal delay={150}>
            <TiltLink
              href="/contact"
              max={5}
              scale={1.02}
              className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:bg-gold-bright"
            >
              Contact us for a quote
            </TiltLink>
          </Reveal>
          <Reveal delay={300}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
            >
              <span className="swipe-underline">Browse services</span>
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
