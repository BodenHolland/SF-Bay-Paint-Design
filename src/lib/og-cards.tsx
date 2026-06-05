import { ImageResponse } from "next/og";
import { BRAND, OG_SIZE, loadOgFonts } from "@/lib/og";

const { width: W, height: H } = OG_SIZE;

export async function renderRootCard(): Promise<ImageResponse> {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: BRAND.bg,
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(130% 90% at 50% -15%, #2b2630 0%, #17151b 42%, #0e0e10 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: `1px solid ${BRAND.gold}66`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 72,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 5,
              color: BRAND.gold,
              textShadow: "0 1px 12px rgba(0,0,0,0.9)",
            }}
          >
            SF BAY PAINT &amp; DESIGN
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 76,
              fontWeight: 400,
              letterSpacing: -1.5,
              color: BRAND.fg,
              lineHeight: 1.05,
              maxWidth: 880,
              textShadow: "0 2px 26px rgba(0,0,0,0.92)",
            }}
          >
            Painting & turnovers for Bay Area portfolios.
          </div>
          <div style={{ marginTop: 30, width: 76, height: 3, backgroundColor: BRAND.gold }} />
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              fontWeight: 400,
              color: BRAND.fg,
              maxWidth: 880,
              lineHeight: 1.35,
              textShadow: "0 1px 16px rgba(0,0,0,0.92)",
            }}
          >
            Interior, exterior, and turnover crews built for property managers and landlords.
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
