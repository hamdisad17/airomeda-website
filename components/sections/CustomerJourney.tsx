'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STEPS = [
  {
    num: '01',
    title: 'Birlikte konuşalım',
    body: 'İhtiyaçlarınızı dinler, hedeflerinizi anlarız. İşinize özel bir yol haritası çıkarırız.',
    duration: 'İlk gün',
  },
  {
    num: '02',
    title: 'Planı görelim',
    body: 'Size detaylı bir teklif sunarız: ne yapacağımız, ne zaman teslim edeceğimiz, ne kazandıracağı.',
    duration: '3-5 iş günü',
  },
  {
    num: '03',
    title: 'Tasarım ve onay',
    body: 'Ekranların nasıl görüneceğini tasarlar, sizinle paylaşır, onayınız ile devam ederiz.',
    duration: '1-2 hafta',
  },
  {
    num: '04',
    title: 'Geliştirme',
    body: 'Uzman ekibimiz çalışmaya başlar. Her hafta size ilerlemeyi gösteririz, geri bildirimlerinizi alırız.',
    duration: '6-12 hafta',
  },
  {
    num: '05',
    title: 'Yayın ve destek',
    body: 'Sisteminizi kullanıma açar, ekibinizi eğitir, 7/24 destek hattımız ile yanınızda kalırız.',
    duration: 'Sürekli',
  },
];

export function CustomerJourney() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Çalışma Şeklimiz</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight max-w-3xl">
            İlk görüşmeden yayına — 5 adımda projeniz hazır.
          </h2>
        </RevealSection>
        <div className="mt-14 space-y-px overflow-hidden border border-border bg-border">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="bg-background p-8 md:p-10 grid grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-center group hover:bg-elevated/40 transition-colors"
            >
              <span className="text-3xl md:text-5xl font-semibold tabular-nums text-accent">{s.num}</span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">{s.body}</p>
              </div>
              <span className="hidden md:block text-sm text-muted-foreground whitespace-nowrap">{s.duration}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
