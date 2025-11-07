import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../tina-cms/content/recipes' }),
  schema: z.object({
    title: z.string(),
    basePortions: z.number(),
    estimatedTime: z.number(),
    description: z.string(),
    heroImage: z.string().optional(),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.number(),
      unit: z.string(),
    })).optional(),
    ingredientGroups: z.array(z.object({
      groupName: z.string(),
      ingredients: z.array(z.object({
        name: z.string(),
        amount: z.number(),
        unit: z.string(),
      })),
    })).optional(),
    steps: z.array(z.object({
      step: z.string(),
    })).optional(),
    stepGroups: z.array(z.object({
      groupName: z.string(),
      steps: z.array(z.object({
        step: z.string(),
      })),
    })).optional(),
    vegetarian: z.boolean(),
    vegan: z.boolean(),
    glutenFree: z.boolean(),
    dairyFree: z.boolean(),
    nutFree: z.boolean(),
    lowCarb: z.boolean(),
  }),
});

export const collections = { recipes };
