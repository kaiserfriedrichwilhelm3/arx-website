import { defineCollection, z } from 'astro:content';

const pillars = defineCollection({
  type: 'content',
  schema: z.object({
    number: z.string(),
    title: z.string(),
    subtitle: z.string(),
    status: z.enum(['live', 'deploying']),
    statusLabel: z.string(),
    order: z.number(),
    summary: z.string(),
  }),
});

export const collections = { pillars };
