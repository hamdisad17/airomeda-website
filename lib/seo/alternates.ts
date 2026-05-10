import { SITE, type SiteLocale } from './site';

/**
 * Build canonical + hreflang alternates for a given path AND locale.
 * pathWithoutLocale must NOT include the leading locale prefix; e.g. '/hizmetler/finans'.
 */
export function makeAlternates(pathWithoutLocale: string, locale: SiteLocale) {
  const tr = `${SITE.url}/tr${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  const en = `${SITE.url}/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  const canonical = locale === 'tr' ? tr : en;
  return {
    canonical,
    languages: {
      tr,
      en,
      'x-default': tr,
    },
  };
}
