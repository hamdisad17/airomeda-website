import './globals.css';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s · Airomeda' },
  description: 'Airomeda — Bilişim teknolojileri çözümleri.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const localeHeader = h.get('x-next-intl-locale');
  const locale =
    localeHeader && (routing.locales as readonly string[]).includes(localeHeader)
      ? localeHeader
      : routing.defaultLocale;

  return (
    <html lang={locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
