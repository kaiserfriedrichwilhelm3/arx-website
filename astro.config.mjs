// @ts-check
import { defineConfig } from 'astro/config';

// ARX Systems marketing site — Astro static build.
// Output is plain HTML in dist/, served by server.js (Express) in production.
// The Express wrapper also handles /api/contact and /api/setup-interest;
// Astro is build-time only and is pruned from production after build.
export default defineConfig({
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
});
