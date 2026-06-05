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
  // Shared with the rental side for now. Swap to paint@ / design@ when Leslie
  // sets up a dedicated inbox.
  phone: "(415) 326-4129",
  phoneHref: "tel:+14153264129",
  email: "leasing@sfbayrentalco.com",
  emailHref: "mailto:leasing@sfbayrentalco.com",
};

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/leslieburnley/" },
  { label: "Yelp", href: "https://www.yelp.com/biz/leslie-burnley-san-rafael" },
  { label: "Zillow", href: "https://www.zillow.com/profile/Leslie-Burnley#reviews" },
  { label: "YouTube", href: "https://www.youtube.com/c/SFBayRentalCo" },
] as const;

// Top-level navigation. B2B-oriented; the estimator is the primary funnel,
// the vendor / property-manager content lives on the About page.
export const NAV = [
  { label: "Services", href: "/services" },
  { label: "Estimate", href: "/estimate" },
  { label: "Locations", href: "/locations" },
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

// Two service categories, each with a list of sub-services. Inspired by the
// CertaPro catalog (interior + exterior with the same prep / finish trades
// bundled in), rewritten in this site's B2B voice.
export const SERVICES = [
  {
    slug: "interior",
    title: "Interior Painting",
    eyebrow: "Service 01",
    summary:
      "Unit turnovers, multi-family common areas, and commercial interiors. Walls, trim, drywall, and cabinets handled by the same crew, same scope.",
    subservices: [
      {
        title: "Interior painting",
        body: "Walls, ceilings, doors, and trim. Patch, prime, two coats of mid-grade professional paint. Walls cut and rolled; trim painted by hand.",
      },
      {
        title: "Cabinet repainting",
        body: "Kitchen and bath cabinets refinished between tenancies. Sanded, primed, and sprayed in a controlled space for a smooth, durable finish.",
      },
      {
        title: "Drywall repair",
        body: "Holes, water damage, settling cracks: patched, taped, and textured to match the surrounding wall before paint goes on.",
      },
      {
        title: "Light carpentry",
        body: "Trim replacement, door and door-frame repair, wood rot, banister fixes. Handled in-house so paint-adjacent work doesn't get punted to another vendor.",
      },
      {
        title: "Wallpaper removal",
        body: "Steam, strip, skim coat, paint. We take older units from dated to rent-ready without a full renovation.",
      },
      {
        title: "Concrete & epoxy",
        body: "Stained concrete and epoxy floor coatings for garages, basements, light commercial spaces, and amenity rooms.",
      },
    ],
  },
  {
    slug: "exterior",
    title: "Exterior Painting",
    eyebrow: "Service 02",
    summary:
      "Low and mid-rise multi-family, commercial buildings, and single-family exteriors. Prep, coat, hit the weather window, document the work.",
    subservices: [
      {
        title: "Exterior painting",
        body: "Stucco, wood, vinyl, aluminum, brick, and cedar shingles. The right primer for each substrate, two coats over proper prep, finished on schedule.",
      },
      {
        title: "Power washing",
        body: "Standard prep on every exterior job. Removes dirt, mildew, chalking, and failing paint so the new coat actually bonds and lasts.",
      },
      {
        title: "Stucco & EIFS repair",
        body: "Patch cracks, address EIFS, then paint. Common in the Bay; we don't subcontract this out and we don't paint over a substrate that's about to fail.",
      },
      {
        title: "Siding restoration",
        body: "Vinyl, aluminum, and Hardie siding. The right primer for each substrate so the paint doesn't chip off a year later.",
      },
      {
        title: "Deck & fence staining",
        body: "Strip, sand, stain. Restoring weathered redwood and cedar without replacing the boards.",
      },
      {
        title: "EPA lead-safe",
        body: "Older Bay Area buildings often have lead-based paint. Our crews follow EPA RRP lead-safe work practices on any job that disturbs it.",
      },
    ],
  },
] as const;

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

// How a portfolio engagement runs, from first contact to invoice. Lives on the
// About page now that there's no standalone PM route.
export const PM_ENGAGEMENT = [
  {
    n: "01",
    title: "Send the portfolio",
    body: "Use the estimator or email a unit list. We respond within 48 hours.",
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

// Bay Area counties served. Drives the per-county SEO landing pages on the
// rental site; replicate here as the service area grows.
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
    a: "Quotes go out within 48 hours of a walk-through or completed estimator submission. Turnover crews can typically start within one to two weeks; emergency turnovers are possible when a unit needs to be re-listed quickly.",
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

// Estimator config. Single source of truth so Leslie can tune the numbers from
// here without a code change. Rates are Bay Area averages pending real data.
export const ESTIMATOR = {
  // $ per sqft of floor area, two coats, basic prep included. One rate per
  // surface — no paint-tier upsell.
  rates: {
    interior: 5.0,
    exterior: 6.5,
  },
  // Volume discounts applied to the portfolio total. PMs running 25+ unit
  // turnovers should see a real benefit for batching the work.
  volumeDiscounts: [
    { minUnits: 25, percent: 12, label: "25+ units" },
    { minUnits: 10, percent: 8, label: "10–24 units" },
    { minUnits: 5, percent: 5, label: "5–9 units" },
  ],
  // Range communicated as ± this fraction. Walk-through required for a binding
  // quote; this is a planning number.
  uncertaintyPct: 0.15,
};

export type Surface = "interior" | "exterior";
