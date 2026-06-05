// Absolute site origin, used for metadataBase, og:url, canonicals, robots,
// sitemap, and JSON-LD. Kept dependency-free (no fs / server-only imports) so
// importing it doesn't drag the OG image font/photo readers into route bundles.
//
// Prefers an explicit override, then Vercel's production domain, then localhost
// for dev. (The live project is the `sf-bay-rental-co` Vercel app; once a custom
// domain is wired up, VERCEL_PROJECT_PRODUCTION_URL follows it. Set
// NEXT_PUBLIC_SITE_URL to pin it explicitly.)
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
