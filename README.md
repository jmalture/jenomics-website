# jenomics-website

The jenomics.de marketing website, rebuilt for 2026: static pages built with [Astro](https://astro.build),
plus one small Node endpoint for the contact form. Replaces the WordPress/Elementor site.
Same architecture as `sdx-website` (sdx-app.com).

## How it works

- **One template per page, all languages.** `src/templates/Home.astro` renders the homepage; the route
  files `src/pages/index.astro` (DE) and `src/pages/en/index.astro` (EN) only pass the language.
  Texts live in `src/i18n/<page>.json` as `{ "de": {...}, "en": {...} }`; missing keys fall back to German.
- **Sections** are components in `src/components/<page>/NN-<name>.astro`, each with its own CSS
  (`<style is:global>`, class prefix `jx-`) and, where needed, a small vanilla script.
- **Design system** (tokens, buttons, tags, pills, live blobs, reveal, page transitions):
  `src/styles/site.css`. Brand rules: `docs/BRAND.md`.
- **Shared behaviour** (reveal on scroll, header, mega menu, drawer, blob parallax, tilt, spotlight,
  counters, tabs): `src/scripts/site.ts`.
- **"25 Jahre"** is never typed: texts use `{years}` / `{founded}` and `fill()` computes them from 2001
  at build time.
- **Blog** posts are Markdown files in `src/content/blog/` (frontmatter: title, date, category, image,
  excerpt). They keep their jenomics.de URLs (`/<slug>/`). Full article bodies follow with the full scrape.
- `src/pages/api/contact.ts` is the only server route (for the coming Kontakt page).

## Commands

```
npm install
npm run dev       # http://localhost:4321
npm run build     # static pages in dist/client, server in dist/server
npm start         # serves dist (needs a build first)
npm run format    # Prettier
```

## Deployment (Hostinger Node.js app, linked via GitHub)

- Build command `npm run build`, start command `npm start`, Node 20.3 or newer.
- Environment variables: see `.env.example` (SMTP, recipients, `SUBMISSIONS_DIR`).

## Performance rules

- No third-party requests; Poppins self-hosted (400/500/600, latin preloaded).
- All CSS inlined; scripts are small deferred modules.
- One LCP image (hero, preloaded per breakpoint); everything else lazy.
- Animations are transform/opacity only, blobs pause off screen, `prefers-reduced-motion` drops movement.
- Target: 100 in PageSpeed on every page and language.

Status and next steps: `docs/STATUS.md`.
