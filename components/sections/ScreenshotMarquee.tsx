'use client';
import * as React from 'react';

// Pre-computed once at module load — stable random bar heights for gaming shot
const GAMING_SHOT_HEIGHTS = Array.from({ length: 30 }, () => 30 + Math.random() * 60);

type ShotKind =
  | 'finance'
  | 'gaming'
  | 'commerce'
  | 'analytics'
  | 'integration'
  | 'crm'
  | 'erp'
  | 'cms';

// Inline SVG-based "screenshot" thumbnails — distinctive, NO external images needed
function Shot({ kind }: { kind: ShotKind }) {
  const labels: Record<ShotKind, string> = {
    finance: 'Bankacılık',
    gaming: 'Oyun Platformu',
    commerce: 'E-Ticaret',
    analytics: 'Analiz Paneli',
    integration: 'Sistem Bağlantısı',
    crm: 'Müşteri Yönetimi',
    erp: 'Stok Sistemi',
    cms: 'İçerik Sistemi',
  };
  return (
    <div className="inline-flex flex-col w-[280px] h-[180px] mr-3 border border-border bg-elevated overflow-hidden flex-shrink-0 align-top">
      <div className="border-b border-border bg-background px-2 py-1 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
        </div>
        <span className="text-[9px] text-muted-foreground">{labels[kind]}</span>
      </div>
      <div className="p-2.5 flex-1 min-h-0">
        {kind === 'finance' && (
          <div className="h-full grid grid-rows-[auto_1fr] gap-1.5">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-border bg-background h-7 px-1.5 py-1">
                  <div className="h-1 w-1/2 bg-muted-foreground/30" />
                </div>
              ))}
            </div>
            <svg viewBox="0 0 200 80" className="w-full h-full">
              <path
                d="M0,60 L25,55 L50,40 L75,45 L100,30 L125,25 L150,15 L175,18 L200,10"
                stroke="hsl(189 100% 50%)"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>
        )}
        {kind === 'gaming' && (
          <div className="h-full flex flex-col gap-1.5">
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-border h-6 bg-background" />
              ))}
            </div>
            <div className="flex items-end gap-0.5 flex-1">
              {GAMING_SHOT_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-accent/50"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        )}
        {kind === 'commerce' && (
          <div className="h-full grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`border border-border ${i === 4 ? 'bg-accent/30' : 'bg-background'}`}
              />
            ))}
          </div>
        )}
        {kind === 'analytics' && (
          <div className="h-full grid grid-cols-2 gap-1.5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="35" stroke="hsl(0 0% 25%)" strokeWidth="6" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="hsl(189 100% 50%)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="160 220"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="space-y-1">
              {[60, 45, 80, 30].map((w, i) => (
                <div key={i} className="h-2 bg-muted-foreground/15">
                  <div className="h-2 bg-accent/70" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
          </div>
        )}
        {kind === 'integration' && (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {(
              [
                [40, 30],
                [160, 30],
                [40, 90],
                [160, 90],
                [100, 60],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="none"
                stroke={i === 4 ? 'hsl(189 100% 50%)' : 'hsl(0 0% 35%)'}
                strokeWidth="1"
              />
            ))}
            {(
              [
                [40, 30],
                [160, 30],
                [40, 90],
                [160, 90],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <line
                key={i}
                x1={x}
                y1={y}
                x2="100"
                y2="60"
                stroke="hsl(189 100% 50% / 0.4)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            ))}
          </svg>
        )}
        {kind === 'crm' && (
          <div className="h-full space-y-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-border bg-background h-6 px-1.5 flex items-center gap-1.5"
              >
                <span
                  className={`h-1 w-1 rounded-full ${i === 1 ? 'bg-accent' : 'bg-muted-foreground/40'}`}
                />
                <div className="h-1 w-1/3 bg-muted-foreground/25" />
              </div>
            ))}
          </div>
        )}
        {kind === 'erp' && (
          <div className="h-full grid grid-rows-2 gap-1">
            <div className="grid grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border border-border bg-background" />
              ))}
            </div>
            <div className="space-y-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-border bg-background h-4 px-1"
                >
                  <span className="h-1 w-12 bg-muted-foreground/25" />
                  <span className="h-1 w-6 bg-accent/60" />
                </div>
              ))}
            </div>
          </div>
        )}
        {kind === 'cms' && (
          <div className="h-full grid grid-cols-[1fr_2fr] gap-1.5">
            <div className="space-y-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-2 bg-muted-foreground/15" />
              ))}
            </div>
            <div className="border border-border bg-background p-1.5 space-y-1">
              <div className="h-1.5 w-3/4 bg-foreground/30" />
              <div className="h-1 w-1/2 bg-muted-foreground/25" />
              <div className="h-1 w-2/3 bg-muted-foreground/25" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const KINDS: ShotKind[] = [
  'finance',
  'gaming',
  'commerce',
  'analytics',
  'integration',
  'crm',
  'erp',
  'cms',
];

export function ScreenshotMarquee() {
  return (
    <section className="border-b border-border py-12 md:py-16 overflow-hidden bg-background relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
        style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
        style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
      />

      <div className="mb-6 px-6">
        <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
          Geliştirdiğimiz ürünlerden
        </p>
      </div>

      <div className="flex w-max animate-marquee-slow">
        {[...KINDS, ...KINDS].map((k, i) => (
          <Shot key={`${k}-${i}`} kind={k} />
        ))}
      </div>
    </section>
  );
}
