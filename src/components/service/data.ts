/** Shared data for the service pages: visuals per service and typed access to services.json / offer.json. */
import { pick, type Lang } from '../../i18n';
import services from '../../i18n/services.json';
import offer from '../../i18n/offer.json';

export type ServiceKey = 'it' | 'dev' | 'web' | 'linux' | 'net' | 'host';

/** Hero photo (/media/<img>-1200.webp + -720.webp) and blob palette A, B, C (same as the homepage hero screens). */
export const SERVICE_VISUALS: Record<ServiceKey, { img: string; pal: [string, string, string] }> = {
  it: { img: 'service-it-admin', pal: ['#1a8fe0', '#3fc6f2', '#2ee59d'] },
  dev: { img: 'service-dev', pal: ['#2a3bc8', '#1a6fe0', '#29a8ef'] },
  web: { img: 'service-web', pal: ['#20d3c2', '#2ee59d', '#1ab8e8'] },
  linux: { img: 'service-linux', pal: ['#1e3d7e', '#0e78b1', '#3fc6f2'] },
  net: { img: 'service-net', pal: ['#0e78b1', '#20d3c2', '#56c657'] },
  host: { img: 'service-host', pal: ['#56c657', '#2ee59d', '#20d3c2'] },
};

export type SceneName = 'procure' | 'monitor' | 'train' | 'rack' | 'apps' | 'remote' | 'home';

/**
 * Feature bento with animated scenes (components/service/Scene.astro) instead of photos, one entry per
 * feature in order: scene name and width in sixths of the row. Services without an entry keep photo cards.
 */
export const SERVICE_SCENES: Partial<Record<ServiceKey, { scene: SceneName; span: 2 | 3 | 4 }[]>> = {
  it: [
    { scene: 'procure', span: 2 },
    { scene: 'monitor', span: 4 },
    { scene: 'train', span: 2 },
    { scene: 'rack', span: 2 },
    { scene: 'apps', span: 2 },
    { scene: 'remote', span: 3 },
    { scene: 'home', span: 3 },
  ],
};

export interface Feature {
  title: string;
  text: string;
}
export interface Block {
  type: 'columns' | 'logos' | 'cases' | 'refs' | 'tabs' | 'kit';
  [k: string]: any;
}
export interface ServicePage {
  meta_title: string;
  meta_desc: string;
  title: string;
  lead: string[];
  hero_alt: string;
  feat_title?: string;
  feat_text?: string;
  features: Feature[];
  blocks: Block[];
}

type Data = { ui: Record<string, string>; pages: Record<ServiceKey, ServicePage> };

export function serviceUi(lang: Lang) {
  return pick(services as Record<string, Data>, lang).ui;
}

export function servicePage(key: ServiceKey, lang: Lang): ServicePage {
  const all = services as Record<string, Data>;
  return { ...all.de.pages[key], ...(all[lang]?.pages[key] ?? {}) };
}

export function offerServices(lang: Lang) {
  return pick(offer, lang).services as { key: ServiceKey; name: string; desc: string; href: string }[];
}

/** URL of a service in every language, taken from offer.json. */
export function serviceAlternates(key: ServiceKey) {
  const find = (lang: Lang) => offerServices(lang).find((s) => s.key === key)!.href;
  return { de: find('de'), en: find('en') };
}
