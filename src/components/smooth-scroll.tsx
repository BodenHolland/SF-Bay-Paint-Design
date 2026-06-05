"use client";

import { useEffect } from "react";

// Enables smooth in-page scrolling, but only AFTER the initial load settles.
// The browser restores scroll position on refresh by jumping there; if
// `scroll-behavior: smooth` is already active, that jump gets animated and the
// page appears to scroll by itself. Deferring past restoration keeps refreshes
// instant while anchor-link navigation still glides.
export function SmoothScroll() {
  useEffect(() => {
    // After hydration, Next's focus management can scroll the focusable
    // <main id="main-content" tabIndex={-1}> to the top of the viewport,
    // which shoves the sticky header to the very edge and makes the page
    // look like it loaded scrolled down. If there's no in-page hash target,
    // actively pin the scroll back to the top across the next few frames so
    // it beats any post-hydration focus scroll.
    if (!window.location.hash) {
      const pin = () => window.scrollTo(0, 0);
      pin();
      const r1 = requestAnimationFrame(() => {
        pin();
        requestAnimationFrame(pin);
      });
      // Belt-and-suspenders: catch any late scroll within the first beat.
      const t0 = window.setTimeout(pin, 60);
      window.addEventListener("load", pin, { once: true });
      // Clean up the rAF/timeout if we unmount immediately.
      const cleanupEarly = () => {
        cancelAnimationFrame(r1);
        window.clearTimeout(t0);
      };
      // Turn on smooth scrolling only after the load settles, so anchor
      // clicks glide while refreshes stay instant.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return cleanupEarly;
      }
      const t = window.setTimeout(() => {
        document.documentElement.dataset.smooth = "true";
      }, 200);
      return () => {
        cleanupEarly();
        window.clearTimeout(t);
        window.removeEventListener("load", pin);
      };
    }

    // A hash IS present — let the browser scroll to the anchor, just enable
    // smooth scrolling afterward.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      document.documentElement.dataset.smooth = "true";
    }, 200);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
