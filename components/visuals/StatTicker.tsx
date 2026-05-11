'use client';
import * as React from 'react';

interface TickerStat {
  label: string;
  v: string;
  delta: string;
}

const STATS: TickerStat[] = [
  { label: 'BU YIL TAMAMLANAN', v: '47', delta: 'proje' },
  { label: 'MUTLU MÜŞTERİ', v: '85+', delta: 'aktif' },
  { label: 'DENEYİMİMİZ', v: '11', delta: 'yıl' },
  { label: 'EKİBİMİZ', v: '36', delta: 'uzman' },
  { label: 'HİZMET VERDİĞİMİZ', v: '130+', delta: 'ülke' },
  { label: 'DESTEK', v: '7/24', delta: 'canlı' },
  { label: 'TÜRKÇE + İNGİLİZCE', v: '2', delta: 'dil' },
  { label: 'ORTALAMA TESLİM', v: '8 hafta', delta: 'planlı' },
  { label: 'TAMAMLANAN PROJE', v: '180+', delta: 'toplam' },
  { label: 'MÜŞTERİ MEMNUNİYETİ', v: '%97', delta: 'puan' },
  { label: 'SEKTÖR', v: '12+', delta: 'alan' },
  { label: 'ÜCRETSİZ DESTEK', v: '6 ay', delta: 'garanti' },
];

function DeltaChip({ delta }: { delta: string }) {
  return <span className="text-muted-foreground/60 text-[10px]">{delta}</span>;
}

export function StatTicker() {
  // Triple the stats for a seamless infinite loop
  const items = [...STATS, ...STATS, ...STATS];

  return (
    <div className="border-y border-border bg-background overflow-hidden py-3 relative">
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
        style={{ background: 'linear-gradient(to right, var(--color-background), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
        style={{ background: 'linear-gradient(to left, var(--color-background), transparent)' }}
      />

      <div className="flex w-max animate-marquee gap-12 font-mono text-xs" aria-label="Airomeda rakamları">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5 flex-shrink-0 select-none">
            <span className="text-muted-foreground uppercase tracking-wider text-[10px]">{s.label}</span>
            <span className="text-foreground tabular-nums font-medium">{s.v}</span>
            <DeltaChip delta={s.delta} />
            <span className="text-muted-foreground/25">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
