import './globals.css';
import { Fraunces, Instrument_Sans, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';

const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#F7F4ED',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s · Airomeda' },
  description: 'Karmaşık olanı, basit kıl. Finans, iGaming ve e-ticaret için uçtan uca yazılım.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const localeHeader = h.get('x-next-intl-locale');
  const locale =
    localeHeader && (routing.locales as readonly string[]).includes(localeHeader)
      ? localeHeader
      : routing.defaultLocale;

  return (
    <html lang={locale} className={`${fraunces.variable} ${instrumentSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
