import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listBlogPosts, loadBlogPostContent } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { MDXContent } from '@/components/mdx/MDXContent';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { BlogDetailHero } from '@/components/sections/blog/BlogDetailHero';
import { ReadingProgress } from '@/components/sections/blog/ReadingProgress';
import { AuthorBio } from '@/components/sections/blog/AuthorBio';
import { RelatedPosts } from '@/components/sections/blog/RelatedPosts';
import Image from 'next/image';

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

const COVER_FALLBACK = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80';

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

  const coverSrc = frontmatter.cover?.startsWith('http') ? frontmatter.cover : COVER_FALLBACK;

  return (
    <>
      <JsonLd data={[article, breadcrumbs]} />
      <ReadingProgress />
      <BlogDetailHero post={frontmatter} />

      {/* Hero image */}
      <div className="relative border-b border-border overflow-hidden" style={{ height: 'clamp(240px, 40vh, 520px)' }}>
        <Image
          src={coverSrc}
          alt={frontmatter.title}
          fill
          className="object-cover grayscale-[20%] contrast-[1.05]"
          priority
          sizes="100vw"
          unoptimized={coverSrc.startsWith('https://images.unsplash')}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent 60%, hsl(240 10% 3.5% / 0.8))' }}
        />
      </div>

      {/* Article body */}
      <Container as="article" className="max-w-3xl mx-auto py-16 prose prose-invert
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-code:font-mono prose-code:text-accent prose-code:text-sm
        prose-pre:bg-elevated prose-pre:border prose-pre:border-border
        prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground
        prose-strong:text-foreground prose-li:text-muted-foreground
      ">
        <MDXContent source={body} />
      </Container>

      <AuthorBio author={frontmatter.author} />
      <RelatedPosts posts={related} />
      <CTASection />
    </>
  );
}
