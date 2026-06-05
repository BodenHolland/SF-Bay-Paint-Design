import Image from "next/image";
import Link from "next/link";
import { LEGAL, NAV } from "@/lib/site";
import { getSiteContent } from "@/lib/content";
import { CurrentYear } from "@/components/current-year";

export async function SiteFooter() {
  const { contact } = await getSiteContent();
  return (
    <footer id="contact" className="border-t border-line bg-charcoal/40">
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
              className="mx-auto h-20 w-auto select-none md:mx-0 md:h-28"
            />
            <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-muted md:mx-0">
              Painting and turnovers for Bay Area property portfolios.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-foreground">
              Explore
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-foreground/75 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-foreground">
              Get in touch
            </p>
            <ul className="mt-5 flex flex-col gap-3 text-[0.95rem] text-foreground/75">
              <li>
                <a href={contact.phoneHref} className="hover:text-gold">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="hover:text-gold break-all">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-start">
          <div className="space-y-1 text-xs text-muted">
            <p>
              © <CurrentYear initial={new Date().getFullYear()} /> {LEGAL.entity}. All rights reserved.
            </p>
            <p>
              {LEGAL.address.street}, {LEGAL.address.city}, {LEGAL.address.region} {LEGAL.address.postalCode}
            </p>
          </div>
          <p className="text-xs text-muted">
            CA Secretary of State · File {LEGAL.fileNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
