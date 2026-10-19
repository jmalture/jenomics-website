# Status (2026-10-19)

## Done
- Homepage DE (`/`) and EN (`/en/`): hero, key figures + customer marquee, solutions tabs, services & products
  bento (dark), testimonials, projects, blog teaser, careers band, header with mega menu + mobile drawer, footer.
- Assets scraped from jenomics.de into `public/media` (clean crops of the hero/service photos without the baked blobs).
- Content changes vs. the old site: "20 Jahre" → computed years since 2001; typos fixed ("Philiosophie",
  "Managment", "der unserer Werte"); "Dein/Deinen" normalised to lowercase "dein"; Christian Sulser testimonial
  tagged "IT Administration" (was "Großmarkt", but the quote is about banking software).

- Homepage approved by Honza. Hero = single-screen cross-fade showcase with per-service colour theming.
- Repo jmalture/jenomics-website, Hostinger Node.js app auto-deploys from `main`
  (output `dist`, entry `server/entry.mjs`). Preview: https://aqua-fox-287761.hostingersite.com
- Handover notes for agents: `CLAUDE.md`.

## Next
- Full scrape via the Jenomics EMCP connection: all service/product pages, Über uns, Team, Karriere, Pricing,
  Kontakt (form → `/api/contact`), Projekte, legal pages, full blog articles.
- Links in header/footer already use the jenomics.de slugs, so they work once those pages exist.
  EN slugs (`/en/...`) are placeholders until the EN pages are built.
- Switch the jenomics.de domain to the Hostinger app once the subpages exist.
