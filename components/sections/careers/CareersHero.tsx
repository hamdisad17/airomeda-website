'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { RevealSection } from '@/components/motion/RevealSection';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Link } from '@/i18n/navigation';

interface CareersHeroProps {
  openCount: number;
}

export function CareersHero({ openCount }: CareersHeroProps) {
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
        <div className="grid gap-12 md:grid-cols-[1fr_360px]">
          <div>
            <RevealSection>
              <p className="font-mono text-eyebrow uppercase text-accent">
                {`// kariyer · ${openCount} açık pozisyon · istanbul`}
              </p>
            </RevealSection>
            <h1
              className="mt-6 font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              <TextReveal as="span">36 kişilik sıcak bir ekibe katılın.</TextReveal>
            </h1>
            <RevealSection delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Ziraat Bankası&apos;ndan HSD Core Labs&apos;e, Aras Kargo&apos;dan uluslararası projelere — çok farklı alanlarda güzel işler yapıyoruz. İşini seven, öğrenmeye açık ve birlikte büyümek isteyen insanlar arıyoruz.
              </p>
            </RevealSection>
            <RevealSection delay={0.3}>
              <div className="mt-10">
                <MagneticButton>
                  <Link
                    href="#acik-pozisyonlar"
                    className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
                  >
                    Açık pozisyonlara bak <span>↓</span>
                  </Link>
                </MagneticButton>
              </div>
            </RevealSection>
          </div>

          {/* Metrics panel */}
          <RevealSection delay={0.35} className="hidden md:block">
            <div className="border border-border bg-elevated p-6 font-mono text-xs space-y-5">
              <p className="text-muted-foreground uppercase tracking-wider">{'> ekip'}</p>
              {[
                { label: 'toplam ekip', value: '36 uzman' },
                { label: 'kuruluş', value: '2014 · Kayseri' },
                { label: 'lokasyon', value: 'İstanbul · Kayseri · uzaktan' },
                { label: 'sektörler', value: 'finans · sağlık · lojistik · oyun · e-ticaret' },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground uppercase">{row.label}</span>
                  <span className="text-accent tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
