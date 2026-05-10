'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const WORDS = ['Finans', 'iGaming', 'E-Ticaret', 'Entegrasyon', 'Performans', 'CRM'];

export function KineticHeadline() {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const target = containerRef.current.querySelector('.kinetic-word');
      if (!target) return;
      gsap.fromTo(
        target,
        { yPercent: 100, opacity: 0, rotateX: -45 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: 'power3.out' },
      );
    },
    { dependencies: [active], scope: containerRef },
  );

  return (
    <h1 className="mt-8 text-display-1 font-semibold tracking-tight leading-[0.95]">
      <span className="block">
        <span
          className="inline-block overflow-hidden align-baseline"
          style={{ perspective: '800px' }}
        >
          <span ref={containerRef} className="inline-flex">
            <span key={active} className="kinetic-word inline-block text-accent">
              {WORDS[active]}
            </span>
          </span>
        </span>
        <span className="text-muted-foreground"> için.</span>
      </span>
      <span className="block">Production-grade yazılım.</span>
    </h1>
  );
}
