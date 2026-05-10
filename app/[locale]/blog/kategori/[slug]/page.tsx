import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listBlogPosts, listBlogCategories } from '@/lib/mdx';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { Container } from '@/components/layout/Container';
import { BlogList } from '@/components/blog/BlogList';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

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
  const t = await getTranslations({ locale, namespace: 'blog' });
  const allPosts = await listBlogPosts(locale);
  const posts = allPosts
    .filter((p) => p.categories.includes(slug))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">{slug}</h1>
        <p className="mt-4 text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-10">
          <CategoryFilter locale={locale} active={slug} />
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
