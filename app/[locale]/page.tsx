import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { LiveStatus } from '@/components/sections/LiveStatus';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Metrics } from '@/components/sections/Metrics';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTABlock } from '@/components/sections/CTABlock';

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
      <Manifesto />
      <LiveStatus />
      <ServicesGrid locale={locale} />
      <SelectedWork locale={locale} />
      <ProcessSteps />
      <Metrics />
      <Testimonials />
      <BlogPreview locale={locale} />
      <CTABlock />
    </>
  );
}
