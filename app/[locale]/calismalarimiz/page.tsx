import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listCaseStudies } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { Container } from '@/components/layout/Container';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { CTABlock } from '@/components/sections/CTABlock';

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
  const t = await getTranslations({ locale, namespace: 'case_studies' });
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </Container>
      <Container as="section" className="py-12">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard data={c} />
            </li>
          ))}
        </ul>
      </Container>
      <CTABlock />
    </>
  );
}
