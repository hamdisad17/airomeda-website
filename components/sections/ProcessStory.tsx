'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    id: 'discovery',
    n: '01',
    title: 'Discovery',
    body: "İhtiyacı haritalandırırız. Regülasyon, bağımlılıklar, mevcut sistemler. İlk 2-4 hafta.",
  },
  {
    id: 'design',
    n: '02',
    title: 'Design',
    body: 'Mimari kararlar, API kontratları, veri modeli. Çizilen her şey paylaşılır, müşteri onaylar.',
  },
  {
    id: 'build',
    n: '03',
    title: 'Build',
    body: "Sprintler halinde teslim. Her sprint sonunda demo edilebilir bir parça. Test + CI + audit log.",
  },
  {
    id: 'support',
    n: '04',
    title: 'Support',
    body: "Production'a aldığımız ne olursa olsun, biz buradayız. On-call rotation, SLA, observability.",
  },
];

export function ProcessStory() {
  const wrap = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrap.current) return;
      const items = wrap.current.querySelectorAll<HTMLLIElement>('.phase-item');
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.3, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 60%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className="max-w-3xl">
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 06 · method'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">Nasıl çalışırız.</h2>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Sticky left side */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// process'}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                4 faz, ortalama 12 hafta.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Her fazın sonunda müşteri görür, geri bildirim verir, biz devam ederiz.
                Şeffaf sprint kadansı + audit-ready dokümantasyon.
              </p>
            </div>
          </div>

          {/* Right side: phase list */}
          <div className="lg:col-span-8">
            <ul className="space-y-12">
              {PHASES.map((p) => (
                <li
                  key={p.id}
                  className="phase-item flex gap-6 border-l-2 border-border pl-6"
                >
                  <div>
                    <p className="font-mono text-eyebrow uppercase text-accent">
                      phase {p.n}
                    </p>
                    <h4 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h4>
                    <p className="mt-3 max-w-xl text-body-lg text-muted-foreground">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
