import { hostname } from "os";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
const uploads = "uploads.mangadex.org";



/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [uploads],
  },
};

export default config;
