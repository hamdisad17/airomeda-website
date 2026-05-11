'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { TiltCard } from '@/components/motion/TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function MiniChart() {
  const ref = React.useRef<SVGPathElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    const len = ref.current.getTotalLength();
    gsap.fromTo(ref.current,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, []);
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="bento-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(20 184 166 / 0.4)"/>
          <stop offset="100%" stopColor="rgb(20 184 166 / 0)"/>
        </linearGradient>
      </defs>
      <path
        d="M0,60 L25,55 L50,58 L75,42 L100,48 L125,30 L150,35 L175,18 L200,22 L200,80 L0,80 Z"
        fill="url(#bento-grad)"
      />
      <path
        ref={ref}
        d="M0,60 L25,55 L50,58 L75,42 L100,48 L125,30 L150,35 L175,18 L200,22"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BentoShowcase() {
  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Neden Airomeda</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Neden Airomeda?
          </h2>
        </RevealSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 md:grid-rows-[200px_200px_200px] gap-4">
          {/* Big featured — güven ve deneyim */}
          <TiltCard className="md:col-span-2 md:row-span-2 p-8 relative overflow-hidden border border-border bg-elevated">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, rgb(20 184 166 / 0.15), transparent 60%)' }}/>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">11 yıllık deneyim</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">11 yıllık birikim, 7 sektörde uzmanlaşmış güvenilir yazılım ortağı.</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              2014&apos;ten bu yana bankacılık, lojistik, sağlık ve e-ticaret gibi kritik sektörlerde işletmelerin dijital dönüşümüne destek oluyoruz. İhtiyaçlarınıza göre şekillenen çözümler, uzun vadeli ortaklık.
            </p>
            <div className="mt-8 h-32 relative">
              <MiniChart />
            </div>
          </TiltCard>

          {/* Stat card — proje */}
          <TiltCard className="p-6 border border-border bg-elevated flex flex-col justify-between">
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">tamamlanan proje</p>
            <div>
              <p className="text-5xl font-semibold tabular-nums tracking-tight">180<span className="text-accent">+</span></p>
              <p className="mt-2 text-xs text-muted-foreground">2014&apos;ten bu yana · 85+ mutlu müşteri</p>
            </div>
          </TiltCard>

          {/* Sertifika mini */}
          <TiltCard className="p-6 border border-border bg-background">
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Uzman ekip</p>
            <div className="mt-3 space-y-1.5">
              {['Johns Hopkins · Veri Bilimi', 'Duke University · Makine Öğrenmesi', 'Google · Veri Temelleri', 'Meta · Pazarlama Analitiği'].map((cert) => (
                <p key={cert} className="text-[10px] leading-relaxed text-muted-foreground flex items-center gap-1.5">
                  <span className="text-accent">✓</span>{cert}
                </p>
              ))}
            </div>
          </TiltCard>

          {/* Quote */}
          <TiltCard className="p-6 border border-border bg-elevated md:col-span-2">
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">PayGate · Fintech</p>
            <p className="mt-3 text-base md:text-lg font-medium leading-snug">
              <span className="text-accent">&ldquo;</span>İlk görüşmeden 10 haftada canlıya geçtik. Teknik kalite ve süreç disiplini açısından şimdiye kadar çalıştığım en güçlü ekip.<span className="text-accent">&rdquo;</span>
            </p>
            <p className="mt-3 text-xs text-muted-foreground">— Murat Karaağaç, Genel Müdür · PayGate</p>
          </TiltCard>

          {/* Ekip stat */}
          <TiltCard className="p-6 border border-border bg-elevated flex flex-col justify-between">
            <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">uzman ekip</p>
            <div>
              <p className="text-3xl font-semibold tracking-tight">36 <span className="text-base text-muted-foreground">kişi</span></p>
              <p className="mt-2 text-xs text-muted-foreground">İstanbul · 7/24 destek</p>
            </div>
          </TiltCard>

          {/* Platform desteği */}
          <TiltCard className="p-6 border border-border bg-elevated md:col-span-2">
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Her cihazda çalışır</p>
            <p className="mt-2 text-sm text-muted-foreground">Mobilden masaüstüne — kullandığınız her cihazda kusursuz çalışır.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Web sitesi', 'Mobil uygulama', 'iOS', 'Android', 'Bulut sistemi', 'Otomasyon', 'Entegrasyon', 'Raporlama'].map((t) => (
                <span key={t} className="text-[11px] border border-border px-2 py-1 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>
        </div>
      </Container>
    </section>
  );
}
