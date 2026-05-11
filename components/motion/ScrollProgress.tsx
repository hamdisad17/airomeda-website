'use client';
import * as React from 'react';

const CHAPTERS = [
  { id: 'hero', label: '00 · Giriş' },
  { id: 'industry-switcher', label: '01 · Sektörler' },
  { id: 'architecture', label: '02 · Sistem' },
  { id: 'case-studies', label: '03 · Vakalar' },
  { id: 'cta', label: '04 · İletişim' },
];

export function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  const [activeChapter, setActiveChapter] = React.useState(CHAPTERS[0]?.label ?? '');

  React.useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(docHeight > 0 ? scrolled / docHeight : 0);

      // Find current chapter
      let current = CHAPTERS[0]?.label ?? '';
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          current = ch.label;
        }
      }
      setActiveChapter(current);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <div aria-hidden className="fixed top-0 left-0 right-0 z-40 h-px bg-transparent pointer-events-none">
        <div
          className="h-px bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {/* Chapter indicator — far right, vertical */}
      <div
        aria-hidden
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex-col gap-3 text-[10px] uppercase tracking-[0.2em]"
      >
        {CHAPTERS.map((ch) => {
          const isActive = ch.label === activeChapter;
          return (
            <div key={ch.id} className="flex items-center gap-2 justify-end transition-opacity" style={{ opacity: isActive ? 1 : 0.3 }}>
              <span className={isActive ? 'text-accent' : 'text-muted-foreground'}>{ch.label}</span>
              <span className={`inline-block h-px transition-all ${isActive ? 'w-8 bg-accent' : 'w-3 bg-muted-foreground'}`}/>
            </div>
          );
        })}
      </div>
    </>
  );
}
