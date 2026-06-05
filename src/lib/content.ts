// Thin compatibility shim. The rental site reads its content from Supabase via
// getSiteContent(); the paint site keeps everything static in site.ts. This
// wrapper lets the shared components (SiteFooter, About, Contact) keep their
// async API without changes.

import {
  BRAND,
  CONTACT,
  FAQS,
  LESLIE,
  LOCATIONS,
  LOCATIONS_CLAUSE,
  SERVICES,
  SOCIALS,
  TESTIMONIALS,
  TRUST,
} from "@/lib/site";

export type ContactInfo = typeof CONTACT;
export type LeslieInfo = typeof LESLIE;
export type SocialLink = (typeof SOCIALS)[number];

export type SiteContent = {
  brand: typeof BRAND;
  contact: ContactInfo;
  leslie: LeslieInfo;
  socials: readonly SocialLink[];
  locations: string[];
  locationsClause: string;
  services: typeof SERVICES;
  trust: typeof TRUST;
  testimonials: typeof TESTIMONIALS;
  faqs: typeof FAQS;
};

export async function getSiteContent(): Promise<SiteContent> {
  return {
    brand: BRAND,
    contact: CONTACT,
    leslie: LESLIE,
    socials: SOCIALS,
    locations: LOCATIONS,
    locationsClause: LOCATIONS_CLAUSE,
    services: SERVICES,
    trust: TRUST,
    testimonials: TESTIMONIALS,
    faqs: FAQS,
  };
}
