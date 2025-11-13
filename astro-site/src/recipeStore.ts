import { persistentAtom } from '@nanostores/persistent';

export interface RecipeState {
  ingredients: string[];
  steps: string[];
  portions?: number;
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

export function clearIngredients(recipeId: string) {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  
  if (recipeState) {
    recipeStore.set({
      ...current,
      [recipeId]: {
        ...recipeState,
        ingredients: [],
      },
    });
  }
}

export function clearSteps(recipeId: string) {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  
  if (recipeState) {
    recipeStore.set({
      ...current,
      [recipeId]: {
        ...recipeState,
        steps: [],
      },
    });
  }
}

export function hasCheckedIngredients(recipeId: string): boolean {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  return recipeState?.ingredients?.length > 0 || false;
}

export function hasCheckedSteps(recipeId: string): boolean {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  return recipeState?.steps?.length > 0 || false;
}

export function setPortions(recipeId: string, portions: number) {
  const current = recipeStore.get();
  const recipeState = current[recipeId] || { ingredients: [], steps: [] };
  
  recipeStore.set({
    ...current,
    [recipeId]: {
      ...recipeState,
      portions,
    },
  });
}

export function getPortions(recipeId: string, basePortions: number): number {
  const current = recipeStore.get();
  const recipeState = current[recipeId];
  return recipeState?.portions ?? basePortions;
}

export function scaleAmount(amount: string, basePortions: number, currentPortions: number): string {
  if (!amount || basePortions === currentPortions) {
    return amount;
  }
  
  const scaleFactor = currentPortions / basePortions;
  
  // Try to parse the amount as a number
  const numMatch = amount.match(/^(\d+(?:[.,]\d+)?)/);
  if (numMatch) {
    const num = parseFloat(numMatch[1].replace(',', '.'));
    const scaled = num * scaleFactor;
    
    // Round to 2 decimal places and remove trailing zeros
    const rounded = Math.round(scaled * 100) / 100;
    const formatted = rounded.toString().replace('.', ',');
    
    // Replace the number in the original string
    return amount.replace(numMatch[1], formatted);
  }
  
  return amount;
}
