import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { CustomerLogos } from '@/components/sections/CustomerLogos';
import { WhyUs } from '@/components/sections/WhyUs';
import { IndustrySwitcher } from '@/components/sections/IndustrySwitcher';
import { Capabilities } from '@/components/sections/Capabilities';
import { Architecture } from '@/components/sections/Architecture';
import { BentoShowcase } from '@/components/sections/BentoShowcase';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { CustomerNumbers } from '@/components/sections/CustomerNumbers';
import { Manifesto } from '@/components/sections/Manifesto';
import { StudioGallery } from '@/components/sections/StudioGallery';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { CustomerJourney } from '@/components/sections/CustomerJourney';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { ScreenshotMarquee } from '@/components/sections/ScreenshotMarquee';
import { CTASection } from '@/components/sections/CTASection';
import { DeploymentGlobe } from '@/components/sections/DeploymentGlobe';

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
      <CustomerLogos />
      <WhyUs />
      <IndustrySwitcher />
      <Capabilities locale={locale} />
      <Architecture />
      <BentoShowcase />
      <ProductShowcase variant="finance" />
      <ProductShowcase variant="gaming" reverse />
      <CustomerNumbers />
      <Manifesto />
      <StudioGallery />
      <SelectedWork />
      <CustomerJourney />
      <DeploymentGlobe />
      <Testimonials />
      <FAQ />
      <ScreenshotMarquee />
      <CTASection />
    </>
  );
}
