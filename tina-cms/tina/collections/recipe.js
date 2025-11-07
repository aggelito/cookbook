/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Recipes",
  name: "recipe",
  path: "../astro-site/src/pages/recipes",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Blog Post Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/recipes/${document._sys.filename}`;
    },
  },
};
