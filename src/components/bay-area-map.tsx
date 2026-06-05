import { LOCATIONS } from "@/lib/site";

// Where each served county sits on the abstract map, as % of the frame.
// Positions are arranged geographically (NW top-left → South bottom),
// not to scale — this is a coverage map, not a survey drawing.
const PLACEMENTS: Record<
  string,
  { top: string; left: string; primary?: boolean }
> = {
  Sonoma: { top: "9%", left: "16%" },
  "Contra Costa": { top: "15%", left: "67%" },
  Marin: { top: "39%", left: "8%", primary: true },
  Alameda: { top: "49%", left: "73%" },
  "San Francisco": { top: "52%", left: "28%", primary: true },
  "San Mateo": { top: "70%", left: "24%" },
  "Santa Clara": { top: "84%", left: "56%" },
};

export function BayAreaMap() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-line/70 bg-charcoal/20 sm:aspect-[5/4] sm:max-w-2xl">
      {/* Abstract bay / water running down the middle. */}
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="bay" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c8a99" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#5b6b7a" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <path
          d="M250 70
             C 300 110 295 150 270 185
             C 250 215 305 230 320 200
             C 345 250 320 300 285 330
             C 250 360 300 380 315 360
             C 330 410 285 450 250 470
             C 215 450 210 405 235 375
             C 255 350 205 335 195 360
             C 175 305 210 260 245 235
             C 270 215 220 200 205 225
             C 185 175 220 120 250 70 Z"
          fill="url(#bay)"
        />
      </svg>

      {/* County markers */}
      {LOCATIONS.map((county) => {
        const p = PLACEMENTS[county];
        if (!p) return null;
        return (
          <div
            key={county}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: p.top, left: p.left }}
          >
            <div
              className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm sm:text-sm ${
                p.primary
                  ? "border-gold/60 bg-gold/15 text-foreground"
                  : "border-line/70 bg-background/85 text-foreground/85"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  p.primary ? "bg-gold-bright" : "bg-gold/70"
                }`}
                aria-hidden
              />
              {county} County
            </div>
          </div>
        );
      })}
    </div>
  );
}
