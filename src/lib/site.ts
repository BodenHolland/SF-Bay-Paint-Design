// SF Bay Paint & Design — central site config.
// B2B-first: property managers and private landlords are the primary customer.
// Single-family exteriors are welcome but never the lead.

export const BRAND = {
  name: "SF Bay Paint & Design",
  short: "SF Bay Paint",
  tagline: "Painting and turnovers for Bay Area property portfolios.",
};

// Legal entity. Sourced from the California Secretary of State filing. Used in
// the footer fine-print, the About page, and the LocalBusiness JSON-LD.
export const LEGAL = {
  entity: "SF Bay Paint & Design LLC",
  jurisdiction: "California",
  type: "Limited-Liability Company",
  fileNumber: "B20250262689",
  filedOn: "2025-08-20",
  registeredAgent: "Leslie Burnley",
  address: {
    street: "321 Olema Rd",
    city: "Fairfax",
    region: "CA",
    postalCode: "94930",
    country: "US",
  },
};

export const CONTACT = {
  phone: "(415) 326-4129",
  phoneHref: "tel:+14153264129",
  email: "hello@sfbaypaintdesign.com",
  emailHref: "mailto:hello@sfbaypaintdesign.com",
};

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/leslieburnley/" },
  { label: "Yelp", href: "https://www.yelp.com/biz/leslie-burnley-san-rafael" },
  { label: "Zillow", href: "https://www.zillow.com/profile/Leslie-Burnley#reviews" },
  { label: "YouTube", href: "https://www.youtube.com/c/SFBayRentalCo" },
] as const;

// Top-level navigation. No standalone estimator route; the contact page handles
// quote requests for now.
export const NAV = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Operator credibility. Leslie also runs SF Bay Rental Co., so she manages units
// herself — the differentiator vs. generic painting outfits.
export const LESLIE = {
  name: "Leslie Burnley",
  role: "Founder",
  since: "2012",
  bio: [
    "SF Bay Paint & Design is run by Leslie Burnley, a Bay Area broker and the founder of SF Bay Rental Co. and SF Bay Relocate. After more than a decade leasing and managing residential property across the region, she built the painting side to handle the unit turnovers, commercial repaints, and exterior work her own portfolio kept needing.",
    "Every job is run by someone who has been on the property-manager side of the table. That means turn-around windows that actually match a lease cycle, scopes written for accounting, and a crew that respects an occupied building.",
  ],
};

// Trust band on the homepage. Most numbers are placeholders pending Leslie's
// confirmation. The "since 2017" line is honest: the painting work has run on
// her own portfolio since SF Bay Rental Co. was founded; the LLC was
// incorporated in 2025 to take on outside work.
export const TRUST = {
  cslb: "CSLB #PLACEHOLDER",
  insurance: "$2M general liability",
  yearsOperating: "On-portfolio since 2017",
  unitsPainted: "1,200+ units painted",
  responseSla: "Quotes within 48 hours",
};

// Service categories — used for the grouping headers on the homepage and the
// services index, and as the eyebrow on each service detail page.
export type ServiceCategory = "exterior" | "interior";
export const CATEGORIES: { key: ServiceCategory; title: string; eyebrow: string }[] = [
  { key: "exterior", title: "Exterior", eyebrow: "Exterior services" },
  { key: "interior", title: "Interior", eyebrow: "Interior services" },
];

// Flat catalog of distinct services. Mirrors the CertaPro landing-page
// catalog (one card per service, no nesting), rewritten in our B2B operator
// voice. Color Consultation is intentionally dropped: we don't do design help.
export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  body: string;
  // Optional cover photo for the service card / detail hero. Path under /public.
  // Services without a photo fall back to the .photo-ph placeholder.
  photo?: string;
};

export const SERVICES: Service[] = [
  // ── Exterior ────────────────────────────────────────────────────────
  {
    slug: "exterior-painting",
    title: "Exterior Painting",
    category: "exterior",
    summary:
      "Stucco, wood, vinyl, aluminum, brick, and cedar shingles. The right primer for each substrate, two coats over real prep, finished on schedule.",
    body: "Our crews paint every exterior substrate common in the Bay Area, including stucco, wood siding, vinyl, aluminum, brick, cedar shingles, garage doors, and trim. Each surface gets the right primer and two coats of mid-grade professional paint. We work in weather windows that don't compromise the finish, and we document the job with before-and-after photos that go with the invoice.",
    photo: "/photos/services/exterior-painting.jpg",
  },
  {
    slug: "power-washing",
    title: "Power Washing",
    category: "exterior",
    summary:
      "Required prep on every exterior job. Removes dirt, mildew, chalking, and failing paint so the new coat actually bonds.",
    body: "Power washing is the first step on every exterior repaint we do. We remove dirt, mildew, chalking, and any old paint that's already failing, so the new coat bonds to a clean surface. We also offer standalone power-washing for buildings that aren't ready for paint but need their siding and walkways cleaned.",
    photo: "/photos/services/power-washing.jpg",
  },
  {
    slug: "stucco-repair",
    title: "Stucco & EIFS Repair",
    category: "exterior",
    summary:
      "Patch cracks, address EIFS, then paint. Common in the Bay; we don't subcontract this out and we don't paint over a substrate that's about to fail.",
    body: "Stucco and EIFS (synthetic stucco) are everywhere in Bay Area buildings, and both fail in predictable ways. We patch cracks, address spalling, and repair EIFS using the right material for the substrate, then prime and paint. We don't paint over stucco that's actively failing — we fix it first or tell you what's needed before paint goes on.",
    photo: "/photos/services/stucco-repair.jpg",
  },
  {
    slug: "siding-restoration",
    title: "Vinyl & Aluminum Siding",
    category: "exterior",
    summary:
      "Vinyl, aluminum, and Hardie siding. The right primer for each substrate so the paint doesn't chip off a year later.",
    body: "Painting vinyl and aluminum siding is its own skill — wrong primer and the paint peels in a season. Our crews use bonding primers and exterior acrylics rated for the substrate, with the right surface prep so the finish actually lasts. The same applies to Hardie and other cementitious siding.",
    photo: "/photos/services/siding-restoration.jpg",
  },
  {
    slug: "deck-staining",
    title: "Deck & Fence Staining",
    category: "exterior",
    summary:
      "Strip, sand, stain. Restoring weathered redwood and cedar without replacing the boards.",
    body: "Decks and fences in Marin and the Bay weather fast. We strip old finish, sand back to clean wood, and apply transparent, semi-transparent, or solid stain depending on how the boards look and how often you want to refinish. Deck rebuilds and board replacement are handled by partners we trust if the structure isn't worth saving.",
    photo: "/photos/services/deck-staining.jpg",
  },

  // ── Interior ────────────────────────────────────────────────────────
  {
    slug: "interior-painting",
    title: "Interior Painting",
    category: "interior",
    summary:
      "Walls, ceilings, doors, and trim. Patch, prime, two coats of mid-grade professional paint. Cut by hand.",
    body: "Interior painting is the workhorse service: unit turnovers, multi-family common areas (lobbies, halls, stairwells, amenity rooms), and commercial interiors. We patch and prime, then apply two coats of mid-grade professional paint (Benjamin Moore Regal or Sherwin Williams SuperPaint). Walls cut and rolled, ceilings sprayed where appropriate, trim painted by hand.",
    photo: "/photos/services/interior-painting.jpg",
  },
  {
    slug: "cabinet-repainting",
    title: "Cabinet Repainting",
    category: "interior",
    summary:
      "Kitchen and bath cabinets refinished between tenancies. Sanded, primed, and sprayed for a smooth, durable finish.",
    body: "Cabinets are some of the most touched surfaces in a unit, and replacing them between tenancies isn't always worth it. We refinish kitchen and bath cabinets: degrease, sand, prime with a bonding primer, and spray a durable finish coat in a controlled space. The result holds up to daily use without looking like a cheap repaint.",
    photo: "/photos/services/cabinet-repainting.jpg",
  },
  {
    slug: "drywall-repair",
    title: "Drywall Repair",
    category: "interior",
    summary:
      "Holes, water damage, settling cracks: patched, taped, textured to match before paint goes on.",
    body: "Standard part of any unit turnover. We patch holes from screws and anchors, address water damage and bubbled tape, repair settling cracks, and re-texture the patch to match the surrounding wall before paint. We can also handle larger repairs — medium-to-large holes that need a backing board, sections of failed drywall, and water-damaged areas after the moisture source is fixed.",
    photo: "/photos/services/drywall-repair.jpg",
  },
  {
    slug: "wallpaper-removal",
    title: "Wallpaper Removal",
    category: "interior",
    summary:
      "Steam, strip, skim coat, paint. We take dated units to rent-ready without a full renovation.",
    body: "Wallpaper removal is one of the more painful prep jobs in the trade — done badly, it leaves a wall that no paint can hide. We score, steam, strip, and skim coat the wall before any paint goes on. Older Bay Area units often have layers; we plan for that in the scope.",
    photo: "/photos/services/wallpaper-removal.jpg",
  },
];

export function servicesByCategory(cat: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === cat);
}

// The 5-step paint workflow we run on every job. Inspired by CertaPro's
// process card, written in our voice. Shown on services pages + About.
export const PROCESS = [
  {
    n: "01",
    title: "Setup",
    body: "Interior: furniture pulled to the center, plastic-wrapped, floors drop-clothed. Exterior: power wash or hand wash, surfaces masked.",
  },
  {
    n: "02",
    title: "Prep",
    body: "Patch cracks and holes, seal stains, scuff-sand glossy surfaces. Exterior: scrape failing paint, caulk gaps, prime bare wood.",
  },
  {
    n: "03",
    title: "Paint",
    body: "Bare and patched areas primed. Two coats of mid-grade professional paint (Benjamin Moore Regal or Sherwin Williams SuperPaint). Trim cut by hand.",
  },
  {
    n: "04",
    title: "Clean up",
    body: "Drop cloths out, plastic pulled, surfaces wiped, debris removed. Everything returned to where we found it.",
  },
  {
    n: "05",
    title: "Walk-through",
    body: "Foreman inspection, then we walk it with you. Punch list addressed before sign-off and photo documentation goes with the invoice.",
  },
] as const;

// Vendor onboarding documents PMs need to add us to their approved-vendor list.
// Sent as a single PDF on request.
export const VENDOR_PACKET = [
  "W-9, current",
  "Certificate of Insurance, addable to your portfolio",
  "California contractors license",
  "References from active portfolios",
  "Standard scope template (turnovers and exteriors)",
];

// How a portfolio engagement runs, from first contact to invoice.
export const PM_ENGAGEMENT = [
  {
    n: "01",
    title: "Send the portfolio",
    body: "Email a unit list or building details and we respond within 48 hours.",
  },
  {
    n: "02",
    title: "Walk-through",
    body: "We scope the prep, document conditions, and confirm the schedule against your lease cycle.",
  },
  {
    n: "03",
    title: "Paint",
    body: "Crews show up when scheduled. Daily check-ins, no scope creep, photo documentation on completion.",
  },
  {
    n: "04",
    title: "Invoice",
    body: "PO-friendly invoicing, net-30 standard. Final walk-through and punch list before sign-off.",
  },
] as const;

// The B2B service commitments we make on every job. Surfaced on About.
export const COMMITMENTS = [
  "On-site when scheduled, finished when promised. Schedule slips get communicated the day we know.",
  "Daily updates by email or text, whichever you prefer. No chasing us for status.",
  "Property treated like our own. Tenants get notice, noisy work held to standard hours, debris out every day.",
  "Photo documentation on completion, attached to the invoice for your records.",
];

// Bay Area counties served (alphabetical). Drives the per-county SEO landing pages.
export const LOCATIONS = [
  "Alameda",
  "Contra Costa",
  "Marin",
  "San Francisco",
  "San Mateo",
  "Santa Clara",
  "Sonoma",
];

export const LOCATIONS_CLAUSE = `${LOCATIONS.slice(0, -1).join(", ")}, and ${
  LOCATIONS[LOCATIONS.length - 1]
} counties`;

// Placeholder testimonials. Replace with real PM/landlord quotes before launch.
export type Testimonial = {
  quote: string;
  author: string;
  meta: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They turned eight units in two weeks and hit every move-in date. Scopes were written so I could drop them straight into my accounting system.",
    author: "Property Manager",
    meta: "Marin, multi-family",
  },
  {
    quote:
      "Repainted the exterior of a fourteen-unit building over a single weather window. No corner-cutting on prep and we have not seen a callback.",
    author: "Building Owner",
    meta: "San Francisco, low-rise",
  },
  {
    quote:
      "Most painters I have used disappear after the deposit. This crew showed up, communicated, and finished a day early.",
    author: "Landlord",
    meta: "East Bay, single-family",
  },
];

// FAQ aimed at PMs and landlords. Drives the FAQ accordion on the homepage and
// the FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you carry the licensing and insurance our approved-vendor list requires?",
    a: "Yes. We carry a California contractors license and general liability coverage suitable for multi-family and commercial work, and can provide a certificate of insurance on request. Specific limits and the W-9 are bundled in our vendor packet.",
  },
  {
    q: "How quickly can you quote and start a unit turnover?",
    a: "Quotes go out within 48 hours of a walk-through or a complete email request. Turnover crews can typically start within one to two weeks; emergency turnovers are possible when a unit needs to be re-listed quickly.",
  },
  {
    q: "Do you work on occupied buildings?",
    a: "Yes. Common areas, hallways, lobbies, and exteriors of occupied multi-family and commercial buildings are most of what we do. Tenants get notice, work is sequenced to keep entries clear, and noisy work is held to standard daytime hours.",
  },
  {
    q: "What paint do you use?",
    a: "Mid-grade professional paint by default (Benjamin Moore Regal or Sherwin Williams SuperPaint), which holds up in rental units, multi-family common areas, and commercial settings. If a job calls for a different product, we'll spec it during the walk-through.",
  },
  {
    q: "Do you accept POs and invoice net-30?",
    a: "Yes. Most of our work is billed against a PO with net-30 terms. Smaller jobs can be paid by card on completion if a PM prefers.",
  },
];
