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
    title: 'Keşif',
    body: 'İhtiyaçlarınızı ve hedeflerinizi birlikte anlıyoruz. 30 dakikalık ücretsiz ilk görüşme ile başlıyoruz. 24 saat içinde size somut bir plan sunuyoruz.',
  },
  {
    id: 'design',
    n: '02',
    title: 'Tasarım',
    body: 'Size özel çözümü baştan sona tasarlıyoruz. Her karar onayınızla ilerliyor, her adım belgeleniyor. Sizi sürprizlerle karşılaştırmıyoruz.',
  },
  {
    id: 'build',
    n: '03',
    title: 'Geliştirme',
    body: 'İki haftada bir ilerlemeyi görebilirsiniz. Her aşamanın sonunda çalışan bir parça teslim ediyoruz. Süreç boyunca sürekli iletişim halindeyiz.',
  },
  {
    id: 'support',
    n: '04',
    title: 'Destek',
    body: 'Teslim sonrasında 7/24 yanınızdayız. İstediğinizde yazılımı kendi ekibinize devrediyoruz veya devam eden destek paketimizle uzun vadeli ortağınız oluyoruz.',
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
    <section id="process-story" ref={wrap} className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className="max-w-3xl">
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 06 · çalışma yöntemimiz'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">Nasıl çalışırız.</h2>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Sticky left side */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// process'}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                4 adım, hızlı teslim.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Her adımın sonunda ilerlemeyi birlikte görürsünüz. Şeffaf süreç, sürekli iletişim, teslim sonrası tam destek dahil.
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
