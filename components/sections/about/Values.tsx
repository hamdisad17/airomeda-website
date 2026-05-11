import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { TiltCard } from '@/components/motion/TiltCard';

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
        <rect x="4" y="4" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 16l4 4 8-8" stroke="hsl(189 100% 50%)" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    ),
    title: 'Güven',
    description:
      '11 yıllık deneyim ve 85+ aktif müşteri. Güvenilirliği her şeyin önünde tutuyoruz.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 8v8l5 3" stroke="hsl(189 100% 50%)" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    ),
    title: 'Hız',
    description:
      'İki haftada ilk sonuç. Hızlı teslim ve sürekli iletişimle beklentilerin her zaman üzerindeyiz.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
        <path d="M4 8h24M4 16h16M4 24h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <rect x="22" y="20" width="6" height="6" stroke="hsl(189 100% 50%)" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Dünya Çapında',
    description:
      '130+ ülkeden müşteri, 7/24 destek. Nerede olursanız olun, yanınızdayız.',
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8">
        <path d="M8 24V12M16 24V8M24 24V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M4 24h24" stroke="hsl(189 100% 50%)" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Uzmanlık',
    description:
      'Johns Hopkins, Duke ve Google sertifikalı ekibimiz bilgisini sürekli güncelliyor. İhtiyaçlarınıza özel en iyi çözümü sunuyoruz.',
  },
];

export function Values() {
  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 20% 50%, hsl(189 100% 50% / 0.06), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 03 · değerlerimiz'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Neden bizi seçiyorlar?
          </h2>
        </RevealSection>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <RevealSection key={v.title}>
              <TiltCard className="h-full border border-border bg-elevated p-7 flex flex-col gap-6">
                <div className="text-foreground/70">{v.icon}</div>
                <div>
                  <h3 className="font-semibold tracking-tight text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
