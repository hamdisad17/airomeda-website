import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { InteractiveTimeline } from '@/components/visuals/InteractiveTimeline';

const TIMELINE_EVENTS = [
  {
    year: '2018',
    title: 'Kuruluş',
    body: 'İstanbul, iki kurucu, bir finans müşterisi. Bankacılık altyapısını sıfırdan yazmak için masaya oturuldu.',
    metric: 'x2',
  },
  {
    year: '2019',
    title: 'İlk fintech lansmanı',
    body: 'İlk ödeme entegrasyon projesi canlıya alındı. Yıllık işlem hacmi 50M TL\'yi geçti.',
    metric: '50M₺',
  },
  {
    year: '2020',
    title: 'iGaming lisansı',
    body: 'Lisanslı casino ve sportsbook platformu teslim edildi. eCOGRA sertifikasyonu alındı.',
    metric: '3 ülke',
  },
  {
    year: '2021',
    title: 'E-ticaret çözümleri',
    body: 'Modern e-ticaret çözümleri portföye eklendi. İlk kurumsal entegrasyon ürünü hayata geçirildi.',
    metric: '12 proje',
  },
  {
    year: '2022',
    title: 'Ekip büyümesi',
    body: 'Ekip 10\'dan 20+ mühendise büyüdü. Kalite mühendisliği ve güvenlik ekipleri kuruldu.',
    metric: '24 kişi',
  },
  {
    year: '2023',
    title: 'Multi-region',
    body: 'İlk çok bölgeli yayın — 3 kıta, 8 merkez. Hız garantileri küresel ölçeğe taşındı.',
    metric: '8 POP',
  },
  {
    year: '2024',
    title: 'Entegrasyon ürünü',
    body: 'ERP/WMS köprüsü ürünü kendi portföyümüze girdi. Self-serve onboarding ile ilk SaaS.',
    metric: '100+ müşteri',
  },
  {
    year: '2025',
    title: 'Ölçek',
    body: '47+ aktif sistem, 12 bölge, 24 mühendis. Küresel genişleme yolunda.',
    metric: '47 sistem',
  },
];

export function InteractiveTimelineSection() {
  return (
    <RevealSection as="section" className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-4">Kilometre Taşları</p>
        <h2
          className="font-semibold tracking-tight text-foreground mb-10"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
        >
          Nereden nereye.
        </h2>
        <InteractiveTimeline events={TIMELINE_EVENTS} />
      </Container>
    </RevealSection>
  );
}
