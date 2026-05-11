'use client';
import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { TiltCard } from '@/components/motion/TiltCard';
import { RevealSection } from '@/components/motion/RevealSection';
import { Container } from '@/components/layout/Container';
import type { ServiceFrontmatter } from '@/lib/schemas/service';
import { CapabilityIcon } from '@/components/mockups/CapabilityIcon';

interface ServiceMatrixProps {
  services: ServiceFrontmatter[];
}

const SERVICE_METRICS: Record<string, { value: string; label: string }> = {
  finans: { value: '11 yıl', label: 'finans deneyimi' },
  'sans-oyunlari': { value: '12+', label: 'ülkede aktif' },
  'e-ticaret': { value: '+34%', label: 'satış artışı' },
  entegrasyon: { value: '10+', label: 'sistem bağlantısı' },
  'seo-reklam': { value: '+210%', label: 'organik büyüme' },
  'sosyal-medya': { value: '3×', label: 'daha fazla etkileşim' },
  crm: { value: '-40%', label: 'müşteri kaybı azaldı' },
};

function ServiceCard({
  service,
  featured = false,
}: {
  service: ServiceFrontmatter;
  featured?: boolean;
}) {
  const metric = SERVICE_METRICS[service.slug] ?? { value: '↑', label: 'büyüme' };
  const tags = service.capabilities.slice(0, 3).map((c) => c.title);

  return (
    <Link href={`/hizmetler/${service.slug}`} className="group block h-full">
      <TiltCard
        className={`h-full border border-border bg-elevated overflow-hidden relative transition-colors hover:border-accent/40 ${featured ? 'p-8 md:p-10' : 'p-6'}`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-40 w-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 100% 0%, hsl(189 100% 50% / 0.12), transparent 70%)',
          }}
        />

        {/* Eyebrow */}
        <div className="flex items-center justify-between gap-4">
          <CapabilityIcon slug={service.slug} className="h-6 w-6 text-accent" />
          {featured && (
            <span className="text-[10px] border border-accent/30 px-2 py-0.5 text-accent uppercase tracking-wider">
              Öne Çıkan
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`mt-4 font-semibold tracking-tight text-foreground leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className={`mt-3 text-muted-foreground leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
          {service.excerpt}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom: metric + CTA */}
        <div className="mt-6 flex items-end justify-between pt-4 border-t border-border">
          <div>
            <p className={`font-semibold tabular-nums text-accent ${featured ? 'text-3xl' : 'text-2xl'}`}>
              {metric.value}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{metric.label}</p>
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-accent transition-colors">
            incele{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}

export function ServiceMatrix({ services }: ServiceMatrixProps) {
  const [featured, ...rest] = services;

  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Hizmetlerimiz</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Yetkinlik matrisi.
          </h2>
        </RevealSection>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {/* Featured large card */}
          {featured && (
            <div className="md:col-span-2 md:row-span-2 min-h-[360px]">
              <RevealSection className="h-full">
                <ServiceCard service={featured} featured />
              </RevealSection>
            </div>
          )}

          {/* Rest */}
          {rest.map((s, i) => (
            <RevealSection key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
