import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'

const recipeTag = z.enum([
  'Asiatiskt',
  'Bakning',
  'Brasilianskt',
  'Dryck',
  'Fika',
  'Fisk & skaldjur',
  'Franskt',
  'Förrätt',
  'Grekiskt',
  'Gryta',
  'Italienskt',
  'Karibiskt',
  'Koreanskt',
  'Kyckling',
  'Kött',
  'Mellanöstern',
  'Mexikanskt',
  'Pasta',
  'Ris & nudlar',
  'Sallad',
  'Soppa',
  'Svenskt',
  'Thailändskt',
  'Vardagsmat',
  'Vietnamesiskt',
  'Vilt',
  'Äggrätt',
]);

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/recipes' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    basePortions: z.number(),
    estimatedTime: z.number(),
    rating: z.number().min(0).max(5).optional(),
    tags: z
      .array(recipeTag)
      .min(2)
      .max(3)
      .refine((tags) => new Set(tags).size === tags.length, 'Tags must be unique'),
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
