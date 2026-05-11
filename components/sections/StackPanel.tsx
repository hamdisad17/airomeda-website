'use client';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STACK = [
  {
    category: 'Web Çözümleri',
    items: [
      'Kurumsal web sitesi',
      'E-ticaret mağazası',
      'Yönetim paneli',
      'Müşteri portalı',
      'Online sipariş sayfası',
    ],
  },
  {
    category: 'Mobil Uygulamalar',
    items: [
      'iOS uygulaması',
      'Android uygulaması',
      'Tablet versiyonu',
      'Saha kullanım uygulaması',
      'Müşteri uygulaması',
    ],
  },
  {
    category: 'Otomasyon',
    items: [
      'Stok takibi',
      'Sipariş yönetimi',
      'CRM sistemi',
      'E-fatura entegrasyonu',
      'Raporlama & bildirimler',
    ],
  },
  {
    category: 'Pazarlama',
    items: [
      'SEO optimizasyonu',
      'Google Ads yönetimi',
      'Sosyal medya içerikleri',
      'Analiz raporları',
      'Sadakat programı',
    ],
  },
];

export function StackPanel() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">Çözümlerimiz</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Çalışma Alanlarımız.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            İşletmenizin ihtiyacı olan her çözümü tek elden alın. 11 yıllık tecrübemizle, web&apos;den mobil uygulamaya, otomasyondan pazarlamaya kadar yanınızdayız.
          </p>
        </RevealSection>
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STACK.map((g) => (
            <div key={g.category} className="bg-background p-6">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">
                {g.category}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1 w-1 rounded-full bg-accent flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
