'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { Link } from '@/i18n/navigation';

gsap.registerPlugin(ScrollTrigger);

type IconName =
  | 'odeme'
  | 'banka'
  | 'erp'
  | 'efatura'
  | 'kargo'
  | 'pazaryeri'
  | 'sosyal'
  | 'reklam';

function CategoryIcon({ name }: { name: IconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'odeme':
      // Credit card
      return (
        <svg {...common}>
          <rect x="2" y="6" width="20" height="13" rx="1.5" />
          <path d="M2 10h20" />
          <path d="M6 15h3" />
        </svg>
      );
    case 'banka':
      // Bank with columns
      return (
        <svg {...common}>
          <path d="M3 10l9-6 9 6" />
          <path d="M5 10v8" />
          <path d="M9 10v8" />
          <path d="M15 10v8" />
          <path d="M19 10v8" />
          <path d="M3 20h18" />
        </svg>
      );
    case 'erp':
      // Stacked servers / database
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="5" rx="1" />
          <rect x="3" y="10" width="18" height="5" rx="1" />
          <rect x="3" y="17" width="18" height="4" rx="1" />
          <circle cx="7" cy="5.5" r="0.5" fill="currentColor" />
          <circle cx="7" cy="12.5" r="0.5" fill="currentColor" />
          <circle cx="7" cy="19" r="0.5" fill="currentColor" />
        </svg>
      );
    case 'efatura':
      // Document with lines
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </svg>
      );
    case 'kargo':
      // Truck
      return (
        <svg {...common}>
          <path d="M1 8h13v9H1z" />
          <path d="M14 11h4l3 3v3h-7" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="17.5" cy="19" r="2" />
        </svg>
      );
    case 'pazaryeri':
      // Shopping bag with handles
      return (
        <svg {...common}>
          <path d="M4 7h16l-1.5 13a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1L4 7z" />
          <path d="M9 7V4a3 3 0 0 1 6 0v3" />
        </svg>
      );
    case 'sosyal':
      // Chat / users
      return (
        <svg {...common}>
          <path d="M21 11a8 8 0 1 1-3.4-6.5L21 3v6h-6" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="13" cy="12" r="1" fill="currentColor" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'reklam':
      // Megaphone
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M15 8a4 4 0 0 1 0 8" />
          <path d="M18 5a8 8 0 0 1 0 14" />
        </svg>
      );
  }
}

const CATEGORIES: { key: IconName; label: string; brands: string[] }[] = [
  { key: 'odeme', label: 'Ödeme Sistemleri', brands: ['iyzico', 'PayTR', 'Param', 'Stripe'] },
  { key: 'banka', label: 'Banka & Havale', brands: ['SWIFT', 'EFT', 'FAST', 'Havale'] },
  { key: 'erp', label: 'ERP & Muhasebe', brands: ['Logo', 'Mikro', 'Netsis', 'NetSuite'] },
  { key: 'efatura', label: 'E-Fatura & Belge', brands: ['e-Fatura', 'e-Arşiv', 'e-İrsaliye'] },
  { key: 'kargo', label: 'Kargo & Lojistik', brands: ['Aras', 'Yurtiçi', 'MNG', 'PTT'] },
  { key: 'pazaryeri', label: 'Pazaryerleri', brands: ['Trendyol', 'Hepsiburada', 'N11', 'Amazon'] },
  { key: 'sosyal', label: 'Sosyal Medya', brands: ['Meta', 'Instagram', 'TikTok', 'X'] },
  { key: 'reklam', label: 'Reklam Platformları', brands: ['Google Ads', 'Meta Ads', 'TikTok Ads'] },
];

const OUTCOMES = [
  { title: 'Tek panel', body: 'Tüm sistemleriniz tek bir kontrol noktasından yönetilir.' },
  { title: 'Gerçek zamanlı', body: 'Veriler anında senkronize olur. Bekleme yok, manuel iş yok.' },
  { title: 'Güvenli akış', body: 'Veri kaybı olmaz. Her işlem kayıt altına alınır.' },
];

export function Architecture() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      // Animate flow paths drawing in
      const paths = ref.current.querySelectorAll<SVGPathElement>('.flow-path');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Animate flowing data dots along each path
      const dots = ref.current.querySelectorAll<SVGCircleElement>('.flow-dot');
      dots.forEach((dot, i) => {
        const path = paths[i];
        if (!path) return;
        const len = path.getTotalLength();
        const progress = { t: 0 };
        gsap.to(progress, {
          t: 1,
          duration: 2.5,
          repeat: -1,
          ease: 'none',
          delay: i * 0.25,
          onUpdate: () => {
            const point = path.getPointAtLength(progress.t * len);
            dot.setAttribute('cx', String(point.x));
            dot.setAttribute('cy', String(point.y));
          },
        });
      });

      // Pulse the center hub
      const hub = ref.current.querySelector<HTMLDivElement>('.hub-pulse');
      if (hub) {
        gsap.to(hub, {
          scale: 1.08,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Reveal category cards
      const cards = ref.current.querySelectorAll('.cat-card');
      gsap.fromTo(
        cards,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      );

      const outcomes = ref.current.querySelectorAll('.outcome-card');
      gsap.fromTo(
        outcomes,
        { opacity: 0, x: 16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section id="architecture" className="border-b border-border bg-elevated/40 py-24 md:py-32 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgb(20 184 166 / 0.08), transparent 70%)' }}/>

      <Container as="div" className="relative">
        <div ref={ref}>
          <RevealSection>
            <div className="max-w-3xl">
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Sistem Bağlantısı</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Mevcut sistemlerinizle<br />sorunsuz çalışır.
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                11 yıllık deneyimimizle; ödeme, kargo, ERP, pazaryeri, sosyal medya — kullandığınız tüm sistemleri Airomeda&apos;ya bağlayıp tek panelden yönetmenizi sağlıyoruz.
              </p>
            </div>
          </RevealSection>

          {/* Main visual — 3 column flow */}
          <div className="mt-16 grid lg:grid-cols-[1fr_1.2fr_1fr] gap-8 lg:gap-12 items-stretch">
            {/* Left: source categories */}
            <div className="space-y-2">
              <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium mb-4">
                Bağlanan sistemler
              </p>
              {CATEGORIES.map((c) => (
                <div
                  key={c.key}
                  className="cat-card border border-border bg-background px-4 py-3 flex items-center gap-3 hover:border-accent transition-colors group"
                >
                  <span className="text-accent w-8 h-8 flex items-center justify-center border border-border bg-elevated/40 flex-shrink-0 transition-colors group-hover:border-accent group-hover:bg-accent/10">
                    <CategoryIcon name={c.key} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{c.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {c.brands.slice(0, 3).join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center: Airomeda hub + flow visual */}
            <div className="relative flex flex-col items-center justify-center min-h-[520px]">
              <svg
                viewBox="0 0 400 520"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
              >
                {/* Lines from left to center */}
                {CATEGORIES.map((_, i) => {
                  const y = 30 + i * 60;
                  return (
                    <path
                      key={`l-${i}`}
                      className="flow-path"
                      d={`M0,${y} C 140,${y} 140,260 200,260`}
                      stroke="#14B8A6"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                      fill="none"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* Lines from center to right */}
                {OUTCOMES.map((_, i) => {
                  const y = 130 + i * 130;
                  return (
                    <path
                      key={`r-${i}`}
                      className="flow-path"
                      d={`M200,260 C 260,260 260,${y} 400,${y}`}
                      stroke="#14B8A6"
                      strokeWidth="0.8"
                      strokeOpacity="0.35"
                      fill="none"
                      strokeLinecap="round"
                    />
                  );
                })}
                {/* Flowing dots */}
                {[...CATEGORIES, ...OUTCOMES].map((_, i) => (
                  <circle
                    key={`fd-${i}`}
                    className="flow-dot"
                    r="2.5"
                    fill="hsl(173 80% 50%)"
                    style={{ filter: 'drop-shadow(0 0 4px rgb(20 184 166 / 0.8))' }}
                  />
                ))}
              </svg>

              {/* Central hub */}
              <div className="relative z-10">
                <div className="hub-pulse relative">
                  <div className="w-48 h-48 border-2 border-accent bg-elevated/80 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_20px_60px_-15px_hsl(173_80%_40%_/_0.5)]">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Ana Sistem</div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">airomeda<span className="text-accent">.</span></div>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"/>
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success"/>
                      </span>
                      <span className="text-[10px] text-muted-foreground">canlı</span>
                    </div>
                  </div>
                  {/* Pulsing ring */}
                  <div aria-hidden className="absolute inset-0 -m-4 border border-accent/30 pointer-events-none"
                    style={{ animation: 'cta-pulse 3s ease-in-out infinite' }}/>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="tabular-nums text-accent">200+</span>
                    <span>entegrasyon</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="tabular-nums text-accent">8</span>
                    <span>kategori</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: outcomes */}
            <div className="space-y-3 flex flex-col">
              <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium mb-4">
                Size ne kazandırır
              </p>
              {OUTCOMES.map((o) => (
                <div
                  key={o.title}
                  className="outcome-card border border-border bg-background p-5 hover:border-accent transition-colors flex-1 flex flex-col justify-center"
                >
                  <p className="font-semibold text-foreground text-base">{o.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.body}</p>
                </div>
              ))}
              <Link
                href="/iletisim"
                className="outcome-card mt-2 border border-accent bg-accent/5 px-5 py-4 hover:bg-accent/10 transition-colors flex items-center justify-between group"
              >
                <span className="font-semibold text-foreground">Sisteminizi bağlayalım</span>
                <span className="font-mono text-sm text-accent transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
