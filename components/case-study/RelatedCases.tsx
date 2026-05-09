import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import { CaseStudyCard } from './CaseStudyCard';

export async function RelatedCases({
  currentSlug,
  locale,
  limit = 2,
}: {
  currentSlug: string;
  locale: Locale;
  limit?: number;
}) {
  const t = await getTranslations('case_studies');
  const all = await listCaseStudies(locale);
  const others = all.filter((c) => c.slug !== currentSlug).slice(0, limit);
  if (others.length === 0) return null;
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">{t('related_label')}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <CaseStudyCard data={c} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
