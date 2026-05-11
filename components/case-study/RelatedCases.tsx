import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

function RelatedCard({ data }: { data: CaseStudyFrontmatter }) {
  return (
    <Link
      href={`/calismalarimiz/${data.slug}`}
      className="group block border border-border bg-elevated p-7 relative overflow-hidden transition-colors hover:border-accent/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-24 w-24 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            'radial-gradient(circle at 100% 0%, hsl(189 100% 50% / 0.1), transparent 70%)',
        }}
      />
      <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{data.industry}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors">
        {data.title}
      </h3>
      <p className="mt-2 text-xs text-muted-foreground">{data.client} · {data.year}</p>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">{data.excerpt}</p>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {data.metrics.slice(0, 2).map((m) => (
            <span key={m.label} className="font-semibold tabular-nums text-accent text-sm">
              {m.value}
              <span className="text-muted-foreground font-normal text-xs ml-1">{m.label}</span>
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
          incele →
        </span>
      </div>
    </Link>
  );
}

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
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">İlgili Vakalar</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            {t('related_label')}
          </h2>
        </RevealSection>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {others.map((c) => (
            <RelatedCard key={c.slug} data={c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
