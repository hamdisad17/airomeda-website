import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listBlogPosts, listBlogCategories } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { BlogHero } from '@/components/sections/blog/BlogHero';
import { FeaturedPost } from '@/components/sections/blog/FeaturedPost';
import { CinematicCategoryFilter } from '@/components/sections/blog/CategoryFilter';
import { PostGrid } from '@/components/sections/blog/PostGrid';
import { NewsletterCTA } from '@/components/sections/blog/NewsletterCTA';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const alts = makeAlternates('/blog', locale);
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

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = (await listBlogPosts(locale)).sort((a, b) =>
    b.published_at.localeCompare(a.published_at),
  );
  const categories = await listBlogCategories(locale);

  const featured = posts[0];
  const restPosts = posts.slice(1);
  const lastUpdated = posts[0]?.published_at ?? '—';

  return (
    <>
      <BlogHero postCount={posts.length} lastUpdated={lastUpdated} />
      {featured && <FeaturedPost post={featured} />}
      <CinematicCategoryFilter categories={categories} />
      <PostGrid posts={restPosts} />
      <NewsletterCTA />
    </>
  );
}
