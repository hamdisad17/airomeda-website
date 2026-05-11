'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '2018', label: 'Kuruluş', detail: 'İstanbul, iki kurucu, bir fintech müşterisi.' },
  { year: '2019', label: 'İlk fintech', detail: 'İlk ödeme entegrasyon projesi canlıya alındı.' },
  { year: '2020', label: 'iGaming lisansı', detail: 'Lisanslı casino ve sportsbook platformu teslim edildi.' },
  { year: '2021', label: 'E-ticaret platformu', detail: 'Headless e-ticaret çözümleri portföye eklendi.' },
  { year: '2022', label: 'Ekip büyümesi', detail: 'Ekip 10\'dan 20+ mühendise büyüdü.' },
  { year: '2023', label: 'Multi-region', detail: 'İlk çok bölgeli deployment — 3 kıta, 8 POP.' },
  { year: '2024', label: 'Entegrasyon ürünü', detail: 'ERP/WMS köprüsü ürünü kendi portföyümüze girdi.' },
  { year: '2025', label: 'Ölçek', detail: '47+ canlı production sistemi, 12 bölge, 24 mühendis.' },
];

export function StudioTimeline() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const dots = ref.current.querySelectorAll('.timeline-dot');
    const lines = ref.current.querySelectorAll('.timeline-line');
    const items = ref.current.querySelectorAll('.timeline-item');

    items.forEach((item, i) => {
      gsap.fromTo(
        [dots[i], lines[i]],
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
      gsap.fromTo(
        item.querySelector('.timeline-content'),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }, { scope: ref });

  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 04 · kilometre taşları'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Nereden nereye.
          </h2>
        </RevealSection>

        <div ref={ref} className="mt-16 max-w-2xl space-y-0">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="timeline-item relative flex gap-6">
              {/* Dot + line column */}
              <div className="flex flex-col items-center w-10 shrink-0">
                <div
                  className="timeline-dot h-3 w-3 border-2 border-accent bg-background shrink-0 mt-1"
                  style={{ transformOrigin: 'center' }}
                />
                {i < MILESTONES.length - 1 && (
                  <div
                    className="timeline-line flex-1 w-px bg-border mt-1"
                    style={{ minHeight: '64px', transformOrigin: 'top' }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content pb-10 flex-1">
                <p className="font-mono text-eyebrow uppercase text-accent">{m.year}</p>
                <h3 className="mt-1 font-semibold tracking-tight text-foreground">{m.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
