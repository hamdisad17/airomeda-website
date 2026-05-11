import * as React from 'react';
import { Container } from '@/components/layout/Container';

const PERKS = [
  'özel sağlık sigortası',
  'yıllık eğitim bütçesi',
  'tam uzaktan çalışma',
  'konferans bütçesi',
  'MacBook Pro M-serisi',
  'esnek izin politikası',
  'yıllık prim',
  'hibrit istanbul ofisi',
];

export function PerksStrip() {
  return (
    <div className="border-b border-border bg-elevated/30 overflow-hidden">
      <Container as="div" className="py-5">
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground shrink-0 mr-3">
            {'yan haklar ·'}
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {PERKS.map((perk) => (
              <span key={perk} className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors">
                {perk}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
