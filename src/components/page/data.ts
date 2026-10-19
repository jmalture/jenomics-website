/** Texts and URLs of the company, product and blog pages (src/i18n/pages.json). */
import { pick, type Lang } from '../../i18n';
import pages from '../../i18n/pages.json';

export type PageKey = 'about' | 'team' | 'career' | 'pricing' | 'contact' | 'ikona' | 'sdx' | 'gm8' | 'blog';

/** URL of every page in both languages (DE keeps the jenomics.de slugs). */
export const PAGE_URLS: Record<PageKey, { de: string; en: string }> = {
  about: { de: '/ueber-uns/', en: '/en/about-us/' },
  team: { de: '/team/', en: '/en/team/' },
  career: { de: '/karriere/', en: '/en/careers/' },
  pricing: { de: '/pricing/', en: '/en/pricing/' },
  contact: { de: '/kontakt/', en: '/en/contact/' },
  ikona: { de: '/ikona/', en: '/en/ikona/' },
  sdx: { de: '/sdx/', en: '/en/sdx/' },
  gm8: { de: '/grosmarkt/', en: '/en/grossmarkt/' },
  blog: { de: '/blog/', en: '/en/blog/' },
};

/** Blob palette (A, B, C) per page, like SERVICE_VISUALS for the services. */
export const PAGE_PAL: Record<PageKey, [string, string, string]> = {
  about: ['#0e78b1', '#3fc6f2', '#56c657'],
  team: ['#1a8fe0', '#3fc6f2', '#2ee59d'],
  career: ['#0e78b1', '#20d3c2', '#56c657'],
  pricing: ['#1e3d7e', '#0e78b1', '#3fc6f2'],
  contact: ['#0e78b1', '#20d3c2', '#56c657'],
  ikona: ['#2a3bc8', '#29a8ef', '#2ee59d'],
  sdx: ['#2a73ff', '#29a8ef', '#20d3c2'],
  gm8: ['#3aa856', '#2ee59d', '#20d3c2'],
  blog: ['#0e78b1', '#3fc6f2', '#56c657'],
};

type Dict = Record<string, any>;

export function pageText(key: PageKey, lang: Lang): Dict {
  const all = pages as Record<string, Dict>;
  return { ...all.de[key], ...(all[lang]?.[key] ?? {}) };
}

export function pageUi(lang: Lang): Dict {
  return pick(pages as Record<string, Dict>, lang).ui;
}
