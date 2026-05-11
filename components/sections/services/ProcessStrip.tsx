import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STEPS = [
  { num: '01', label: 'Görüşme', detail: 'Kapsam, hedefler ve bütçeyi birlikte netleştiririz.' },
  { num: '02', label: 'Plan', detail: 'Çözüm tasarımı, takvim ve ekip yapısını hazırlarız.' },
  { num: '03', label: 'Geliştirme', detail: 'Haftalar halinde ilerleyerek size düzenli güncellemeler veririz.' },
  { num: '04', label: 'Yayın', detail: 'Test edilmiş sistemi canlıya alır, onay alırız.' },
  { num: '05', label: 'Destek', detail: 'Yayın sonrası takip, destek ve geliştirme.' },
];

export function ProcessStrip() {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Nasıl Çalışırız</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            İlk görüşmeden yayına.
          </h2>
        </RevealSection>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px border border-border bg-border overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.num} className="p-6 bg-elevated group hover:bg-muted/40 transition-colors">
              <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">{step.num}</p>
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
