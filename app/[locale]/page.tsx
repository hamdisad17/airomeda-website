import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home.hero');

  return (
    <main className="container py-24">
      <h1 className="text-display-1 font-bold">{t('title')}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
    </main>
  );
}
