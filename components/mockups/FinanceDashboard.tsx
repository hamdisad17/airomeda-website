export function FinanceDashboard() {
  return (
    <div className="rounded-xl border border-border bg-white shadow-elevated overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/60"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60"></span>
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/60"></span>
        <span className="ml-3 font-mono text-xs text-muted-foreground">paygate.airomeda.app/dashboard</span>
      </div>
      {/* Dashboard body */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Today&apos;s Volume</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">₺12,847,392</p>
            <p className="text-xs text-emerald-600 font-medium">↑ 8.4% vs yesterday</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Active</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">2,431</p>
            <p className="text-xs text-muted-foreground">transactions</p>
          </div>
        </div>
        {/* Fake chart */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Settlement Flow · 24h</p>
          <svg viewBox="0 0 320 80" className="w-full h-20" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fchart" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(244 76% 59%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(244 76% 59%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,28 L180,15 L200,18 L220,8 L240,12 L260,5 L280,10 L300,3 L320,8 L320,80 L0,80 Z" fill="url(#fchart)"/>
            <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,35 L140,20 L160,28 L180,15 L200,18 L220,8 L240,12 L260,5 L280,10 L300,3 L320,8" fill="none" stroke="hsl(244 76% 59%)" strokeWidth="2"/>
          </svg>
        </div>
        {/* Recent table */}
        <div className="space-y-1.5">
          {[
            { id: 'TX·48291', amount: '+₺8,420.00', status: 'Settled', tone: 'emerald' },
            { id: 'TX·48290', amount: '+₺1,250.00', status: 'Pending', tone: 'amber' },
            { id: 'TX·48289', amount: '+₺640.00',   status: 'Settled', tone: 'emerald' },
          ].map((r) => (
            <div key={r.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border/50 last:border-0">
              <span className="font-mono text-muted-foreground">{r.id}</span>
              <span className="font-medium tabular-nums">{r.amount}</span>
              <span className={`px-1.5 py-0.5 rounded ${r.tone === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
