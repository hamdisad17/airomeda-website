'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { CountUp } from '@/components/motion/CountUp';

export function WorksHero({ count }: { count?: number }) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.08), transparent 70%)',
        }}
      />
      {/* Dot grid atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(189 100% 50% / 0.2) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 80%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-40">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
          Vakalar · <CountUp end={count ?? 47} suffix="+ tamamlanmış proje" className="tabular-nums" />
        </p>
        <h1
          className="mt-6 font-semibold tracking-tight text-foreground max-w-4xl"
          style={{
            fontSize: 'clamp(2.75rem, 8vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          <TextReveal as="span">Gurur duyduğumuz</TextReveal>
          <br />
          <span className="text-accent">
            <TextReveal as="span" delay={0.3}>
              projeler.
            </TextReveal>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Fintech&apos;ten iGaming&apos;e, e-ticaretten entegrasyona — 180+ projede gerçek müşteriler için gerçek sonuçlar ürettik.
        </p>
      </Container>
    </section>
  );
}
