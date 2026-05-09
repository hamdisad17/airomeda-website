import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';
import { Container } from '@/components/layout/Container';
import { ContactForm } from '@/components/forms/ContactForm';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('contact', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact_form' });
  return (
    <>
      {await renderStaticPage('contact', locale)}
      <Container as="section" className="max-w-3xl py-12">
        <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
        <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
