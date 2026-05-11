'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';

interface Package {
  name: string;
  desc: string;
  price?: string;       // e.g., "$10,000", "₺7.500/ay", "₺45.000", "Özel teklif"
  priceNote?: string;   // e.g., "tek seferlik", "aylık", "proje başı"
  features: string[];
  cta: string;
  highlight: boolean;
}

const PACKAGES_BY_SLUG: Record<string, Package[]> = {
  finans: [
    {
      name: 'Başlangıç',
      desc: 'Küçük ve orta ölçekli firmalar için temel ödeme çözümleri.',
      price: '₺25.000',
      priceNote: 'Proje başı',
      features: [
        'Temel ödeme entegrasyonu',
        'Standart raporlama',
        'Mobil ödeme desteği',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen işletmeler için tam kapsamlı finans paketi.',
      price: '₺85.000',
      priceNote: 'Proje başı',
      features: [
        'Tüm ödeme yöntemleri',
        'Banka entegrasyonları',
        'Özelleştirilmiş raporlar',
        '7/24 destek',
        'Hızlı teslim',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için özel finans yazılım çözümleri.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Özel mimari tasarım',
        'Bankacılık entegrasyonları',
        'Dedicated ekip',
        'Kalite güvencesi',
        'Özel danışman',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'sans-oyunlari': [
    {
      name: 'Sadece Bet',
      desc: 'Spor bahisleri platformu kurulumu. Maç oranlarından canlı bahse, lisans-uyumlu tam yapı.',
      price: '$10.000',
      priceNote: 'Tek seferlik kurulum',
      features: [
        'Spor bahisleri platformu',
        'Canlı bahis ve maç önizleme',
        'Çoklu lig ve spor branşı',
        'Lisans gereksinimlerine uygun yapı',
        'Mobil + masaüstü uyumlu',
        'Ödeme entegrasyonu (havale, kart)',
        '3 ay teknik destek',
      ],
      cta: 'Bilgi al',
      highlight: false,
    },
    {
      name: 'Sadece Casino',
      desc: 'Casino platformu kurulumu. Slot, masa oyunları, canlı casino — tam paket.',
      price: '$10.000',
      priceNote: 'Tek seferlik kurulum',
      features: [
        'Casino oyun motoru',
        'Slot, masa, canlı casino entegrasyonu',
        'Sertifikalı sayı üretim sistemi',
        'Oyuncu hesap yönetimi',
        'Bonus ve kampanya yönetimi',
        'Ödeme entegrasyonu',
        '3 ay teknik destek',
      ],
      cta: 'Bilgi al',
      highlight: false,
    },
    {
      name: 'Bet + Casino',
      desc: 'Hem spor bahisleri hem casino — tek platformda birleşik oyuncu deneyimi.',
      price: '$20.000',
      priceNote: 'Tek seferlik kurulum',
      features: [
        'Bet + Casino tek platform',
        'Birleşik oyuncu hesabı',
        'Tek kasiyer çoklu ürün',
        'Çapraz bonus ve sadakat',
        'Birleşik raporlama paneli',
        'Çoklu ödeme yöntemi',
        'Çok dilli destek',
        '6 ay teknik destek dahil',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
  ],
  'e-ticaret': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için hızlı e-mağaza kurulumu.',
      price: '₺18.000',
      priceNote: 'Proje başı',
      features: [
        'Temel e-ticaret altyapısı',
        'Tek ödeme entegrasyonu',
        'Standart tema',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için özelleştirilmiş e-ticaret platformu.',
      price: '₺55.000',
      priceNote: 'Proje başı',
      features: [
        'Özel tasarım',
        'Çoklu ödeme yöntemi',
        'Kargo entegrasyonu',
        'ERP bağlantısı',
        '7/24 destek',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük ölçekli pazaryeri ve mağaza zinciri çözümleri.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Pazar yeri mimarisi',
        'Sınırsız ürün',
        'Özel raporlama',
        'Dedicated ekip',
        'Çok dil/para birimi',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  entegrasyon: [
    {
      name: 'Başlangıç',
      desc: 'Temel sistem entegrasyonları.',
      price: '₺8.000',
      priceNote: 'Sistem başı',
      features: [
        '2 sistem entegrasyonu',
        'Standart API bağlantısı',
        'Belgeleme',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Orta ölçekli işletmeler için kapsamlı entegrasyon.',
      price: '₺25.000',
      priceNote: 'Proje başı',
      features: [
        '5+ sistem entegrasyonu',
        'ERP + kargo entegrasyonu',
        'E-fatura otomasyonu',
        '7/24 destek',
        'İzleme paneli',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için tam entegrasyon çözümü.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Sınırsız sistem entegrasyonu',
        'Özel otomasyon geliştirme',
        'Dedicated ekip',
        'Kalite güvencesi',
        'Özel danışman',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'seo-reklam': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için temel SEO ve reklam yönetimi.',
      price: '₺3.500',
      priceNote: 'Aylık',
      features: [
        'Temel SEO optimizasyonu',
        'Anahtar kelime analizi',
        'Tek platformda Google Ads',
        'Aylık performans raporu',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için kapsamlı dijital pazarlama.',
      price: '₺7.500',
      priceNote: 'Aylık',
      features: [
        'Gelişmiş SEO + içerik stratejisi',
        'Google Ads + Meta Ads yönetimi',
        'Aylık 8 blog/içerik üretimi',
        'Haftalık raporlama',
        '7/24 destek',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük markalar için özel dijital pazarlama ekibi.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Stratejik danışmanlık',
        'Çoklu kanal kampanya yönetimi',
        'Veri bilimi destekli optimizasyon',
        'Dedicated pazarlama ekibi',
        'Aylık strateji toplantısı',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'sosyal-medya': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için temel sosyal medya yönetimi.',
      price: '₺4.000',
      priceNote: 'Aylık',
      features: [
        '2 platform yönetimi',
        'Haftada 3 içerik',
        'Mesaj yanıtlama',
        'Aylık rapor',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için aktif sosyal medya yönetimi.',
      price: '₺9.000',
      priceNote: 'Aylık',
      features: [
        '4 platform yönetimi',
        'Günlük içerik (ayda 20+ post)',
        'Reklam yönetimi',
        'Topluluk yönetimi',
        'Haftalık raporlama',
        '7/24 destek',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük markalar için tam kapsamlı marka yönetimi.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Sınırsız platform',
        'Influencer yönetimi',
        'Kriz iletişimi',
        'Dedicated ekip',
        'Aylık strateji toplantısı',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  crm: [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için temel CRM çözümü.',
      price: '₺12.000',
      priceNote: 'Proje başı',
      features: [
        'Temel CRM kurulumu',
        'Müşteri takibi',
        'E-posta entegrasyonu',
        'E-posta desteği',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen satış ekipleri için tam kapsamlı CRM.',
      price: '₺38.000',
      priceNote: 'Proje başı',
      features: [
        'Özelleştirilmiş CRM',
        'Satış süreç otomasyonu',
        'Entegre raporlama',
        'Ekip eğitimi',
        '7/24 destek',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için özel CRM platformu.',
      price: 'Özel teklif',
      priceNote: 'Projeye göre',
      features: [
        'Özel CRM geliştirme',
        'ERP entegrasyonu',
        'AI destekli analitik',
        'Dedicated ekip',
        'Özel danışman',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'kurumsal-web': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için modern, mobil uyumlu kurumsal web sitesi.',
      price: '₺15.000',
      priceNote: 'Tek seferlik',
      features: [
        '5 sayfaya kadar',
        'Mobil + masaüstü uyumlu',
        'İletişim formu',
        'Temel SEO',
        'SSL sertifikası dahil',
        '6 ay hosting + bakım',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Orta ölçekli firmalar için özel tasarım + içerik yönetim sistemi.',
      price: '₺45.000',
      priceNote: 'Tek seferlik',
      features: [
        '15 sayfaya kadar',
        'Özel tasarım (kurumsal kimlik)',
        'İçerik yönetim paneli',
        'Blog ve haberler bölümü',
        'Çok dilli yapı',
        'SEO optimizasyonu',
        'Google Analytics entegrasyonu',
        '1 yıl hosting + bakım',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için özel özellikli, çok dilli ve entegrasyonlu kurumsal portal.',
      price: '₺120.000+',
      priceNote: 'Proje kapsamına göre',
      features: [
        'Sınırsız sayfa',
        'Özel özellikler (e-katalog, üye girişi, vb.)',
        'CRM/ERP entegrasyonu',
        'Çok dilli (TR/EN/AR/RU vb.)',
        'Gelişmiş güvenlik',
        'Performans optimizasyonu',
        'Aylık bakım + güncelleme',
        '24/7 destek',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
};

const DEFAULT_PACKAGES: Package[] = [
  {
    name: 'Başlangıç',
    desc: 'Küçük ve orta ölçekli firmalar için temel çözümler',
    features: ['Temel özellikler', 'Belgeleme dahil', 'E-posta desteği', 'Hızlı kurulum'],
    cta: 'Başla',
    highlight: false,
  },
  {
    name: 'Profesyonel',
    desc: 'Büyüyen işletmeler için tam kapsamlı paket',
    features: ['Tüm özellikler', 'Özelleştirilmiş çözüm', '7/24 destek', 'Ekip eğitimi', 'Hızlı teslim'],
    cta: 'En çok tercih edilen',
    highlight: true,
  },
  {
    name: 'Kurumsal',
    desc: 'Büyük kurumlar için özel çözümler',
    features: ['Özel tasarım', 'Sınırsız kapasite', 'Dedicated ekip', 'Kalite güvencesi', 'Özel danışman'],
    cta: 'Konuşalım',
    highlight: false,
  },
];

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
              <p className={`text-eyebrow uppercase tracking-wider font-medium ${pkg.highlight ? 'text-accent' : 'text-muted-foreground'}`}>
                {pkg.name}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.desc}</p>
              {pkg.price && (
                <div className="mt-3 pb-4 border-b border-border">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">{pkg.price}</p>
                  {pkg.priceNote && (
                    <p className="mt-1 text-xs text-muted-foreground">{pkg.priceNote}</p>
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
