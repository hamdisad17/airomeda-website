'use client';
import * as React from 'react';
import gsap from 'gsap';

export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.7, ease: 'power3.out' });
      });
    };

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[5] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 mix-blend-screen hidden lg:block"
      style={{
        background: 'radial-gradient(circle, hsl(189 100% 50% / 0.18), transparent 60%)',
        filter: 'blur(40px)',
      }}
    />
  );
}
