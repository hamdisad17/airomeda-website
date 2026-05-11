import type { Locale } from '@/i18n/routing';
import { staticPageMetadata } from '@/lib/page-route';
import { setRequestLocale } from 'next-intl/server';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { DirectChannels } from '@/components/sections/contact/DirectChannels';
import { ContactGlobe } from '@/components/sections/contact/ContactGlobe';
import { CinematicContactForm } from '@/components/sections/contact/CinematicContactForm';

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
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <DirectChannels />
      <ContactGlobe />
      <CinematicContactForm />
    </>
  );
}
