'use client';
import * as React from 'react';

interface TickerStat {
  label: string;
  v: string;
  delta: string;
}

const STATS: TickerStat[] = [
  { label: 'TX_TODAY', v: '1,847,291', delta: '+12.4%' },
  { label: 'UPTIME_30D', v: '99.973%', delta: '0' },
  { label: 'P50_LATENCY', v: '18ms', delta: '-2ms' },
  { label: 'P99_LATENCY', v: '142ms', delta: '-8ms' },
  { label: 'DEPLOYS_MONTH', v: '280+', delta: '+18' },
  { label: 'ACTIVE_REGIONS', v: '4', delta: '0' },
  { label: 'EDGE_POPS', v: '320', delta: '+4' },
  { label: 'PROJECTS_TOTAL', v: '134', delta: '+3' },
  { label: 'ACTIVE_CLIENTS', v: '68', delta: '+2' },
  { label: 'FAILOVER', v: '<8s', delta: '0' },
  { label: 'ENGINEERS', v: '28', delta: '+2' },
  { label: 'SLA_GUARANTEE', v: '99.95%', delta: '0' },
];

function DeltaChip({ delta }: { delta: string }) {
  if (delta === '0') {
    return <span className="text-muted-foreground/40">{delta}</span>;
  }
  if (delta.startsWith('+')) {
    return <span className="text-success">{delta}</span>;
  }
  // negative delta (latency improvement) displayed in accent
  return <span className="text-accent">{delta}</span>;
}

export function StatTicker() {
  // Triple the stats for a seamless infinite loop
  const items = [...STATS, ...STATS, ...STATS];

  return (
    <div className="border-y border-border bg-background overflow-hidden py-3 relative">
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
      />

      <div className="flex w-max animate-marquee gap-12 font-mono text-xs" aria-label="Live system metrics">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 flex-shrink-0 select-none">
            <span className="text-muted-foreground uppercase tracking-wider text-[10px]">{s.label}</span>
            <span className="text-foreground tabular-nums font-medium">{s.v}</span>
            <DeltaChip delta={s.delta} />
            <span className="text-muted-foreground/25">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
