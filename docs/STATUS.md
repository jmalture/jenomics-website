# Status (2026-10-15)

## Done
- Homepage DE (`/`) and EN (`/en/`): hero, key figures + customer marquee, solutions tabs, services & products
  bento (dark), testimonials, projects, blog teaser, careers band, header with mega menu + mobile drawer, footer.
- Assets scraped from jenomics.de into `public/media` (clean crops of the hero/service photos without the baked blobs).
- Content changes vs. the old site: "20 Jahre" → computed years since 2001; typos fixed ("Philiosophie",
  "Managment", "der unserer Werte"); "Dein/Deinen" normalised to lowercase "dein"; Christian Sulser testimonial
  tagged "IT Administration" (was "Großmarkt", but the quote is about banking software).

## Next
- Full scrape via the Jenomics EMCP connection: all service/product pages, Über uns, Team, Karriere, Pricing,
  Kontakt (form → `/api/contact`), Projekte, legal pages, full blog articles.
- Links in header/footer already use the jenomics.de slugs, so they work once those pages exist.
  EN slugs (`/en/...`) are placeholders until the EN pages are built.
- Create the GitHub repo, connect the Hostinger Node.js app, then switch DNS.
