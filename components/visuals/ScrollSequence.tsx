'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

interface Frame {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  tone: 'foreground' | 'accent';
  visual: React.ReactNode;
}

function ProblemVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">Müşteri durumu</p>
        <p className="text-foreground">Eski sistem sürekli çöküyor.</p>
        <p className="text-muted-foreground">Müşteriler sepeti terk ediyor.</p>
        <p className="text-muted-foreground">Yeni ürün eklemek saatler alıyor.</p>
        <p className="text-muted-foreground">Rakipler önde, satışlar düşüyor.</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 inline-block" />
        Bu sorunlar tanıdık geliyor mu?
      </div>
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">İletişim</p>
        <p className="text-foreground">Telefon / WhatsApp / E-posta</p>
        <p className="text-muted-foreground">Ücretsiz ilk görüşme talep edildi.</p>
        <p className="text-muted-foreground">Randevu: 3 gün içinde.</p>
        <p className="text-success">✓ Sorularınız yanıtlandı</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
        Airomeda ekibi 24 saat içinde döner.
      </div>
    </div>
  );
}

function MeetingVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">İlk Görüşme</p>
        <p className="text-success">✓ Hedefleriniz dinlendi</p>
        <p className="text-success">✓ Mevcut sorunlar listelendi</p>
        <p className="text-success">✓ Bütçe ve süre konuşuldu</p>
        <p className="text-foreground/70">Sonraki adım: Detaylı teklif hazırlanıyor</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />
        Görüşme ücretsiz, yükümlülük yok.
      </div>
    </div>
  );
}

function PlanVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">Teslim Edilen Plan</p>
        <p className="text-success">✓ Yapılacaklar listesi</p>
        <p className="text-success">✓ 8 haftalık takvim</p>
        <p className="text-success">✓ Fiyat: ₺145.000 (sabit)</p>
        <p className="text-success">✓ Sözleşme taslağı</p>
        <p className="text-foreground/70">Onayınızı bekliyoruz.</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
        Fiyat değişmez. Kapsam yazılıdır.
      </div>
    </div>
  );
}

function BuildDoneVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">8. Hafta Sonu</p>
        <p className="text-success">✓ Web sitesi hazır</p>
        <p className="text-success">✓ Mobil uygulama hazır</p>
        <p className="text-success">✓ Yönetim paneli hazır</p>
        <p className="text-success">✓ Ekibiniz eğitildi</p>
        <p className="text-success">✓ Sistem canlıya alındı</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
        Söz verilen tarihte, söz verilen fiyata.
      </div>
    </div>
  );
}

function HappyEndVisual() {
  return (
    <div className="text-sm space-y-3 text-left w-full max-w-sm">
      <div className="border border-border/60 bg-muted/30 p-4 space-y-2">
        <p className="text-foreground/60 text-xs uppercase tracking-wider font-mono">3. Ay Sonuçları</p>
        <p className="text-success">↑ %180 satış artışı</p>
        <p className="text-success">↑ %240 online sipariş</p>
        <p className="text-success">✓ Müşteri memnuniyeti: %97</p>
        <p className="text-success">✓ Arıza: 0 (sıfır)</p>
        <p className="text-foreground/70">Destek hattı: hâlâ aktif, 7/24.</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-success inline-block animate-ping" />
        <span className="relative flex h-1.5 w-1.5 -ml-3.5">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        Gerçek bir müşteri hikayesi.
      </div>
    </div>
  );
}

const FRAMES: Frame[] = [
  {
    id: 1,
    eyebrow: '01 · Sorun var',
    title: 'Sürekli arıza yaşıyorlardı.',
    subtitle: 'Eski sistem çöküyor, satışlar kayıp gidiyordu. Rakipler önde, müşteriler bezgin.',
    tone: 'foreground',
    visual: <ProblemVisual />,
  },
  {
    id: 2,
    eyebrow: '02 · Bize ulaştılar',
    title: 'Bir telefon açtılar.',
    subtitle: "Airomeda'yı aradılar. Aynı gün geri döndük. Ücretsiz ilk görüşme randevusu aldılar.",
    tone: 'foreground',
    visual: <ContactVisual />,
  },
  {
    id: 3,
    eyebrow: '03 · Konuştuk',
    title: 'İlk görüşme yapıldı.',
    subtitle: 'İhtiyaçlarını, hedeflerini ve bütçelerini dinledik. Hiç teknik konuşmadık, iş konuştuk.',
    tone: 'foreground',
    visual: <MeetingVisual />,
  },
  {
    id: 4,
    eyebrow: '04 · Plan çıktı',
    title: 'Detaylı plan teslim edildi.',
    subtitle: 'Ne yapılacak, ne zaman, kaça. Hepsi yazılı. Fiyat değişmez, kapsam netleştirildi.',
    tone: 'foreground',
    visual: <PlanVisual />,
  },
  {
    id: 5,
    eyebrow: '05 · Geliştirdik',
    title: 'Sistem 8 haftada hazır oldu.',
    subtitle: 'Web sitesi, mobil uygulama, yönetim paneli. Her hafta ilerlemeyi gösterdik.',
    tone: 'accent',
    visual: <BuildDoneVisual />,
  },
  {
    id: 6,
    eyebrow: '06 · Mutlu son',
    title: 'Satışları %180 arttı.',
    subtitle: '3 ay içinde. Sistem çalışıyor, ekip mutlu, müşteriler memnun. Destek hâlâ yanlarında.',
    tone: 'accent',
    visual: <HappyEndVisual />,
  },
];

export function ScrollSequence() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const prevActive = React.useRef(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${FRAMES.length * 700}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const idx = Math.min(FRAMES.length - 1, Math.floor(self.progress * FRAMES.length));
        if (idx !== prevActive.current) {
          prevActive.current = idx;
          setVisible(false);
          setTimeout(() => {
            setActive(idx);
            setVisible(true);
          }, 200);
        }
      },
    });
    return () => { trigger.kill(); };
  }, { scope: sectionRef });

  const frame = FRAMES[active] ?? FRAMES[0]!;

  return (
    <section
      ref={sectionRef}
      className="border-b border-border bg-elevated/20 relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgb(20 184 166 / 0.1), transparent 70%)' }}
      />
      <Container as="div" className="relative flex flex-col justify-center min-h-screen py-20">
        {/* Progress rail */}
        <div className="flex items-center gap-2 mb-16">
          {FRAMES.map((f, i) => (
            <div
              key={f.id}
              className={`h-px flex-1 transition-all duration-500 ${i <= active ? 'bg-accent' : 'bg-border'}`}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          {/* Left: text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 300ms ease, transform 300ms ease',
            }}
          >
            <p className="font-mono text-eyebrow uppercase text-accent">{frame.eyebrow}</p>
            <h2
              className={`mt-4 text-display-2 font-semibold tracking-tight ${frame.tone === 'accent' ? 'text-accent' : 'text-foreground'}`}
            >
              {frame.title}
            </h2>
            <p className="mt-4 max-w-md text-body-lg text-muted-foreground">{frame.subtitle}</p>

            {/* Step dots */}
            <div className="mt-12 flex items-center gap-3">
              {FRAMES.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  aria-label={`Adım ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 transition-all duration-300 ${i === active ? 'bg-accent w-8' : 'bg-border'}`}
                />
              ))}
            </div>
          </div>

          {/* Right: terminal visual */}
          <div
            className="border border-border bg-background overflow-hidden"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 300ms ease, transform 300ms ease',
              transitionDelay: '50ms',
            }}
          >
            <div className="border-b border-border px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2" aria-hidden>
                <span className={`h-2 w-2 rounded-full ${frame.tone === 'accent' ? 'bg-accent' : 'bg-border'}`} />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                airomeda · {frame.eyebrow}
              </p>
              <span className={`font-mono text-[10px] ${frame.tone === 'accent' ? 'text-accent' : 'text-success'}`}>
                {frame.tone === 'accent' ? '● live' : '↻ running'}
              </span>
            </div>
            <div className="p-6 min-h-[220px] flex items-center justify-center">
              {frame.visual}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <p className="mt-16 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50 text-center">
          kaydır ↓ hikayeyi takip et
        </p>
      </Container>
    </section>
  );
}
