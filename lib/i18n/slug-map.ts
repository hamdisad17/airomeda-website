import type { Locale } from '@/i18n/routing';

export type ServiceKey =
  | 'finance'
  | 'gaming'
  | 'ecommerce'
  | 'integration'
  | 'seo-ads'
  | 'social-media'
  | 'crm'
  | 'corporate-web'
  | 'fastpay';

type ServiceEntry = {
  key: ServiceKey;
  slugs: Record<Locale, string>;
};

export const SERVICE_SLUGS: readonly ServiceEntry[] = [
  { key: 'finance', slugs: { tr: 'finans', en: 'finance' } },
  { key: 'gaming', slugs: { tr: 'sans-oyunlari', en: 'gaming' } },
  { key: 'ecommerce', slugs: { tr: 'e-ticaret', en: 'ecommerce' } },
  { key: 'integration', slugs: { tr: 'entegrasyon', en: 'integration' } },
  { key: 'seo-ads', slugs: { tr: 'seo-reklam', en: 'seo-ads' } },
  { key: 'social-media', slugs: { tr: 'sosyal-medya', en: 'social-media' } },
  { key: 'crm', slugs: { tr: 'crm', en: 'crm' } },
  { key: 'corporate-web', slugs: { tr: 'kurumsal-web', en: 'kurumsal-web' } },
  { key: 'fastpay', slugs: { tr: 'fastpay', en: 'fastpay' } },
] as const;

export function getServiceSlugInLocale(
  slug: string,
  fromLocale: Locale,
  toLocale: Locale,
): string | undefined {
  const entry = SERVICE_SLUGS.find((e) => e.slugs[fromLocale] === slug);
  return entry?.slugs[toLocale];
}

export function getServiceByKey(key: ServiceKey, locale: Locale): string {
  const entry = SERVICE_SLUGS.find((e) => e.key === key);
  if (!entry) throw new Error(`Unknown service key: ${key}`);
  return entry.slugs[locale];
}

export function listServiceSlugs(locale: Locale): string[] {
  return SERVICE_SLUGS.map((e) => e.slugs[locale]);
}
