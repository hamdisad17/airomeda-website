'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Link } from '@/i18n/navigation';

interface MetaItem {
  label: string;
  value: string;
}

interface EditorialHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  metaItems?: MetaItem[];
  rightVisual?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}

export function EditorialHero({
  eyebrow,
  title,
  subtitle,
  metaItems,
  rightVisual,
  ctaHref,
  ctaLabel,
}: EditorialHeroProps) {
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
        <div
          className={`grid gap-12 ${rightVisual ? 'md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_480px]' : ''}`}
        >
          {/* Left content */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">{eyebrow}</p>
              <h1
                className="mt-6 font-semibold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                <TextReveal as="span">{title}</TextReveal>
              </h1>
              {subtitle && (
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-8">
              {metaItems && metaItems.length > 0 && (
                <div className="border border-border bg-elevated p-4 font-mono text-xs w-fit">
                  <p className="text-muted-foreground mb-2 uppercase tracking-wider">{'> metadata'}</p>
                  {metaItems.map((item) => (
                    <p key={item.label} className="text-foreground/80">
                      <span className="text-muted-foreground">{item.label}</span>
                      {' · '}
                      <span className="text-accent">{item.value}</span>
                    </p>
                  ))}
                </div>
              )}
              {ctaHref && ctaLabel && (
                <div className="flex items-center gap-6">
                  <MagneticButton>
                    <Link
                      href={ctaHref}
                      className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
                    >
                      {ctaLabel} <span>→</span>
                    </Link>
                  </MagneticButton>
                </div>
              )}
            </div>
          </div>

          {/* Right visual */}
          {rightVisual && (
            <div className="relative hidden md:flex items-center justify-center border border-border bg-elevated overflow-hidden min-h-[320px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(189 100% 50% / 0.06), transparent 70%)',
                }}
              />
              <div className="relative w-full h-full p-6 flex items-center justify-center">
                {rightVisual}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
