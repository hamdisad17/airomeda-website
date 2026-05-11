'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: 'gorusme',
    label: 'İlk Görüşme',
    detail: 'Tanışma toplantısı, ihtiyaç analizi',
    desc: 'Sizinle baş başa oturup işinizi ve hedeflerinizi dinleriz. Ücretsiz.',
    logs: ['✓ Tanışma toplantısı yapıldı', '✓ İhtiyaçlar listelendi', '✓ Hedefler netleşti'],
  },
  {
    id: 'teklif',
    label: 'Plan ve Teklif',
    detail: 'Detaylı proje planı, fiyat teklifi',
    desc: 'Yapılacakların listesi, süre, fiyat. Hepsi yazılı, hepsi şeffaf.',
    logs: ['✓ Proje planı çıkarıldı', '✓ Maliyet hesaplandı', '✓ Teklif size sunuldu'],
  },
  {
    id: 'tasarim',
    label: 'Tasarım',
    detail: 'Ekran tasarımları, sizin onayınız',
    desc: 'Her ekranı tasarlar, size gösteririz. Beğenmediğiniz yer kalmaz.',
    logs: ['✓ İlk taslaklar hazır', '✓ Renk ve yazı tipi seçildi', '✓ Onayınız alındı'],
  },
  {
    id: 'gelistirme',
    label: 'Geliştirme',
    detail: 'Sistemin inşası, haftalık raporlar',
    desc: 'Uzman ekibimiz çalışır. Her hafta ne yapıldığını size gösteririz.',
    logs: ['✓ Ana sistem hazır', '✓ Mobil uygulama hazır', '✓ Test ortamı kuruldu'],
  },
  {
    id: 'test',
    label: 'Test ve Eğitim',
    detail: 'Sıkı testler, ekibinize eğitim',
    desc: 'Sistem her yönden test edilir. Ekibinizi kullanmak için eğitiriz.',
    logs: ['✓ 200+ test yapıldı', '✓ Ekibiniz eğitildi', '✓ Yazılı kullanım kılavuzu teslim edildi'],
  },
  {
    id: 'destek',
    label: 'Yayın ve Destek',
    detail: 'Canlıya alma, sürekli yanınızda',
    desc: 'Sisteminiz hayata geçer. 7/24 destek hattımız sizinle.',
    logs: ['✓ Sistem canlıya alındı', '✓ Tüm fonksiyonlar çalışıyor', '✓ Destek hattı aktif'],
  },
];

export function DeploymentPipeline() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=2400',
      pin: true,
      pinSpacing: true,
      scrub: false,
      onUpdate: (self) => {
        const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
        setActive(idx);
      }
    });
    return () => { trigger.kill(); };
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="border-b border-border min-h-screen bg-elevated/40 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.1), transparent 70%)' }}/>
      <Container as="div" className="relative pt-20 pb-20 min-h-screen flex flex-col justify-center">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">Çalışma Sürecimiz</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            İlk görüşmeden yayına.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Her adımda ne yapıldığını açıkça görürsünüz. Sürpriz yok, gizli maliyet yok — sadece net bir süreç ve güvenilir teslim.
          </p>
        </RevealSection>

        <div className="mt-16 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          {/* Stage list */}
          <ol className="space-y-0 border-l border-border">
            {STAGES.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <li key={s.id} className="relative pl-8 pb-8 last:pb-0">
                  <span className={`absolute left-0 top-1 -translate-x-1/2 inline-flex h-3 w-3 rounded-full border-2 transition-all ${
                    isActive ? 'border-accent bg-accent scale-150 shadow-[0_0_20px_hsl(189_100%_50%_/_0.8)]' :
                    isPast ? 'border-accent bg-accent' :
                    'border-muted-foreground/30 bg-background'
                  }`}/>
                  <p className={`font-mono text-eyebrow uppercase transition-colors ${
                    isActive ? 'text-accent' : isPast ? 'text-foreground/60' : 'text-muted-foreground/40'
                  }`}>
                    0{i + 1}
                  </p>
                  <p className={`mt-1 text-xl font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-foreground' : isPast ? 'text-foreground/70' : 'text-muted-foreground/40'
                  }`}>
                    {s.label}
                  </p>
                  <p className={`mt-1 text-xs transition-colors ${
                    isActive ? 'text-muted-foreground' : 'text-muted-foreground/40'
                  }`}>
                    {s.desc}
                  </p>
                </li>
              );
            })}
          </ol>

          {/* Terminal panel */}
          <div className="border border-border bg-background overflow-hidden">
            <div className="border-b border-border px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-accent/60"/>
                <span className="h-2 w-2 rounded-full bg-foreground/15"/>
                <span className="h-2 w-2 rounded-full bg-foreground/15"/>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                airomeda · {STAGES[active]?.label}
              </p>
              <span className="font-mono text-[10px] text-success">● live</span>
            </div>
            <div className="p-6 font-mono text-xs min-h-[320px]">
              <p className="text-muted-foreground mb-4">Projenizin durumu:</p>
              {STAGES.slice(0, active + 1).map((s, i) => (
                <div key={s.id} className="mb-4 last:mb-0">
                  <p className={`${i === active ? 'text-accent font-semibold' : 'text-foreground/70'} mb-1.5`}>
                    {String(i + 1).padStart(2, '0')}. {s.label}
                  </p>
                  {s.logs.map((log) => (
                    <p key={log} className={`pl-4 ${i === active ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                      {log}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
