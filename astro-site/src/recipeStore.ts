import { persistentAtom } from '@nanostores/persistent';

export interface RecipeState {
  ingredients: string[];
  steps: string[];
}

export type RecipeStoreData = Record<string, RecipeState>;

// Create a persistent store that saves to localStorage
export const recipeStore = persistentAtom<RecipeStoreData>('recipes', {}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Helper functions
export function toggleIngredient(recipeId: string, ingredientId: string) {
  const current = recipeStore.get();
  const recipeState = current[recipeId] || { ingredients: [], steps: [] };
  
  const ingredients = new Set(recipeState.ingredients);
  if (ingredients.has(ingredientId)) {
    ingredients.delete(ingredientId);
  } else {
    ingredients.add(ingredientId);
  }
  
  recipeStore.set({
    ...current,
    [recipeId]: {
      ...recipeState,
      ingredients: Array.from(ingredients),
    },
  });
}

export function toggleStep(recipeId: string, stepId: string) {
  const current = recipeStore.get();
  const recipeState = current[recipeId] || { ingredients: [], steps: [] };
  
  const steps = new Set(recipeState.steps);
  if (steps.has(stepId)) {
    steps.delete(stepId);
  } else {
    steps.add(stepId);
  }
  
  recipeStore.set({
    ...current,
    [recipeId]: {
      ...recipeState,
      steps: Array.from(steps),
    },
  });
}

export function isIngredientChecked(recipeId: string, ingredientId: string): boolean {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  return recipeState?.ingredients?.includes(ingredientId) || false;
}

export function isStepChecked(recipeId: string, stepId: string): boolean {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  return recipeState?.steps?.includes(stepId) || false;
}
