'use client';
import * as React from 'react';

type CursorMode = 'default' | 'link' | 'button' | 'text' | 'view';

export function MorphCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [mode, setMode] = React.useState<CursorMode>('default');
  const [label, setLabel] = React.useState<string>('');

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    document.documentElement.style.cursor = 'none';

    let tx = 0, ty = 0;
    let cx = 0, cy = 0;
    let raf = 0;

    function move(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('default');
        return;
      }
      const interactive = target.closest('button, a, [role="tab"], [data-cursor]') as HTMLElement | null;
      if (interactive) {
        const customLabel = interactive.getAttribute('data-cursor-label');
        if (customLabel) {
          setLabel(customLabel);
          setMode('view');
          return;
        }
        if (interactive.tagName === 'A') {
          setLabel('aç →');
          setMode('link');
          return;
        }
        if (interactive.tagName === 'BUTTON' || interactive.getAttribute('role') === 'tab') {
          setLabel('');
          setMode('button');
          return;
        }
      }
      if (target.closest('input, textarea')) {
        setMode('text');
        return;
      }
      setMode('default');
      setLabel('');
    }

    function tick() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('pointermove', move);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
    };
  }, []);

  const ringSize =
    mode === 'view' ? 80 :
    mode === 'link' ? 56 :
    mode === 'button' ? 48 :
    mode === 'text' ? 4 :
    36;

  const ringOpacity =
    mode === 'view' ? 1 :
    mode === 'link' || mode === 'button' ? 0.9 :
    mode === 'text' ? 1 :
    0.4;

  const dotSize = mode === 'text' ? 2 : mode === 'default' ? 4 : 0;

  return (
    <>
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed left-0 top-0 z-[60] pointer-events-none rounded-full bg-accent hidden md:block transition-[width,height,opacity] duration-150"
        style={{
          width: mode === 'text' ? '2px' : `${dotSize}px`,
          height: mode === 'text' ? '16px' : `${dotSize}px`,
          opacity: dotSize === 0 ? 0 : 1,
          borderRadius: mode === 'text' ? '0' : '50%',
        }}
      />
      {/* Outer ring — lerped */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed left-0 top-0 z-[59] pointer-events-none hidden md:flex items-center justify-center rounded-full border border-accent transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          opacity: ringOpacity,
          background: mode === 'view' ? 'hsl(189 100% 50% / 0.1)' : 'transparent',
        }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
