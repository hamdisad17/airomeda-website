'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const INDUSTRIES = [
  {
    key: 'finance',
    label: 'Finans',
    tagline: 'Bankacılık ve finans sektörünün gerektirdiği tüm güvenlik ve uyumluluk standartlarını karşılayan yazılım altyapısını kuruyoruz. 11 yıllık deneyimimizle finans alanının güven duyduğu çözümleri size de sunuyoruz.',
    points: [
      'Bankacılık ve ödeme sistemleri geliştirme',
      'Güvenli ödeme entegrasyonları (Iyzico, Stripe, havale)',
      'Denetim ve regülasyona uyumlu kayıt altyapısı',
      'KYC ve müşteri doğrulama sistemleri',
    ],
    metric: { v: '11 yıl', l: 'finans deneyimi' },
  },
  {
    key: 'gaming',
    label: 'iGaming',
    tagline: 'Lisans süreçlerinden canlı yayına kadar tüm şans oyunları altyapısını kuruyoruz. Hızlı, güvenilir ve dünyanın her yerinden erişilebilir.',
    points: [
      'Casino ve spor bahisleri platform geliştirme',
      'Lisans gereksinimlerine uygun RNG motoru',
      'Çok para birimli ödeme kasiyeri',
      'Bonus ve oyuncu sadakat sistemleri',
    ],
    metric: { v: '12+', l: 'ülkede aktif platform' },
  },
  {
    key: 'commerce',
    label: 'E-Ticaret',
    tagline: 'Hızlı yüklenen, kolay yönetilen ve satışlarınızı artıran e-ticaret çözümleri tasarlıyoruz. Mevcut sisteminizi yükseltmek veya sıfırdan kurmak için hazırız.',
    points: [
      'Özel e-ticaret ve pazar yeri geliştirme',
      'ERP ve depo yönetim sistemi entegrasyonu',
      'Çoklu ödeme yöntemi ve kargo entegrasyonu',
      'Mobil uygulama ve hızlı web mağazası',
    ],
    metric: { v: '+34%', l: 'müşteri dönüşüm artışı' },
  },
  {
    key: 'integration',
    label: 'Entegrasyon',
    tagline: 'Sistemleriniz birbiriyle sorunsuz konuşsun. Kargodan ERP\'ye, ödemeden e-faturaya — her şeyi tek noktadan yönetin.',
    points: [
      'ERP sistemleri entegrasyonu (Logo, Netsis, NetSuite)',
      'Kargo firmaları ile otomatik takip ve bildirim',
      'E-fatura ve e-irsaliye otomasyonu',
      'Farklı sistemler arası veri akışı ve senkronizasyon',
    ],
    metric: { v: '10+', l: 'sistem entegrasyonu' },
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
            Her sektörün kendine özgü ihtiyaçları var. 11 yıllık deneyimimizle hangi alanda olursanız olun, işinizi kolaylaştıran çözümler tasarlıyoruz.
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
                  bizimle konuşun
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
