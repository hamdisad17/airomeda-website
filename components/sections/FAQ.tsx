'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const ITEMS = [
  {
    q: 'Tipik bir projenin teslim süresi nedir?',
    a: 'Kapsamına göre 8 ile 16 hafta arasında değişiyor. İlk 4 hafta keşif + ilk demo edilebilir parça; sonraki 4-12 hafta üretime hazır teslim.',
  },
  {
    q: 'BDDK / TCMB uyumlu yazılım üretiyor musunuz?',
    a: 'Evet. Finans projelerinde regülasyon haritalandırması ile başlıyoruz. Audit-ready mimari, denetlenebilir event log, geri alınabilir kararlar.',
  },
  {
    q: 'Mevcut sistemimize entegre olur musunuz?',
    a: 'Evet. ISO 8583, ISO 20022, REST, GraphQL, mesajlaşma tabanlı entegrasyonları yapıyoruz. Legacy + modern coexistence senaryoları konusunda deneyimliyiz.',
  },
  {
    q: 'Proje sonrasında devamlılık nasıl olacak?',
    a: 'İki seçenek: 1) Devir teslim — kapsamlı dokümantasyon + ekip eğitimi ile kendi ekibinize teslim. 2) Bakım sözleşmesi — bizimle devam.',
  },
  {
    q: 'Fiyatlandırma nasıl çalışıyor?',
    a: 'Sabit fiyat veya time-and-material. İlk görüşmede kapsamı netleştirip her iki seçeneği de sunuyoruz.',
  },
  {
    q: 'NDA ve veri güvenliği nasıl?',
    a: 'İlk görüşmeden önce iki yönlü NDA imzalanır. Geliştirme, KVKK + GDPR uyumlu. Production veriniz bizim makinemize hiçbir zaman inmez.',
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
