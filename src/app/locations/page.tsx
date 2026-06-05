import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { LOCATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Counties served by SF Bay Paint & Design across the San Francisco Bay Area.",
  alternates: { canonical: "/locations" },
};

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
            <p className="eyebrow rise">Locations</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Working across the SF Bay Area.
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Most of our work is concentrated in Marin and San Francisco, but
              crews travel across the counties below.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((county, i) => (
              <Reveal key={county} delay={(i % 3) * 80}>
                <Link
                  href={`/locations/${slug(county)}`}
                  className="group flex h-full items-center justify-between bg-background px-6 py-8 transition-colors hover:bg-charcoal/40"
                >
                  <div>
                    <p className="eyebrow text-muted group-hover:text-gold-bright">
                      County
                    </p>
                    <p className="mt-3 text-2xl font-light tracking-tight">
                      {county}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="text-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-bright"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
