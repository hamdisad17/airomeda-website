'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { word: 'Slayt', tone: 'muted' },
  { word: 'değil.', tone: 'muted' },
  { word: 'Yazılım', tone: 'accent' },
  { word: 'yazıyoruz.', tone: 'accent' },
];

const STATEMENT_2 = [
  { word: 'Prototip', tone: 'muted' },
  { word: 'değil.', tone: 'muted' },
  { word: 'Production.', tone: 'accent' },
];

const STATEMENT_3 = [
  { word: 'Demo', tone: 'muted' },
  { word: 'değil.', tone: 'muted' },
  { word: 'Production', tone: 'accent' },
  { word: 'hattı.', tone: 'accent' },
];

export function Manifesto() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const lines = ref.current.querySelectorAll('.manifesto-line');
    lines.forEach((line) => {
      const words = line.querySelectorAll('.m-word');
      gsap.fromTo(
        words,
        { opacity: 0.08, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        },
      );
    });
  }, { scope: ref });

  return (
    <section className="border-b border-border py-32 md:py-48 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(189 100% 50% / 0.07), transparent 70%)' }}/>
      <Container as="div" className="relative">
        <div ref={ref}>
        <p className="font-mono text-eyebrow uppercase text-accent mb-20">{'// manifesto'}</p>

        <div className="space-y-16 md:space-y-24">
          {[STATEMENTS, STATEMENT_2, STATEMENT_3].map((line, li) => (
            <p key={li} className="manifesto-line text-[clamp(2.5rem,8vw,9rem)] font-semibold tracking-[-0.04em] leading-[0.95] max-w-[12ch]">
              {line.map((w, wi) => (
                <span key={wi} className={`m-word inline-block mr-[0.2em] ${w.tone === 'accent' ? 'text-accent' : 'text-foreground/80'}`}>
                  {w.word}
                </span>
              ))}
            </p>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-4xl border-t border-border pt-12">
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">teslim</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">8-16 hafta</p>
          </div>
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">canlıdaki ekip</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">aynı ekip · devamı</p>
          </div>
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">sahiplik</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">kod sizin · IP sizin</p>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
