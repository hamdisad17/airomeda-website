'use client';
import * as React from 'react';

const SHIPMENTS = [
  { type: 'Ödeme altyapısı', client: 'PayGate', date: '3 hf önce' },
  { type: 'iGaming platform', client: 'Bahis.io', date: '6 hf önce' },
  { type: 'Headless e-ticaret', client: 'Hubert Commerce', date: '9 hf önce' },
  { type: 'ERP entegrasyonu', client: 'Entegrasys', date: '11 hf önce' },
  { type: 'Marketplace altyapısı', client: 'Pazarlıman', date: '14 hf önce' },
];

export function RecentShipments() {
  const [idx, setIdx] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % SHIPMENTS.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const item = SHIPMENTS[idx]!;

  return (
    <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        <span className="text-foreground">son teslim:</span>
      </span>
      <span
        style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 300ms ease, transform 300ms ease',
        }}
      >
        {item.type} · {item.client} ·{' '}
        <span className="text-accent">{item.date}</span>
      </span>
    </div>
  );
}
