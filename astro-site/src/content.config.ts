import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../tina-cms/content/recipes' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { recipes };
