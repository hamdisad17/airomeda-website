import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { TiltCard } from '@/components/motion/TiltCard';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceCapabilities({ items }: { items: ServiceFrontmatter['capabilities'] }) {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Ne Teslim Ediyoruz</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Yetkinliklerimiz.
          </h2>
        </RevealSection>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={i * 0.05}>
              <TiltCard className="h-full border border-border bg-elevated p-7 relative overflow-hidden group">
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 h-24 w-24 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, hsl(189 100% 50% / 0.1), transparent 70%)',
                  }}
                />
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
