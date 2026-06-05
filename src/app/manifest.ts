import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SF Bay Paint & Design",
    short_name: "SF Bay Paint",
    description: "Painting and turnovers for Bay Area property portfolios.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
      { src: "/logo.png", sizes: "any", type: "image/png" },
    ],
  };
}
