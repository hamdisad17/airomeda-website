import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STEPS = [
  { num: '01', label: 'Brief', detail: 'Kapsam, gereksinimler, kısıtlar.' },
  { num: '02', label: 'Plan', detail: 'Mimari, takvim, ekip yapısı.' },
  { num: '03', label: 'Build', detail: 'Sprint döngüleri, continuous delivery.' },
  { num: '04', label: 'Ship', detail: 'Production deploy, regülasyon geçişi.' },
  { num: '05', label: 'Operate', detail: 'Monitoring, destek, iterasyon.' },
];

export function ProcessStrip() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 02 · nasıl çalışırız'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            Brief&apos;ten production&apos;a.
          </h2>
        </RevealSection>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.num} className="p-6 bg-elevated group hover:bg-muted/40 transition-colors">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">{step.num}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                {step.label}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">{step.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
