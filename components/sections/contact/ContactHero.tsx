'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { RevealSection } from '@/components/motion/RevealSection';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function ContactHero() {
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
      <Container as="div" className="relative py-24 md:py-36">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// iletişim · brief gönder'}</p>
        </RevealSection>
        <h1
          className="mt-6 font-semibold tracking-tight text-foreground"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 7rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          <TextReveal as="span">Konuşalım.</TextReveal>
        </h1>
        <RevealSection delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Mesajınızı gönderin, 24 saat içinde dönelim. Proje fikri, fiyat bilgisi ya da herhangi bir sorunuz — her konuda yardımcı olmaya hazırız. WhatsApp&apos;tan da yazabilirsiniz: +90 507 637 0052
          </p>
        </RevealSection>
        <RevealSection delay={0.3}>
          <div className="mt-10">
            <MagneticButton>
              <a
                href="#brief-form"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
              >
                Brief gönder <span>↓</span>
              </a>
            </MagneticButton>
          </div>
        </RevealSection>
      </Container>
    </section>
  );
}
