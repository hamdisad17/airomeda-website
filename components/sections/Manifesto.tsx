'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const words = ref.current.querySelectorAll('.manifesto-word');
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.04,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        },
      );
    },
    { scope: ref },
  );

  const sentence =
    'Yazılım yazıyoruz. Slayt değil. Ürün teslim ediyoruz, prototip değil. Production hattındayız, demo ortamında değil.';
  const words = sentence.split(' ');

  return (
    <section className="border-b border-border py-28 md:py-40 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, hsl(189 100% 50% / 0.06), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <div ref={ref}>
        <p className="font-mono text-eyebrow uppercase text-accent mb-12">{'// manifesto'}</p>
        <p className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] max-w-5xl">
          {words.map((w, i) => (
            <span key={i} className="manifesto-word inline-block mr-[0.25em] text-foreground">
              {w}
            </span>
          ))}
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl">
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">teslim</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              8-16 hafta
            </p>
          </div>
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              canlıdaki ekip
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              aynı ekip · devamı
            </p>
          </div>
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">sahiplik</p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              kod sizin · IP sizin
            </p>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
