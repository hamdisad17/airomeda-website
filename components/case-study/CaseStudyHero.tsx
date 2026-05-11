import * as React from 'react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export async function CaseStudyHero({ data }: { data: CaseStudyFrontmatter }) {
  const t = await getTranslations('case_studies');
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(20 184 166 / 0.08), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-36">
        {/* Breadcrumb */}
        <nav className="mb-6 font-mono text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/calismalarimiz" className="hover:text-accent transition-colors">
            çalışmalarımız
          </Link>
          <span>/</span>
          <span className="text-foreground/60">{data.slug}</span>
        </nav>

        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
          Vaka · {data.industry}
        </p>
        <h1
          className="mt-6 max-w-4xl font-semibold tracking-tight text-foreground"
          style={{
            fontSize: 'clamp(2.75rem, 6vw, 5rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {data.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {data.excerpt}
        </p>

        {/* Meta row */}
        <div className="mt-10 flex flex-wrap gap-0 border border-border divide-x divide-border overflow-hidden">
          <div className="px-6 py-4 bg-elevated">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{t('client_label')}</p>
            <p className="mt-1 font-semibold text-foreground">{data.client}</p>
          </div>
          <div className="px-6 py-4 bg-elevated">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{t('industry_label')}</p>
            <p className="mt-1 font-semibold text-accent">{data.industry}</p>
          </div>
          <div className="px-6 py-4 bg-elevated">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{t('year_label')}</p>
            <p className="mt-1 font-semibold tabular-nums text-foreground">{data.year}</p>
          </div>
          <div className="px-6 py-4 bg-elevated flex-1">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{t('services_label')}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {data.services.map((s) => (
                <span
                  key={s}
                  className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
