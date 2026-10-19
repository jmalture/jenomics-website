# CLAUDE.md: jenomics-website

Handover for Claude Code agents. Read this first, then `README.md`, `docs/BRAND.md`, `docs/STATUS.md`.

## What this is
The 2026 rebuild of **jenomics.de** (Jenomics GmbH, Munich, IT company since 2001, owner of SDX).
Replaces the WordPress/Elementor site. Built by Alture (Honza / Jan Matyáš) on the **same architecture as
`jmalture/sdx-website`** (sdx-app.com): Astro 7, static pages + `@astrojs/node` for `/api/contact`, CSS inlined,
self-hosted fonts, no CMS (content is edited in code).

- Repo: https://github.com/jmalture/jenomics-website (branch `main`, public; MrBeardman is a collaborator)
- Local clone on Honza's PC: `C:\Data\Work\Jenomics\JenomicsWebsite` (work here; the older copy in
  `Documents\Jenomics\jenomics-website` is retired)
- Hosting: Hostinger Node.js app, auto-deploys from `main`. Preview URL: https://aqua-fox-287761.hostingersite.com
- Status: **homepage approved by Honza** (DE + EN). Everything else is next (see "Next tasks").

## Skills and knowledge to load
- **`jenomics-knowledge`** (`C:\Users\honza\.claude\skills\jenomics-knowledge\`): company facts, services and
  products, the full jenomics.de content inventory, brand guide, this rebuild. Source of truth for copy.
- **`sdx-presentations` → `references/brand-style-jenomics.md`**: short deck-oriented Jenomics brand summary.
- **`sdx-knowledge`**: only when SDX itself is the topic (SDX keeps its own brand: blue #2A73FF, Inter).
- **`frontend-design`** (built-in): for new sections and pages.
- **`hostinger:deploy-to-hosting` / `hostinger:troubleshoot-website`**: deployment problems.
- There is no `sdx-website-pages` skill; follow this repo's patterns (and `jmalture/sdx-website` docs).

## Commands
```
npm install
npm run dev       # http://localhost:4321  (DE at /, EN at /en/)
npm run build     # must pass before every push
npm start         # serves the build (node dist/server/entry.mjs)
npm run format    # Prettier
```
Hostinger settings that work: framework Astro, build `npm run build`, **output directory `dist`, entry file
`server/entry.mjs`** (entry is resolved inside the output dir), Node 22. Do not accept Hostinger's AI
"fix and redeploy" suggestion to switch Astro to `output: 'server'`; the build already emits `dist/server/entry.mjs`.

## Structure
```
src/pages/index.astro, src/pages/en/index.astro   route files, only pass the language
src/templates/Home.astro                          page template
src/components/home/NN-name.astro                 sections in page order (own CSS + script)
src/components/home/hero-live.astro               hero visual: live app window (see below)
src/templates/Service.astro, Services.astro       6 service pages / overview (/leistungen/, /en/services/)
src/components/service/                           page hero, feature cards, blocks (columns/logos/cases/tabs/refs/kit), CTA
  Scene.astro                                     animated UI scenes for the feature bento (SERVICE_SCENES in data.ts; IT only so far)
  services.json                                   service page texts (pages.<key>: lead, features, blocks)
src/components/ui/{Icon,Blobs}.astro              line icons, live blob field
src/components/{Header,Footer}.astro              mega menu + mobile drawer, dark footer
src/i18n/*.json                                   texts { de, en }; missing keys fall back to DE
  home.json (+ home.meta.json), chrome.json (header/footer), offer.json (6 services, 3 products), form.json
src/content/blog/*.md                             blog posts (frontmatter only so far), URLs /<slug>/ like jenomics.de
src/styles/site.css                               tokens, buttons, tags, pills, blobs, reveal, view transitions
src/scripts/site.ts                               reveal, header, mega menu, drawer, blob pause, tilt, spotlight, counters, tabs
src/pages/api/contact.ts                          contact form endpoint (for the coming Kontakt page)
public/media, public/fonts                        webp assets, Poppins 400/500/600
docs/BRAND.md, docs/STATUS.md                     brand guide, status
```
Raw scrape of the old site (HTML + original images): `Documents\Jenomics\jenomics-scrape\` on Honza's PC.

## Homepage sections
01 hero ("Make IT possible!" + live collage) · 02 trust (full-width key-figures band with count-up + customer
marquee) · 03 solutions (3 auto-advancing tabs) · 04 portfolio (dark bento: 6 services + 3 products, pointer
spotlight) · 05 testimonials (7 voices, filter chips, swipe) · 06 projects (4 expanding panels) · 07 blog
(Markdown) · 08 careers (blue band).

**Hero visual** (`hero-live.astro`, 2026-10-19, awaiting Honza's review; replaced the cross-fade slider): one
live app window. Icon rail (6 services + products) on the left, one pane at a time showing that service as a small
live UI (dashboard, code typing, site building, terminal, network, rack + "hostet grün", product apps). A cursor clicks
the next icon, the pane's story replays, then the cursor points at its [data-poi]; each switch re-themes the hero via
registered `--hA/--hB/--hC`. Hovering an icon previews it. Sized in `cqw`. No hero photo, so no LCP preload.
A 7-window collage (all services at once) was tried first: "way too busy, I don't know where to look". Keep one focal point.

## Brand in one paragraph
Poppins only (600 headings, 400 text, 500 UI). Blue #0E78B1 (primary), kicker blue #0C82C0, green #56C657 (products,
trust), navy #1E3D7E (accent), orange #F37123 only for "Fernzugriff", night #0B1A36 for the dark section and footer.
Buttons radius 10 px; tags radius 6 px (blue = service, green = product); framed photos with thin translucent
frame. Signature: organic gradient blobs (green→teal→cyan, blue→cyan, royal). Website voice: informal "du",
"Kund:innen". Full guide: `docs/BRAND.md`.

## Decisions and feedback from Honza (keep these)
- Jenomics = the **more serious sibling of SDX**: modern and animated, but calm easing, no bounce, deeper navy.
- Never hard-code "25 Jahre": use `{years}` / `{founded}` placeholders and `fill()` (years since 2001).
- **Blobs only float.** No cursor parallax and no touch/"lava lamp" reaction (both tried and rejected).
- **Hero: little text, no carousel.** A 3D ring carousel and a caption block with description + giant ghost word
  were tried and rejected ("too much text", "PowerPoint-ish"). The single-screen cross-fade was approved, then found
  "boring, a classic carousel"; replaced by the live app window (product UIs, the approach of the service-page bento).
- Key-figures band runs full width, edge to edge.
- Project panels: open/close must be smooth with **no text reflow** (body has the fixed open width via container
  units; a separate label shows in collapsed panels; they cross-fade). Hover intent 160 ms.
- Careers photo tilt: subtle (1°, 1.6 s).
- Content stays the same as jenomics.de; only typo fixes, lowercase "dein", the years placeholder, and the
  Christian Sulser testimonial tagged "IT Administration" (old site said "Großmarkt").

## Gotchas learned the hard way
- **`[data-reveal]` overrides an element's own `transition`.** `site.ts` removes the attribute after the reveal
  has played. Do not put `data-reveal` on elements that animate themselves on hover (e.g. put it on the list,
  not on each project panel), or the first hover snaps.
- **No `box-shadow` on elements inside a 3D (`preserve-3d`) context**: Chrome clips it into a pale rectangle.
- Smooth scroll is on (`html { scroll-behavior: smooth }`); in Playwright use `behavior: 'instant'` before measuring.
- Blobs/3D can widen the page on mobile; `html { overflow-x: clip }` is set, still check `scrollWidth === 390`.

## How to verify a change (do this before pushing)
1. `npm run build` passes.
2. Screenshot desktop 1440 and mobile 390 with Playwright (scroll through the page first so reveals fire) and look.
3. Check `document.documentElement.scrollWidth` equals the viewport width on mobile.
4. For animations, sample positions/sizes over time instead of trusting one screenshot.
5. Commit with a clear message, push to `main`, Hostinger deploys; check the preview URL.

## Next tasks
1. Scrape the rest of jenomics.de: IKONA, SDX, Großmarkt, Über uns, Team, Karriere, Pricing, Kontakt, Projekte,
   Web-Deluxe-Kit, AGB, Datenschutz, Impressum, full blog posts. The EMCP (`emcp-jenomics-de`, local scope) fails
   OAuth because Mittwald 403s `/.well-known/*`; the public REST API works:
   `/wp-json/wp/v2/pages?slug=<slug>` (old-site photos have baked blobs; crop them like `public/media/svc-*`).
2. Build those pages on the same template/section pattern, DE + EN (EN slugs in `offer.json`/`chrome.json` are
   placeholders until the pages exist). Kontakt uses `/api/contact` (set SMTP env vars in Hostinger).
   The 6 service pages + `/leistungen/` are done (2026-10-19), awaiting Honza's review.
3. Blog: full article bodies into `src/content/blog/*.md`, plus a blog index and post template.
4. Run `npm audit` (one high-severity warning on install) and update the affected dependency if safe.
5. Update `jenomics-knowledge` and `docs/STATUS.md` whenever pages or decisions are added.
6. Later: domain switch from WordPress to the Hostinger app (`hostinger:connect-domain`), 301s for changed URLs.
