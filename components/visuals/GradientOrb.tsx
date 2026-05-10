'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function GradientOrb() {
  const ref = React.useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 120,
      y: -40,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -top-32 right-10 h-[600px] w-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, hsl(189 100% 50% / 0.18), transparent 65%)',
        filter: 'blur(80px)',
      }}
    />
  );
}
