import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listJobs, loadJobContent } from '@/lib/mdx';
import { Container } from '@/components/layout/Container';
import { MDXContent } from '@/components/mdx/MDXContent';
import { JobMeta } from '@/components/careers/JobMeta';
import { CTABlock } from '@/components/sections/CTABlock';

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
  return { title: content.frontmatter.title };
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

  return (
    <>
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

        <div className="mt-12 rounded-lg border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
          {t('apply_placeholder')}
        </div>
      </Container>
      <CTABlock />
    </>
  );
}
