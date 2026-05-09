import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { loadPageContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { Container } from '@/components/layout/Container';
import type { Locale } from '@/i18n/routing';

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
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.description,
  };
}
