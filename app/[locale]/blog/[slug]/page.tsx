import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listBlogPosts, loadBlogPostContent } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { MDXContent } from '@/components/mdx/MDXContent';
import { BlogMeta } from '@/components/blog/BlogMeta';
import { BlogList } from '@/components/blog/BlogList';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await listBlogPosts(locale);
    for (const p of posts) params.push({ locale, slug: p.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadBlogPostContent(slug, locale);
  if (!content) return {};
  const { frontmatter } = content;
  const alts = makeAlternates(`/blog/${slug}`, locale);
  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    alternates: alts,
    openGraph: {
      type: 'article' as const,
      url: alts.canonical,
      title: frontmatter.title,
      description: frontmatter.excerpt,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
      publishedTime: frontmatter.published_at,
      authors: [frontmatter.author],
      images: frontmatter.cover ? [`${SITE.url}${frontmatter.cover}`] : undefined,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: frontmatter.title,
      description: frontmatter.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await loadBlogPostContent(slug, locale);
  if (!content) notFound();
  const { frontmatter, body } = content;
  const t = await getTranslations({ locale, namespace: 'blog' });

  // Related posts: same categories, exclude current, top 3
  const allPosts = await listBlogPosts(locale);
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.categories.some((c) => frontmatter.categories.includes(c)),
    )
    .slice(0, 3);

  const url = makeAlternates(`/blog/${slug}`, locale).canonical;
  const article = articleSchema({
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    url,
    datePublished: frontmatter.published_at,
    author: frontmatter.author,
    image: frontmatter.cover ? `${SITE.url}${frontmatter.cover}` : undefined,
    locale,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: 'Airomeda', url: `${SITE.url}/${locale}` },
    { name: 'Blog', url: `${SITE.url}/${locale}/blog` },
    { name: frontmatter.title, url },
  ]);

  return (
    <>
      <JsonLd data={[article, breadcrumbs]} />
      <Container as="section" className="py-12 md:py-20">
        <ul className="mb-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {frontmatter.categories.map((c) => (
            <li key={c} className="rounded-full border border-border px-2 py-0.5">
              {c}
            </li>
          ))}
        </ul>
        <h1 className="max-w-3xl text-display-2 font-bold tracking-tight">{frontmatter.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{frontmatter.excerpt}</p>
        <div className="mt-6">
          <BlogMeta post={frontmatter} />
        </div>
      </Container>
      <Container as="article" className="prose-invert max-w-3xl py-12">
        <MDXContent source={body} />
      </Container>
      {related.length > 0 && (
        <Container as="section" className="py-20">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('related_posts')}</h2>
          <div className="mt-10">
            <BlogList posts={related} />
          </div>
        </Container>
      )}
      <CTASection />
    </>
  );
}
