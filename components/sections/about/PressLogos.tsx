import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const PRESS = [
  { name: 'Ziraat Bankası', slug: 'ziraat' },
  { name: 'Kumtel A.Ş.', slug: 'kumtel' },
  { name: 'Aras Kargo', slug: 'aras' },
  { name: 'HSD Core Labs', slug: 'hsd' },
  { name: 'Kodland', slug: 'kodland' },
  { name: 'Wide Game Studio', slug: 'widegame' },
  { name: 'TS Digital', slug: 'tsdigital' },
  { name: 'Excellence Talks', slug: 'excellence' },
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
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · referanslarımız'}</p>
          <p className="mt-2 text-muted-foreground text-sm">
            Türkiye&apos;nin önde gelen kurumları ve uluslararası firmaların güvendiği yazılım ortağı.
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
