import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables React's <ViewTransition> integration so route changes can
  // cross-fade instead of hard-cutting (see app/layout.tsx).
  experimental: {
    viewTransition: true,
  },
  // The generated share cards (opengraph-image / twitter-image) read vendored
  // fonts and the hero photo from disk at request time. Make sure those files
  // are traced into the serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/app/_og/fonts/**", "./public/photos/hero.jpg"],
    "/twitter-image": ["./src/app/_og/fonts/**", "./public/photos/hero.jpg"],
    "/property/[slug]/opengraph-image": [
      "./src/app/_og/fonts/**",
      "./public/photos/hero.jpg",
    ],
    "/property/[slug]/twitter-image": [
      "./src/app/_og/fonts/**",
      "./public/photos/hero.jpg",
    ],
  },
  // Listing photos are sourced from Leslie's live WordPress host for now
  // (the scraped gallery URLs). next/image needs the host allow-listed to
  // optimize them. These can move to Supabase storage later.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sfbayrentalco.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "www.sfbayrentalco.com", pathname: "/wp-content/**" },
      // Photos uploaded from the admin live in Supabase Storage (public bucket).
      // Wildcard host so it works regardless of the project ref.
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/available-properties",
        destination: "/properties/available",
        permanent: true,
      },
      {
        source: "/available-properties/:slug",
        destination: "/property/:slug",
        permanent: true,
      },
      { source: "/properties", destination: "/properties/available", permanent: false },
      { source: "/properties/all", destination: "/properties/available", permanent: false },
    ];
  },
};

export default nextConfig;
