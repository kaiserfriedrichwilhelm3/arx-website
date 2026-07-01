// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  integrations: [mdx()],
  // Prefetch disabled: the live site is a single page whose only links are
  // in-page hash anchors, so Astro's prefetch runtime is dead weight. Re-enable
  // (prefetch: { prefetchAll: false, defaultStrategy: 'hover' }) if the
  // multi-page editorial rebuild resumes.
  prefetch: false,
  // No <Image /> usage; skip sharp to avoid native build on Railway.
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
});
