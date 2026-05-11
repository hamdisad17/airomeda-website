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
            'radial-gradient(ellipse 40% 60% at 80% 50%, hsl(189 100% 50% / 0.05), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 01 · hikaye'}</p>
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
                2014&apos;te Kayseri&apos;de küçük bir ekipten yola çıktık. 11 yılda Türkiye&apos;nin önde gelen kurumlarına yazılım üreten 36 kişilik bir aile haline geldik.
              </p>
              <p>
                Bankacılık sektöründe Ziraat Bankası bünyesinde geliştirdiğimiz performans tahminleme sistemiyle başlayan yolculuğumuz, bugün finans, sağlık, e-ticaret, lojistik ve oyun gibi birçok alanda devam ediyor. AI destekli sağlık ürünlerinden ERP sistemlerine, AR/VR oyunlardan dijital pazarlama analitiğine kadar geniş bir yelpazede çözüm üretiyoruz.
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
