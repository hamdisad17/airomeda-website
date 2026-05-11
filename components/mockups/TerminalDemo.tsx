'use client';
import * as React from 'react';

type TerminalLine =
  | { kind: 'task'; text: string; week: string; delay: number }
  | { kind: 'arrow'; text: string; tone: 'accent' | 'muted'; delay: number }
  | { kind: 'divider'; delay: number }
  | { kind: 'header'; text: string; delay: number }
  | { kind: 'prompt'; delay: number; blink: true };

const LINES: TerminalLine[] = [
  { kind: 'header', text: 'Projeniz canlıda', delay: 0 },
  { kind: 'divider', delay: 200 },
  { kind: 'task', text: 'İhtiyaç analizi', week: 'Hafta 1', delay: 600 },
  { kind: 'task', text: 'Plan onaylandı', week: 'Hafta 1', delay: 900 },
  { kind: 'task', text: 'Tasarımlar hazır', week: 'Hafta 3', delay: 1200 },
  { kind: 'task', text: 'Geliştirme bitti', week: 'Hafta 7', delay: 1500 },
  { kind: 'task', text: 'Test ve eğitim', week: 'Hafta 8', delay: 1800 },
  { kind: 'task', text: 'Sistem canlıda', week: 'Bugün', delay: 2100 },
  { kind: 'arrow', text: 'Müşterilerinize hizmet veriyor', tone: 'accent', delay: 2500 },
  { kind: 'arrow', text: 'Destek hattımız sizinle · 7/24', tone: 'accent', delay: 2800 },
  { kind: 'prompt', blink: true, delay: 3100 },
];

export function TerminalDemo() {
  const [shown, setShown] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);

  React.useEffect(() => {
    const timers = LINES.map((l, i) =>
      setTimeout(() => setShown((s) => Math.max(s, i + 1)), l.delay)
    );
    const restart = setTimeout(() => {
      setShown(0);
      setCycle((c) => c + 1);
    }, 6500);
    timers.push(restart);
    return () => { timers.forEach(clearTimeout); };
  }, [cycle]);

  return (
    <div className="border border-border bg-elevated shadow-[0_0_60px_-15px_hsl(173_80%_40%_/_0.3)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2 md:px-4 md:py-2.5">
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-2 md:ml-3 font-mono text-[10px] md:text-xs text-muted-foreground tracking-tight truncate">
          ~/airomeda — proje özeti
        </span>
      </div>
      <div className="p-4 md:p-5 font-mono text-[12px] md:text-sm leading-6 md:leading-7 min-h-[13rem] md:min-h-[14rem]">
        {LINES.slice(0, shown).map((l, i) => {
          if (l.kind === 'header') {
            return (
              <div key={i} className="text-muted-foreground truncate">
                ~/airomeda — {l.text}
              </div>
            );
          }
          if (l.kind === 'divider') {
            return <div key={i} className="text-muted-foreground/40 truncate">────────────────────</div>;
          }
          if (l.kind === 'task') {
            return (
              <div key={i} className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-1.5 text-[hsl(142_71%_55%)]">
                  <span className="flex-shrink-0">✓</span>
                  <span className="truncate">{l.text}</span>
                </span>
                <span className="flex-shrink-0 text-muted-foreground/70">{l.week}</span>
              </div>
            );
          }
          if (l.kind === 'arrow') {
            return (
              <div key={i} className={`flex items-start gap-1.5 ${l.tone === 'accent' ? 'text-accent' : 'text-muted-foreground'}`}>
                <span className="flex-shrink-0">→</span>
                <span className="min-w-0 break-words">{l.text}</span>
              </div>
            );
          }
          if (l.kind === 'prompt') {
            return (
              <div key={i} className="flex gap-2 mt-2">
                <span className="text-muted-foreground select-none">$</span>
                <span className="inline-block h-4 w-2 animate-terminal-blink bg-foreground" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
