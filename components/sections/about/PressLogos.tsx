import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const PRESS = [
  { name: 'Webrazzi', slug: 'webrazzi' },
  { name: 'Fintech Istanbul', slug: 'fintech-istanbul' },
  { name: 'Startup Türkiye', slug: 'startup-turkiye' },
  { name: 'TechCrunch TR', slug: 'techcrunch-tr' },
  { name: 'Karar', slug: 'karar' },
  { name: 'Dünya', slug: 'dunya' },
];

function PressPlaceholder({ name }: { name: string }) {
  return (
    <div className="border border-border bg-elevated px-8 py-5 flex items-center justify-center hover:border-accent/40 transition-colors group">
      <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground group-hover:text-foreground/70 transition-colors select-none">
        {name}
      </span>
    </div>
  );
}

export function PressLogos() {
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · basında'}</p>
          <p className="mt-2 text-muted-foreground text-sm">
            Sektör medyasında yer aldığımız kaynaklar.
          </p>
        </RevealSection>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border overflow-hidden border border-border">
          {PRESS.map((p) => (
            <PressPlaceholder key={p.slug} name={p.name} />
          ))}
        </div>
      </Container>
    </section>
  );
}
