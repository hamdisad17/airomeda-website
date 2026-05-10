'use client';
import * as React from 'react';

type TerminalLine =
  | { prompt: string; text: string; delay: number; blink?: boolean }
  | { text: string; tone: 'ok' | 'accent' | 'muted'; delay: number }
  | { text: string; delay: number };

const LINES: TerminalLine[] = [
  { prompt: '$', text: 'airomeda deploy --env production', delay: 0 },
  { text: '✓ build succeeded in 8.2s', tone: 'ok', delay: 800 },
  { text: '✓ 127 tests passed', tone: 'ok', delay: 1100 },
  { text: '✓ DKIM signed · audit log written', tone: 'ok', delay: 1400 },
  { text: '→ deployed to airomeda.app', tone: 'accent', delay: 1700 },
  { text: '→ propagation: 12 regions', tone: 'muted', delay: 1900 },
  { text: '', delay: 2100 },
  { prompt: '$', text: '', blink: true, delay: 2400 },
];

function getToneClass(line: TerminalLine): string {
  if ('tone' in line) {
    if (line.tone === 'ok') return 'text-[hsl(142_71%_55%)]';
    if (line.tone === 'accent') return 'text-accent';
    if (line.tone === 'muted') return 'text-muted-foreground';
  }
  return 'text-foreground';
}

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
    }, 4800);
    timers.push(restart);
    return () => { timers.forEach(clearTimeout); };
  }, [cycle]);

  return (
    <div className="border border-border bg-elevated shadow-[0_0_60px_-15px_hsl(189_100%_50%_/_0.3)]">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground tracking-tight">~/airomeda — bash</span>
      </div>
      <div className="p-5 font-mono text-sm leading-7 min-h-[14rem]">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="flex gap-2">
            {'prompt' in l && l.prompt && (
              <span className="text-muted-foreground select-none">{l.prompt}</span>
            )}
            <span className={getToneClass(l)}>
              {l.text}
              {'blink' in l && l.blink && (
                <span className="ml-0.5 inline-block h-4 w-2 animate-terminal-blink bg-foreground align-middle" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
