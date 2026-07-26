# Cookbook agent instructions

## Working style

- Keep responses concise and focused on the result.
- Inspect the files needed to understand and verify the task. Avoid generated or dependency
  directories such as `node_modules/`, `dist/`, `.git/`, and logs.
- Preserve unrelated work in the working tree. Do not revert or overwrite changes you did not
  make.
- Prefer small, focused edits that follow the surrounding code and content.
- Correctness comes before speed or token savings.

## Repository layout

- `content/recipes/` — Swedish recipe Markdown files.
- `astro-site/src/content.config.ts` — recipe collection and frontmatter schema.
- `astro-site/src/components/` — Astro UI components.
- `astro-site/src/pages/` — pages, RSS, and search index.
- `astro-site/src/assets/app.css` — Tailwind CSS and DaisyUI setup.
- `astro-site/` — npm package and all Astro commands.

The site uses Astro 6, strict TypeScript, Tailwind CSS 4, and DaisyUI 5. Node.js 22.12 or
newer is required.

## Recipe files

- Create recipes in `content/recipes/` as Markdown files with YAML frontmatter.
- Use lowercase kebab-case filenames, for example `kottbullar-med-graddsas.md`.
- Write titles, descriptions, ingredient names, and steps in Swedish.
- Follow the current schema in `astro-site/src/content.config.ts`; do not rely only on an
  existing recipe because the schema may have changed.
- Use `ingredients` and `steps` for a single-part recipe. Use `ingredientGroups` and
  `stepGroups` when the recipe has distinct components.
- Keep numeric fields such as `basePortions`, `estimatedTime`, ingredient `amount`, and
  `rating` as YAML numbers rather than quoted strings.
- Add `heroImage` only when a suitable, correctly referenced image is available.

### Swedish ingredient style

Use familiar Swedish grocery-store terms and standard abbreviations:

- weight: `g`, `kg`
- volume: `ml`, `dl`, `l`
- spoons: `msk`, `tsk`, `krm`
- count and other measures: `st`, `nypa`, `klyfta`

Keep preparation details in the steps unless they are needed to identify or measure an
ingredient.

### Required chef review

After creating or editing a recipe, review it as a cook and fix concrete problems before
finishing. Check:

- taste balance and seasoning
- ingredient quantities relative to `basePortions`
- cooking temperatures, technique, and step order
- practical total time relative to `estimatedTime`
- Swedish ingredient names, units, and measurements
- dietary flags against the actual ingredients
- whether the instructions are complete and cookable

## Code and UI

- Follow the strict Astro TypeScript configuration. Avoid `any` unless there is a documented
  reason for it.
- Use 2-space indentation and follow the surrounding file's quote and import style.
- Prefer focused components over arbitrary file-size limits.
- Use semantic HTML and preserve keyboard and screen-reader accessibility.
- Reuse DaisyUI components and the existing emerald theme where they fit. Tailwind utilities
  are fine for layout and adjustments; do not force a DaisyUI component where plain semantic
  HTML is clearer.
- DaisyUI is already configured in `astro-site/src/assets/app.css`; do not add a CDN import.
- Keep user-facing interface text in Swedish.

## Verification

Run commands from the repository root unless stated otherwise.

```bash
# Install locked dependencies when needed
npm --prefix astro-site ci

# Required after recipe, schema, component, page, style, or configuration changes
npm --prefix astro-site run build

# Local development
npm --prefix astro-site run dev

# Preview a completed production build
npm --prefix astro-site run preview
```

There is no separate test or lint script. The production build is the main validation gate and
checks the Astro content schema and TypeScript compilation. For UI changes, also inspect the
relevant page at desktop and mobile widths when browser tooling is available.

Before finishing:

1. Review `git diff` for accidental or unrelated changes.
2. Run the relevant verification above.
3. Report what changed and the actual verification result.
4. Do not claim a deployment succeeded without checking the workflow or deployed site.
