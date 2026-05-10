'use client';

import * as React from 'react';
import { Container } from '@/components/layout/Container';

const SYSTEMS = [
  {
    name: 'PayGate Bankası',
    region: 'TR · Finans',
    uptime: 99.998,
    ops: '12.4M / day',
    latency: 47,
  },
  {
    name: 'Bahis.io',
    region: 'EU · iGaming',
    uptime: 99.992,
    ops: '847k / hr',
    latency: 31,
  },
  {
    name: 'Hubert Commerce',
    region: 'TR · Retail',
    uptime: 99.991,
    ops: '$1.2M / day',
    latency: 89,
  },
];

function useAnimatedNumber(target: number, durationMs = 1400, start = 0) {
  const [val, setVal] = React.useState(start);
  const ref = React.useRef<HTMLSpanElement>(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / durationMs);
            const eased = 1 - Math.pow(1 - p, 4);
            setVal(start + (target - start) * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationMs, start]);
  return [val, ref] as const;
}

function UptimeCell({ value }: { value: number }) {
  const [n, ref] = useAnimatedNumber(value);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {n.toFixed(3)}%
    </span>
  );
}

function LatencyCell({ value }: { value: number }) {
  const [n, ref] = useAnimatedNumber(value);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {Math.round(n)}
      <span className="text-muted-foreground">ms</span>
    </span>
  );
}

export function LiveStatus() {
  const [seconds, setSeconds] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              {'// 02 — in production'}
            </p>
            <h2
              className="mt-4 max-w-2xl font-medium tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              Çalışan sistemler.
              <br />
              <span className="text-muted-foreground">Gerçek yük altında.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            <p>polled every 1s · refresh #{seconds.toString().padStart(4, '0')}</p>
            <p className="mt-1 inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
              </span>
              connected to mainframe
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-muted/20">
          {/* terminal header strip */}
          <div className="flex items-center gap-2 border-b border-border px-5 py-3 font-mono text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-accent/60"></span>
            <span>airomeda://systems</span>
            <span className="ml-auto">view: dashboard / json / log</span>
          </div>
          <div className="hidden grid-cols-12 gap-4 border-b border-border px-5 py-3 font-mono text-eyebrow uppercase text-muted-foreground md:grid">
            <span className="col-span-4">system</span>
            <span className="col-span-3">region</span>
            <span className="col-span-2 text-right">uptime · 30d</span>
            <span className="col-span-2 text-right">throughput</span>
            <span className="col-span-1 text-right">p50</span>
          </div>
          {SYSTEMS.map((s, i) => (
            <div
              key={s.name}
              className="grid grid-cols-1 gap-2 border-b border-border px-5 py-5 transition-colors duration-200 last:border-b-0 hover:bg-muted/40 md:grid-cols-12 md:gap-4 md:items-center"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="md:col-span-4 flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-sm font-medium">{s.name}</span>
              </div>
              <div className="md:col-span-3 font-mono text-xs text-muted-foreground">
                {s.region}
              </div>
              <div className="md:col-span-2 text-right text-sm">
                <UptimeCell value={s.uptime} />
              </div>
              <div className="md:col-span-2 text-right font-mono text-sm tabular-nums text-foreground">
                {s.ops}
              </div>
              <div className="md:col-span-1 text-right text-sm">
                <LatencyCell value={s.latency} />
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-5 py-3 font-mono text-xs text-muted-foreground">
            <span>{'// 3 active engagements · representative · live data redacted'}</span>
            <span>
              uptime aggregate: <span className="text-accent">99.994%</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
