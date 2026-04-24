# Copilot instructions for stefumies

Personal blog (https://stefumies.com) built with **Astro 6** + MDX, SSR'd on Vercel. Node `>=22.12.0`. See `CONTEXT.md` at the repo root for a deeper architectural overview — keep it in sync when making structural changes.

## Commands

```bash
npm run dev       # local dev server (localhost:4321)
npm run build     # production build → dist/
npm run preview   # preview built output
npm run astro -- check   # type-check .astro files (there is no test suite)
```

There is no lint/test tooling configured — do not invent one. Validate changes with `npm run build` and/or `astro check`.

## Architecture

- **Content collection `blog`** is defined in `src/content.config.ts`. The `pubDate` / `updatedDate` fields accept **both `DD-MM-YYYY` and `YYYY-MM-DD`** via a custom `dateField` transform — preserve this when touching the schema. `heroImage` uses Astro's `image()` so it must be a local path (processed by sharp).
- **Post filenames** follow `src/content/blog/YYYY-MM-DD-kebab-slug.md(x)`. The date prefix is only for filesystem sorting; actual sort order uses `pubDate` frontmatter. The slug shown in URLs is derived from the filename by Astro's glob loader.
- **Routing**: `src/pages/index.astro` lists posts; `src/pages/blog/[...slug].astro` renders a single post via `src/layouts/BlogPost.astro`; `/blog` → `/` redirect is set in `astro.config.mjs` (not a page file); `src/pages/rss.xml.js` is the RSS endpoint. When adding top-level routes, add them to `Header.astro` nav too.
- **Thumbnails**: if a post has no `heroImage`, `src/postEmoji.ts` picks a *stable* emoji from a fixed list by hashing the post `id`. Don't randomise — the hash→emoji mapping must stay deterministic so posts keep the same emoji across builds.
- **Theming**: dark/light is toggled via `data-theme="dark"` on `<html>`, persisted in `localStorage` under key `theme`. The init script lives **inline in `BaseHead.astro`** and must run before paint to avoid FOUC — keep it inline, don't extract it. All colours are CSS custom properties in `src/styles/global.css`; add new colours there rather than hardcoding.
- **Adapter**: `@astrojs/vercel` gives SSR on Vercel. Deploys happen automatically on push to `main` — no manual deploy step.

## Conventions

- **Indentation is tabs** (see existing `.ts` / `.astro` files). Single quotes in TS/JS, double quotes in `consts.ts` strings — follow whatever the file already uses.
- Site-wide strings (`SITE_TITLE`, `SITE_DESCRIPTION`) live in `src/consts.ts` — import from there rather than duplicating.
- Plain CSS only, scoped inside `.astro` components; global rules go in `src/styles/global.css`. No CSS-in-JS, no Tailwind.
- TypeScript is intentionally minimal — most logic lives in `.astro` frontmatter. Don't port things to React/Vue/Svelte; this is a pure-Astro site.
- When adding a post, copy `post-template.md` into `src/content/blog/` and co-locate any images next to the `.md` file so `heroImage: './image.png'` resolves.
