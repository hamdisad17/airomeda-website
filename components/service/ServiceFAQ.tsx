'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceFAQ({ items }: { items: ServiceFrontmatter['faq'] }) {
  const [open, setOpen] = React.useState<number | null>(null);
  if (items.length === 0) return null;

  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// sss'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Sıkça sorulan sorular.
          </h2>
        </RevealSection>

        <div className="mt-12 max-w-3xl space-y-0 border-t border-border">
          {items.map((item, i) => (
            <div key={item.question} className="border-b border-border">
              <button
                className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="flex items-start gap-4">
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {item.question}
                  </span>
                </span>
                <span
                  className="shrink-0 font-mono text-muted-foreground text-lg leading-none transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0)' }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0', opacity: open === i ? 1 : 0 }}
              >
                <p className="pb-6 pl-9 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
