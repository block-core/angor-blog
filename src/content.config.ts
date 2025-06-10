// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

 

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: ({ image }) => z.object ({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  role: z.string().optional(),
  authorImage: image(),
  authorImageAlt: z.string(),
  pubDate: z.date(),
  cardImage: image(),
  cardImageAlt: z.string(),
  readTime: z.number(),
  tags: z.array(z.string()).optional(),
  nostrPublicKey: z.string().optional(),
  }),
});
 
export const collections = {
   'blog': blogCollection,
 };
