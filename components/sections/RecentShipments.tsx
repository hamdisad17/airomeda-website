'use client';
import * as React from 'react';

const SHIPMENTS = [
  { type: 'Bankacılık yazılımı', client: 'Ziraat Bankası', date: '4 hf önce' },
  { type: 'ERP sistemi', client: 'Kumtel A.Ş.', date: '7 hf önce' },
  { type: 'Lojistik HR uygulaması', client: 'Aras Kargo', date: '10 hf önce' },
  { type: 'AI sağlık ürünü', client: 'HSD Core Labs', date: '12 hf önce' },
  { type: 'Eğitim platformu', client: 'Kodland', date: '15 hf önce' },
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
