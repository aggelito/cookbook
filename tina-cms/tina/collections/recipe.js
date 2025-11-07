/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Recipes",
  name: "recipe",
  path: "content/recipes",
  format: "md",  // Add this line
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
};
