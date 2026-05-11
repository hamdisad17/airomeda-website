'use client';
import * as React from 'react';

export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border pointer-events-none"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full bg-accent transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
      {/* Mono label at the edge */}
      <div
        className="absolute top-1.5 font-mono text-[9px] uppercase tracking-wider text-accent transition-[left] duration-75"
        style={{ left: `${Math.min(progress, 95)}%` }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  );
}
