import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { CATEGORIES, LOCATIONS, servicesByCategory } from "@/lib/site";

type Params = { county: string };

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function generateStaticParams(): Params[] {
  return LOCATIONS.map((c) => ({ county: slug(c) }));
}

function findCounty(s: string) {
  return LOCATIONS.find((c) => slug(c) === s);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { county } = await params;
  const name = findCounty(county);
  if (!name) return {};
  return {
    title: `Painting in ${name} County`,
    description: `Interior and exterior painting, unit turnovers, and commercial work in ${name} County, California.`,
    alternates: { canonical: `/locations/${slug(name)}` },
  };
}

export default async function CountyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { county } = await params;
  const name = findCounty(county);
  if (!name) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: `${name} County`, path: `/locations/${slug(name)}` },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
            <p className="eyebrow rise">{name} County</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Painting in {name} County.
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Interior turnovers, multi-family common areas, exterior repaints,
              and single-family exteriors. Crews based in the Bay, scoping
              within {name} County and the surrounding region.
            </p>
            <div
              className="rise mt-9 flex flex-wrap items-center gap-x-5 gap-y-7"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright"
              >
                Contact us for a quote
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
              >
                <span className="swipe-underline">See services</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {CATEGORIES.map((cat, ci) => (
          <section
            key={cat.key}
            className={ci % 2 === 1 ? "bg-charcoal/30" : ""}
          >
            <div className="mx-auto w-full max-w-6xl px-6 py-16">
              <p className="eyebrow">{cat.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-light tracking-tight md:text-3xl">
                {cat.title} painting in {name} County
              </h2>
              <div className="mt-8 grid gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
                {servicesByCategory(cat.key).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col bg-background p-7 transition-colors hover:bg-charcoal/40"
                  >
                    <p className="text-sm uppercase tracking-[0.14em] text-gold transition-colors group-hover:text-gold-bright">
                      {s.title}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">
                      {s.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="eyebrow">Other counties served</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground/75">
              {LOCATIONS.filter((c) => c !== name).map((c) => (
                <li key={c}>
                  <Link
                    href={`/locations/${slug(c)}`}
                    className="hover:text-gold-bright"
                  >
                    <span className="swipe-underline">{c} County</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
