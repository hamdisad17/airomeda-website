export const SITE = {
  name: 'Airomeda',
  legalName: 'Airomeda Yazılım',
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
  // Sosyal medya hesapları doğrulandıkça buraya eklenir; Organization
  // schema'sının sameAs alanına bu liste yansır.
  socialProfiles: [] as string[],
  // Set when there's a verifiable, public physical address. Without an
  // address we don't emit LocalBusiness markup (Google flags missing
  // fields as errors).
  address: null as null | {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  },
};

export type SiteLocale = (typeof SITE.locales)[number];
