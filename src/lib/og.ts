import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared building blocks for the generated Open Graph / Twitter cards
// (see src/lib/og-cards.tsx and the opengraph-image/twitter-image routes).
// All of this runs server-side only, at the time a crawler requests an image.

// Standard OG/Twitter "summary_large_image" canvas.
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Brand tokens, mirrored from globals.css so the cards match the site.
export const BRAND = {
  bg: "#0e0e10",
  fg: "#f4f1ea",
  charcoal: "#1c1b1e",
  muted: "#908a80",
  line: "#2b2a2e",
  gold: "#c7a06a",
  goldBright: "#ddbe8c",
} as const;

// Re-exported for existing callers; the implementation lives in the
// dependency-free src/lib/site-url.ts so robots/sitemap/pages can resolve the
// origin without pulling this module's fs-based font/image readers into their
// bundles. Prefer importing getSiteUrl directly from "@/lib/site-url".
export { getSiteUrl } from "@/lib/site-url";

// ── Fonts ──────────────────────────────────────────────────────────
// Schibsted Grotesk (the site's display face) as static .woff weights.
// Satori only accepts ttf/otf/woff — not the woff2 that next/font caches —
// so these are vendored under src/app/_og/fonts. Read once, then cached.
type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 600 | 700;
  style: "normal";
};

const FONT_DIR = "src/app/_og/fonts";
let fontsPromise: Promise<OgFont[]> | null = null;

export function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    const read = (w: 400 | 500 | 600 | 700) =>
      readFile(join(process.cwd(), FONT_DIR, `SchibstedGrotesk-${w}.woff`)).then(
        (data): OgFont => ({ name: "Schibsted Grotesk", data, weight: w, style: "normal" }),
      );
    fontsPromise = Promise.all([read(400), read(500), read(600), read(700)]);
  }
  return fontsPromise;
}

// ── Images ─────────────────────────────────────────────────────────
// Satori needs image bytes inline; it renders <img> from data URLs. Local
// assets are read from the project (and cached); remote listing photos are
// fetched at request time so they don't count against the bundle size limit.

const localCache = new Map<string, Promise<string | null>>();

export function loadLocalImage(relPath: string, mime: string): Promise<string | null> {
  let cached = localCache.get(relPath);
  if (!cached) {
    cached = readFile(join(process.cwd(), relPath))
      .then((buf) => `data:${mime};base64,${buf.toString("base64")}`)
      .catch(() => null);
    localCache.set(relPath, cached);
  }
  return cached;
}

export async function fetchImage(url: string, timeoutMs = 6000): Promise<string | null> {
  if (!url) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (!type.startsWith("image/")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
