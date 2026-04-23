import { defineCollection, z } from 'astro:content';
import glob from '@astrojs/glob';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/recipes' }),
  schema: z.object({
    title: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    basePortions: z.number().optional(),
    estimatedTime: z.number().optional(),
    rating: z.number().min(0).max(5).optional(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.number().optional(),
      unit: z.string().optional(),
    })).optional(),
    ingredientGroups: z.array(z.object({
      groupName: z.string(),
      ingredients: z.array(z.object({
        name: z.string(),
        amount: z.number().optional(),
        unit: z.string().optional(),
      })),
    })).optional(),
    steps: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    stepGroups: z.array(z.object({
      groupName: z.string(),
      steps: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    })).optional(),
    dietaryInfo: z.object({
      vegetarian: z.boolean(),
      vegan: z.boolean(),
      glutenFree: z.boolean(),
      dairyFree: z.boolean(),
      nutFree: z.boolean(),
      lowCarb: z.boolean(),
    }).optional(),
  }),
});

export const collections = { recipes };
