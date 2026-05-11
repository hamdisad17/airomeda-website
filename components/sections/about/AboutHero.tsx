'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { CountUp } from '@/components/motion/CountUp';

const STATS = [
  { v: 28, suffix: '', label: 'mühendis' },
  { v: 47, suffix: '', label: 'production sistem' },
  { v: 134, suffix: '', label: 'tamamlanmış proje' },
  { v: 8, suffix: ' yıl', label: 'üretim deneyimi' },
];

export function AboutHero() {
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
      <Container as="div" className="relative py-24 md:py-40">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 items-start">
          {/* Left — headline */}
          <div>
            <p className="font-mono text-eyebrow uppercase text-accent">
              {'// hakkımızda · v.2026.05'}
            </p>
            <h1
              className="mt-6 font-semibold tracking-tight text-foreground"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              <TextReveal as="span">Yazılım yazan bir şirket.</TextReveal>
              <br />
              <span className="text-accent block mt-2">
                <TextReveal as="span" delay={0.3}>
                  İstanbul&apos;dan, 2018&apos;den beri.
                </TextReveal>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              2018&apos;den beri 7 disiplin, 47 kişilik ekip, 134 tamamlanmış proje. Finans, iGaming, e-ticaret ve entegrasyon alanlarında production-grade yazılım. Kodun sahibi sizsiniz — her zaman, her koşulda.
            </p>
          </div>

          {/* Right — terminal metadata box */}
          <div className="border border-border bg-elevated font-mono text-xs mt-4 md:mt-12">
            <div className="border-b border-border px-4 py-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-muted-foreground uppercase tracking-wider">airomeda.sys</span>
            </div>
            <div className="p-4 space-y-2">
              {[
                ['kuruluş', '2018 · İstanbul'],
                ['lokasyon', 'Maslak · İstanbul · TR'],
                ['ekip', '47 kişi · 28 mühendis'],
                ['dil', 'TR / EN'],
                ['bölge', '4 aktif · fra1 · lon1 · ist1 · iad1'],
                ['model', 'sprint · project · retainer'],
              ].map(([label, val]) => (
                <p key={label} className="flex gap-2">
                  <span className="text-muted-foreground w-24 shrink-0">{label}</span>
                  <span className="text-accent">{val}</span>
                </p>
              ))}
              <p className="pt-2 text-muted-foreground/50">
                {'> status: OPERATIONAL'}
                <span className="animate-terminal-blink ml-0.5">_</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-y md:divide-y-0 divide-border">
          {STATS.map((s) => (
            <div key={s.label} className="p-6 bg-elevated">
              <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">
                <CountUp end={s.v} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-eyebrow uppercase text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
