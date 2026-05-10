import './globals.css';
import { Bricolage_Grotesque, Karla } from 'next/font/google';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-karla',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F7F4ED',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s — Airomeda' },
  description: 'Airomeda — Bilişim teknolojileri stüdyosu. Finans, iGaming, e-ticaret.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const localeHeader = h.get('x-next-intl-locale');
  const locale =
    localeHeader && (routing.locales as readonly string[]).includes(localeHeader)
      ? localeHeader
      : routing.defaultLocale;

  return (
    <html lang={locale} className={`${bricolage.variable} ${karla.variable}`}>
      <body>{children}</body>
    </html>
  );
}
