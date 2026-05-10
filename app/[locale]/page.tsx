import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { IndustryStrip } from '@/components/sections/IndustryStrip';
import { FeaturedCase } from '@/components/sections/FeaturedCase';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTABlock } from '@/components/sections/CTABlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const description = SITE.description[locale];
  const alts = makeAlternates('/', locale);
  return {
    title: SITE.name,
    description,
    alternates: alts,
    openGraph: {
      type: 'website',
      url: alts.canonical,
      title: t('title'),
      description,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesGrid locale={locale} />
      <IndustryStrip />
      <FeaturedCase locale={locale} />
      <ProcessSteps />
      <Testimonials />
      <BlogPreview locale={locale} />
      <CTABlock />
    </>
  );
}
