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

- Service pages DE + EN (2026-10-19, awaiting review): IT Administration, Softwareentwicklung, Website & Branding,
  Betrieb Linux & Unix, Infrastruktur & Netzwerk, Hosting, plus the overview `/leistungen/` (`/en/services/`).
  One template (`templates/Service.astro`), content in `i18n/services.json`, sections in `components/service/`.
  Content from the public WP REST API. Copy changes vs. jenomics.de: typo fixes (Netwerk → Netzwerk in the title,
  Bereistellung, Unserer Team, unterstütz, Assests, Websiten, "großer deutsche", doubled "aber"), "20 Jahre" →
  `{years}`, beA sentence moved to the past ("Seit dem 01.01.2022 ist ... verpflichtend"), "vielzähligen" →
  "unzähligen". Linux "Zentralisiertes Konfigurationsmanagement" had the Schulungen text pasted by mistake on the
  old site; replaced with the Puppet text from Infrastruktur & Netzwerk. "43 Prozent aller Homepages" kept as is.

- IT Administration: feature photos replaced by an animated bento of live UI scenes (`Scene.astro`), awaiting
  review; the other 5 service pages still use photo cards.
- Homepage hero: carousel replaced by a live app window (`hero-live.astro`), awaiting review.

## Next
- Jenomics EMCP: OAuth discovery fails because Mittwald answers every `/.well-known/*` URL with 403, so Claude
  Code can't find the authorization server. Needs `/.well-known/oauth-authorization-server` and
  `/.well-known/oauth-protected-resource` passed through to WordPress on the server. Until then scrape via
  `https://www.jenomics.de/wp-json/wp/v2/pages?slug=<slug>` (public).
- Remaining pages: products (IKONA, SDX, Großmarkt), Über uns, Team, Karriere, Pricing, Kontakt
  (form → `/api/contact`), Projekte, Web-Deluxe-Kit, legal pages, full blog articles.
- Links in header/footer already use the jenomics.de slugs, so they work once those pages exist.
  EN slugs (`/en/...`) are placeholders until the EN pages are built.
- Switch the jenomics.de domain to the Hostinger app once the subpages exist.
