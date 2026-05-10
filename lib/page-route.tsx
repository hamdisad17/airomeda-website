import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { loadPageContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { Container } from '@/components/layout/Container';
import type { Locale } from '@/i18n/routing';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';

const SLUG_BY_LOCALE = {
  about: { tr: 'hakkimizda', en: 'about' },
  contact: { tr: 'iletisim', en: 'contact' },
  privacy: { tr: 'kvkk', en: 'privacy' },
  cookies: { tr: 'cerez-politikasi', en: 'cookies' },
} as const;

type StaticPageKey = keyof typeof SLUG_BY_LOCALE;

export async function renderStaticPage(page: StaticPageKey, locale: Locale) {
  setRequestLocale(locale);
  const slug = SLUG_BY_LOCALE[page][locale];
  const content = await loadPageContent(slug, locale);
  if (!content) notFound();
  return (
    <Container as="article" className="prose-invert max-w-3xl py-20">
      <MDXContent source={content.body} />
    </Container>
  );
}

export async function staticPageMetadata(page: StaticPageKey, locale: Locale) {
  const slug = SLUG_BY_LOCALE[page][locale];
  const content = await loadPageContent(slug, locale);
  if (!content) return {};
  const pathByPage: Record<StaticPageKey, string> = {
    about: '/hakkimizda',
    contact: '/iletisim',
    privacy: '/kvkk',
    cookies: '/cerez-politikasi',
  };
  const alts = makeAlternates(pathByPage[page], locale);
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.description,
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title: content.frontmatter.title,
      description: content.frontmatter.description,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: content.frontmatter.title,
      description: content.frontmatter.description,
    },
  };
}
