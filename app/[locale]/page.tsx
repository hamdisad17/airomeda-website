import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Manifesto } from '@/components/sections/Manifesto';
import { Industries } from '@/components/sections/Industries';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { EditorialFeature } from '@/components/sections/EditorialFeature';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
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
      <Marquee />
      <Manifesto />
      <Industries />
      <ServicesGrid locale={locale} />
      <EditorialFeature />
      <SelectedWork locale={locale} />
      <ProcessSteps />
      <Testimonials />
      <BlogPreview locale={locale} />
      <CTABlock />
    </>
  );
}
