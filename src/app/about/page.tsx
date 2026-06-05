import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { businessLd, breadcrumbLd } from "@/lib/structured-data";
import { TRUST, PM_ENGAGEMENT, COMMITMENTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SF Bay Paint & Design is run by Leslie Burnley, founder of SF Bay Rental Co. The painting arm grew out of the unit-turnover and exterior work her own portfolio kept needing.",
  alternates: { canonical: "/about" },
};

export default async function About() {
  const { leslie, contact, socials, locations } = await getSiteContent();
  const base = getSiteUrl();
  return (
    <>
      <JsonLd data={businessLd(base, { contact, leslie, socials, locations })} />
      <JsonLd
        data={breadcrumbLd(base, [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20">
            <h1 className="max-w-5xl text-5xl font-light leading-[1.04] tracking-tight md:text-7xl lg:text-8xl">
              Built by an operator who turns her own portfolio.
            </h1>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-6 py-20">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
            {leslie.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* ── For property managers ───────────────────────────────────
            Content moved here from the (deleted) /for-property-managers
            route. The About page is now the home for PM-facing context. */}
        <section id="property-managers" className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-3xl">
              <p className="eyebrow">For property managers</p>
              <h2 className="mt-4 text-balance text-3xl font-light tracking-tight md:text-5xl lg:text-6xl">
                A painter who has been on your side of the table.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/80">
                SF Bay Paint &amp; Design is run by an operator who also
                manages residential property across the Bay. Scopes are written
                for your accounting, timing matches a lease cycle, and crews
                respect an occupied building.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-3">
              <div className="bg-background p-7">
                <p className="eyebrow">Response SLA</p>
                <p className="mt-3 text-2xl font-light tracking-tight text-foreground">
                  {TRUST.responseSla}
                </p>
              </div>
              <div className="bg-background p-7">
                <p className="eyebrow">Insurance</p>
                <p className="mt-3 text-2xl font-light tracking-tight text-foreground">
                  {TRUST.insurance}
                </p>
              </div>
              <div className="bg-background p-7">
                <p className="eyebrow">Volume</p>
                <p className="mt-3 text-2xl font-light tracking-tight text-foreground">
                  {TRUST.unitsPainted}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How a portfolio engagement runs ──────────────────────────── */}
        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <p className="eyebrow">How a portfolio engagement runs</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl lg:text-6xl">
              Quote to invoice in four steps.
            </h2>
            <ol className="mt-12 grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-4">
              {PM_ENGAGEMENT.map((p, i) => (
                <li key={p.n} className="bg-background p-8">
                  <Reveal delay={150 + i * 100}>
                    <p className="text-2xl font-light tabular-nums text-gold/80">
                      {p.n}
                    </p>
                    <h3 className="mt-4 text-lg font-normal tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Service commitments ──────────────────────────────────────── */}
        <section className="border-t border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="eyebrow">What we commit to</p>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                The same on every job.
              </h2>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-2">
              {COMMITMENTS.map((c, i) => (
                <li key={c} className="bg-background p-8">
                  <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-foreground/85">
                    {c}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-light leading-tight tracking-tight md:text-5xl">
              Start with an estimate.
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
              >
                Contact us for a quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
