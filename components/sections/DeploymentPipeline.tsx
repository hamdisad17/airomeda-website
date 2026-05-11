'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { id: 'ihtiyac', label: 'İhtiyaç Belirleme', detail: 'Projenizin kapsamı ve hedefleri netleştiriliyor', logs: ['✓ İlk görüşme tamamlandı', '✓ İhtiyaçlar belgelendi', '✓ Proje planı hazırlandı'] },
  { id: 'tasarim', label: 'Tasarım', detail: 'Size özel çözüm mimarisinin tasarımı', logs: ['↻ Çözüm mimarisi hazırlanıyor...', '✓ Onayınız alındı', '✓ Tasarım belgelendi'] },
  { id: 'gelistirme', label: 'Geliştirme', detail: 'Her iki haftada demo edilebilir ilerleme', logs: ['✓ Sprint 1 tamamlandı · demo hazır', '✓ Sprint 2 tamamlandı · geri bildirim alındı', '✓ Sprint 3 tamamlandı · testler geçildi'] },
  { id: 'test', label: 'Test', detail: 'Kapsamlı kalite güvencesi ve doğrulama', logs: ['✓ Fonksiyonel testler geçildi', '✓ Güvenlik kontrolü tamamlandı', '✓ Performans testi başarılı'] },
  { id: 'teslim', label: 'Teslim', detail: 'Sisteminiz canlıya alınıyor', logs: ['↻ Sistem canlıya alınıyor...', '✓ Canlıya geçiş tamamlandı', '✓ İzleme aktif · kesintisiz çalışıyor'] },
  { id: 'destek', label: 'Destek', detail: 'Teslim sonrası 7/24 yanınızdayız', logs: ['✓ 7/24 destek aktif', '✓ Eğitim tamamlandı · belgeler teslim edildi', '● aktif · kesintisiz çalışıyor'] },
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
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 08 · geliştirme süreci'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Fikrinizden teslimata.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Her adımda ne yapıldığını açıkça görürsünüz. Şeffaf süreç, hızlı teslim, uzun vadeli destek.
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
                  <p className={`mt-1 text-xs font-mono transition-colors ${
                    isActive ? 'text-muted-foreground' : 'text-muted-foreground/40'
                  }`}>
                    {s.detail}
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
              <p className="text-muted-foreground mb-3">$ airomeda pipeline:status</p>
              {STAGES.slice(0, active + 1).map((s, i) => (
                <div key={s.id} className="mb-4 last:mb-0">
                  <p className={`${i === active ? 'text-accent' : 'text-foreground/70'} mb-1.5`}>
                    [{String(i + 1).padStart(2, '0')}] {s.label} → {s.detail}
                  </p>
                  {s.logs.map((log) => (
                    <p key={log} className={`pl-6 ${i === active ? 'text-foreground' : 'text-muted-foreground/50'}`}>
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
