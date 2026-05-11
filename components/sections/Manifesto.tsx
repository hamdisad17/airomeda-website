'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

const STATEMENTS = [
  { word: 'Sizi', tone: 'muted' },
  { word: 'dinleriz.', tone: 'accent' },
  { word: 'Boş', tone: 'muted' },
  { word: 'vaatler', tone: 'muted' },
  { word: 'vermeyiz.', tone: 'muted' },
];

const STATEMENT_2 = [
  { word: 'Söz', tone: 'muted' },
  { word: 'veririz.', tone: 'accent' },
  { word: 'Sözümüzde', tone: 'muted' },
  { word: 'dururuz.', tone: 'muted' },
];

const STATEMENT_3 = [
  { word: 'Yanınızda', tone: 'muted' },
  { word: 'kalırız.', tone: 'accent' },
  { word: 'Yayından', tone: 'muted' },
  { word: 'sonra', tone: 'muted' },
  { word: 'da.', tone: 'muted' },
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
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgb(20 184 166 / 0.07), transparent 70%)' }}/>
      <Container as="div" className="relative">
        <div ref={ref}>
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-20">Sözümüz</p>

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
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">teslim</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">Hızlı ve güvenilir</p>
          </div>
          <div>
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">yanıt</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">24 saat içinde · 7/24 destek</p>
          </div>
          <div>
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">sahiplik</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">Yazılım tamamen sizin</p>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
