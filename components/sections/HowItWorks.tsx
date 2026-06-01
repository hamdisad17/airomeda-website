'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { Galaxy } from '@/components/visuals/Galaxy';

type Step = {
  num: string;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Anlıyoruz',
    desc: 'İhtiyaçlarınızı dinler, iş hedeflerinizi netleştiririz.',
  },
  {
    num: '02',
    title: 'Tasarlıyoruz',
    desc: 'Markanıza özel, akıllı çözümleri sıfırdan kurguluyoruz.',
  },
  {
    num: '03',
    title: 'Hayata Geçiriyoruz',
    desc: 'Hızlıca yayına alır, ekibinizi sistemle eğitiriz.',
  },
  {
    num: '04',
    title: 'Yanınızda Kalıyoruz',
    desc: 'Lansman bitmedi başlangıçtır — 7/24 destek sürer.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Galaxy density="normal" />

      {/* Floating glow blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(168 85 247 / 0.25), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 -right-32 h-96 w-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(0 212 255 / 0.20), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <Container as="div" className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-eyebrow uppercase tracking-wider neon-text-cyan font-semibold">
            Çalışma şeklimiz
          </p>
          <h2
            className="mt-5 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Dört adımda{' '}
            <span className="text-neon-violet">fikirden canlıya.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {/* Connecting line between cards on large screens */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-1/2 left-[12.5%] right-[12.5%] h-px pointer-events-none -translate-y-1/2"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgb(0 212 255 / 0.5), rgb(168 85 247 / 0.5), transparent)',
            }}
          />

          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative glass-panel rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 group"
            >
              {/* Big number badge */}
              <div
                className="absolute -top-4 left-7 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
                  boxShadow: '0 0 20px -4px rgb(0 212 255 / 0.6)',
                  color: '#05091a',
                }}
              >
                {s.num}
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
