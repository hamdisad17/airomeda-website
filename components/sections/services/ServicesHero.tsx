'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';

const DISCIPLINES = [
  'Finans',
  'iGaming',
  'E-Ticaret',
  'Entegrasyon',
  'SEO & Reklam',
  'Sosyal Medya',
  'CRM',
];

export function ServicesHero() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.07), transparent 70%)',
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(189 100% 50% / 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 80%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-36">
        <p className="font-mono text-eyebrow uppercase text-accent">{'// hizmetler'}</p>
        <h1
          className="mt-6 font-semibold tracking-tight text-foreground max-w-3xl"
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 6rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          <TextReveal as="span">7 alanda uzman.</TextReveal>
          <br />
          <span className="text-accent">
            <TextReveal as="span" delay={0.3}>
              Size özel çözüm.
            </TextReveal>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Bankacılıktan e-ticarete, sağlıktan oyun geliştirmeye — ihtiyaçlarınıza göre şekillenen çözümlerle işinizi kolaylaştırıyoruz.
        </p>

        {/* Disciplines strip */}
        <div className="mt-12 flex flex-wrap gap-0 border border-border divide-x divide-border overflow-hidden">
          {DISCIPLINES.map((d, i) => (
            <div
              key={d}
              className="px-5 py-3 flex items-center gap-2 bg-elevated hover:bg-muted/40 transition-colors group"
            >
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/80 group-hover:text-accent transition-colors">
                {d}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
