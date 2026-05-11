import * as React from 'react';
import { Container } from '@/components/layout/Container';

const PERKS = [
  'özel sağlık sigortası',
  '12.000 TL yıllık konferans bütçesi',
  'tam uzaktan veya hibrit',
  'MacBook Pro M-serisi',
  'esnek izin politikası',
  'yıllık prim',
  'Maslak ofis veya İzmir',
  'eğitim + sertifika desteği',
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
