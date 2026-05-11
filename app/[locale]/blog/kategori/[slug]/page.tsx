import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listBlogPosts, listBlogCategories } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { BlogHero } from '@/components/sections/blog/BlogHero';
import { CinematicCategoryFilter } from '@/components/sections/blog/CategoryFilter';
import { PostGrid } from '@/components/sections/blog/PostGrid';
import { NewsletterCTA } from '@/components/sections/blog/NewsletterCTA';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const cats = await listBlogCategories(locale);
    for (const c of cats) params.push({ locale, slug: c });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const title = `${slug} · ${t('title')}`;
  const alts = makeAlternates(`/blog/kategori/${slug}`, locale);
  return {
    title,
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cats = await listBlogCategories(locale);
  if (!cats.includes(slug)) notFound();

  const allPosts = await listBlogPosts(locale);
  const posts = allPosts
    .filter((p) => p.categories.includes(slug))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));

  const lastUpdated = posts[0]?.published_at ?? '—';

  return (
    <>
      <BlogHero postCount={posts.length} lastUpdated={lastUpdated} />
      <CinematicCategoryFilter categories={cats} active={slug} />
      <PostGrid posts={posts} title={`// ${slug} · ${posts.length} yazı`} />
      <NewsletterCTA />
    </>
  );
}
