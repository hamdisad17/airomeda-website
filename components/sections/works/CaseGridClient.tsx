'use client';
import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TiltCard } from '@/components/motion/TiltCard';
import { RevealSection } from '@/components/motion/RevealSection';
import { CaseFilter } from './CaseFilter';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

interface CaseGridClientProps {
  cases: CaseStudyFrontmatter[];
}

function CaseCard({ data }: { data: CaseStudyFrontmatter }) {
  return (
    <Link href={`/calismalarimiz/${data.slug}`} className="group block h-full">
      <TiltCard className="h-full border border-border bg-elevated overflow-hidden relative transition-colors hover:border-accent/40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, hsl(189 100% 50% / 0.06), transparent 70%)',
          }}
        />

        <div className="p-6 md:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-eyebrow uppercase tracking-wider text-accent font-medium">{data.industry}</span>
            <span className="text-eyebrow uppercase tracking-wider text-muted-foreground">
              {data.year}
            </span>
          </div>

          {/* Client + title */}
          <div className="mt-4 flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {data.client}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground leading-tight group-hover:text-accent transition-colors">
              {data.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {data.excerpt}
            </p>
          </div>

          {/* Metrics */}
          <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3">
            {data.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <p className="text-lg font-semibold tabular-nums text-accent">{m.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="mt-4 flex flex-wrap gap-1.5">
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
      </TiltCard>
    </Link>
  );
}

export function CaseGridClient({ cases }: CaseGridClientProps) {
  const [selected, setSelected] = React.useState('Tümü');

  const filtered =
    selected === 'Tümü'
      ? cases
      : cases.filter((c) => c.industry.toLowerCase() === selected.toLowerCase());

  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Tüm Vakalar</p>
              <h2
                className="mt-3 font-semibold tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
              >
                Seçilmiş çalışmalar.
              </h2>
            </div>
            <CaseFilter selected={selected} onChange={setSelected} />
          </div>
        </RevealSection>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <RevealSection key={c.slug} delay={i * 0.05}>
              <CaseCard data={c} />
            </RevealSection>
          ))}
          {filtered.length === 0 && (
            <div className="md:col-span-3 py-20 text-center">
              <p className="font-mono text-muted-foreground text-sm">
                Bu kategoride henüz vaka çalışması yok.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
