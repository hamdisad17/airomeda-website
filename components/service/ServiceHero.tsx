'use client';
import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

type Props = {
  title: string;
  subtitle: string;
  ctaText: string;
  slug?: string;
};

export function ServiceHero({ title, subtitle, ctaText, slug }: Props) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.08), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-24 md:py-36">
        <nav className="mb-6 font-mono text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/hizmetler" className="hover:text-accent transition-colors">hizmetler</Link>
          <span>/</span>
          <span className="text-foreground/60">{slug ?? title.toLowerCase()}</span>
        </nav>
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
          Hizmetler
        </p>
        <h1
          className="mt-6 max-w-3xl font-semibold tracking-tight text-foreground"
          style={{
            fontSize: 'clamp(2.75rem, 6vw, 5rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          <TextReveal as="span">{title}</TextReveal>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        <div className="mt-10">
          <MagneticButton>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
            >
              {ctaText} <span>→</span>
            </Link>
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
