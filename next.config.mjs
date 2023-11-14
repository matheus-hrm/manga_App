
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");
const uploads = "uploads.mangadex.org";
const devpics = "avatars.githubusercontent.com";


/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: [uploads,devpics],
  },
};

export default config;
