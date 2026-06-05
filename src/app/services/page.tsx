import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { CATEGORIES, servicesByCategory } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior and exterior painting, power washing, stucco repair, cabinet repainting, drywall repair, and lead-safe work for property managers and landlords across the SF Bay Area.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
            <p className="eyebrow rise">Services</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Our services.
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Interior and exterior painting across the San Francisco Bay
              Area, from single-unit turnovers to whole-building exteriors.
              Quotes within 48 hours.
            </p>
          </div>
        </section>

        {CATEGORIES.map((cat, ci) => (
          <section
            key={cat.key}
            className={`${ci > 0 ? "border-t border-line/60" : ""} ${ci % 2 === 1 ? "bg-charcoal/30" : ""}`}
          >
            <div className="mx-auto w-full max-w-6xl px-6 py-20">
              <Reveal>
                <div className="border-b border-line/60 pb-8">
                  <p className="eyebrow">{cat.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-light tracking-tight md:text-5xl">
                    {cat.title} painting
                  </h2>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByCategory(cat.key).map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 80}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-charcoal/40"
                    >
                      <p className="text-sm uppercase tracking-[0.14em] text-gold transition-colors group-hover:text-gold-bright">
                        {s.title}
                      </p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                        {s.summary}
                      </p>
                      <p className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/60">
                        <span className="swipe-underline">More about this service</span>
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
          </section>
        ))}

        {/* Closing CTA */}
        <section className="border-t border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-light leading-tight tracking-tight md:text-5xl">
              Have a job? Send us the details.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Quotes go out within 48 hours of a walk-through or a complete
              email request.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright"
              >
                Contact us for a quote
              </Link>
              <Link
                href="/about#property-managers"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
              >
                <span className="swipe-underline">For property managers</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
