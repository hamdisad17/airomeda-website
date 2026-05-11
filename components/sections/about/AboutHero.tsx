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
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(20 184 166 / 0.08), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-40">
        <div className="grid md:grid-cols-[1fr_340px] gap-12 items-start">
          {/* Left — headline */}
          <div>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
              Hakkımızda
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

          {/* Right — company info card */}
          <div className="border border-border bg-elevated text-xs mt-4 md:mt-12">
            <div className="border-b border-border px-4 py-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-muted-foreground uppercase tracking-wider font-medium">Airomeda Bilgi</span>
            </div>
            <div className="p-4 space-y-2">
              {[
                ['Kuruluş', '2014 · İstanbul'],
                ['Merkez ofis', 'İstanbul, Türkiye'],
                ['Ekip', '36 uzman'],
                ['Dil', 'Türkçe / İngilizce'],
                ['Hizmet alanı', '130+ ülke · dünya geneli'],
              ].map(([label, val]) => (
                <p key={label} className="flex gap-2">
                  <span className="text-muted-foreground w-28 shrink-0">{label}</span>
                  <span className="text-foreground font-medium">{val}</span>
                </p>
              ))}
              <p className="pt-2 text-muted-foreground/50 flex items-center gap-1.5">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success flex-shrink-0" />
                <span>Aktif · 7/24 hizmet</span>
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
              <p className="mt-2 text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
