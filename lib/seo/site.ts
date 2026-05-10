export const SITE = {
  name: 'Airomeda',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://airomeda.com',
  defaultLocale: 'tr' as const,
  locales: ['tr', 'en'] as const,
  ogLocale: { tr: 'tr_TR', en: 'en_US' } as const,
  twitterHandle: '@airomeda',
  email: 'info@airomeda.com',
  description: {
    tr: 'Finans, iGaming, e-ticaret ve daha fazlası için uçtan uca yazılım.',
    en: 'End-to-end software for finance, iGaming, commerce and beyond.',
  },
};

export type SiteLocale = (typeof SITE.locales)[number];
