'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';

interface Package {
  name: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const PACKAGES_BY_SLUG: Record<string, Package[]> = {
  finans: [
    {
      name: 'Başlangıç',
      desc: 'Küçük ve orta ölçekli firmalar için temel finans çözümleri',
      features: ['Temel ödeme entegrasyonu', 'Standart raporlama', 'E-posta desteği', 'Belgeleme dahil'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen işletmeler için tam kapsamlı finans paketi',
      features: ['Tüm ödeme yöntemleri', 'Özelleştirilmiş raporlar', 'Banka entegrasyonları', '7/24 destek', 'Hızlı teslim'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Ziraat Bankası gibi büyük kurumlara özel çözümler',
      features: ['Özel mimari tasarım', 'Sınırsız işlem', 'Dedicated ekip', 'Garantili SLA', 'Özel danışman'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'sans-oyunlari': [
    {
      name: 'Başlangıç',
      desc: 'Temel iGaming platformu kurulumu',
      features: ['Casino platform temeli', 'Temel RNG entegrasyonu', 'Tek ödeme yöntemi', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Tam kapsamlı lisanslı iGaming çözümü',
      features: ['Casino + spor bahisleri', 'Sertifikalı RNG motoru', 'Çoklu ödeme yöntemi', 'Bonus sistemi', '7/24 destek'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Çok bölgeli büyük ölçekli platform',
      features: ['Çok bölge desteği (12+ ülke)', 'Özel lisans danışmanlığı', 'Oyuncu yönetim sistemi', 'Dedicated ekip', 'Özel SLA'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'e-ticaret': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için hızlı e-mağaza',
      features: ['Temel e-ticaret altyapısı', 'Tek ödeme entegrasyonu', 'Standart tema', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için tam kapsamlı çözüm',
      features: ['Özel tasarım', 'Çoklu ödeme yöntemi', 'Kargo entegrasyonu', 'ERP bağlantısı', '7/24 destek'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük ölçekli pazar yeri ve mağazalar',
      features: ['Pazar yeri mimarisi', 'Sınırsız ürün', 'Özel raporlama', 'Dedicated ekip', 'Çok dil/para birimi'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  entegrasyon: [
    {
      name: 'Başlangıç',
      desc: 'Temel sistem entegrasyonları',
      features: ['2 sistem entegrasyonu', 'Standart API bağlantısı', 'Belgeleme', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Orta ölçekli işletmeler için kapsamlı entegrasyon',
      features: ['5+ sistem entegrasyonu', 'ERP + kargo entegrasyonu', 'E-fatura otomasyonu', '7/24 destek', 'İzleme paneli'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için tam entegrasyon çözümü',
      features: ['Sınırsız sistem entegrasyonu', 'Özel otomasyon geliştirme', 'Dedicated ekip', 'Garantili SLA', 'Özel danışman'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'seo-reklam': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için temel SEO ve reklam',
      features: ['Anahtar kelime analizi', 'Temel SEO optimizasyonu', 'Aylık rapor', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için kapsamlı dijital pazarlama',
      features: ['SEO + Google Ads', 'İçerik stratejisi', 'Performans analitiği', 'Haftalık raporlama', '7/24 destek'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük ölçekli pazarlama ve veri analitiği',
      features: ['Veri bilimi destekli analitik', 'Çoklu kanal yönetimi', 'AI destekli optimizasyon', 'Dedicated ekip', 'Özel hedef belirleme'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'sosyal-medya': [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için sosyal medya yönetimi',
      features: ['2 platform yönetimi', 'Haftada 3 içerik', 'Aylık rapor', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen markalar için kapsamlı sosyal medya',
      features: ['4 platform yönetimi', 'Günlük içerik', 'Reklam yönetimi', 'Haftalık raporlama', '7/24 destek'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için tam sosyal medya çözümü',
      features: ['Sınırsız platform', 'Influencer yönetimi', 'Kriz iletişimi', 'Dedicated ekip', 'Özel strateji'],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  crm: [
    {
      name: 'Başlangıç',
      desc: 'Küçük işletmeler için temel CRM çözümü',
      features: ['Temel CRM kurulumu', 'Müşteri takibi', 'E-posta entegrasyonu', 'E-posta desteği'],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Büyüyen satış ekipleri için tam kapsamlı CRM',
      features: ['Özelleştirilmiş CRM', 'Satış süreç otomasyonu', 'Entegre raporlama', 'Ekip eğitimi', '7/24 destek'],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için özel CRM platformu',
      features: ['Özel CRM geliştirme', 'ERP entegrasyonu', 'AI destekli analitik', 'Dedicated ekip', 'Özel danışman'],
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
    features: ['Özel tasarım', 'Sınırsız kapasite', 'Dedicated ekip', 'Garantili SLA', 'Özel danışman'],
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
          <p className="font-mono text-eyebrow uppercase text-accent">{'// paketler'}</p>
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
                  ? 'border-accent bg-accent/5 shadow-[0_0_40px_-10px_hsl(189_100%_50%_/_0.2)]'
                  : 'border-border bg-elevated'
              }`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                  En popüler
                </span>
              )}
              <p className={`font-mono text-eyebrow uppercase ${pkg.highlight ? 'text-accent' : 'text-muted-foreground'}`}>
                {pkg.name}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{pkg.desc}</p>
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
                    ? 'bg-accent text-accent-foreground hover:shadow-[0_0_30px_-5px_hsl(189_100%_50%_/_0.5)]'
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
