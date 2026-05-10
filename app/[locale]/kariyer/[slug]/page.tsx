import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listJobs, loadJobContent } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { MDXContent } from '@/components/mdx/MDXContent';
import { JobMeta } from '@/components/careers/JobMeta';
import { CTABlock } from '@/components/sections/CTABlock';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { jobPostingSchema, jobSchemaEmploymentType, breadcrumbSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';

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
  const tApp = await getTranslations({ locale, namespace: 'application_form' });

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
      <Container as="section" className="border-b border-border py-16 md:py-24">
        <h1 className="max-w-3xl text-display-2 font-bold tracking-tight">{frontmatter.title}</h1>
        <div className="mt-8">
          <JobMeta job={frontmatter} />
        </div>
      </Container>
      <Container as="article" className="prose-invert max-w-3xl py-12">
        <MDXContent source={body} />

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">
          {t('responsibilities_title')}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
          {frontmatter.responsibilities.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">{t('requirements_title')}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
          {frontmatter.requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight">{t('benefits_title')}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
          {frontmatter.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            {tApp('title')}
          </h2>
          <div className="mt-8">
            <JobApplicationForm jobSlug={slug} />
          </div>
        </div>
      </Container>
      <CTABlock />
    </>
  );
}
