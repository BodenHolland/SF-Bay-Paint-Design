"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONTACT, NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 md:py-5">
        <Link href="/" aria-label="SF Bay Paint & Design home" className="shrink-0">
          <Image
            src="/logo.png"
            alt="SF Bay Paint & Design"
            width={384}
            height={200}
            preload
            className="h-20 w-auto md:h-28"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[0.95rem] font-medium text-foreground/85 transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={CONTACT.phoneHref}
            className="ml-2 whitespace-nowrap text-[0.95rem] font-medium tabular-nums text-foreground/85 transition-colors hover:text-gold"
          >
            {CONTACT.phone}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`grid overflow-hidden border-t border-line/60 transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav
          inert={!open}
          aria-hidden={!open}
          className={`min-h-0 overflow-hidden bg-background transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base font-medium text-foreground/85 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={CONTACT.phoneHref}
                className="block py-2 text-base font-medium tabular-nums text-foreground/85 hover:text-gold"
              >
                {CONTACT.phone}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
