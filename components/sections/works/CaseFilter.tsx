'use client';
import * as React from 'react';

const INDUSTRIES = ['Tümü', 'Finans', 'iGaming', 'E-Ticaret', 'Entegrasyon'];

interface CaseFilterProps {
  selected: string;
  onChange: (industry: string) => void;
}

export function CaseFilter({ selected, onChange }: CaseFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-eyebrow uppercase text-muted-foreground mr-2">filtre:</span>
      {INDUSTRIES.map((industry) => {
        const active = selected === industry;
        return (
          <button
            key={industry}
            onClick={() => onChange(industry)}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors ${
              active
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border bg-elevated text-muted-foreground hover:border-accent/40 hover:text-foreground'
            }`}
          >
            {industry}
          </button>
        );
      })}
    </div>
  );
}
