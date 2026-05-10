import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/jsonld';
import { CookieConsent } from '@/components/legal/CookieConsent';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CursorGlow } from '@/components/motion/CursorGlow';
import { CommandPalette } from '@/components/overlay/CommandPalette';
import { ScrollProgress } from '@/components/motion/ScrollProgress';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <NextIntlClientProvider>
      <JsonLd data={[organizationSchema(), websiteSchema(locale as Locale)]} />
      <CursorGlow />
      <ScrollProgress />
      <CommandPalette />
      <SmoothScroll>
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <CookieConsent />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
