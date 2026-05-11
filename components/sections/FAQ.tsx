'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const ITEMS = [
  {
    q: 'Tipik bir projenin teslim süresi nedir?',
    a: 'Kapsama göre 6 ile 14 hafta arasında değişiyor. İlk 2–3 hafta discovery + mimari tasarım; sonraki sprintlerde demo edilebilir parçalar; son faz devir teslim ve stabilizasyon.',
  },
  {
    q: 'BDDK / MASAK uyumlu yazılım üretiyor musunuz?',
    a: 'Evet. Her finans projesinde regülasyon haritalandırması ile başlıyoruz: BDDK yönetmelikleri, MASAK bildirimleri, değişmez event log. Denetimde geri dönülebilir kararlar.',
  },
  {
    q: 'Mevcut sistemimize entegre olur musunuz?',
    a: 'Evet. ISO 8583, ISO 20022, REST, GraphQL, Kafka/RabbitMQ tabanlı entegrasyonlar. Legacy coexistence (strangler-fig) stratejisi konusunda üretim deneyimimiz var.',
  },
  {
    q: 'Proje sonrasında devamlılık nasıl olacak?',
    a: 'İki seçenek: 1) Devir teslim — belgelenmiş mimari, ekip eğitimi, runbook ve kod ile kendi ekibinize teslim. 2) Retainer — bizimle devam, %99.95 SLA.',
  },
  {
    q: 'Fiyatlandırma nasıl çalışıyor?',
    a: 'Sprint (4–6 hafta, sabit kapsam), Project (6–14 hafta, milestone tabanlı) veya Long-term retainer. İlk görüşmede kapsamı netleştirip tüm modelleri sunuyoruz.',
  },
  {
    q: 'NDA ve veri güvenliği nasıl?',
    a: 'Brief gönderdikten sonra ortalama 2 iş günü içinde iki yönlü NDA imzalanır. Geliştirme KVKK + GDPR uyumlu. Production veriniz hiçbir zaman bizim altyapımıza inmez.',
  },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <RevealSection>
              <p className="font-mono text-eyebrow uppercase text-accent">{'// 08 · sıkça sorulanlar'}</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Bilinmek istenenler.
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                İlk görüşmede en sık karşımıza çıkan sorular. Buradakileri okuyun, geri kalanını birlikte konuşalım.
              </p>
            </RevealSection>
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-border">
              {ITEMS.map((item, i) => (
                <li key={item.q} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={open === i}
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent"
                  >
                    <span className="text-base font-medium tracking-tight">{item.q}</span>
                    <span
                      className={`mt-1 inline-block flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45 text-accent' : 'text-muted-foreground'}`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[var(--ease-out-quint)]"
                    style={{ maxHeight: open === i ? '500px' : '0px', opacity: open === i ? 1 : 0 }}
                  >
                    <p className="pb-6 pr-12 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
