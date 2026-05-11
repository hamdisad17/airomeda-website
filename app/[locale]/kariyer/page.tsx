import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listJobs } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { CTASection } from '@/components/sections/CTASection';
import { CareersHero } from '@/components/sections/careers/CareersHero';
import { CultureGallery } from '@/components/sections/careers/CultureGallery';
import { WhyJoin } from '@/components/sections/careers/WhyJoin';
import { OpenRoles } from '@/components/sections/careers/OpenRoles';
import { PerksStrip } from '@/components/sections/careers/PerksStrip';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });
  const alts = makeAlternates('/kariyer', locale);
  return {
    title: t('title'),
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title: t('title'),
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: t('title'),
    },
  };
}

export default async function CareersIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jobs = (await listJobs(locale)).filter((j) => j.active);

  return (
    <>
      <CareersHero openCount={jobs.length} />
      <PerksStrip />
      <CultureGallery />
      <WhyJoin />
      <OpenRoles jobs={jobs} />
      <CTASection />
    </>
  );
}
