import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localeDetection: false,
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
