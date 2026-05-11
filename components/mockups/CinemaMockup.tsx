'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Pre-computed once at module load — stable heights for the animated bars
const GAMING_BAR_HEIGHTS = Array.from({ length: 40 }, () => 20 + Math.random() * 80);

interface Variant {
  kind: 'finance' | 'gaming';
}

export function CinemaMockup({ kind }: Variant) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const cursor = ref.current.querySelector('.cm-cursor') as HTMLDivElement | null;
    const chartPath = ref.current.querySelector('.cm-chart-line') as SVGPathElement | null;
    const counters = ref.current.querySelectorAll('.cm-counter');
    const bars = ref.current.querySelectorAll('.cm-bar');
    const rows = ref.current.querySelectorAll('.cm-row');

    if (cursor) {
      // Cursor tour
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });
      tl.set(cursor, { x: 60, y: 80, opacity: 0 })
        .to(cursor, { opacity: 1, duration: 0.3 })
        .to(cursor, { x: 280, y: 110, duration: 1.4 })
        .to(cursor, { scale: 0.85, duration: 0.15 })
        .to(cursor, { scale: 1, duration: 0.15 })
        .to({}, { duration: 0.4 })
        .to(cursor, { x: 380, y: 280, duration: 1.6 })
        .to(cursor, { scale: 0.85, duration: 0.15 })
        .to(cursor, { scale: 1, duration: 0.15 })
        .to({}, { duration: 0.5 })
        .to(cursor, { x: 120, y: 320, duration: 1.5 })
        .to({}, { duration: 0.8 })
        .to(cursor, { opacity: 0, duration: 0.3 });
    }

    if (chartPath) {
      const len = chartPath.getTotalLength();
      gsap.set(chartPath, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(chartPath, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      });
    }

    counters.forEach((el, i) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        delay: 0.2 + i * 0.15,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
        onUpdate: () => {
          (el as HTMLElement).textContent =
            target % 1 === 0
              ? Math.round(obj.val).toLocaleString('tr-TR')
              : obj.val.toFixed(1);
        },
      });
    });

    bars.forEach((bar, i) => {
      gsap.to(bar, {
        scaleY: () => 0.3 + Math.random() * 0.7,
        duration: 0.8 + Math.random() * 0.4,
        delay: i * 0.04,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    rows.forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        x: -10,
        duration: 0.4,
        delay: 0.4 + i * 0.1,
        repeat: -1,
        repeatDelay: 4,
        yoyo: true,
        ease: 'power2.out',
      });
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="relative bg-elevated border border-border overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
    >
      {/* Window chrome */}
      <div className="border-b border-border bg-background px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {kind === 'finance' ? 'banking.airomeda · prod' : 'gaming.airomeda · prod'}
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          live
        </div>
      </div>

      <div className="relative p-6">
        {/* Floating cursor */}
        <div className="cm-cursor absolute top-0 left-0 pointer-events-none z-20">
          <svg width="18" height="22" viewBox="0 0 18 22">
            <path
              d="M2 2 L2 18 L7 14 L10 21 L13 20 L10 13 L16 13 Z"
              fill="hsl(189 100% 50%)"
              stroke="hsl(240 10% 4%)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {kind === 'finance' ? <FinanceContent /> : <GamingContent />}
      </div>
    </div>
  );
}

function FinanceContent() {
  return (
    <div className="space-y-4">
      {/* Top metric row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: 'Hacim · 24h', v: 2480000, prefix: '₺', suffix: '' },
          { l: 'İşlem', v: 18247, prefix: '', suffix: '' },
          { l: 'Onay oranı', v: 99.4, prefix: '', suffix: '%' },
        ].map((m, i) => (
          <div key={i} className="border border-border bg-background p-3">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{m.l}</p>
            <p className="mt-1.5 text-xl font-semibold tabular-nums">
              {m.prefix}
              <span className="cm-counter" data-target={m.v}>
                {m.v.toLocaleString('tr-TR')}
              </span>
              {m.suffix}
            </p>
          </div>
        ))}
      </div>

      {/* Chart + side panel */}
      <div className="grid grid-cols-[2fr_1fr] gap-3">
        <div className="border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">
              İşlem hacmi · saatlik
            </p>
            <span className="font-mono text-[10px] text-success">↑ 12.4%</span>
          </div>
          <svg viewBox="0 0 400 100" className="w-full h-24">
            <defs>
              <linearGradient id="cm-fin-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(189 100% 50% / 0.3)" />
                <stop offset="100%" stopColor="hsl(189 100% 50% / 0)" />
              </linearGradient>
            </defs>
            <path
              d="M 0 75 L 30 70 L 60 65 L 90 72 L 120 50 L 150 55 L 180 35 L 210 40 L 240 25 L 270 30 L 300 18 L 330 22 L 360 15 L 400 12 L 400 100 L 0 100 Z"
              fill="url(#cm-fin-grad)"
            />
            <path
              className="cm-chart-line"
              d="M 0 75 L 30 70 L 60 65 L 90 72 L 120 50 L 150 55 L 180 35 L 210 40 L 240 25 L 270 30 L 300 18 L 330 22 L 360 15 L 400 12"
              fill="none"
              stroke="hsl(189 100% 50%)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {[120, 240, 360].map((x, i) => (
              <circle key={i} cx={x} cy={[50, 25, 15][i]} r="2.5" fill="hsl(189 100% 50%)" />
            ))}
          </svg>
          <div className="mt-2 grid grid-cols-6 gap-1 font-mono text-[9px] text-muted-foreground">
            {['06', '09', '12', '15', '18', '21'].map((h) => (
              <span key={h}>{h}:00</span>
            ))}
          </div>
        </div>

        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[10px] uppercase text-muted-foreground">Bölgeler · P99</p>
          <ul className="mt-3 space-y-2">
            {[
              { r: 'fra1', v: 14 },
              { r: 'lon1', v: 19 },
              { r: 'iad1', v: 27 },
              { r: 'sin1', v: 42 },
            ].map((b, i) => (
              <li key={i} className="font-mono text-[11px] flex items-center justify-between">
                <span className="text-foreground">{b.r}</span>
                <span className="text-accent">
                  {b.v}
                  <span className="text-muted-foreground">ms</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Live txn rows */}
      <div className="border border-border bg-background">
        <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase text-muted-foreground">
          Canlı işlemler
        </div>
        <div className="divide-y divide-border">
          {[
            { id: 'tx_847291', amt: '₺2,847.50', method: 'card', s: 'ok' },
            { id: 'tx_847292', amt: '₺127.00', method: '3DS', s: 'ok' },
            { id: 'tx_847293', amt: '₺18,420.00', method: 'EFT', s: 'ok' },
            { id: 'tx_847294', amt: '₺945.30', method: 'card', s: 'review' },
          ].map((t, i) => (
            <div
              key={i}
              className="cm-row px-4 py-2 flex items-center justify-between font-mono text-[11px]"
            >
              <span className="text-muted-foreground">{t.id}</span>
              <span className="text-foreground">{t.amt}</span>
              <span className="text-muted-foreground">{t.method}</span>
              <span className={t.s === 'ok' ? 'text-success' : 'text-accent'}>
                {t.s === 'ok' ? '● başarılı' : '● inceleme'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GamingContent() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          { l: 'Aktif oyuncu', v: 4827 },
          { l: 'GGR · 24h', v: 184250 },
          { l: 'Spin/sn', v: 312 },
          { l: 'Onay oranı', v: 99.9 },
        ].map((m, i) => (
          <div key={i} className="border border-border bg-background p-3">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{m.l}</p>
            <p className="mt-1.5 text-lg font-semibold tabular-nums">
              <span className="cm-counter" data-target={m.v}>
                {m.v.toLocaleString('tr-TR')}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[10px] uppercase text-muted-foreground mb-3">
            Spin throughput · 60s
          </p>
          <div className="flex items-end gap-0.5 h-24">
            {GAMING_BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className="cm-bar flex-1 bg-accent/60 origin-bottom"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="border border-border bg-background p-4">
          <p className="font-mono text-[10px] uppercase text-muted-foreground mb-3">
            Lisans bölgesi
          </p>
          <ul className="space-y-1.5 font-mono text-[11px]">
            {[
              { r: 'MGA · Malta', s: 'aktif' },
              { r: 'UKGC · UK', s: 'aktif' },
              { r: 'KGC · Kahnawake', s: 'aktif' },
              { r: 'Curaçao eGaming', s: 'aktif' },
              { r: 'Anjouan', s: 'pending' },
            ].map((b, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-foreground">{b.r}</span>
                <span className={b.s === 'aktif' ? 'text-success' : 'text-accent'}>
                  ● {b.s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-border bg-background">
        <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase text-muted-foreground">
          Canlı oturumlar
        </div>
        <div className="divide-y divide-border">
          {[
            { id: 'sess_84291', game: 'Aurora Cash', bet: '₺50', win: '₺125', s: 'WIN' },
            { id: 'sess_84292', game: 'Neon Dragon', bet: '₺20', win: '₺0', s: 'LOSS' },
            { id: 'sess_84293', game: 'Lucky 7s', bet: '₺100', win: '₺1,250', s: 'WIN' },
            { id: 'sess_84294', game: 'Mystery Box', bet: '₺10', win: '₺40', s: 'WIN' },
          ].map((t, i) => (
            <div
              key={i}
              className="cm-row px-4 py-2 flex items-center justify-between font-mono text-[11px]"
            >
              <span className="text-muted-foreground">{t.id}</span>
              <span className="text-foreground">{t.game}</span>
              <span className="text-muted-foreground">{t.bet}</span>
              <span className={t.s === 'WIN' ? 'text-success' : 'text-muted-foreground'}>
                {t.win}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
