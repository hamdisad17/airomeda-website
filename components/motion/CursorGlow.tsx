'use client';
import * as React from 'react';

export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [variant, setVariant] = React.useState<'default' | 'interact' | 'text'>(
    'default',
  );

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    function move(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          'button, a, [role="tab"], input, textarea, [data-cursor="interact"]',
        )
      ) {
        setVariant('interact');
      } else if (target?.closest('p, h1, h2, h3, h4, span, li')) {
        setVariant((v) => (v === 'interact' ? v : 'text'));
      } else {
        setVariant('default');
      }
    }

    function tick() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  const size = variant === 'interact' ? 500 : variant === 'text' ? 220 : 360;
  const opacity = variant === 'interact' ? 0.45 : variant === 'text' ? 0.18 : 0.28;

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow fixed left-0 top-0 pointer-events-none z-10 rounded-full hidden md:block transition-[width,height,opacity] duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, hsl(189 100% 50% / ${opacity}) 0%, transparent 70%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}
