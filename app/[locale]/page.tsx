import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { getTranslations } from 'next-intl/server';

import { Hero } from '@/components/sections/Hero';
import { StatTicker } from '@/components/visuals/StatTicker';
import { CustomerLogos } from '@/components/sections/CustomerLogos';
import { WhyUs } from '@/components/sections/WhyUs';
import { IndustrySwitcher } from '@/components/sections/IndustrySwitcher';
import { Capabilities } from '@/components/sections/Capabilities';
import { Architecture } from '@/components/sections/Architecture';
import { SectionDivider } from '@/components/visuals/SectionDivider';
import { ProductionHeartbeat } from '@/components/sections/ProductionHeartbeat';
import { ScrollSequence } from '@/components/visuals/ScrollSequence';
import { BentoShowcase } from '@/components/sections/BentoShowcase';
import { StackPanel } from '@/components/sections/StackPanel';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { CodeSample } from '@/components/sections/CodeSample';
import { Numbers } from '@/components/sections/Numbers';
import { Manifesto } from '@/components/sections/Manifesto';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ProcessStory } from '@/components/sections/ProcessStory';
import { DeploymentPipeline } from '@/components/sections/DeploymentPipeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { DeploymentGlobe } from '@/components/sections/DeploymentGlobe';
import { StudioGallery } from '@/components/sections/StudioGallery';
import { ScreenshotMarquee } from '@/components/sections/ScreenshotMarquee';
import { CTASection } from '@/components/sections/CTASection';

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
      <StatTicker />
      <CustomerLogos />
      <WhyUs />
      <IndustrySwitcher />
      <Capabilities locale={locale} />
      <Architecture />
      <SectionDivider label="canlı sistem" />
      <ProductionHeartbeat />
      <ScrollSequence />
      <BentoShowcase />
      <StackPanel />
      <DeploymentGlobe />
      <ProductShowcase variant="finance" />
      <CodeSample />
      <ProductShowcase variant="gaming" reverse />
      <Numbers />
      <SectionDivider label="manifesto" />
      <Manifesto />
      <StudioGallery />
      <SelectedWork />
      <ProcessStory />
      <DeploymentPipeline />
      <Testimonials />
      <FAQ />
      <ScreenshotMarquee />
      <SectionDivider label="iletişim" />
      <CTASection />
    </>
  );
}
