'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';

type Feature = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  hue: 'cyan' | 'violet' | 'pink' | 'green';
};

const HUES: Record<Feature['hue'], { fill: string; glow: string }> = {
  cyan:   { fill: '#00d4ff', glow: 'rgb(0 212 255 / 0.4)' },
  violet: { fill: '#a855f7', glow: 'rgb(168 85 247 / 0.4)' },
  pink:   { fill: '#ec4899', glow: 'rgb(236 72 153 / 0.4)' },
  green:  { fill: '#22d3a4', glow: 'rgb(34 211 164 / 0.4)' },
};

function Icon({ children, hue }: { children: React.ReactNode; hue: Feature['hue'] }) {
  const c = HUES[hue];
  return (
    <div
      className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${c.fill}22, ${c.fill}08)`,
        border: `1px solid ${c.fill}40`,
        boxShadow: `0 0 30px -6px ${c.glow}, inset 0 0 20px ${c.fill}10`,
      }}
    >
      <div style={{ color: c.fill, filter: `drop-shadow(0 0 8px ${c.glow})` }}>
        {children}
      </div>
    </div>
  );
}

const FEATURES: Feature[] = [
  {
    hue: 'cyan',
    title: 'Akıllı Otomasyonlar',
    desc: 'Tekrar eden işleri yapay zekâ yapsın, ekibiniz büyütmeye odaklansın.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07l4.24-4.24" />
      </svg>
    ),
  },
  {
    hue: 'violet',
    title: 'Anında Entegrasyon',
    desc: 'Mevcut sistemlerinize haftalarca değil, günlerle ölçülen sürede bağlanır.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    hue: 'pink',
    title: 'Tam Görünürlük',
    desc: 'Müşteri yolculuğunun her adımını tek panelden anlık olarak takip edin.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    hue: 'green',
    title: 'Büyümeye Hazır',
    desc: 'Üç kullanıcıdan üç milyona kadar — altyapı sizinle birlikte ölçeklenir.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

export function FeatureGrid() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden cosmic-bg">
      <div aria-hidden className="absolute inset-0 stars-bg pointer-events-none" />

      <Container as="div" className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-eyebrow uppercase tracking-wider neon-text-cyan font-semibold">
            Sizi ne bekliyor?
          </p>
          <h2
            className="mt-5 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            İşinizi geleceğe taşıyan{' '}
            <span className="text-neon">akıllı çözümler.</span>
          </h2>
          <p className="mt-6 text-base md:text-body-lg text-muted-foreground leading-relaxed">
            Karmaşık altyapı kararlarını biz alıyoruz, sade ve hızlı sonuçlar üretiyoruz.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="glass-panel rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2"
            >
              <Icon hue={f.hue}>{f.icon}</Icon>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
