'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';

interface Package {
  name: string;
  desc: string;
  price?: string;          // e.g., "$10,000", "₺7.500/ay", "₺45.000", "Özel teklif"
  priceNote?: string;      // e.g., "tek seferlik", "aylık", "proje başı"
  annualPrice?: string;    // e.g., "₺76.500/yıl" (12 × monthly × 0.85)
  annualSavings?: string;  // e.g., "%15 tasarruf"
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
      desc: 'Yeni başlayan ve aylık reklam bütçesi ₺5.000 altındaki işletmeler için.',
      price: '₺3.500',
      priceNote: 'Aylık · 3 ay min. taahhüt',
      annualPrice: '₺35.700/yıl',
      annualSavings: '%15 tasarruf',
      features: [
        '10 anahtar kelime takibi',
        'Teknik SEO denetimi (ilk ay)',
        '1 reklam platformu (Google Ads veya Meta)',
        '500 USD\'a kadar reklam yönetimi',
        'Ayda 2 blog yazısı (800+ kelime)',
        'Aylık Looker Studio raporu',
        'E-posta destek (24 saat içinde yanıt)',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Aylık ₺5.000–25.000 reklam bütçesi olan büyüyen markalar için.',
      price: '₺7.500',
      priceNote: 'Aylık · 6 ay min. taahhüt',
      annualPrice: '₺76.500/yıl',
      annualSavings: '%15 tasarruf',
      features: [
        '30 anahtar kelime takibi + rekabet analizi',
        'Sürekli teknik SEO bakımı',
        'Google Ads + Meta Ads + LinkedIn Ads',
        '2.500 USD\'a kadar reklam yönetimi',
        'Ayda 8 blog yazısı veya 4 uzun içerik',
        'GA4 + GTM + dönüşüm izleme kurulumu',
        'Haftalık Looker Studio raporu',
        'Ayda 1 saat strateji toplantısı',
        'WhatsApp destek (saatlik yanıt)',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Aylık ₺25.000+ reklam bütçesi olan markalar için özel ekip.',
      price: 'Özel teklif',
      priceNote: 'Reklam bütçesinin %12–15\'i',
      features: [
        'Sınırsız anahtar kelime takibi',
        'Tüm platformlar (Google, Meta, LinkedIn, TikTok, X)',
        'Çoklu dil + çoklu pazar yönetimi',
        'Veri bilimi destekli atıf modelleme',
        'Adanmış SEO + reklam ekibi (3–5 kişi)',
        'Ayda 4 saat strateji toplantısı',
        'Aylık in-depth performans sunumu',
        'Slack üzerinden ayrı kanal',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  'sosyal-medya': [
    {
      name: 'Başlangıç',
      desc: 'Yeni başlayan markalar için temel sosyal medya yönetimi.',
      price: '₺4.000',
      priceNote: 'Aylık · 3 ay min. taahhüt',
      annualPrice: '₺40.800/yıl',
      annualSavings: '%15 tasarruf',
      features: [
        '2 platform (Instagram + LinkedIn veya benzeri)',
        'Ayda 12 post (statik görsel)',
        'Ayda 4 story',
        'Yorum + DM yanıtı (mesai saatleri)',
        'Aylık içerik takvimi',
        'Aylık performans raporu',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Aktif topluluk büyüten markalar için tam kapsamlı yönetim.',
      price: '₺9.000',
      priceNote: 'Aylık · 6 ay min. taahhüt',
      annualPrice: '₺91.800/yıl',
      annualSavings: '%15 tasarruf',
      features: [
        '4 platform (Instagram, LinkedIn, TikTok, X)',
        'Ayda 24 post + 12 reels/short',
        'Günlük 5 story + interaktif öğeler',
        '7/24 yorum + DM yanıtlama',
        'Ayda 1.000 USD\'a kadar reklam yönetimi',
        'Aylık 2 trend bazlı içerik briefingi',
        'Haftalık performans raporu',
        'Ayda 1 strateji toplantısı',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük markalar için adanmış sosyal medya ekibi.',
      price: 'Özel teklif',
      priceNote: 'Kapsam + ekip büyüklüğüne göre',
      features: [
        'Sınırsız platform + influencer ağı',
        'Adanmış creative ekip (designer + video editor)',
        'Aylık çekim günü (foto + video)',
        'Influencer kampanya yönetimi',
        'Kriz iletişim protokolü',
        'Aylık in-depth marka raporu',
        'Slack üzerinden ayrı kanal',
        'Üç ayda bir kreatif workshop',
      ],
      cta: 'Konuşalım',
      highlight: false,
    },
  ],
  crm: [
    {
      name: 'Başlangıç',
      desc: 'Küçük ekipler (3–10 satış temsilcisi) için hazır CRM kurulumu.',
      price: '₺12.000',
      priceNote: 'Tek seferlik kurulum',
      features: [
        'HubSpot Starter veya Pipedrive seçimi',
        '10 kullanıcıya kadar lisans yönetimi',
        'E-posta + form entegrasyonu',
        '5 otomasyon kuralı',
        '2 saat ekip eğitimi',
        '30 gün canlı destek',
      ],
      cta: 'Başla',
      highlight: false,
    },
    {
      name: 'Profesyonel',
      desc: 'Orta ölçekli satış ekipleri (10–50 kişi) için özelleştirme.',
      price: '₺38.000',
      priceNote: 'Tek seferlik · ₺4.500/ay bakım',
      features: [
        'HubSpot Professional veya Salesforce kurulumu',
        '50 kullanıcıya kadar özelleştirme',
        'ERP + e-ticaret + WhatsApp entegrasyonu',
        '20 otomasyon kuralı + lead skoring',
        'Özel pano (3 pano)',
        '8 saat ekip eğitimi',
        'Aylık optimizasyon görüşmesi',
      ],
      cta: 'En çok tercih edilen',
      highlight: true,
    },
    {
      name: 'Kurumsal',
      desc: 'Büyük kurumlar için sıfırdan özel CRM veya derin Salesforce.',
      price: 'Özel teklif',
      priceNote: 'Kullanıcı başı + geliştirme',
      features: [
        'Sıfırdan özel CRM veya derin Salesforce',
        'Sınırsız kullanıcı',
        'AI destekli satış tahmini',
        'Çoklu pazar + çoklu dil',
        'KVKK + ISO 27001 uyumu',
        'Adanmış mimar + 2 geliştirici',
        'Yıllık SLA: 99.9% uptime',
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
