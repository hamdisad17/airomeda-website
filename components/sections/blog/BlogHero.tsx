'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { RevealSection } from '@/components/motion/RevealSection';
import { CountUp } from '@/components/motion/CountUp';

interface BlogHeroProps {
  postCount: number;
  lastUpdated: string;
}

export function BlogHero({ postCount, lastUpdated }: BlogHeroProps) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(20 184 166 / 0.07), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-[1fr_340px]">
          {/* Left */}
          <div>
            <RevealSection>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Blog</p>
            </RevealSection>
            <h1
              className="mt-6 font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              <TextReveal as="span">Yazılar, notlar, derinleşmeler.</TextReveal>
            </h1>
            <RevealSection delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
                Üretim ortamından sahne arkası. Mühendislik kararları, tasarım tercihleri, sektör gözlemleri.
              </p>
            </RevealSection>
          </div>

          {/* Right stats panel */}
          <RevealSection delay={0.3} className="hidden md:flex items-start">
            <div className="w-full border border-border bg-elevated p-6 font-mono text-xs space-y-6">
              <p className="text-muted-foreground uppercase tracking-wider">{'> istatistikler'}</p>
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tabular-nums text-accent">
                    <CountUp end={postCount} duration={1.4} />
                  </span>
                  <span className="text-muted-foreground uppercase">yazı</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tabular-nums text-accent">
                    <CountUp end={6} duration={1.2} />
                  </span>
                  <span className="text-muted-foreground uppercase">yazar</span>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider mb-1">son güncelleme</p>
                  <p className="text-foreground">{lastUpdated}</p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
