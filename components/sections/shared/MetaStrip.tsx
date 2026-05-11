import * as React from 'react';

interface MetaStripItem {
  label: string;
  value: string;
}

interface MetaStripProps {
  items: MetaStripItem[];
  className?: string;
}

export function MetaStrip({ items, className = '' }: MetaStripProps) {
  return (
    <div
      className={`border border-border bg-elevated font-mono text-xs overflow-hidden ${className}`}
    >
      <div className="flex flex-wrap divide-x divide-border">
        {items.map((item) => (
          <div key={item.label} className="px-4 py-3 flex items-center gap-2">
            <span className="text-muted-foreground uppercase tracking-wider">{item.label}</span>
            <span className="text-accent tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
