import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listCaseStudies } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { WorksHero } from '@/components/sections/works/WorksHero';
import { CaseGridClient } from '@/components/sections/works/CaseGridClient';
import { CTASection } from '@/components/sections/CTASection';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'case_studies' });
  const alts = makeAlternates('/calismalarimiz', locale);
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

export default async function CaseStudiesIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);

  return (
    <>
      <WorksHero count={cases.length > 0 ? cases.length : 47} />
      <CaseGridClient cases={cases} />
      <CTASection />
    </>
  );
}
