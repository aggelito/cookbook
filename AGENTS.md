# LLM Behavior
## General
- Be fast and concise.  
- Only explain when needed — prefer short, clear answers.  
- Never repeat the prompt or previous messages.  

## Context use
- Open or read only files directly related to the task.  
- Skip large or irrelevant folders (node_modules, dist, build, .git, logs, etc.).  
- Summarize or infer instead of scanning whole projects when possible.  

## Code edits
- Show only changed lines or minimal context, not whole large files.  
- Combine related edits into one response.  

## Reasoning
- Think carefully but keep visible output short (a few sentences or bullet points).  
- Don't show internal reasoning unless the user asks for step-by-step detail.  

## Searching
- Use narrow, specific searches.  
- Avoid broad "search the whole repo" unless necessary.  

## Output
- Focus on the final code or result.  
- Keep explanations under a few sentences.  
- Skip repetition, fluff, and extra commentary.  

## Quality vs. cost
- Always keep correctness first.  
- Save tokens by being concise, not by skipping important info.  

# Cookbook Project - LLM Instructions

## Recipe Creation Guidelines

### File Location
- **ALL recipes MUST be created in**: `content/recipes/`
- **File format**: Markdown (`.md`)
- **Filename**: Use lowercase with hyphens (e.g., `pannkakor.md`, `kottbullar-med-graddsas.md`)

### Schema Reference
- Recipes follow the schema defined in `astro-site/src/content.config.ts`
- Review that file for the complete field structure and available options
- Each recipe is a Markdown file with YAML frontmatter
- If possible and able to do it correctly, add heroImage

### Language and Measurements
- **Language**: ALL recipe content MUST be in Swedish
- **Measurements**: Use standard Swedish units:
  - **Weight**: gram (g), kilogram (kg)
  - **Volume**: milliliter (ml), deciliter (dl), liter (l)
  - **Spoons**: matsked (msk/tablespoon), tesked (tsk/teaspoon), kryddmått (krm)
  - **Other**: nypa (pinch), st/styck (pieces), klyfta (clove)

### Ingredient Naming
- **Use Swedish grocery store terminology** that shoppers recognize at ICA, Coop, Willys, etc.
- **Avoid overly technical or uncommon terms** - use what Swedish home cooks would find in stores
- **Avoid details if not necessary** - in ingredients lists, avoid specifying how it should be prepared, unless necessary

### Notes
- For complex recipes with multiple components, use `ingredientGroups` and `stepGroups` instead of simple `ingredients` and `steps`
- Review existing recipes in `content/recipes/` for examples

## Code Style Guidelines

### TypeScript & Astro Configuration
- Uses Astro v5.16+ with strict TypeScript config (`astro/tsconfigs/strict`)
- Extend types via `.astro/types.d.ts` (auto-generated)
- No linting tools configured - keep code clean and type-safe manually
- Prefer explicit types over `any`

### Imports
- Group imports by order: 3rd-party > Astro modules > local imports
- Keep each file under ~100 lines of actual code when possible
- For recipe content, keep YAML frontmatter first, then HTML

### Formatting
- Use 2-space indentation (no tabs)
- Max line length ~100 characters for prose
- Recipe step descriptions should be concise but clear

### Naming Conventions
- Files: kebab-case (`my-recipe.md`)
- Collections: lowercase singular (`recipes` in content.config.ts)
- Fields: camelCase within schema objects

## Build/Deploy Commands

```bash
# Development server
cd astro-site && npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Astro CLI (for schema validation, etc.)
npm run astro [command]
```

## Testing Notes

No test framework is configured in this project. The Astro site uses static content from Markdown files without runtime tests.

- Content validation happens at build time via TypeScript schemas
- Recipes are validated against `content.config.ts` Zod schemas
- Run `npm run build` to catch schema/validation errors early

## UI Components - DaisyUI

- **ALWAYS use DaisyUI components** where possible (buttons, cards, navbars, etc.)
- Example pattern: `<button class="btn btn-primary bg-emerald-600 hover:bg-emerald-700">`
- DaisyUI is installed via npm (`daisyui@5.4.7`) - DO NOT add CDN link since it's already configured
- Add DaisyUI in layout if needed, check `astro-site/src/layouts/BaseLayout.astro`
- Use Tailwind + DaisyUI together for consistent, accessible UI

## Quality Control - UI Patterns

- Prefer DaisyUI components over raw HTML classes
- Use consistent color schemes (emerald/green for primary actions)
- Ensure responsive design with proper spacing and padding

