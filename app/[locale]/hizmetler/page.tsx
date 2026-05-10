import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { Container } from '@/components/layout/Container';
import { Capabilities } from '@/components/sections/Capabilities';
import { CTASection } from '@/components/sections/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services_index' });
  const alts = makeAlternates('/hizmetler', locale);
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
      <Capabilities locale={locale} />
      <CTASection />
    </>
  );
}
