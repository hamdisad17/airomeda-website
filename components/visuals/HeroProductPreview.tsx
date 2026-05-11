'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function HeroProductPreview() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const counters = ref.current.querySelectorAll('.hp-counter');
    counters.forEach((el, i) => {
      const target = parseInt(el.getAttribute('data-target') ?? '0', 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        delay: 0.4 + i * 0.2,
        ease: 'power2.out',
        onUpdate: () => {
          (el as HTMLElement).textContent = Math.round(obj.val).toLocaleString('tr-TR');
        },
      });
    });

    const chart = ref.current.querySelector('.hp-chart-line') as SVGPathElement | null;
    if (chart) {
      const len = chart.getTotalLength();
      gsap.set(chart, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(chart, { strokeDashoffset: 0, duration: 2, delay: 0.8, ease: 'power2.out' });
    }
  }, { scope: ref });

  return (
    <div ref={ref} className="relative bg-elevated border border-border shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-background px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Hoş geldiniz, Ahmet Bey</p>
            <p className="text-xs text-muted-foreground">Bugün · 14:32</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground hidden sm:block">Mağazanız</div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Top stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Bugünkü satış</p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              ₺<span className="hp-counter tabular-nums" data-target="18470">0</span>
            </p>
            <p className="mt-1 text-xs text-success">↑ %18 önceki güne göre</p>
          </div>
          <div className="border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Yeni müşteri</p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              <span className="hp-counter tabular-nums" data-target="47">0</span>
            </p>
            <p className="mt-1 text-xs text-accent">Bu hafta</p>
          </div>
          <div className="border border-border bg-background p-3">
            <p className="text-xs text-muted-foreground">Bekleyen onay</p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              <span className="hp-counter tabular-nums" data-target="3">0</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Bakmanız gerek</p>
          </div>
        </div>

        {/* Chart */}
        <div className="border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Bu hafta</p>
            <p className="text-xs text-success">↑ %24 büyüme</p>
          </div>
          <svg viewBox="0 0 300 80" className="w-full h-20">
            <defs>
              <linearGradient id="hp-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(20 184 166 / 0.3)"/>
                <stop offset="100%" stopColor="rgb(20 184 166 / 0)"/>
              </linearGradient>
            </defs>
            <path d="M 0 60 L 50 55 L 100 48 L 150 38 L 200 28 L 250 22 L 300 12 L 300 80 L 0 80 Z" fill="url(#hp-grad)"/>
            <path className="hp-chart-line" d="M 0 60 L 50 55 L 100 48 L 150 38 L 200 28 L 250 22 L 300 12" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <div className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-muted-foreground text-center">
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((d) => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* Notification */}
        <div className="border border-accent/30 bg-accent/5 px-4 py-3 flex items-start gap-3">
          <span className="text-accent text-lg leading-none flex-shrink-0">💬</span>
          <div>
            <p className="text-sm font-semibold text-foreground">Yeni mesajınız var</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Bir müşteriniz fiyat bilgisi istiyor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
