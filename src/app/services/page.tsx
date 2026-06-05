import type { Metadata } from "next";
import Image from "next/image";
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
            <h1
              className="rise max-w-5xl text-5xl font-light leading-[1.04] tracking-tight md:text-7xl lg:text-8xl"
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
            className={ci > 0 ? "border-t border-line/60" : ""}
          >
            <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
              <Reveal>
                <div className="text-center">
                  <h2 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
                    {cat.title} painting
                  </h2>
                </div>
              </Reveal>
              <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByCategory(cat.key).map((s, i) => (
                  <Reveal key={s.slug} delay={(i % 3) * 80}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col text-center"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        {s.photo ? (
                          <Image
                            src={s.photo}
                            alt={s.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div
                            className="photo-ph absolute inset-0"
                            data-label={s.title}
                            aria-hidden
                          />
                        )}
                      </div>
                      <h3 className="mt-7 text-xl font-light tracking-tight text-foreground transition-colors group-hover:text-gold md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                        {s.summary}
                      </p>
                      <p className="mt-5 inline-flex items-center justify-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/55">
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
        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28 text-center">
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
                className="inline-flex items-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
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
