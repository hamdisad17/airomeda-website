import './globals.css';
import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#08080F',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s — Airomeda' },
  description: 'Karmaşık olanı, basit kıl. Finans, iGaming ve e-ticaret için uçtan uca yazılım.',
  icons: {
    icon: [
      { url: '/brand/mark-dark.png', media: '(prefers-color-scheme: dark)' },
      { url: '/brand/mark-light.png', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/brand/mark-dark.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const localeHeader = h.get('x-next-intl-locale');
  const locale =
    localeHeader && (routing.locales as readonly string[]).includes(localeHeader)
      ? localeHeader
      : routing.defaultLocale;

  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
