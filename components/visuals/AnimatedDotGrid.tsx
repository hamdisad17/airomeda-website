'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function AnimatedDotGrid({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      backgroundPosition: '40px 40px',
      duration: 14,
      ease: 'none',
      repeat: -1,
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(240 6% 20%) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 0%, transparent 80%)',
        opacity: 0.55,
      }}
    />
  );
}
