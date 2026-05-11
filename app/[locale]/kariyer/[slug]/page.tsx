import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listJobs, loadJobContent } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { MDXContent } from '@/components/mdx/MDXContent';
import { CTASection } from '@/components/sections/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { jobPostingSchema, jobSchemaEmploymentType, breadcrumbSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { JobDetailHero } from '@/components/sections/careers/JobDetailHero';
import { ApplyForm } from '@/components/sections/careers/ApplyForm';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const jobs = await listJobs(locale);
    for (const j of jobs) if (j.active) params.push({ locale, slug: j.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadJobContent(slug, locale);
  if (!content || !content.frontmatter.active) return {};
  const alts = makeAlternates(`/kariyer/${slug}`, locale);
  return {
    title: content.frontmatter.title,
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title: content.frontmatter.title,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: content.frontmatter.title,
    },
  };
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await loadJobContent(slug, locale);
  if (!content || !content.frontmatter.active) notFound();
  const { frontmatter, body } = content;
  const t = await getTranslations({ locale, namespace: 'careers' });

  const url = makeAlternates(`/kariyer/${slug}`, locale).canonical;
  const jobLd = jobPostingSchema({
    title: frontmatter.title,
    description:
      frontmatter.responsibilities.join(' ') + ' ' + frontmatter.requirements.join(' '),
    url,
    datePosted: frontmatter.posted_at,
    employmentType: jobSchemaEmploymentType(frontmatter.employment_type),
    hiringOrganizationName: SITE.name,
    jobLocation: frontmatter.location,
    locale,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: 'Airomeda', url: `${SITE.url}/${locale}` },
    {
      name: locale === 'tr' ? 'Kariyer' : 'Careers',
      url: `${SITE.url}/${locale}/kariyer`,
    },
    { name: frontmatter.title, url },
  ]);

  return (
    <>
      <JsonLd data={[jobLd, breadcrumbs]} />
      <JobDetailHero job={frontmatter} />

      {/* Job body */}
      <Container as="article" className="max-w-3xl mx-auto py-16
        prose prose-invert
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-code:font-mono prose-code:text-accent prose-code:text-sm
        prose-strong:text-foreground prose-li:text-muted-foreground
      ">
        <MDXContent source={body} />

        <h2 className="mt-12 !text-2xl font-semibold tracking-tight text-foreground">
          {t('responsibilities_title')}
        </h2>
        <ul className="mt-4 space-y-2 pl-0 list-none">
          {frontmatter.responsibilities.map((r) => (
            <li key={r} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1 shrink-0">→</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 !text-2xl font-semibold tracking-tight text-foreground">
          {t('requirements_title')}
        </h2>
        <ul className="mt-4 space-y-2 pl-0 list-none">
          {frontmatter.requirements.map((r) => (
            <li key={r} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1 shrink-0">·</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 !text-2xl font-semibold tracking-tight text-foreground">
          {t('benefits_title')}
        </h2>
        <ul className="mt-4 space-y-2 pl-0 list-none">
          {frontmatter.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-accent mt-1 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Container>

      <ApplyForm jobSlug={slug} jobTitle={frontmatter.title} />
      <CTASection />
    </>
  );
}
