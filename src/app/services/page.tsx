import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior and exterior painting for property managers, landlords, and building owners across the SF Bay Area.",
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
              Two services. Done well, at portfolio scale.
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              We don&rsquo;t consult on color or design. We paint, on schedule,
              for the property managers and landlords running real portfolios.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-px bg-line/60 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 120}>
                <article className="h-full bg-background p-10">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-normal tracking-tight md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-foreground/80">
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
                  <div className="mt-8 flex flex-wrap gap-5">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
                    >
                      <span className="swipe-underline">Read more</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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
      </main>
      <SiteFooter />
    </>
  );
}
