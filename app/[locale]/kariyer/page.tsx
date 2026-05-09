import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listJobs } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { JobList } from '@/components/careers/JobList';
import { TeamCultureSection } from '@/components/careers/TeamCultureSection';
import { CTABlock } from '@/components/sections/CTABlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careers' });
  return { title: t('title') };
}

export default async function CareersIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'careers' });
  const jobs = (await listJobs(locale)).filter((j) => j.active);

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
      </Container>
      <TeamCultureSection />
      <Container as="section" className="py-20">
        <h2 className="mb-10 text-display-2 font-semibold tracking-tight">
          {t('open_positions')}
        </h2>
        {jobs.length > 0 ? (
          <JobList jobs={jobs} />
        ) : (
          <p className="text-muted-foreground">{t('no_open_positions')}</p>
        )}
      </Container>
      <CTABlock />
    </>
  );
}
