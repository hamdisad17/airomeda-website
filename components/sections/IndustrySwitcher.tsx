'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const INDUSTRIES = [
  {
    key: 'finance',
    label: 'Finans',
    tagline:
      'Bankacılık ve finans sektörünün ihtiyaç duyduğu güvenli yazılımları kuruyoruz. 11 yıllık deneyimimizle finans alanının güvenle kullandığı çözümleri size de sunuyoruz.',
    points: [
      'Bankacılık ve ödeme sistemleri geliştirme',
      'Güvenli ödeme bağlantıları (Iyzico, Stripe, havale)',
      'Yasal gerekliliklere uyumlu kayıt ve raporlama altyapısı',
      'Müşteri kimlik doğrulama sistemleri',
    ],
    metric: { v: '11 yıl', l: 'finans deneyimi' },
  },
  {
    key: 'gaming',
    label: 'Şans Oyunları',
    tagline:
      'Lisans süreçlerinden canlı yayına kadar tüm oyun platformunu kuruyoruz. Hızlı, güvenilir ve dünyanın her yerinden erişilebilir.',
    points: [
      'Casino ve spor bahisleri platform geliştirme',
      'Lisans gereksinimlerine uygun sayı üretim sistemi',
      'Çok para birimli ödeme kasiyeri',
      'Bonus ve oyuncu sadakat sistemleri',
    ],
    metric: { v: '12+', l: 'ülkede aktif platform' },
  },
  {
    key: 'commerce',
    label: 'E-Ticaret',
    tagline:
      'Hızlı yüklenen, kolay yönetilen ve satışlarınızı artıran e-ticaret çözümleri tasarlıyoruz. Mevcut sisteminizi yükseltmek veya sıfırdan kurmak için hazırız.',
    points: [
      'Özel e-ticaret ve pazar yeri geliştirme',
      'Stok ve depo yönetim sistemi bağlantısı',
      'Çoklu ödeme yöntemi ve kargo entegrasyonu',
      'Mobil uygulama ve hızlı web mağazası',
    ],
    metric: { v: '+34%', l: 'müşteri dönüşüm artışı' },
  },
  {
    key: 'integration',
    label: 'Entegrasyon',
    tagline:
      'Sistemleriniz birbiriyle sorunsuz çalışsın. Kargodan stok yönetimine, ödemeden e-faturaya — her şeyi tek noktadan yönetin.',
    points: [
      'Stok yönetim sistemi bağlantısı (Logo, Netsis, NetSuite)',
      'Kargo firmaları ile otomatik takip ve bildirim',
      'E-fatura ve e-irsaliye otomasyonu',
      'Farklı sistemler arası veri aktarımı ve senkronizasyon',
    ],
    metric: { v: '10+', l: 'sistem bağlantısı' },
  },
  {
    key: 'seo-reklam',
    label: 'SEO & Reklam',
    tagline:
      'Google ve sosyal medyada görünürlüğünüzü artırın. Daha fazla müşteri, daha çok satış — ölçülebilir sonuçlarla.',
    points: [
      'Google arama sonuçlarında üst sıralarda yer alma',
      'Google Ads ve Meta Ads reklam kampanyaları',
      'Hedef kitle analizi ve dönüşüm optimizasyonu',
      'Aylık detaylı performans raporları',
    ],
    metric: { v: '+%180', l: 'ortalama trafik artışı' },
  },
  {
    key: 'sosyal-medya',
    label: 'Sosyal Medya',
    tagline:
      'Markanızın sosyal medyada güçlü, tutarlı ve etkileşim alan bir sesi olsun. İçerikten topluluk yönetimine kadar her şey bizde.',
    points: [
      'Instagram, TikTok, X, LinkedIn içerik yönetimi',
      'Marka kimliğine uygun görsel ve metin üretimi',
      'Topluluk yönetimi ve mesaj yanıtlama',
      'Aylık içerik takvimi ve etkileşim raporları',
    ],
    metric: { v: '5+', l: 'platformda yönetim' },
  },
  {
    key: 'crm',
    label: 'Müşteri Yönetimi',
    tagline:
      'Müşterilerinizi tanıyın, onları hatırlayan bir sistem kurun. Her etkileşim verisi ile satışlarınızı büyütün.',
    points: [
      'Müşteri kayıt ve segmentasyon sistemleri',
      'Otomatik kampanya ve bildirim yönetimi',
      'Müşteri sadakat programları (puan, kupon, indirim)',
      'Satış sonrası takip ve memnuniyet anketleri',
    ],
    metric: { v: '+%65', l: 'tekrar satın alma oranı' },
  },
  {
    key: 'kurumsal-web',
    label: 'Kurumsal Web',
    tagline:
      'İşletmenizi internette güçlü temsil eden, modern ve mobil uyumlu kurumsal web siteleri.',
    points: [
      'Özel tasarım, kurumsal kimliğe uygun',
      'Mobil + tablet + masaüstü uyumlu',
      'Kolay içerik yönetim paneli',
      'Çok dilli yapı (TR, EN ve daha fazlası)',
      'SEO uyumlu hızlı altyapı',
    ],
    metric: { v: '15-30', l: 'gün içinde teslim' },
  },
];

export function IndustrySwitcher() {
  const [active, setActive] = React.useState(0);
  const item = INDUSTRIES[active] ?? INDUSTRIES[0]!;

  return (
    <section id="industry-switcher" className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Sektörler</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Hangi alanda{' '}
            <br className="md:hidden" />çalışıyorsun?
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Her sektörün kendine özgü ihtiyaçları var. 11 yıllık deneyimimizle hangi alanda olursanız olun, işinizi kolaylaştıran çözümler tasarlıyoruz.
          </p>
        </RevealSection>

        {/* Mobile: horizontal scroll tabs */}
        <div className="mt-8 lg:hidden overflow-x-auto -mx-5 px-5 pb-1">
          <ul role="tablist" className="flex gap-2 w-max">
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.key}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={`whitespace-nowrap px-4 py-2 text-sm font-semibold border transition-colors ${
                    i === active
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-border text-muted-foreground bg-elevated'
                  }`}
                >
                  {ind.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 lg:mt-14 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-[1fr_1.5fr]">
          {/* Tab rail — desktop only */}
          <div className="hidden lg:block bg-background">
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
                        className={`text-[11px] tabular-nums ${
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
                  'radial-gradient(circle, rgb(20 184 166 / 0.4), transparent 60%)',
              }}
            />
            <div className="relative">
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{item.label}</p>
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
                  <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                    Öne çıkan
                  </p>
                  <p className="mt-1.5 text-2xl font-semibold tabular-nums text-accent">
                    {item.metric.v}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {item.metric.l}
                  </p>
                </div>
                <a
                  href="#cta"
                  className="text-xs uppercase tracking-wider text-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
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
