'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionDividerProps {
  label?: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  // stable random 4-digit number per mount
  const [code] = React.useState(() => Math.floor(Math.random() * 9000 + 1000));

  useGSAP(
    () => {
      if (!ref.current) return;
      const path = ref.current.querySelector(
        '.divider-path',
      ) as SVGPathElement | null;
      if (!path) return;
      const length = path.getTotalLength();
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative border-y border-border bg-background py-6 overflow-hidden"
    >
      <div className="container flex items-center gap-6">
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex-shrink-0">
            {label}
          </span>
        )}
        <svg className="flex-1 h-px" preserveAspectRatio="none" viewBox="0 0 1000 1">
          <path
            className="divider-path"
            d="M0,0.5 L1000,0.5"
            stroke="hsl(189 100% 50%)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent flex-shrink-0">
          {code}
        </span>
      </div>
    </div>
  );
}
