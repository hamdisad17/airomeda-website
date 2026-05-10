'use client';

import * as React from 'react';
import { Container } from '@/components/layout/Container';

const ITEMS: {
  value: number;
  suffix: string;
  label: string;
  format?: 'int' | 'percent' | 'currency';
}[] = [
  { value: 28, suffix: '+', label: 'production deployments' },
  { value: 99.994, suffix: '%', label: 'aggregate uptime / 30d', format: 'percent' },
  { value: 4.2, suffix: 'B', label: 'transactions processed', format: 'int' },
  { value: 7, suffix: '', label: 'years operating' },
];

function fmt(v: number, format?: 'int' | 'percent' | 'currency') {
  if (format === 'percent') return v.toFixed(3);
  if (format === 'int') return v.toFixed(1);
  return v.toFixed(0);
}

function Metric({
  value,
  suffix,
  label,
  format,
}: {
  value: number;
  suffix: string;
  label: string;
  format?: 'int' | 'percent' | 'currency';
}) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1600);
            const eased = 1 - Math.pow(1 - p, 4);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-t border-border pt-6">
      <div
        className="font-mono font-medium tabular-nums text-foreground"
        style={{
          fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {fmt(n, format)}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="mt-4 max-w-xs font-mono text-eyebrow uppercase text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <p className="mb-12 font-mono text-eyebrow uppercase text-muted-foreground">
          {'// 06 — at scale'}
        </p>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <Metric key={it.label} {...it} />
          ))}
        </div>
      </Container>
    </section>
  );
}
