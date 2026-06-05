"use client";

import { useEffect } from "react";

// Enables smooth in-page scrolling, but only AFTER the initial load settles.
// The browser restores scroll position on refresh by jumping there; if
// `scroll-behavior: smooth` is already active, that jump gets animated and the
// page appears to scroll by itself. Deferring past restoration keeps refreshes
// instant while anchor-link navigation still glides.
export function SmoothScroll() {
  useEffect(() => {
    // On a hard reload, force the page to start at the top before the
    // body fade-in plays, so the hero is never partway scrolled.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      document.documentElement.dataset.smooth = "true";
    }, 150);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
