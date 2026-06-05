import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { SERVICES, PROCESS } from "@/lib/site";

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
            <p className="eyebrow rise">{service.eyebrow}</p>
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
          </div>
        </section>

        {/* Sub-services as a dense block grid — the catalog. */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal>
            <p className="eyebrow">Sub-services</p>
            <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
              What this covers.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px border border-line/60 bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
            {service.subservices.map((sub, i) => (
              <Reveal key={sub.title} delay={(i % 3) * 80}>
                <article className="h-full bg-background p-7">
                  <p className="text-sm uppercase tracking-[0.14em] text-gold">
                    {sub.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                    {sub.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* The 5-step process, applied to every job in either category. */}
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

        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-light leading-tight tracking-tight md:text-5xl">
              Ready for a number you can share?
            </h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-3 bg-gold px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-background transition-colors hover:bg-gold-bright"
              >
                Run a portfolio estimate
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
              >
                <span className="swipe-underline">Talk to us</span>
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
