import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React's <ViewTransition> for cross-faded route changes (see layout.tsx).
  experimental: {
    viewTransition: true,
  },
  // OG / Twitter cards read vendored fonts off disk at request time. Trace them
  // into the serverless functions so they're available on Vercel.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/app/_og/fonts/**"],
    "/twitter-image": ["./src/app/_og/fonts/**"],
  },
};

export default nextConfig;
