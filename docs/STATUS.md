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

- All 6 service pages: feature photos replaced by an animated bento of live UI scenes (2026-10-19, awaiting
  review). IT scenes in `Scene.astro`; Softwareentwicklung + Website & Branding in `SceneBuild.astro`; Linux,
  Netzwerk, Hosting in `SceneOps.astro` (Netzwerk/Hosting reuse procure, home, monitor, rack, config).
  Website & Branding: the 8 "Unsere Leistungen" items moved from a compact columns block into the feature bento.
- NEW COPY, needs Jenomics approval: on the 5 non-IT service pages a "So arbeiten wir" process strip
  (`block-process.astro`) and an FAQ (`block-faq.astro`), DE + EN, in `services.json`. Written only from facts
  already on jenomics.de (no SLAs, numbers or new claims); scene labels are generic (Anbieter A/B/C, web-01 …).
- Homepage hero: carousel replaced by a live app window (`hero-live.astro`), awaiting review.

- Service heroes (2026-10-19): the photo is replaced by that service's live pane from the homepage hero
  window (`hero-live.astro` with `only=<key>`), replaying its story every 7.5 s.
- Menu pages DE + EN (2026-10-19, awaiting review), scraped from jenomics.de via the public WP REST API:
  Über uns, Team, Karriere, Pricing, Kontakt, IKONA, SDX, Großmarkt (GM8), Blog index + all 16 posts.
  Stock photos replaced by animated scenes (`ScenesCompany.astro`, `ScenesProducts.astro`); people photos,
  product logos and the IHK seal kept. PDFs (job ads, price lists 2025/2026) in `public/files/`.
  Notes for Jenomics: the old Karriere page had 3 empty job ads (Assistenz Backoffice, Vertriebsinnendienst,
  Kaufmännischer Mitarbeiter: placeholder or wrong text), so they are left out; the application address was
  shown as job@ but linked to jobs@jenomics.de (we use jobs@, please confirm). SDX feature texts come from the
  SDX blog post. Kontakt map loads Google Maps only after a click (privacy). Blog posts stay German
  (/en/blog/ lists them with a note). Sample data inside the scenes (customer names, KPIs) is illustrative.
  Contact form needs the SMTP env vars on Hostinger (see `src/pages/api/contact.ts`).

- Header (2026-10-19): language switch stays (flag `SHOW_LANG` in Header.astro). Mobile drawer polished: current page marked, staggered entrance,
  quick call / mail buttons, Fernzugriff label.

- Legal pages (2026-10-19): Impressum, Datenschutz, AGB at /impressum/, /datenschutz/, /agb/ (German only),
  text 1:1 from jenomics.de (`src/content/legal/*.md`, template `Legal.astro`, sticky TOC on long pages),
  AGB PDF in `public/files/`. For Jenomics (not legal advice, needs their review): the Datenschutz text is
  now "Stand Oktober 2026": added sections for the contact form (2.2), hosting at Hostinger (3, AVV per
  Art. 28 DSGVO), no cookies (5) and the click-to-load Google Map (6, consent per Art. 6 (1) a DSGVO +
  § 25 TDDDG); the Impressum cites the DDG instead of MDStV/TDG. Jenomics must confirm: the Hostinger entity
  on their contract, that the AVV is signed, and whether a Verbraucherstreitbeilegung note is needed.
- Kontakt map (2026-10-19): Google Map loads only after a click (no Google request before), plus a
  "Route planen" link. Contact submissions are stored without IP or user agent.
- Team "Jenomics goes International" (2026-10-19): dotted world map scene (`globe` in ScenesCompany.astro,
  land dots from the global-land-mask package), arcs from Munich to remote pins with travelling sparks.
- Two old /news/<slug>/ links inside blog posts now point to /<slug>/.

- Contact form (2026-10-19): form action fixed to /api/contact/ (with trailingSlash 'always' the old URL
  301-redirected and browsers dropped the POST). Mail settings mirror the old WP Mail SMTP setup; set these
  in Hostinger → Node.js app → Environment variables: SMTP_HOST=mx01.jenomics.de, SMTP_PORT=25,
  SMTP_AUTO_TLS=false, MAIL_FROM=anfrage@jenomics.de, MAIL_FROM_NAME=Anfrage - Jenomics GmbH,
  MAIL_TO=anfrage@jenomics.de (SMTP_USER/SMTP_PASS optional). mx01 must accept mail from the Hostinger
  server (old WP host relayed without auth); if not, Jenomics provides an SMTP login. Enquiries are also
  stored in data/submissions/*.jsonl, so nothing is lost if mail fails. No reCAPTCHA (honeypot + rate limit).
- Contact mail (2026-10-23): the first live test timed out after 2 min ("Connection timeout" to mx01:25 from
  Hostinger; port 25 is most likely blocked outbound). The form now answers at once and sends the mail in the
  background (10 s connect timeout); the result is logged ("[contact] mail sent/failed") and noted in the jsonl.
  Waiting for an SMTP login (port 587/465) for anfrage@jenomics.de from Jenomics; then only the env vars change.

- Feedback round 2026-10-23: footer logo links home, no hairline under the footer claim; transparent blog
  graphics without frame (`#cut` on the image URL, `image_cut: true` for covers); IKONA replaced by Amaze Genius
  everywhere (product key `ag`, `/amaze-genius/`, 301 from `/ikona/`; the homepage project "IKONA Technologie" keeps
  its title, its tag now links to Amaze Genius); Amaze Genius and SDX pages are one-screen teasers
  (`templates/ProductTeaser.astro`) linking to amaze-genius.io and sdx-app.com; the CTO's name on /team/ is an
  image (`team-cto-name.webp`, alt empty) at his request; Kontakt map scene is a generated street map
  (`service/map-office.svg.txt`, generator kept outside the repo, shapely). Worklog for time entries: `docs/WORKLOG.md`.

## Next
- Jenomics EMCP: OAuth discovery fails because Mittwald answers every `/.well-known/*` URL with 403, so Claude
  Code can't find the authorization server. Needs `/.well-known/oauth-authorization-server` and
  `/.well-known/oauth-protected-resource` passed through to WordPress on the server. Until then scrape via
  `https://www.jenomics.de/wp-json/wp/v2/pages?slug=<slug>` (public).
- Remaining pages: Projekte (/projekte/, EN /en/projects/), Web-Deluxe-Kit (/web-deluxe-kit/).
- Links in header/footer already use the jenomics.de slugs, so they work once those pages exist.
  EN slugs (`/en/...`) are placeholders until the EN pages are built.
- Switch the jenomics.de domain to the Hostinger app once the subpages exist.
