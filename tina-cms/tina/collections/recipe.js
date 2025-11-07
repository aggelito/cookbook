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
      type: "number",
      label: "Base Portions",
      name: "basePortions",
    },
    {
      type: "number",
      label: "Estimated Time (minutes)",
      name: "estimatedTime",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
    },
    {
      type: "image",
      label: "Hero Image",
      name: "heroImage",
    },
    {
      type: "object",
      label: "Ingredients",
      name: "ingredients",
      list: true,
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "number",
          label: "Amount",
          name: "amount",
        },
        {
          type: "string",
          label: "Unit",
          name: "unit",
        },
      ],
    },
    {
      type: "object",
      label: "Steps",
      name: "steps",
      list: true,
      fields: [
        {
          type: "string",
          label: "Step",
          name: "step",
        },
      ],
    },
    {
      type: "object",
      label: "Ingredient Groups",
      name: "ingredientGroups",
      list: true,
      fields: [
        {
          type: "string",
          label: "Group Name",
          name: "groupName",
        },
        {
          type: "object",
          label: "Ingredients",
          name: "ingredients",
          list: true,
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name",
            },
            {
              type: "number",
              label: "Amount",
              name: "amount",
            },
            {
              type: "string",
              label: "Unit",
              name: "unit",
            },
          ],
        },
      ],
    },
    
    {
      type: "object",
      label: "Step Groups",
      name: "stepGroups",
      list: true,
      fields: [
        {
          type: "string",
          label: "Group Name",
          name: "groupName",
        },
        {
          type: "object",
          label: "Steps",
          name: "steps",
          list: true,
          fields: [
            {
              type: "string",
              label: "Step",
              name: "step",
            },
          ],
        },
      ],
    },
    {
      type: "boolean",
      label: "Vegetarian",
      name: "vegetarian",
    },
    {
      type: "boolean",
      label: "Vegan",
      name: "vegan",
    },
    {
      type: "boolean",
      label: "Gluten Free",
      name: "glutenFree",
    },
    {
      type: "boolean",
      label: "Dairy Free",
      name: "dairyFree",
    },
    {
      type: "boolean",
      label: "Nut Free",
      name: "nutFree",
    },
    {
      type: "boolean",
      label: "Low Carb",
      name: "lowCarb",
    },
  ],
};
