import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { CinemaMockup } from '@/components/mockups/CinemaMockup';

type Variant = 'finance' | 'gaming';

const COPY: Record<Variant, { eyebrow: string; title: string; body: string; bullets: string[] }> = {
  finance: {
    eyebrow: 'Finans',
    title: 'Bankacılık ve finans için güvenilir yazılım çözümleri.',
    body: 'Bankacılık ve finans sektörünün ihtiyaç duyduğu güvenli yazılım altyapısını kuruyoruz. Yasal gerekliliklere tam uyumlu, güvenli ve hızlı.',
    bullets: [
      'Bankacılık modülleri (hesap, ödeme, raporlama)',
      'Ödeme sistemi bağlantıları (Iyzico, havale, FAST)',
      'Müşteri kimlik doğrulama ve güvenlik',
      'Mobil ve web bankacılık uygulamaları',
    ],
  },
  gaming: {
    eyebrow: 'Oyun Platformu',
    title: 'Güvenilir ve tam lisanslı oyun platformları.',
    body: 'Şans oyunları sektörünün gerektirdiği tüm özelliklere sahip, hızlı ve güvenilir platformlar. Lisans gereksinimlerini eksiksiz karşılıyor.',
    bullets: [
      'Casino ve spor bahisleri platform geliştirme',
      'Sertifikalı sayı üretim sistemi',
      'Çok para birimli ödeme kasiyeri',
      'Oyuncu yönetimi ve sadakat sistemi',
    ],
  },
};

export function ProductShowcase({ variant, reverse = false }: { variant: Variant; reverse?: boolean }) {
  const c = COPY[variant];
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <Reveal>
            <div>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{c.eyebrow}</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">{c.title}</h2>
              <p className="mt-6 text-body-lg text-muted-foreground">{c.body}</p>
              <ul className="mt-8 space-y-3">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1 text-accent shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CinemaMockup kind={variant} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
