'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const ITEMS = [
  {
    q: 'Bizimle çalışmaya nasıl başlarız?',
    a: 'Çok basit. Bize mesaj atın veya iletişim formunu doldurun. 24 saat içinde sizi arayıp ihtiyaçlarınızı dinleriz. İlk görüşme ücretsizdir, herhangi bir taahhüt gerektirmez.',
  },
  {
    q: 'Fiyatlar nasıl belirleniyor?',
    a: 'Her projeyi ayrı değerlendiriyoruz çünkü her işletmenin ihtiyacı farklı. Başlangıç, Profesyonel ve Kurumsal paket seçeneklerimiz var. 30 dakikalık ücretsiz ilk görüşmede size en uygun seçeneği birlikte belirleyelim.',
  },
  {
    q: 'Projeyi ne kadar sürede teslim ediyorsunuz?',
    a: 'Projenin kapsamına göre değişiyor. Küçük projeler birkaç haftada, orta ölçekli projeler 6-12 haftada, büyük projeler ise 3-6 ayda tamamlanabiliyor. İlk görüşmede size net bir zaman çizelgesi sunuyoruz.',
  },
  {
    q: 'Yayından sonra destek veriyor musunuz?',
    a: 'Evet, her zaman. İki seçenek sunuyoruz: 1) Yazılımı sizin ekibinize eksiksiz teslim ederiz — belgeler ve eğitim dahil. 2) Devam eden destek paketimize dahil olursunuz — 7/24 yanınızdayız.',
  },
  {
    q: 'Çalışmaya başlamak için sözleşme şart mı?',
    a: 'Evet, her proje için bir iş anlaşması yapıyoruz. Bu hem sizi hem bizi korur. Sözleşmede ne yapılacağı, ne zaman teslim edileceği ve fiyat net olarak yer alır. Sürpriz yoktur.',
  },
  {
    q: 'Sektörümüzde tecrübeniz var mı?',
    a: '11 yıldır finans, e-ticaret, oyun, lojistik, sağlık ve daha birçok sektörde çalışıyoruz. Sizin sektörünüzdeki deneyimimizi ilk görüşmede paylaşırız. Benzer projelerden örnekler gösterebiliriz.',
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
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Sıkça Sorulanlar</p>
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
