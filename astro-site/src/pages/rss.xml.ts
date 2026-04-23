import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';

export async function GET(context: any) {
  const recipes = await getCollection('recipes');
  
  const items = await Promise.all(
    recipes.map(async (recipe) => {
      const { content } = await render(recipe);
      return {
        title: recipe.data.title || 'Untitled Recipe',
        pubDate: recipe.data?.pubDate || recipe.data?.updated,
        description: recipe.data.description || '',
        link: `/recipes/${recipe.id}`,
        content: content,
      };
    })
  );

  return rss({
    title: 'Kokboken',
    description: 'En samling recept från Kokboken',
    site: context.site,
    items,
    customData: `<language>sv-se</language>`,
  });
}
