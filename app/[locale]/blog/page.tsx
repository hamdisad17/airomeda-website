import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listBlogPosts } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { BlogList } from '@/components/blog/BlogList';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title') };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = (await listBlogPosts(locale)).sort((a, b) =>
    b.published_at.localeCompare(a.published_at),
  );

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-10">
          <CategoryFilter locale={locale} />
        </div>
      </Container>
      <Container as="section" className="py-12">
        {posts.length > 0 ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-muted-foreground">{t('no_posts')}</p>
        )}
      </Container>
    </>
  );
}
