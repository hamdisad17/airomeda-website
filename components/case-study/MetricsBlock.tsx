import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export async function MetricsBlock({ metrics }: { metrics: CaseStudyFrontmatter['metrics'] }) {
  const t = await getTranslations('case_studies');
  return (
    <section className="border-b border-border relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, rgb(20 184 166 / 0.05), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-20">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
            {t('metric_results')}
          </p>
        </RevealSection>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-y md:divide-y-0 divide-border overflow-hidden">
          {metrics.map((m) => (
            <div key={m.label} className="p-8 bg-elevated group hover:bg-muted/40 transition-colors">
              <p
                className="font-semibold tabular-nums text-accent leading-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
              >
                {m.value}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
