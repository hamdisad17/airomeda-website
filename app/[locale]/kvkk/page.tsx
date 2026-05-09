import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('privacy', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderStaticPage('privacy', locale);
}
