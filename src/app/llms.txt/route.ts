import { getSiteUrl } from "@/lib/site-url";
import { CONTACT, LEGAL, LOCATIONS_CLAUSE, SERVICES } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const base = getSiteUrl();

  const body = `# SF Bay Paint & Design

> Painting and turnovers for Bay Area property portfolios. Interior and exterior work for property managers, landlords, and building owners across ${LOCATIONS_CLAUSE}.

SF Bay Paint & Design is the painting arm of operator Leslie Burnley, who also runs SF Bay Rental Co. The crew handles rental unit turnovers, multi-family interiors, commercial interiors, and exterior repaints (low and mid-rise, single-family). Quote requests are handled via the contact page; we respond within 48 hours.

## Key pages

- [Home](${base}/): Overview of services, the estimator, and the property-manager track.
- [Services](${base}/services): Full catalog of painting trades — interior and exterior, grouped by category.
${SERVICES.map((s) => `- [${s.title}](${base}/services/${s.slug}): ${s.summary}`).join("\n")}
- [About](${base}/about): Operator background, response SLA, and how a portfolio engagement runs. Includes a property-manager section anchored at #property-managers.
- [Contact](${base}/contact): Reach out about a job or onboard us as a vendor.

## Contact

- Phone: ${CONTACT.phone}
- Email: ${CONTACT.email}

## Entity

- Legal name: ${LEGAL.entity}
- Type: ${LEGAL.type} (${LEGAL.jurisdiction})
- CA Secretary of State file number: ${LEGAL.fileNumber}
- Filed: ${LEGAL.filedOn}
- Registered agent: ${LEGAL.registeredAgent}
- Principal address: ${LEGAL.address.street}, ${LEGAL.address.city}, ${LEGAL.address.region} ${LEGAL.address.postalCode}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
