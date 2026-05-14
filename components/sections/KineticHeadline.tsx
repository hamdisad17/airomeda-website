'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface KineticHeadlineProps {
  words: string[];
  connector: string;
  tailLine: string;
}

export function KineticHeadline({ words, connector, tailLine }: KineticHeadlineProps) {
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [words.length]);

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
    <h1 className="mt-6 md:mt-8 text-display-1 font-semibold">
      <span className="block">
        <span
          ref={containerRef}
          className="inline-block align-baseline"
          style={{ perspective: '800px' }}
        >
          <span key={active} className="kinetic-word inline-block text-accent">
            {words[active]}
          </span>
        </span>
        <span className="text-muted-foreground"> {connector}</span>
      </span>
      <span className="block">{tailLine}</span>
    </h1>
  );
}
