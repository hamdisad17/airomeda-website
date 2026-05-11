'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function FinanceDashboard() {
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
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">
          paygate.airomeda.app/dashboard
        </span>
      </div>
      {/* Dashboard body */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Today&apos;s Volume
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">₺12,847,392</p>
            <p className="text-xs text-success font-medium">↑ 8.4% vs yesterday</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Active</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-foreground">2,431</p>
            <p className="text-xs text-muted-foreground">transactions</p>
          </div>
        </div>
        {/* Chart */}
        <div className="border border-border bg-muted/30 p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Settlement Flow · 24h
          </p>
          <svg viewBox="0 0 320 80" className="w-full h-20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fchart-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill — static */}
            <path
              d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,28 L180,15 L200,18 L220,8 L240,12 L260,5 L280,10 L300,3 L320,8 L320,80 L0,80 Z"
              fill="url(#fchart-dark)"
            />
            {/* Animated line */}
            <path
              className="chart-line"
              d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,28 L180,15 L200,18 L220,8 L240,12 L260,5 L280,10 L300,3 L320,8"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        {/* Recent transactions */}
        <div className="space-y-1.5">
          {[
            { id: 'TX·48291', amount: '+₺8,420.00', status: 'Settled', ok: true },
            { id: 'TX·48290', amount: '+₺1,250.00', status: 'Pending', ok: false },
            { id: 'TX·48289', amount: '+₺640.00', status: 'Settled', ok: true },
          ].map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0"
            >
              <span className="font-mono text-muted-foreground">{r.id}</span>
              <span className="font-medium tabular-nums text-foreground">{r.amount}</span>
              <span
                className={
                  r.ok
                    ? 'px-1.5 py-0.5 text-success bg-success/10'
                    : 'px-1.5 py-0.5 text-[hsl(40_80%_65%)] bg-[hsl(40_80%_65%_/_0.1)]'
                }
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
