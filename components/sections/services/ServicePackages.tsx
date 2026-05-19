'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';
import { PACKAGES_BY_SLUG, DEFAULT_PACKAGES } from '@/lib/data/service-packages';

interface ServicePackagesProps {
  slug: string;
}

export function ServicePackages({ slug }: ServicePackagesProps) {
  const packages = PACKAGES_BY_SLUG[slug] ?? DEFAULT_PACKAGES;

  return (
    <section className="border-b border-border py-20 md:py-28 bg-muted/20">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Paketler</p>
          <h2
            className="mt-4 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
          >
            Size en uygun paketi seçin.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Her paket size özelleştirilebilir. Kesin fiyat için ücretsiz ilk görüşme talep edin.
          </p>
        </RevealSection>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col border p-8 ${
                pkg.highlight
                  ? 'border-accent bg-accent/5 shadow-[0_0_40px_-10px_hsl(173_80%_40%_/_0.2)]'
                  : 'border-border bg-elevated'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 text-[10px] uppercase tracking-wider text-accent-foreground">
                  En popüler
                </span>
              )}
              <p
                className={`text-eyebrow uppercase tracking-wider font-medium ${
                  pkg.highlight ? 'text-accent' : 'text-muted-foreground'
                }`}
              >
                {pkg.name}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.desc}</p>
              {pkg.price && (
                <div className="mt-3 pb-4 border-b border-border">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">{pkg.price}</p>
                  {pkg.priceNote && (
                    <p className="mt-1 text-xs text-muted-foreground">{pkg.priceNote}</p>
                  )}
                  {pkg.annualPrice && (
                    <p className="mt-2 text-xs">
                      <span className="text-muted-foreground">veya </span>
                      <span className="text-foreground font-medium">{pkg.annualPrice}</span>
                      {pkg.annualSavings && (
                        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-accent border border-accent/30 bg-accent/5">
                          {pkg.annualSavings}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              )}
              <ul className="mt-6 space-y-2 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <span className="mt-1 text-accent shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/iletisim"
                className={`mt-8 block text-center px-4 py-3 text-sm font-medium transition-all ${
                  pkg.highlight
                    ? 'bg-accent text-accent-foreground hover:shadow-[0_0_30px_-5px_hsl(173_80%_40%_/_0.5)]'
                    : 'border border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
          Fiyatlar projenin kapsamına göre belirlenir · Ücretsiz ilk görüşme için bize ulaşın
        </p>
      </Container>
    </section>
  );
}
