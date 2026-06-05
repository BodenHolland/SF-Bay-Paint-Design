import Image from "next/image";
import Link from "next/link";
import { LEGAL, NAV } from "@/lib/site";
import { getSiteContent } from "@/lib/content";
import { CurrentYear } from "@/components/current-year";

export async function SiteFooter() {
  const { contact, socials, locationsClause } = await getSiteContent();
  return (
    <footer id="contact" className="border-t border-line/60 bg-charcoal/30">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
          <div className="text-center md:text-left">
            <Image
              src="/logo.png"
              alt="SF Bay Paint & Design"
              width={560}
              height={292}
              loading="eager"
              draggable={false}
              className="mx-auto h-28 w-auto select-none md:mx-0 md:h-44"
            />
            <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-muted md:mx-0">
              Painting and turnovers for Bay Area property portfolios.
            </p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-foreground/75 transition-colors hover:text-gold-bright"
                  >
                    <span className="swipe-underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-foreground/75">
              <li>
                <a href={contact.phoneHref} className="inline-block hover:text-gold-bright">
                  <span className="swipe-underline">{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="inline-block hover:text-gold-bright">
                  <span className="swipe-underline">{contact.email}</span>
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[0.7rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-gold-bright"
                  >
                    <span className="swipe-underline">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Serving {locationsClause}, and beyond.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row sm:items-start">
          <div className="space-y-1 text-xs tracking-wide text-muted">
            <p>
              © <CurrentYear initial={new Date().getFullYear()} /> {LEGAL.entity}. All rights reserved.
            </p>
            <p>
              {LEGAL.address.street}, {LEGAL.address.city}, {LEGAL.address.region} {LEGAL.address.postalCode}
            </p>
          </div>
          <p className="text-xs tracking-wide text-muted">
            CA Secretary of State · File {LEGAL.fileNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
