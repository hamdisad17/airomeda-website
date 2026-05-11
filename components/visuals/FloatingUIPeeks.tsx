'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function FloatingUIPeeks() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const peeks = ref.current.querySelectorAll('.peek');
    peeks.forEach((peek, i) => {
      gsap.to(peek, {
        y: '+=14',
        duration: 4 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Peek 1 — top right, looks like a settings UI */}
      <div className="peek absolute right-[-60px] top-[5%] w-44 border border-border bg-elevated/70 backdrop-blur-md shadow-2xl rotate-[3deg]">
        <div className="border-b border-border bg-muted/40 px-3 py-2 flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15"></span>
        </div>
        <div className="p-3 space-y-2">
          <div className="h-1.5 w-3/4 bg-foreground/20"></div>
          <div className="h-1.5 w-1/2 bg-foreground/15"></div>
          <div className="h-6 mt-2 bg-accent/20 border border-accent/30"></div>
        </div>
      </div>

      {/* Peek 2 — bottom left, looks like analytics */}
      <div className="peek absolute left-[-70px] bottom-[8%] w-52 border border-border bg-elevated/70 backdrop-blur-md shadow-2xl rotate-[-4deg]">
        <div className="border-b border-border px-3 py-2 flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground">Satış raporu</span>
          <span className="text-[9px] text-success">↑ 12%</span>
        </div>
        <div className="p-3">
          <div className="text-sm font-semibold tabular-nums">$2.4M</div>
          <svg viewBox="0 0 100 30" className="mt-2 w-full h-8">
            <path
              d="M0,20 L15,18 L30,22 L45,12 L60,15 L75,8 L90,10 L100,5"
              fill="none"
              stroke="#14B8A6"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Peek 3 — middle right, looks like a notification */}
      <div className="peek absolute right-[-50px] bottom-[28%] w-40 border border-accent/30 bg-elevated/80 backdrop-blur-md shadow-2xl rotate-[2deg]">
        <div className="p-3">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success"></span>
            <div className="space-y-1">
              <div className="h-1.5 w-3/4 bg-foreground/30"></div>
              <div className="h-1 w-1/2 bg-foreground/15"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
