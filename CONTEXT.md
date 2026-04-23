# stefumies — Codebase Context

> Personal blog / diary by Steve Davies (software developer).  
> Live at **https://stefumies.com**

---

## Tech Stack

| Layer        | Choice                                                 |
| ------------ | ------------------------------------------------------ |
| Framework    | [Astro](https://astro.build) v6                        |
| Content      | Markdown / MDX (local files)                           |
| Integrations | `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`     |
| Adapter      | `@astrojs/vercel` (SSR on Vercel)                      |
| Styling      | Plain CSS (scoped component styles + one global sheet) |
| Language     | TypeScript (minimal — mostly `.astro`)                 |

---

## Project Layout

```
stefumies/
├── astro.config.mjs        # Astro config — site URL, integrations, Vercel adapter
├── vercel.json             # Vercel deployment config
├── tsconfig.json
├── post-template.md        # Starter template for new blog posts
├── public/                 # Static assets served as-is
└── src/
    ├── consts.ts           # SITE_TITLE, SITE_DESCRIPTION
    ├── content.config.ts   # Content collection schema (blog)
    ├── postEmoji.ts        # Derives an emoji thumbnail from a post slug
    ├── assets/             # Processed images (via sharp)
    ├── styles/
    │   └── global.css      # CSS custom properties (colors, fonts, layout vars),
    │                       #   base resets, dark/light theme via data-theme attr
    ├── components/
    │   ├── BaseHead.astro      # <head> — meta tags, fonts, theme init script
    │   ├── Header.astro        # Site nav (logo + "entries" / "about" links) +
    │   │                       #   dark/light toggle button
    │   ├── HeaderLink.astro    # Nav anchor with .active class logic
    │   ├── Footer.astro        # Minimal footer
    │   └── FormattedDate.astro # Formats a JS Date to a readable string
    ├── layouts/
    │   └── BlogPost.astro      # Full-page layout for individual posts:
    │                           #   BaseHead → Header → <article> → Footer
    ├── pages/
    │   ├── index.astro         # Home page — sorted post list with date,
    │   │                       #   title, description, hero image or emoji thumb
    │   ├── about.astro         # Static about page
    │   ├── rss.xml.js          # RSS feed endpoint
    │   └── blog/
    │       └── [...slug].astro # Dynamic post renderer — uses BlogPost layout
    └── content/
        └── blog/               # One .md or .mdx file per post
            └── YYYY-MM-DD-slug.md
```

---

## Content Collection (`src/content.config.ts`)

Collection name: **`blog`**  
Loader: `glob` — picks up `**/*.{md,mdx}` from `src/content/blog/`

### Frontmatter schema

| Field         | Type                                | Required |
| ------------- | ----------------------------------- | -------- |
| `title`       | string                              | ✅       |
| `description` | string                              | ✅       |
| `pubDate`     | `DD-MM-YYYY` or `YYYY-MM-DD` string | ✅       |
| `updatedDate` | same formats                        | ❌       |
| `heroImage`   | local image path                    | ❌       |

### Post filename convention

`YYYY-MM-DD-kebab-title.md` — the date prefix is for sorting; the slug is derived from the filename.

---

## Routing

| URL             | Source                             |
| --------------- | ---------------------------------- |
| `/`             | `src/pages/index.astro`            |
| `/blog`         | redirects → `/` (astro.config.mjs) |
| `/blog/[slug]/` | `src/pages/blog/[...slug].astro`   |
| `/about`        | `src/pages/about.astro`            |
| `/rss.xml`      | `src/pages/rss.xml.js`             |

---

## Theming

- Dark/light toggle stored in `localStorage` under key `theme`.
- Applied as `data-theme="dark"` on `<html>`.
- All colours use CSS custom properties defined in `global.css`.
- Theme initialised in `BaseHead.astro` (inline script, runs before paint to avoid flash).

---

## Adding a New Post

1. Copy `post-template.md` → `src/content/blog/YYYY-MM-DD-my-title.md`
2. Fill in frontmatter (`title`, `description`, `pubDate`)
3. Write body in Markdown (or MDX for components)
4. Optionally add `heroImage: './image.png'` (co-locate image in same dir);  
   without a hero image, `postEmoji.ts` generates an emoji thumbnail from the slug.

---

## Key Constants (`src/consts.ts`)

```ts
export const SITE_TITLE = "stefumies.";
export const SITE_DESCRIPTION =
  "A personal diary by Steve Davies — software developer.";
```

---

## Build & Deploy

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview built output
```

Deployment is automatic via Vercel on push to main.
