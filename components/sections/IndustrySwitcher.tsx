'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const INDUSTRIES = [
  {
    key: 'finance',
    label: 'Finans',
    tagline: 'Lisans hattında, regülatöre cevap verebilen sistemler.',
    points: [
      'Core banking modernizasyonu',
      'PSD2 / 3DS / FX rail entegrasyonu',
      'BDDK / MASAK uyumlu audit log',
      'Real-time risk skorlama',
    ],
    metric: { v: '120ms', l: 'P99 transaction' },
  },
  {
    key: 'gaming',
    label: 'iGaming',
    tagline: "RNG sertifikasyonu hazır, scale'e dayanan altyapı.",
    points: [
      'iGaming platform + cashier',
      'eCOGRA / GLI hazır RNG',
      'Multi-jurisdiction lisans desteği',
      'Bonus & retention motoru',
    ],
    metric: { v: '4ms', l: 'spin response' },
  },
  {
    key: 'commerce',
    label: 'E-Ticaret',
    tagline: 'Headless storefront, kesintisiz migration, marketplace.',
    points: [
      'Headless storefront + PIM',
      'Magento → Next.js geçişi',
      'Marketplace vendor onboarding',
      'Iyzico / Param / Stripe orchestration',
    ],
    metric: { v: '0.9s', l: 'LCP mobile' },
  },
  {
    key: 'integration',
    label: 'Entegrasyon',
    tagline: 'ERP, WMS, kargo, e-fatura — hepsi konuşur.',
    points: [
      'Logo / Mikro / NetSuite ERP bridge',
      'Kargo agregatör (10+ taşıyıcı)',
      'e-Fatura / e-İrsaliye köprüsü',
      'Idempotent webhook router',
    ],
    metric: { v: '99.99%', l: 'webhook delivery' },
  },
];

export function IndustrySwitcher() {
  const [active, setActive] = React.useState(0);
  const item = INDUSTRIES[active] ?? INDUSTRIES[0]!;

  return (
    <section id="industry-switcher" className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 03 · sektör'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Hangi alanda{' '}
            <br className="md:hidden" />çalışıyorsun?
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Her sektörün kendi regülasyonu, kendi ölçek problemi, kendi başarı metriği var.
            Hangisindeysen, ona göre teslim ediyoruz.
          </p>
        </RevealSection>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1fr_1.5fr]">
          {/* Tab rail */}
          <div className="bg-background">
            <ul role="tablist" className="divide-y divide-border">
              {INDUSTRIES.map((ind, i) => (
                <li key={ind.key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full text-left px-6 py-5 transition-colors flex items-center justify-between group ${
                      i === active
                        ? 'bg-elevated text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          i === active ? 'text-accent' : 'text-muted-foreground/60'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-lg font-semibold tracking-tight">{ind.label}</span>
                    </span>
                    <span
                      className={`transition-transform ${
                        i === active ? 'translate-x-0 text-accent' : '-translate-x-2 opacity-0'
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Panel */}
          <div
            key={active}
            className="bg-elevated p-8 md:p-12 relative overflow-hidden animate-industry-fade"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30"
              style={{
                background:
                  'radial-gradient(circle, hsl(189 100% 50% / 0.4), transparent 60%)',
              }}
            />
            <div className="relative">
              <p className="font-mono text-eyebrow uppercase text-accent">{item.label}</p>
              <p className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-tight">
                {item.tagline}
              </p>
              <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {item.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1.5 inline-block h-1 w-3 bg-accent flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-mono text-eyebrow uppercase text-muted-foreground">
                    benchmark
                  </p>
                  <p className="mt-1.5 text-2xl font-semibold tabular-nums text-accent">
                    {item.metric.v}
                  </p>
                  <p className="font-mono text-[11px] text-muted-foreground mt-1">
                    {item.metric.l}
                  </p>
                </div>
                <a
                  href="#cta"
                  className="font-mono text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                >
                  vaka çalışması iste
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
