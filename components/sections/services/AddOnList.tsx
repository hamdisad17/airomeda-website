import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';

interface AddOn {
  name: string;
  desc: string;
  price: string;
  priceNote?: string; // e.g., 'Tek seferlik', 'Proje başı', 'Aylık'
}

// Pakete dahil olmayan, isteğe bağlı tek seferlik ya da kampanya bazlı
// ek hizmetler. Üç şeritte üç sektör (SEO / Sosyal / CRM) için ayrı
// listeler — diğer hizmetler için kapatılır (return null).
const ADDONS_BY_SLUG: Record<string, AddOn[]> = {
  'seo-reklam': [
    {
      name: 'Teknik SEO denetimi',
      desc: '30+ sayfa rapor + 60 dakika sunum. Mevcut sitenin tarama, hız, yapısal veri ve içerik mimarisi açısından eksiklerinin haritası.',
      price: '₺15.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Anahtar kelime araştırma paketi',
      desc: '50 kelime + arama amacı (informational/transactional) analizi + içerik küme önerisi.',
      price: '₺5.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Rakip analizi',
      desc: '5 rakip için içerik, backlink, anahtar kelime ve reklam stratejisi karşılaştırması.',
      price: '₺8.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Local SEO + Google İşletme Profili',
      desc: 'GMB optimizasyonu, lokal listeleme dizinleri, harita konumları, yorum stratejisi.',
      price: '₺12.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Backlink temizlik + disavow',
      desc: 'Zararlı bağlantı taraması, disavow dosyası, manuel temizlik. Google penalty riski varsa öncelikli.',
      price: '₺10.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Landing page yazımı (4 sayfa)',
      desc: 'Reklam kampanyaları için dönüşüm odaklı landing page metni + A/B test varyantı.',
      price: '₺18.000',
      priceNote: 'Tek seferlik',
    },
  ],
  'sosyal-medya': [
    {
      name: 'Tek günlük çekim',
      desc: 'Foto + video, profesyonel ekipman, 1 lokasyon, 8 saat — yaklaşık 40 görsel + 8 reels malzemesi.',
      price: '₺18.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: '4 günlük çekim paketi',
      desc: 'Yıllık içerik bankası için 4 farklı gün, çoklu lokasyon, sezonsal varyasyon.',
      price: '₺55.000',
      priceNote: 'Yıllık paket',
    },
    {
      name: 'Marka kimliği rehberi',
      desc: 'Logo varyasyonları, renk paleti, tipografi, fotoğraf stili, ses tonu — 30 sayfa PDF + tasarım dosyaları.',
      price: '₺25.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'Influencer kampanyası (5 yaratıcı)',
      desc: 'Yaratıcı seçimi, briefing, sözleşme, içerik onayı, performans ölçümü. Influencer ücretleri hariç.',
      price: '₺35.000',
      priceNote: 'Kampanya başı',
    },
    {
      name: 'Reels/short paketi (10 video)',
      desc: 'Brief, senaryo, çekim koordinasyonu, montaj, ses + altyazı. Trending formatlara uyumlu.',
      price: '₺15.000',
      priceNote: 'Paket başı',
    },
    {
      name: 'Kriz iletişim playbook\'u',
      desc: 'Şirkete özel kriz senaryoları, hazır yanıt taslakları, onay zinciri, eylem protokolü.',
      price: '₺12.000',
      priceNote: 'Tek seferlik',
    },
  ],
  crm: [
    {
      name: 'Veri taşıma + temizlik',
      desc: 'Mevcut CRM ya da Excel\'den HubSpot/Salesforce/Pipedrive\'a geçiş. Tekrar eden kayıtların birleştirilmesi.',
      price: '₺15.000',
      priceNote: 'Proje başı',
    },
    {
      name: 'Ekip eğitimi (8 saat)',
      desc: 'Satış + servis ekipleri için 4 oturumluk uygulamalı eğitim. Eğitim materyali + 30 günlük destek dahil.',
      price: '₺10.000',
      priceNote: 'Paket başı',
    },
    {
      name: 'Özel pano geliştirme (3 pano)',
      desc: 'Yöneticiye yönelik özel dashboard\'lar: pipeline, satış performansı, müşteri yaşam döngüsü.',
      price: '₺8.000',
      priceNote: 'Tek seferlik',
    },
    {
      name: 'ERP entegrasyonu',
      desc: 'Logo, Mikro, Paraşüt ya da Bizim Hesap gibi yerel ERP sistemleriyle iki yönlü senkronizasyon.',
      price: '₺12.000',
      priceNote: 'Sistem başı',
    },
    {
      name: 'WhatsApp Business API',
      desc: 'CRM içinden WhatsApp gönderimi, sohbet kayıtları, otomasyon. Meta onay süreci dahil.',
      price: '₺18.000',
      priceNote: 'Tek seferlik',
    },
  ],
};

export function AddOnList({ slug }: { slug: string }) {
  const items = ADDONS_BY_SLUG[slug];
  if (!items || items.length === 0) return null;

  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
            Ek hizmetler
          </p>
          <h2
            className="mt-4 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
          >
            Pakete dahil olmayan, tek seferlik ek hizmetler.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Aylık paketinize ek olarak tek seferlik ya da kampanya bazlı ihtiyaçlarınız için
            ayrı modüller. Birden fazla seçince paket geçişi de tartışılabilir.
          </p>
        </RevealSection>

        <div className="mt-12 grid gap-px bg-border border border-border">
          {items.map((addon) => (
            <div
              key={addon.name}
              className="bg-background p-6 md:p-7 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground">
                  {addon.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{addon.desc}</p>
              </div>
              <div className="md:flex-shrink-0 md:text-right md:min-w-[160px]">
                <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                  {addon.price}
                </p>
                {addon.priceNote && (
                  <p className="mt-1 text-xs text-muted-foreground">{addon.priceNote}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-border bg-elevated p-6">
          <div>
            <p className="font-medium text-foreground">Birden fazla ek hizmet ihtiyacınız varsa</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Bunları yıllık aboneliğinize gömüp tek bütçeden yönetebiliriz — toplam %20&apos;ye varan indirim.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 shrink-0"
          >
            Konuşalım <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
