import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { SERVICES, PROCESS, servicesByCategory } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const categoryLabel = service.category === "exterior" ? "Exterior" : "Interior";
  const related = servicesByCategory(service.category).filter(
    (s) => s.slug !== service.slug,
  );

  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
            <p className="eyebrow rise">{categoryLabel} services</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              {service.title}
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              {service.summary}
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
                <span className="swipe-underline">All services</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Detail body */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <div>
                <p className="eyebrow">About this service</p>
                <p className="mt-6 text-lg leading-relaxed text-foreground/85">
                  {service.body}
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <aside className="border border-line/60 bg-charcoal/30 p-7">
                <p className="eyebrow">At a glance</p>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">Category</dt>
                    <dd className="mt-2 text-foreground/85">
                      {categoryLabel} painting service
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">Typical customer</dt>
                    <dd className="mt-2 text-foreground/85">
                      Property managers, landlords, building owners. Single-family welcome on exterior work.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">Lead time</dt>
                    <dd className="mt-2 text-foreground/85">
                      Quotes within 48 hours. Crews typically start within one to two weeks.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">Pricing</dt>
                    <dd className="mt-2 text-foreground/85">
                      Quoted after a walk-through. Email a unit list or building details to start.
                    </dd>
                  </div>
                </dl>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* 5-step process */}
        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <Reveal>
              <p className="eyebrow">How every job runs</p>
              <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
                Five steps, same on every property.
              </h2>
            </Reveal>
            <ol className="mt-10 grid grid-cols-1 gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((p, i) => (
                <li key={p.n} className="bg-background p-6">
                  <Reveal delay={150 + i * 80}>
                    <p className="text-2xl font-light tabular-nums text-gold/80">
                      {p.n}
                    </p>
                    <h3 className="mt-3 text-base font-normal tracking-tight">
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

        {/* Related services in the same category */}
        {related.length > 0 && (
          <section className="border-t border-line/60">
            <div className="mx-auto w-full max-w-6xl px-6 py-16">
              <Reveal>
                <p className="eyebrow">Other {categoryLabel.toLowerCase()} services</p>
              </Reveal>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${r.slug}`}
                      className="group inline-flex items-center gap-2 text-foreground/85 transition-colors hover:text-gold-bright"
                    >
                      <span className="swipe-underline">{r.title}</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-light leading-tight tracking-tight md:text-5xl">
              Ready for a number?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Email a unit list or building details and we&rsquo;ll respond
              within 48 hours.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright"
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
