import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { FinanceDashboard } from '@/components/mockups/FinanceDashboard';
import { GamingControlPanel } from '@/components/mockups/GamingControlPanel';

type Variant = 'finance' | 'gaming';

const COPY: Record<Variant, { eyebrow: string; title: string; body: string; bullets: string[] }> = {
  finance: {
    eyebrow: 'Finans',
    title: 'Düzenlenmiş alanlar için, denetlenebilir altyapı.',
    body: 'BDDK ve TCMB uyumlu mimari. ISO 8583, ISO 20022, swift ve fast hatları. Olay-bazlı reconciliation, audit-ready event store.',
    bullets: [
      'Core banking modülleri (account, transaction, settlement)',
      'PSP, kart kuruluşları ve düzenleyici entegrasyonları',
      'KYC / AML — onboarding ve risk skorlama',
      'Mobil ve web bankacılık istemcileri',
    ],
  },
  gaming: {
    eyebrow: 'iGaming',
    title: 'Lisans-uyumlu oyun altyapısı, üretim hızında.',
    body: 'RNG sertifikalandırma, çoklu sağlayıcı entegrasyonu, real-time risk ve cashier altyapısı. Düzenleyici raporları otomatik.',
    bullets: [
      'Lisanslı operatör platformu — multi-tenant',
      'RNG ve oyun motoru entegrasyonları',
      'Ödeme kasiyeri — multi-currency, fraud rules',
      'Risk yönetimi & KYC pipeline',
    ],
  },
};

export function ProductShowcase({ variant, reverse = false }: { variant: Variant; reverse?: boolean }) {
  const c = COPY[variant];
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <Reveal>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">{c.eyebrow}</p>
              <h2 className="mt-3 text-display-2 font-semibold tracking-tight">{c.title}</h2>
              <p className="mt-6 text-body-lg text-muted-foreground">{c.body}</p>
              <ul className="mt-8 space-y-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-foreground">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden></span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            {variant === 'finance' ? <FinanceDashboard /> : <GamingControlPanel />}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
