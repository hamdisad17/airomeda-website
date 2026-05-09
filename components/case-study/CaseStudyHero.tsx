import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export async function CaseStudyHero({ data }: { data: CaseStudyFrontmatter }) {
  const t = await getTranslations('case_studies');
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {t('client_label')}: {data.client}
        </p>
        <h1 className="mt-4 max-w-3xl text-display-2 font-bold tracking-tight">{data.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{data.excerpt}</p>
        <dl className="mt-10 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('industry_label')}
            </dt>
            <dd className="mt-1 font-medium">{data.industry}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('year_label')}
            </dt>
            <dd className="mt-1 font-medium">{data.year}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('services_label')}
            </dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {data.services.map((s) => (
                <span key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
