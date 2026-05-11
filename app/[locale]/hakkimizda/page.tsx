import type { Locale } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { staticPageMetadata } from '@/lib/page-route';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { StudioStory } from '@/components/sections/about/StudioStory';
import { TeamGrid } from '@/components/sections/about/TeamGrid';
import { Values } from '@/components/sections/about/Values';
import { StudioTimeline } from '@/components/sections/about/StudioTimeline';
import { PressLogos } from '@/components/sections/about/PressLogos';
import { CTASection } from '@/components/sections/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('about', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHero />
      <StudioStory />
      <TeamGrid />
      <Values />
      <StudioTimeline />
      <PressLogos />
      <CTASection />
    </>
  );
}
