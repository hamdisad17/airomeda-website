import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Testimonials } from '@/components/sections/Testimonials';
import { CosmicCTA } from '@/components/sections/CosmicCTA';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const description = SITE.description[locale];
  return {
    title: SITE.name,
    description,
    alternates: makeAlternates('/', locale),
    openGraph: {
      type: 'website',
      url: makeAlternates('/', locale).canonical,
      title: t('title'),
      description,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: { card: 'summary_large_image', title: t('title'), description },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <FeatureGrid />
      <HowItWorks />
      <SelectedWork />
      <Testimonials />
      <CosmicCTA />
    </>
  );
}
