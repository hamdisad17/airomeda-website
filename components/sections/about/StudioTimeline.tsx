'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '2018', label: 'Kuruluş', detail: 'Maslak, İstanbul — iki kurucu, bir PSP müşterisi, tek ofis.' },
  { year: '2019', label: 'İlk ödeme entegrasyonu', detail: "Akış Ödemeleri için PSP entegrasyon projesi production'a alındı. İlk BDDK uyumlu audit log." },
  { year: '2020', label: 'iGaming portfolyosu', detail: 'Bahis.io için lisanslı casino platformu ve eCOGRA uyumlu RNG teslim edildi.' },
  { year: '2021', label: 'Headless e-ticaret', detail: 'Hubert Commerce için Magento→Next.js migrasyonu. LCP 3.1s → 0.9s.' },
  { year: '2022', label: 'Ekip 28 mühendise ulaştı', detail: 'İzmir uydu ofisi açıldı. 28 mühendis, 6 designer, ilk SRE/DevOps rotasyonu.' },
  { year: '2023', label: 'Multi-region deployment', detail: 'fra1 birincil, lon1 yedek, ist1 edge — 3 bölge, Cloudflare 320+ POP.' },
  { year: '2024', label: 'Entegrasyon ürünü', detail: 'Entegrasys için ERP/WMS/kargo agregatör köprüsü. 10+ taşıyıcı, tek idempotent router.' },
  { year: '2025', label: '47 production sistem · 134 proje', detail: '4 aktif bölge (fra1 · lon1 · ist1 · iad1), 68 aktif müşteri, 280+ aylık deployment.' },
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
