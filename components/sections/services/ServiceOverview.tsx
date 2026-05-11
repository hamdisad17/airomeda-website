import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface ServiceOverviewProps {
  title: string;
  body1: string;
  body2: string;
  imageUrl: string;
  imageAlt: string;
}

export function ServiceOverview({ title, body1, body2, imageUrl, imageAlt }: ServiceOverviewProps) {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <RevealSection>
            <p className="font-mono text-eyebrow uppercase text-accent">{'// ne yapıyoruz'}</p>
            <h2
              className="mt-4 font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
            >
              {title}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground leading-relaxed">{body1}</p>
            <p className="mt-4 text-body-lg text-muted-foreground leading-relaxed">{body2}</p>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span>2014&apos;ten beri · Ziraat Bankası referanslı · 7/24 destek</span>
            </div>
          </RevealSection>
          <RevealSection delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-elevated">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover grayscale-[40%] contrast-[1.05]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
