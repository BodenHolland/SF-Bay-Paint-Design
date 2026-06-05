import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";
import { Estimator } from "./estimator";

export const metadata: Metadata = {
  title: "Portfolio estimator",
  description:
    "Paste a list of unit addresses and square footage, pick a paint tier, and get a portfolio estimate from SF Bay Paint & Design.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Estimator", path: "/estimate" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-20">
            <p className="eyebrow rise">Estimator</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              A portfolio quote, without the back-and-forth.
            </h1>
            <p
              className="rise mt-5 max-w-2xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Add a row per unit. Address (or label), square footage, interior
              or exterior, paint tier. The estimate updates live and includes
              the volume discount automatically. Final pricing requires a
              walk-through; this is a planning number you can share upstream.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <Estimator />
        </section>

        <section className="border-t border-line/60 bg-charcoal/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
            <p className="eyebrow">Note</p>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
              Rates are configured per surface and paint tier and currently
              reflect Bay Area averages with two coats of paint and standard
              prep included. We&rsquo;ll tune the numbers as we gather more
              data from completed jobs.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
