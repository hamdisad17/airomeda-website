import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export async function MetricsBlock({ metrics }: { metrics: CaseStudyFrontmatter['metrics'] }) {
  const t = await getTranslations('case_studies');
  return (
    <section className="border-b border-border bg-muted/20">
      <Container as="div" className="py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('metric_results')}
        </p>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <li key={m.label}>
              <span className="block text-display-2 font-bold tracking-tight text-accent">
                {m.value}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{m.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
