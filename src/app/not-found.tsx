import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiltLink } from "@/components/tilt-link";
import { RedirectHome } from "@/components/redirect-home";

export const metadata: Metadata = {
  title: "Page not found · SF Bay Paint & Design",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-28">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-balance text-5xl font-light leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
            We couldn&rsquo;t find that page.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            The page you&rsquo;re looking for may have moved. Use the links
            below and we&rsquo;ll get you back on track.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <TiltLink
              href="/"
              max={5}
              scale={1.02}
              className="inline-flex items-center bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-gold"
            >
              Back home
            </TiltLink>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/85 transition-colors hover:text-gold-bright"
            >
              <span className="swipe-underline">Contact us</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
          <RedirectHome seconds={5} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
