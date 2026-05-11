'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const ITEMS = [
  {
    q: 'Ziraat Bankası gibi büyük kurumlarla çalışıyorsanız, küçük işletmelere de hizmet veriyor musunuz?',
    a: 'Evet, kesinlikle. 11 yıllık deneyimimizde hem kurumsal firmalar hem de büyümekte olan işletmeler için çözümler geliştirdik. Her projeyi ihtiyacınıza göre özel olarak değerlendiriyoruz.',
  },
  {
    q: 'Projenizin teslim süresi ne kadardır?',
    a: 'Projenin kapsamına göre değişiyor. Küçük projeler birkaç haftada, orta ölçekli projeler 6-12 haftada, büyük kurumsal projeler ise 3-6 ayda tamamlanabiliyor. İlk görüşmede size net bir plan sunuyoruz.',
  },
  {
    q: 'Mevcut yazılımımız veya sistemlerimiz var. Bunlarla entegre çalışır mısınız?',
    a: 'Evet. ERP\'ler, kargo firmalar, ödeme sistemleri, muhasebe yazılımları — mevcut sistemlerinizle sorunsuz entegrasyon sağlıyoruz. Var olanı değiştirmeden üstüne katman ekliyoruz.',
  },
  {
    q: 'Proje bittikten sonra yazılımın bakımını kim yapacak?',
    a: 'İki seçenek sunuyoruz: 1) Yazılımı sizin ekibinize teslim ederiz — tam belgeleme ve eğitim dahil. 2) Bizim devam eden destek paketimize dahil olursunuz — 7/24 yanınızdayız.',
  },
  {
    q: 'Fiyatlandırma nasıl çalışıyor?',
    a: 'Her projeyi ayrı değerlendiriyoruz çünkü her işletmenin ihtiyacı farklı. Başlangıç, Profesyonel ve Kurumsal paket seçeneklerimiz var. 30 dakikalık ücretsiz ilk görüşmede size en uygun seçeneği birlikte belirleyelim.',
  },
  {
    q: 'Türkiye dışındaki müşterilerinizle nasıl çalışıyorsunuz?',
    a: '130\'dan fazla ülkeye hizmet veriyoruz. Belçika\'daki Excellence Talks gibi uluslararası müşterilerimiz var. Uzaktan çalışma konusunda 11 yıllık deneyimimizle her ülkeden müşteriyle sorunsuz iletişim kuruyoruz.',
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
