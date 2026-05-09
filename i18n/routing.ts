import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localeDetection: false,
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/hizmetler': { tr: '/hizmetler', en: '/services' },
    '/hizmetler/[slug]': { tr: '/hizmetler/[slug]', en: '/services/[slug]' },
    '/calismalarimiz': { tr: '/calismalarimiz', en: '/work' },
    '/calismalarimiz/[slug]': { tr: '/calismalarimiz/[slug]', en: '/work/[slug]' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/kariyer': { tr: '/kariyer', en: '/careers' },
    '/kariyer/[slug]': { tr: '/kariyer/[slug]', en: '/careers/[slug]' },
    '/hakkimizda': { tr: '/hakkimizda', en: '/about' },
    '/iletisim': { tr: '/iletisim', en: '/contact' },
    '/kvkk': { tr: '/kvkk', en: '/privacy' },
    '/cerez-politikasi': { tr: '/cerez-politikasi', en: '/cookies' },
  },
});

export type Locale = (typeof routing.locales)[number];
