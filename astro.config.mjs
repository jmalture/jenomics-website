// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.jenomics.de',
  trailingSlash: 'always',
  // Pages are pre-rendered to static HTML; only /api/* runs on the Node server (contact form).
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  build: {
    // Inline all CSS into the HTML: no render-blocking stylesheet requests.
    inlineStylesheets: 'always',
    format: 'directory',
  },
  compressHTML: true,
  // IKONA was replaced by Amaze Genius (2026-10)
  // Short link for the price list, announced by mail (2026-11-24): /preisliste-2027 -> current PDF
  redirects: {
    '/ikona/': '/amaze-genius/',
    '/en/ikona/': '/en/amaze-genius/',
    '/preisliste-2027/': '/files/jenomics_preisliste_services_flex_2027_v1.0_website.pdf',
  },
  security: { checkOrigin: false },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-US' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
});
