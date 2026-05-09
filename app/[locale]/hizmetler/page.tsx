import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/layout/Container';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CTABlock } from '@/components/sections/CTABlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_index' });
  return { title: t('title') };
}

export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'services_index' });

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">{t('title')}</h1>
      </Container>
      <ServicesGrid locale={locale} />
      <CTABlock />
    </>
  );
}
