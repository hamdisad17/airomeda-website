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
                2018&apos;de iki mühendis, bir fintech müşterisi ve Maslak&apos;ta küçük bir ofis. Bugün 47 kişilik bir ekip, 4 aktif bölgede çalışan 47 production sistemi ve düzenlenmiş endüstrilerde kanıtlanmış 8 yıllık yol.
              </p>
              <p>
                Airomeda&apos;yı kurarken bir ilkeyle başladık: yazdığımız kodun kalitesi, onu destekleyecek altyapının sağlamlığı ve teslim ettiğimizde müşterinin elinde gerçek anlamda çalışan bir sistem olması. Demo değil, production hattı.
              </p>
              <p>
                Finans sektörünün BDDK/MASAK regülasyon ağırlığını, iGaming&apos;in eCOGRA lisans hassasiyetini, e-ticaretin hız baskısını ve entegrasyon projelerinin idempotency karmaşıklığını ilk elden bilen bir ekip. Bu deneyim bize sektörel kısayolları, kaçınılması gereken teknik borçları ve her disiplinin özgün risklerini öğretti.
              </p>

              <Pullquote
                attribution="Ahmet Kaya"
                role="CEO, Airomeda"
              >
                Production&apos;da değilse, bitmemiştir.
              </Pullquote>

              <p>
                Bugün 68 aktif müşteri ile uzun vadeli ortaklıklar sürdürüyoruz. 280+ aylık deployment, %99.973 gözlemlenen uptime. Projeyi bitirip gitmiyor, devrediyoruz — kod sizin, IP sizin, mimari kararlar belgelenmiş ve denetlenebilir.
              </p>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
