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

      {/* Narrative / MDX content with cinematic wrapper */}
      <section className="border-b border-border py-20 md:py-28 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 40% 60% at 80% 50%, hsl(189 100% 50% / 0.04), transparent 70%)',
          }}
        />
        <Container as="div" className="relative">
          <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20">
            {/* Sidebar metadata */}
            <div className="md:sticky md:top-24 md:self-start space-y-6">
              <div className="border border-border bg-elevated p-5 font-mono text-xs">
                <p className="text-muted-foreground uppercase tracking-wider mb-3">{'> meta'}</p>
                {[
                  ['müşteri', frontmatter.client],
                  ['sektör', frontmatter.industry],
                  ['yıl', String(frontmatter.year)],
                  ['hizmetler', frontmatter.services.join(', ')],
                ].map(([k, v]) => (
                  <p key={k} className="flex gap-2 mb-1">
                    <span className="text-muted-foreground w-20 shrink-0">{k}</span>
                    <span className="text-accent">{v}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Main narrative */}
            <article className="max-w-2xl">
              <MDXContent source={body} />
              {frontmatter.testimonial && (
                <div className="mt-12">
                  <Quote
                    author={frontmatter.testimonial.author}
                    role={frontmatter.testimonial.role}
                  >
                    {frontmatter.testimonial.quote}
                  </Quote>
                </div>
              )}
            </article>
          </div>
        </Container>
      </section>

      <RelatedCases currentSlug={slug} locale={locale} />
      <CTASection />
    </>
  );
}
