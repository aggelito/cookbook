import { persistentAtom } from '@nanostores/persistent';

export interface RecipeState {
  ingredients: string[];
  steps: string[];
  portions?: number;
}

export type RecipeStoreData = Record<string, RecipeState>;
type ChecklistKey = 'ingredients' | 'steps';

const emptyRecipeState: RecipeState = { ingredients: [], steps: [] };

function decodeRecipeStore(value: string): RecipeStoreData {
  try {
    return JSON.parse(value) as RecipeStoreData;
  } catch {
    return {};
  }
}

// Create a persistent store that saves to localStorage
export const recipeStore = persistentAtom<RecipeStoreData>('recipes', {}, {
  encode: JSON.stringify,
  decode: decodeRecipeStore,
});

function getRecipeState(recipeId: string): RecipeState {
  return recipeStore.get()[recipeId] ?? emptyRecipeState;
}

function updateRecipeState(recipeId: string, update: (state: RecipeState) => RecipeState) {
  const current = recipeStore.get();
  const recipeState = current[recipeId] ?? emptyRecipeState;

  recipeStore.set({
    ...current,
    [recipeId]: update(recipeState),
  });
}

function toggleChecklistItem(recipeId: string, key: ChecklistKey, itemId: string) {
  updateRecipeState(recipeId, (recipeState) => {
    const items = new Set(recipeState[key]);
    if (items.has(itemId)) {
      items.delete(itemId);
    } else {
      items.add(itemId);
    }

    return {
      ...recipeState,
      [key]: Array.from(items),
    };
  });
}

function clearChecklist(recipeId: string, key: ChecklistKey) {
  const recipeState = recipeStore.get()[recipeId];
  if (!recipeState) return;

  updateRecipeState(recipeId, (state) => ({
    ...state,
    [key]: [],
  }));
}

function isChecklistItemChecked(recipeId: string, key: ChecklistKey, itemId: string): boolean {
  return getRecipeState(recipeId)[key].includes(itemId);
}

function hasCheckedItems(recipeId: string, key: ChecklistKey): boolean {
  return getRecipeState(recipeId)[key].length > 0;
}

// Helper functions
export function toggleIngredient(recipeId: string, ingredientId: string) {
  toggleChecklistItem(recipeId, 'ingredients', ingredientId);
}

export function toggleStep(recipeId: string, stepId: string) {
  toggleChecklistItem(recipeId, 'steps', stepId);
}

export function isIngredientChecked(recipeId: string, ingredientId: string): boolean {
  return isChecklistItemChecked(recipeId, 'ingredients', ingredientId);
}

export function isStepChecked(recipeId: string, stepId: string): boolean {
  return isChecklistItemChecked(recipeId, 'steps', stepId);
}

export function clearIngredients(recipeId: string) {
  clearChecklist(recipeId, 'ingredients');
}

export function clearSteps(recipeId: string) {
  clearChecklist(recipeId, 'steps');
}

export function hasCheckedIngredients(recipeId: string): boolean {
  return hasCheckedItems(recipeId, 'ingredients');
}

export function hasCheckedSteps(recipeId: string): boolean {
  return hasCheckedItems(recipeId, 'steps');
}

export function setPortions(recipeId: string, portions: number) {
  updateRecipeState(recipeId, (recipeState) => ({
    ...recipeState,
    portions,
  }));
}

export function getPortions(recipeId: string, basePortions: number): number {
  return getRecipeState(recipeId).portions ?? basePortions;
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
