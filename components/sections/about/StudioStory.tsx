import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Pullquote } from '@/components/sections/shared/Pullquote';

export function StudioStory() {
  return (
    <section className="border-b border-border py-20 md:py-32 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 40% 60% at 80% 50%, rgb(20 184 166 / 0.05), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Hikayemiz</p>
        </RevealSection>

        <div className="mt-8 grid md:grid-cols-[300px_1fr] gap-12 md:gap-20">
          {/* Sticky heading */}
          <div className="md:sticky md:top-24 md:self-start">
            <RevealSection>
              <h2
                className="font-semibold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
              >
                Neden
                <br />
                <span className="text-accent">Airomeda?</span>
              </h2>
            </RevealSection>
          </div>

          {/* Prose */}
          <RevealSection>
            <div className="space-y-6 text-muted-foreground leading-relaxed max-w-2xl">
              <p className="text-lg text-foreground/90">
                2014&apos;te İstanbul&apos;da küçük bir ekipten yola çıktık. 11 yılda 36 kişilik uzman bir yazılım takımına dönüştük.
              </p>
              <p>
                Ekibimizdeki uzmanlar; bankacılık sektöründe <strong className="text-foreground">Ziraat Bankası</strong>, ev aletleri sanayisinde <strong className="text-foreground">Kumtel A.Ş.</strong>, lojistikte <strong className="text-foreground">Aras Kargo</strong>, sağlık teknolojilerinde <strong className="text-foreground">HSD Core Labs</strong>, eğitim teknolojilerinde <strong className="text-foreground">Kodland</strong>, oyun geliştirmede <strong className="text-foreground">Wide Game Studio</strong>, uluslararası medyada <strong className="text-foreground">Excellence Talks</strong> (Belçika) ve CMMI sertifikalı IT hizmetlerinde <strong className="text-foreground">Kolektif Teknoloji Grubu</strong> gibi prestijli kurumlarda görev almış profesyonellerdir.
              </p>
              <p>
                Bu birikim, müşterilerimize özel çözümler tasarlarken farklı sektörlerin işleyişini içeriden bilen bir bakış açısı kazandırıyor. Finans, sağlık, e-ticaret, lojistik ve oyun gibi birçok alanda, yıllarca o sektörde çalışmış uzmanlarımızla projeler üretiyoruz.
              </p>
              <p>
                Johns Hopkins, Duke ve Google gibi prestijli kurumlardan aldığımız sertifikalarla ekibimizin bilgi birikimini sürekli güncelliyoruz. Müşterilerimizin sadece bugünkü değil, yarınki ihtiyaçlarını da düşünerek tasarladığımız sistemlerle 130&apos;dan fazla ülkeye ulaşıyoruz.
              </p>

              <Pullquote
                attribution="Ahmet Kaya"
                role="CEO, Airomeda"
              >
                Bizim için yazılım, sadece kod değil — uzun yıllar boyunca güvenle kullanılacak, kolayca büyütülebilecek bir partner.
              </Pullquote>

              <p>
                Bugün 85+ aktif müşteri ile uzun vadeli ortaklıklar sürdürüyoruz. Projeyi bitirip gitmiyor, devrediyoruz — yazılım tamamen sizin, belgeler elinizde, ekibinizi eğitiyoruz.
              </p>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
