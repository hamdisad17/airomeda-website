import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { TiltCard } from '@/components/motion/TiltCard';

const PLANS = [
  {
    name: 'Sprint',
    duration: '4–6 hafta',
    model: 'Sabit kapsam · sabit fiyat',
    includes: [
      'Belirli bir modül veya özellik',
      'Kod + dokümantasyon',
      '2 hafta garantili destek',
      'Haftalık check-in',
    ],
    accent: false,
  },
  {
    name: 'Project',
    duration: '8–16 hafta',
    model: 'Milestone-tabanlı',
    includes: [
      'Uçtan uca ürün geliştirme',
      'Mimari tasarım dahil',
      'Regülasyon & audit desteği',
      'Devir teslim + eğitim',
      '4 hafta operasyonel destek',
    ],
    accent: true,
  },
  {
    name: 'Long-term',
    duration: '6+ ay · yenilenebilir',
    model: 'Retainer · ekip uzantısı',
    includes: [
      'Tam ekip yerleşimi',
      'Öncelikli yanıt süresi',
      'Yol haritası ortaklığı',
      'Aylık metrik raporları',
      'Hizmet kalite güvencesi',
    ],
    accent: false,
  },
];

export function PricingSnapshot() {
  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 100%, hsl(189 100% 50% / 0.06), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Çalışma Modelleri</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Nasıl çalışabiliriz.
          </h2>
        </RevealSection>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {PLANS.map((plan) => (
            <RevealSection key={plan.name}>
              <TiltCard
                className={`h-full border p-8 flex flex-col relative overflow-hidden ${
                  plan.accent
                    ? 'border-accent/40 bg-accent/5'
                    : 'border-border bg-elevated'
                }`}
              >
                {plan.accent && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 right-0 h-32 w-32"
                    style={{
                      background:
                        'radial-gradient(circle at 100% 0%, hsl(189 100% 50% / 0.15), transparent 70%)',
                    }}
                  />
                )}
                <div>
                  <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                    {plan.model}
                  </p>
                  <h3
                    className={`mt-3 text-2xl font-semibold tracking-tight ${plan.accent ? 'text-accent' : 'text-foreground'}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">{plan.duration}</p>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/iletisim"
                    className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                      plan.accent ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                    }`}
                  >
                    görüşelim <span>→</span>
                  </Link>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
