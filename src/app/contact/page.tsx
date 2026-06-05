import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { getSiteContent } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { breadcrumbLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SF Bay Paint & Design about unit turnovers, commercial interiors, exterior repaints, or onboarding us as a vendor.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { contact, locationsClause } = await getSiteContent();
  return (
    <>
      <JsonLd
        data={breadcrumbLd(getSiteUrl(), [
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section className="border-b border-line/60">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-20">
            <p className="eyebrow rise">Get in touch</p>
            <h1
              className="rise mt-5 max-w-3xl text-4xl font-light leading-[1.08] tracking-tight md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Tell us about the property.
            </h1>
            <p
              className="rise mt-5 max-w-xl text-base leading-relaxed text-muted"
              style={{ animationDelay: "0.2s" }}
            >
              Unit count, building type, timing, and anything you have on prep
              or paint preferences. We reply by email within one business day,
              two at most.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-10">
              <Reveal>
                <div>
                  <p className="eyebrow">Email</p>
                  <a
                    href={contact.emailHref}
                    className="mt-3 block text-lg tracking-tight text-foreground/90 transition-colors hover:text-gold-bright"
                  >
                    {contact.email}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={90}>
                <div>
                  <p className="eyebrow">Phone</p>
                  <a
                    href={contact.phoneHref}
                    className="mt-3 block text-lg tracking-tight text-foreground/90 transition-colors hover:text-gold-bright"
                  >
                    {contact.phone}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div>
                  <p className="eyebrow">Serving</p>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-muted">
                    {locationsClause}, and beyond across the San Francisco Bay
                    Area.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
