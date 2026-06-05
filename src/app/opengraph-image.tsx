import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { renderRootCard } from "@/lib/og-cards";

export const alt =
  "SF Bay Paint & Design — painting and turnovers for Bay Area property portfolios";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderRootCard();
}
