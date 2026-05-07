import { getCollection } from "astro:content";

type SearchItem = {
  type: "recipe";
  title: string;
  description: string;
  url: string;
  content: string;
  estimatedTime?: number;
  rating?: number;
  basePortions?: number;
};

const joinText = (parts: Array<string | number | undefined>) =>
  parts
    .filter((part): part is string | number => part != null && String(part).trim() !== "")
    .map(String)
    .join(" ");

export async function GET() {
  const recipes = await getCollection("recipes");

  const items: SearchItem[] = recipes.map((recipe) => {
    const ingredientText = joinText([
      ...(recipe.data.ingredients ?? []).map((ingredient) => ingredient.name),
      ...(recipe.data.ingredientGroups ?? []).flatMap((group) => [
        group.groupName,
        ...group.ingredients.map((ingredient) => ingredient.name),
      ]),
    ]);

    const stepText = joinText([
      ...(recipe.data.steps ?? []).flatMap((step) => [step.title, step.description]),
      ...(recipe.data.stepGroups ?? []).flatMap((group) => [
        group.groupName,
        ...group.steps.flatMap((step) => [step.title, step.description]),
      ]),
    ]);

    const title = recipe.data.title ?? recipe.id;
    const description = recipe.data.description ?? "";
    const content = joinText([
      title,
      description,
      ingredientText,
      stepText,
      recipe.data.estimatedTime,
      recipe.data.rating,
      recipe.data.basePortions,
      recipe.id,
    ]);

    return {
      type: "recipe",
      title,
      description,
      url: `/recipes/${recipe.id}`,
      content,
      estimatedTime: recipe.data.estimatedTime,
      rating: recipe.data.rating,
      basePortions: recipe.data.basePortions,
    };
  });

  return new Response(JSON.stringify(items), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
