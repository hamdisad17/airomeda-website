import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { IndustryStrip } from '@/components/sections/IndustryStrip';
import { FeaturedCase } from '@/components/sections/FeaturedCase';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTABlock } from '@/components/sections/CTABlock';

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
      <FeaturedCase />
      <ProcessSteps />
      <Testimonials />
      <BlogPreview />
      <CTABlock />
    </>
  );
}
