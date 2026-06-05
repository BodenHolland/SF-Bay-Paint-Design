import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// `buildCommand` tells OpenNext to run `next build` directly when it builds
// the app, instead of the default `npm run build`. That matters because our
// package.json `build` script IS `opennextjs-cloudflare build` — without this
// override, OpenNext would call `npm run build`, which calls itself, looping
// forever. With it, `npm run build` (used by Cloudflare Workers Builds) runs
// the full OpenNext build with no recursion.
export default {
  ...defineCloudflareConfig(),
  buildCommand: "next build",
};
