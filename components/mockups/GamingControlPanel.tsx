export function GamingControlPanel() {
  return (
    <div className="rounded-xl border border-border bg-white shadow-elevated overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60"></span>
        <span className="ml-3 font-mono text-xs text-muted-foreground">ops.bahis.io/operator</span>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Live Bets/sec</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">847</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">RTP</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">96.2%</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">RNG Seed</p>
            <p className="mt-1 text-sm font-mono">0x7a..f2c</p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Game Throughput</p>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              live
            </span>
          </div>
          <svg viewBox="0 0 320 60" className="w-full h-14" preserveAspectRatio="none">
            <path d="M0,30 L20,32 L40,28 L60,35 L80,22 L100,28 L120,15 L140,25 L160,18 L180,30 L200,12 L220,20 L240,10 L260,18 L280,8 L300,15 L320,5"
              fill="none" stroke="hsl(244 76% 59%)" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="space-y-1.5">
          {['blackjack-eu', 'roulette-tr', 'baccarat-eu', 'slots-mega'].map((g) => (
            <div key={g} className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
              <span className="font-mono text-muted-foreground">{g}</span>
              <span className="text-muted-foreground">
                {g === 'blackjack-eu' ? '183' : g === 'roulette-tr' ? '97' : g === 'baccarat-eu' ? '214' : '156'} active
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">healthy</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
