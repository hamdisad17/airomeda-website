'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { CountUp } from '@/components/motion/CountUp';

const STATS = [
  { v: 11, suffix: ' yıl', label: 'sektör deneyimi' },
  { v: 36, suffix: '', label: 'kişilik uzman ekip' },
  { v: 180, suffix: '+', label: 'tamamlanmış proje' },
  { v: 130, suffix: '+', label: 'ülkeye hizmet' },
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
              {'// hakkımızda · 11 yıl · 36 kişi · 130+ ülke'}
            </p>
            <h1
              className="mt-6 font-semibold tracking-tight text-foreground"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              <TextReveal as="span">11 yıldır Türkiye&apos;nin önde gelen markalarına yazılım çözümleri sunuyoruz.</TextReveal>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              36 kişilik uzman ekibimizle dünyanın her yerinden müşterilerimize hizmet veriyoruz. Ekibimizdeki uzmanlar daha önce Türkiye&apos;nin önde gelen kurumlarında görev almış profesyonellerdir.
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
                ['kuruluş', '2014 · İstanbul'],
                ['merkez ofis', 'İstanbul · TR'],
                ['ekip', '36 uzman'],
                ['dil', 'TR / EN'],
                ['hizmet alanı', '130+ ülke · dünya geneli'],
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
