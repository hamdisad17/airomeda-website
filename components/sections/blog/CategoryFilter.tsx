'use client';
import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';

interface CategoryFilterProps {
  categories: string[];
  active?: string;
  locale?: string;
}

export function CinematicCategoryFilter({ categories, active }: CategoryFilterProps) {
  const all = ['Tümü', ...categories];

  return (
    <div className="border-b border-border bg-elevated/20">
      <Container as="div" className="py-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mr-2">
            {'filtrele ·'}
          </span>
          {all.map((cat) => {
            const isActive = cat === 'Tümü' ? !active : cat === active;
            const href = cat === 'Tümü' ? '/blog' : `/blog/kategori/${cat}`;
            return (
              <Link
                key={cat}
                href={href}
                className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                  isActive
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
