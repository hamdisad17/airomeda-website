import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

export function ServiceTechStrip({ items }: { items: string[] }) {
  return (
    <section className="border-b border-border py-16">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Kullandığımız Araçlar</p>
        </RevealSection>
        <div className="mt-8 flex flex-wrap gap-2">
          {items.map((tech) => (
            <span
              key={tech}
              className="border border-border bg-elevated px-4 py-2 text-sm text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
