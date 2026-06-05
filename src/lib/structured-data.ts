// schema.org structured data builders for SF Bay Paint & Design. Drops the
// real-estate listing types from the rental site; what's left is the
// LocalBusiness (PaintingService) node, the WebSite node, BreadcrumbList,
// and FAQPage.

import type { ContactInfo, LeslieInfo, SocialLink } from "@/lib/content";
import { LEGAL } from "@/lib/site";

const agentId = (base: string) => `${base}/#business`;

function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null),
  ) as T;
}

export function businessLd(
  base: string,
  {
    contact,
    leslie,
    socials,
    locations,
  }: {
    contact: ContactInfo;
    leslie: LeslieInfo;
    socials: readonly SocialLink[];
    locations: string[];
  },
) {
  return clean({
    "@context": "https://schema.org",
    "@type": ["PaintingService", "LocalBusiness"],
    "@id": agentId(base),
    name: "SF Bay Paint & Design",
    legalName: LEGAL.entity,
    description:
      "Painting and turnovers for Bay Area property portfolios. Interior and exterior work for property managers, landlords, and building owners.",
    url: base,
    logo: `${base}/logo.png`,
    image: `${base}/logo.png`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: "$$",
    foundingDate: LEGAL.filedOn,
    areaServed: [
      { "@type": "Place", name: "San Francisco Bay Area" },
      ...locations.map((name) => ({
        "@type": "AdministrativeArea",
        name: `${name} County`,
      })),
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL.address.street,
      addressLocality: LEGAL.address.city,
      addressRegion: LEGAL.address.region,
      postalCode: LEGAL.address.postalCode,
      addressCountry: LEGAL.address.country,
    },
    founder: clean({
      "@type": "Person",
      name: leslie.name,
      jobTitle: leslie.role,
      description: leslie.bio?.[0],
    }),
    knowsAbout: [
      "Interior painting",
      "Exterior painting",
      "Rental unit turnovers",
      "Multi-family painting",
      "Commercial painting",
    ],
    sameAs: socials.map((s) => s.href),
  });
}

export function websiteLd(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: "SF Bay Paint & Design",
    publisher: { "@id": agentId(base) },
    inLanguage: "en-US",
  };
}

export function breadcrumbLd(
  base: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
