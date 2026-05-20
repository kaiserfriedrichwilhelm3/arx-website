// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'ignore',
  integrations: [mdx()],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  // No <Image /> usage; skip sharp to avoid native build on Railway.
  image: { service: { entrypoint: 'astro/assets/services/noop' } },
});
