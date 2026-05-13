'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  key: string;
  industry: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  metrics: { v: string; l: string }[];
  visual: 'finance' | 'gaming' | 'commerce' | 'integration';
}

const WORKS: WorkItem[] = [
  {
    key: 'fortuneris',
    industry: 'Sermaye Piyasaları',
    title: 'Lisansa hazır bir yatırım platformu kurduk.',
    client: 'Fortuneris',
    year: '2026',
    summary: 'Fortuneris, SPK lisans başvurusuna hazır şekilde canlıya çıkmak istiyordu. Kurumsal siteden müşteri hesap açma akışına, denetim kayıtlarından iki adımlı doğrulamaya kadar tek bir bütün halinde teslim ettik.',
    metrics: [{ v: '9 dk', l: 'hesap açma' }, { v: '7 yıl', l: 'denetim izi' }, { v: 'TR · EN', l: 'çift dil' }],
    visual: 'finance',
  },
  {
    key: 'topratebet',
    industry: 'Şans Oyunları',
    title: 'Sıfırdan canlıya bir iGaming platformu.',
    client: 'TopRateBet',
    year: '2025',
    summary: 'TopRateBet pazara güçlü bir markayla girmek istiyordu. Spor bahisleri, casino, canlı oyun ve turnuvaları tek panele topladık. 9 ayda canlıya geçtik, açılış gününde tek kesinti yaşanmadı.',
    metrics: [{ v: '9 ay', l: 'teslim süresi' }, { v: '50k', l: 'eş zamanlı oyuncu' }, { v: '1.4s', l: 'mobil hız' }],
    visual: 'gaming',
  },
  {
    key: 'airomeda-markets',
    industry: 'E-Ticaret SaaS',
    title: 'Tek panelden tüm pazaryerleri.',
    client: 'Airomeda Markets',
    year: '2026',
    summary: 'Türk satıcının her gün 5–7 farklı pazaryeri panelinde kaybettiği saatleri tek panele indirdik. AI ürün fotoğraf stüdyosu ile telefonla çekilen kareler 30 saniyede vitrine hazır.',
    metrics: [{ v: '15+', l: 'pazaryeri' }, { v: '30 sn', l: 'AI fotoğraf' }, { v: 'anlık', l: 'stok' }],
    visual: 'commerce',
  },
  {
    key: 'airomedata',
    industry: 'B2B Pazarlama',
    title: 'KOBİ\'lere akıllı müşteri bulma.',
    client: 'Airomedata',
    year: '2026',
    summary: 'Türk KOBİ\'lerin satış ekibi gün boyu yanlış numara aramayı bırakıp gerçek görüşmelere odaklansın diye, kamuya açık işletme verilerini güven skoruyla sunan bir SaaS inşa ettik. KVKK uyumlu.',
    metrics: [{ v: '%96', l: 'e-posta doğruluğu' }, { v: '0–100', l: 'güven skoru' }, { v: '✓', l: 'KVKK uyumlu' }],
    visual: 'integration',
  },
];

function WorkVisual({ kind }: { kind: WorkItem['visual'] }) {
  // Stylized abstract visual per industry — distinctive shapes
  if (kind === 'finance') {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full">
        <defs>
          <linearGradient id="fin-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(20 184 166 / 0.3)"/>
            <stop offset="100%" stopColor="rgb(20 184 166 / 0)"/>
          </linearGradient>
        </defs>
        {/* candlestick-like bars */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = 20 + i * 15;
          const h = 30 + Math.abs(Math.sin(i * 0.5)) * 120;
          const y = 120 - h / 2 + (i % 2 === 0 ? -15 : 15);
          return <rect key={i} x={x} y={y} width="6" height={h} fill={i % 3 === 0 ? '#14B8A6' : 'hsl(0 0% 30%)'} />;
        })}
        {/* trend line */}
        <path d="M 20 180 Q 100 100, 200 120 T 380 60" stroke="#14B8A6" strokeWidth="1.5" fill="none"/>
        <text x="20" y="220" fill="hsl(0 0% 50%)" fontSize="9">Ödeme hacmi · 24 saat</text>
      </svg>
    );
  }
  if (kind === 'gaming') {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* concentric rings */}
        {[100, 80, 60, 40, 20].map((r, i) => (
          <circle key={r} cx="200" cy="120" r={r} fill="none" stroke={i === 0 ? '#14B8A6' : 'hsl(0 0% 25%)'} strokeWidth="0.8" strokeDasharray={i % 2 === 0 ? '2 4' : ''}/>
        ))}
        {/* spinning rays */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const x1 = 200 + Math.cos(angle) * 35;
          const y1 = 120 + Math.sin(angle) * 35;
          const x2 = 200 + Math.cos(angle) * (i % 3 === 0 ? 110 : 80);
          const y2 = 120 + Math.sin(angle) * (i % 3 === 0 ? 110 : 80);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 3 === 0 ? '#14B8A6' : 'hsl(0 0% 25%)'} strokeWidth="0.6"/>;
        })}
        <text x="200" y="124" textAnchor="middle" fill="#14B8A6" fontSize="11">Oyun</text>
        <text x="20" y="220" fill="hsl(0 0% 50%)" fontSize="9">Oyun motoru · canlı</text>
      </svg>
    );
  }
  if (kind === 'commerce') {
    return (
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* grid of squares — products */}
        {Array.from({ length: 40 }).map((_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = 30 + col * 35;
          const y = 30 + row * 45;
          const isActive = i === 17 || i === 23 || i === 4;
          return <rect key={i} x={x} y={y} width="28" height="36" fill={isActive ? 'rgb(20 184 166 / 0.6)' : 'hsl(0 0% 15%)'} stroke={isActive ? '#14B8A6' : 'hsl(0 0% 25%)'} strokeWidth="0.5"/>;
        })}
        <text x="20" y="222" fill="hsl(0 0% 50%)" fontSize="9">Ürün kataloğu · 40.000+</text>
      </svg>
    );
  }
  // integration — nodes and connections
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      {/* nodes */}
      {[
        { x: 80, y: 60, l: 'Stok' },
        { x: 320, y: 60, l: 'Kargo' },
        { x: 80, y: 180, l: 'Sipariş' },
        { x: 320, y: 180, l: 'Ödeme' },
        { x: 200, y: 120, l: 'merkez' },
      ].map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={n.y} r="22" fill="none" stroke={n.l === 'merkez' ? '#14B8A6' : 'hsl(0 0% 30%)'} strokeWidth="1"/>
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill={n.l === 'merkez' ? '#14B8A6' : 'hsl(0 0% 60%)'} fontSize="10">{n.l}</text>
        </g>
      ))}
      {([[80, 60], [320, 60], [80, 180], [320, 180]] as [number, number][]).map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2="200" y2="120" stroke="rgb(20 184 166 / 0.4)" strokeWidth="0.6" strokeDasharray="3 3"/>
      ))}
      <text x="20" y="222" fill="hsl(0 0% 50%)" fontSize="9">Sistem bağlantısı · canlı</text>
    </svg>
  );
}

export function SelectedWork() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Disable pinned horizontal scroll on mobile (touch) devices
    if (window.innerWidth < 768) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    // Calculate scroll distance: track width minus viewport width
    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = totalWidth - viewportWidth;

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance + 200}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section id="selected-work" ref={sectionRef} className="relative border-b border-border overflow-hidden">
      <div className="pt-20 pb-12">
        <Container as="div">
          <RevealSection>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Başarı Hikayeleri</p>
                <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                  Gurur duyduğumuz projeler.
                </h2>
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                yatay kaydır →
              </p>
            </div>
          </RevealSection>
        </Container>
      </div>

      <div className="overflow-x-auto md:overflow-hidden">
        <div ref={trackRef} className="flex gap-6 md:gap-8 px-5 md:px-[5vw] pb-12 md:pb-20" style={{ width: 'max-content' }}>
          {WORKS.map((w, i) => (
            <article
              key={w.key}
              className="flex-shrink-0 w-[85vw] sm:w-[80vw] md:w-[68vw] lg:w-[52vw] border border-border bg-elevated relative overflow-hidden group"
            >
              <div className="grid sm:grid-cols-[1.2fr_1fr] gap-0 h-full">
                {/* Visual panel */}
                <div className="relative bg-background sm:border-r border-b sm:border-b-0 border-border min-h-[200px] sm:min-h-[300px] md:min-h-[420px] p-6 flex items-center justify-center overflow-hidden">
                  <div aria-hidden className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgb(20 184 166 / 0.04), transparent 70%)' }}/>
                  <div className="relative w-full max-w-md">
                    <WorkVisual kind={w.visual} />
                  </div>
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {String(i + 1).padStart(2, '0')} / {String(WORKS.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Content panel */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-eyebrow uppercase tracking-wider text-accent font-medium">{w.industry}</span>
                      <span className="text-eyebrow uppercase tracking-wider text-muted-foreground">{w.year}</span>
                    </div>
                    <h3 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05]">
                      {w.title}
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="text-foreground">{w.client}</span> · {w.summary}
                    </p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-border grid grid-cols-3 gap-4">
                    {w.metrics.map((m) => (
                      <div key={m.l}>
                        <p className="text-2xl font-semibold tabular-nums text-accent">{m.v}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Tail card — CTA */}
          <article className="flex-shrink-0 w-[60vw] md:w-[40vw] lg:w-[32vw] border border-accent/40 bg-accent/5 relative">
            <div className="p-10 h-full flex flex-col justify-between min-h-[420px]">
              <div>
                <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Sıradaki</p>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight leading-tight">
                  Sıradaki başarı hikayesi, sizinki olabilir.
                </h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  36 kişilik uzman ekip · hızlı teslim · 7/24 destek
                </p>
              </div>
              <a href="#cta" className="inline-flex items-center gap-2 text-sm text-accent group">
                bizimle konuşun
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
