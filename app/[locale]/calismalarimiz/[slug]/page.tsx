import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listCaseStudies, loadCaseStudyContent } from '@/lib/mdx';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { MetricsBlock } from '@/components/case-study/MetricsBlock';
import { RelatedCases } from '@/components/case-study/RelatedCases';
import { MDXContent } from '@/components/mdx/MDXContent';
import { Quote } from '@/components/mdx/Quote';
import { Container } from '@/components/layout/Container';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const cases = await listCaseStudies(locale);
    for (const c of cases) params.push({ locale, slug: c.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadCaseStudyContent(slug, locale);
  if (!content) return {};
  const alts = makeAlternates(`/calismalarimiz/${slug}`, locale);
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.excerpt,
    alternates: alts,
    openGraph: {
      type: 'article' as const,
      url: alts.canonical,
      title: content.frontmatter.title,
      description: content.frontmatter.excerpt,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: content.frontmatter.title,
      description: content.frontmatter.excerpt,
    },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await loadCaseStudyContent(slug, locale);
  if (!content) notFound();
  const { frontmatter, body } = content;

  const url = makeAlternates(`/calismalarimiz/${slug}`, locale).canonical;
  const article = articleSchema({
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    url,
    author: SITE.name,
    locale,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: 'Airomeda', url: `${SITE.url}/${locale}` },
    {
      name: locale === 'tr' ? 'Çalışmalarımız' : 'Our Work',
      url: `${SITE.url}/${locale}/calismalarimiz`,
    },
    { name: frontmatter.title, url },
  ]);

  return (
    <>
      <JsonLd data={[article, breadcrumbs]} />
      <CaseStudyHero data={frontmatter} />
      <MetricsBlock metrics={frontmatter.metrics} />
      <Container as="article" className="prose-invert max-w-3xl py-20">
        <MDXContent source={body} />
        {frontmatter.testimonial && (
          <Quote
            author={frontmatter.testimonial.author}
            role={frontmatter.testimonial.role}
          >
            {frontmatter.testimonial.quote}
          </Quote>
        )}
      </Container>
      <RelatedCases currentSlug={slug} locale={locale} />
      <CTASection />
    </>
  );
}
