'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 2,
  duration: 4 + Math.random() * 8,
  delay: Math.random() * 4,
  driftX: -20 + Math.random() * 40,
  driftY: -20 + Math.random() * 40,
}));

export function ParticleField({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    const dots = ref.current.querySelectorAll('.particle');
    dots.forEach((dot, i) => {
      const p = PARTICLES[i];
      if (!p) return;
      gsap.to(dot, {
        x: `+=${p.driftX}`,
        y: `+=${p.driftY}`,
        opacity: 0.6,
        duration: p.duration,
        delay: p.delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: ref });

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.2,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
}
