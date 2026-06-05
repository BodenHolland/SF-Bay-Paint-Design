import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BayAreaMap } from "@/components/bay-area-map";
import { WorkGallery } from "@/components/work-gallery";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { businessLd, websiteLd, faqLd } from "@/lib/structured-data";
import {
  CATEGORIES,
  CONTACT,
  FAQS,
  LESLIE,
  LOCATIONS,
  SOCIALS,
  TESTIMONIALS,
  TRUST,
  servicesByCategory,
} from "@/lib/site";

const WORK_PHOTOS = [
  { src: "/photos/work/exterior.jpg", alt: "Exterior repaint" },
  { src: "/photos/work/kitchen.jpg", alt: "Kitchen interior" },
  { src: "/photos/work/alta-street.jpg", alt: "Alta Street project" },
  {
    src: "/photos/work/modern-orange-living-room.jpg",
    alt: "Modern living room with orange accent wall",
  },
  {
    src: "/photos/work/teal-living-room.jpg",
    alt: "Mid-century living room with teal accent wall",
  },
  { src: "/photos/work/dining-area.jpg", alt: "Dining area interior" },
  { src: "/photos/work/marketing.jpg", alt: "Recent project" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const base = getSiteUrl();
  return (
    <>
      <JsonLd
        data={businessLd(base, {
          contact: CONTACT,
          leslie: LESLIE,
          socials: SOCIALS,
          locations: LOCATIONS,
        })}
      />
      <JsonLd data={websiteLd(base)} />
      <JsonLd data={faqLd(FAQS)} />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <Services />
        <Trust />
        <Work />
        <Testimonials />
        <ForPm />
        <Locations />
        <Faq />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="rise relative aspect-[4/5] w-full overflow-hidden lg:aspect-[5/6]">
          <Image
            src="/photos/hero.jpg"
            alt="SF Bay Paint & Design — completed project"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h1
            className="rise text-4xl font-bold leading-[1.03] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            The Bay Area&rsquo;s painting and turnover crew.
          </h1>
          <p
            className="rise mt-6 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Interior, exterior, and unit turnovers for property managers,
            landlords, and building owners. Run by an operator who manages her
            own portfolio, so the scopes, timing, and paperwork match how
            property managers actually work.
          </p>
          <div
            className="rise mt-9 flex flex-wrap items-center gap-x-5 gap-y-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
            >
              Contact us for a quote
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
            >
              <span className="swipe-underline">More about us</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────────────
   Three-up photo cards per CertaPro / M&B layout: kitchen-style cards
   with the service title as a centered overlay label. Grouped by
   category with section headers. Placeholders for real photos. */
function Services() {
  return (
    <section id="services" className="bg-charcoal/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Our services include
          </h2>
        </div>

        {CATEGORIES.map((cat) => {
          const items = servicesByCategory(cat.key);
          return (
            <div key={cat.key} className="mt-16">
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                {cat.title} painting
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group relative block aspect-[4/5] overflow-hidden"
                  >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent transition-opacity group-hover:from-black/80" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-xl font-bold tracking-tight md:text-2xl">
                        {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-white/85">
                        {s.summary.split(".")[0]}.
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Recent work ──────────────────────────────────────────────────── */
function Work() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Our work
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          A few recent jobs across the Bay Area.
        </p>
      </div>
      <WorkGallery photos={WORK_PHOTOS} />
    </section>
  );
}

/* ── Trust band ───────────────────────────────────────────────────── */
function Trust() {
  const stats = [
    { v: "Licensed & Insured", l: "California painting contractor" },
    { v: "Free Estimates", l: "Quotes within 48 hours" },
    { v: "Bay Area Owned", l: "Marin-based, serving the SF Bay Area" },
  ];
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-line px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.l} className="px-4 py-10 text-center sm:py-14">
            <div className="text-2xl font-bold tabular-nums text-foreground md:text-3xl">
              {s.v}
            </div>
            <p className="mx-auto mt-3 max-w-[16rem] text-sm text-muted">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── For Property Managers ────────────────────────────────────────── */
function ForPm() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src="/photos/operator.jpg"
            alt="SF Bay Paint & Design — operator"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Built by an operator who turns her own portfolio.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/75 md:text-lg">
            We&rsquo;ve been on the property-manager side of the table. Scopes
            are written so your accounting can drop them in. Timelines match a
            lease cycle. Crews respect an occupied building.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <li>
              <p className="font-bold uppercase tracking-wider text-gold">Response SLA</p>
              <p className="mt-1 text-foreground/85">{TRUST.responseSla}</p>
            </li>
            <li>
              <p className="font-bold uppercase tracking-wider text-gold">Volume</p>
              <p className="mt-1 text-foreground/85">{TRUST.unitsPainted}</p>
            </li>
            <li>
              <p className="font-bold uppercase tracking-wider text-gold">Billing</p>
              <p className="mt-1 text-foreground/85">PO-friendly, net-30</p>
            </li>
            <li>
              <p className="font-bold uppercase tracking-wider text-gold">Vendor packet</p>
              <p className="mt-1 text-foreground/85">W-9, COI, license, references</p>
            </li>
          </ul>
          <Link
            href="/about#property-managers"
            className="mt-10 inline-flex items-center justify-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
          >
            More about us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Locations ────────────────────────────────────────────────────── */
function Locations() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="eyebrow">Where we work</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Across the SF Bay Area.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
            Most work concentrates in Marin and San Francisco. Crews travel across
            the counties below.
          </p>
        </div>
        <div className="mt-14">
          <BayAreaMap />
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="bg-charcoal/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Satisfied customers
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">
          Placeholder quotes. We&rsquo;ll swap these for real, named references
          once we have permission from PMs and landlords to publish their feedback.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.author} className="text-center">
              <blockquote className="text-base leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-base font-bold text-gold">
                {t.author}
              </figcaption>
              <p className="mt-1 text-xs text-muted">{t.meta}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────── */
function Faq() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        Frequently asked
      </h2>
      <div className="mt-12">
        {FAQS.map((f, i) => (
          <details key={f.q} className="faq" open={i === 0}>
            <summary>{f.q}</summary>
            <p className="pb-6 text-base leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <section className="bg-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight text-background md:text-5xl">
          Have a property to repaint?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-background/75">
          Quotes go out within 48 hours of a walk-through or a complete email
          request.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-gold px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold-bright"
          >
            Contact us for a quote
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-background/85 transition-colors hover:text-gold-bright"
          >
            <span className="swipe-underline">Browse services</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
