'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function GamingControlPanel() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const path = ref.current.querySelector<SVGPathElement>('.chart-line');
      if (!path) return;
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="border border-border bg-elevated overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 text-xs text-muted-foreground">
          Operatör Paneli · TopRateBet
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-border bg-muted/30 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Anlık Bahis
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">847</p>
          </div>
          <div className="border border-border bg-muted/30 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Geri Ödeme</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">96.2%</p>
          </div>
          <div className="border border-border bg-muted/30 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Güvenlik</p>
            <p className="mt-1 text-sm text-foreground">Sertifikalı</p>
          </div>
        </div>
        <div className="border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Oyun Trafiği
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-success font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              canlı
            </span>
          </div>
          <svg viewBox="0 0 320 60" className="w-full h-14" preserveAspectRatio="none">
            <path
              className="chart-line"
              d="M0,30 L20,32 L40,28 L60,35 L80,22 L100,28 L120,15 L140,25 L160,18 L180,30 L200,12 L220,20 L240,10 L260,18 L280,8 L300,15 L320,5"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="space-y-1.5">
          {[
            { name: 'Blackjack', players: '183' },
            { name: 'Rulet', players: '97' },
            { name: 'Bakara', players: '214' },
            { name: 'Slot Oyunları', players: '156' },
          ].map((g) => (
            <div
              key={g.name}
              className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0"
            >
              <span className="text-muted-foreground">{g.name}</span>
              <span className="text-muted-foreground">{g.players} aktif</span>
              <span className="px-1.5 py-0.5 text-success bg-success/10">çevrimiçi</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
