/** Languages of the site. DE is the default and lives at the root, EN under /en/. */
export const LANGS = [
  { code: 'de', locale: 'de-DE', og: 'de_DE', name: 'Deutsch', short: 'DE' },
  { code: 'en', locale: 'en-US', og: 'en_US', name: 'English', short: 'EN' },
] as const;

export type Lang = (typeof LANGS)[number]['code'];

/**
 * Texts of one dictionary file ({ de: {...}, en: {...} }) for one language.
 * Missing keys fall back to German, so a new text shows DE until it is translated.
 */
export function dict<T extends Record<string, Record<string, string>>>(data: T, lang: Lang): Record<string, string> {
  return { ...data.de, ...(data[lang] ?? {}) };
}

export function langInfo(lang: Lang) {
  return LANGS.find((l) => l.code === lang)!;
}

/** Jenomics was founded in 2001. Years are computed at build time so the copy never goes stale. */
export const FOUNDED = 2001;
export const YEARS = new Date().getFullYear() - FOUNDED;

/** Replaces {years} and {founded} placeholders in a text. */
export function fill(text: string) {
  return text.replaceAll('{years}', String(YEARS)).replaceAll('{founded}', String(FOUNDED));
}

/** Like dict(), but for files that also hold lists (testimonials, projects): shallow merge over German. */
export function pick<T>(data: Record<string, T>, lang: Lang): T {
  return { ...data.de, ...(data[lang] ?? {}) } as T;
}
