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
          <stop offset="0%" stopColor="hsl(189 100% 50% / 0.4)"/>
          <stop offset="100%" stopColor="hsl(189 100% 50% / 0)"/>
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
        stroke="hsl(189 100% 50%)"
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
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 07 · ne yapıyoruz'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Bir bakışta yetkinlikler.
          </h2>
        </RevealSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 md:grid-rows-[200px_200px_200px] gap-4">
          {/* Big featured — observability */}
          <TiltCard className="md:col-span-2 md:row-span-2 p-8 relative overflow-hidden border border-border bg-elevated">
            <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(189 100% 50% / 0.15), transparent 60%)' }}/>
            <p className="font-mono text-eyebrow uppercase text-accent">observability</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">Her isteği, her sorguyu, her hata izini görüyoruz.</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm">
              OpenTelemetry + Grafana + Loki yığını ile dağıtık trace, log korelasyonu, P99 alarm — production&apos;da görmediğiniz bir şey kalmaz.
            </p>
            <div className="mt-8 h-32 relative">
              <MiniChart />
            </div>
          </TiltCard>

          {/* Stat card — uptime */}
          <TiltCard className="p-6 border border-border bg-elevated flex flex-col justify-between">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">SLA</p>
            <div>
              <p className="text-5xl font-semibold tabular-nums tracking-tight">99.95<span className="text-accent">%</span></p>
              <p className="mt-2 text-xs text-muted-foreground font-mono">uptime SLA · gözlemlenen 99.973%</p>
            </div>
          </TiltCard>

          {/* Code mini */}
          <TiltCard className="p-6 border border-border bg-background">
            <p className="font-mono text-eyebrow uppercase text-accent">type-safe API</p>
            <pre className="mt-3 font-mono text-[10px] leading-relaxed text-foreground overflow-hidden">
{`router.post('/spin', async ({ user }) => {
  const result = await rng.generate({
    seed: cryptoSeed(),
    bet: user.bet,
  });
  return audit.commit(result);
});`}
            </pre>
          </TiltCard>

          {/* Quote */}
          <TiltCard className="p-6 border border-border bg-elevated md:col-span-2">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">Murat Karaağaç · CTO, PayGate</p>
            <p className="mt-3 text-base md:text-lg font-medium leading-snug">
              <span className="text-accent">&ldquo;</span>4 ayda core banking migrasyonu tamamlandı. Planlanan 12 saatlik kesinti penceresini sıfıra indirdiler; BDDK denetimi ilk turda geçildi.<span className="text-accent">&rdquo;</span>
            </p>
          </TiltCard>

          {/* Pill stat */}
          <TiltCard className="p-6 border border-border bg-elevated flex flex-col justify-between">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">teslim</p>
            <div>
              <p className="text-3xl font-semibold tracking-tight">6–14 <span className="text-base text-muted-foreground">hafta</span></p>
              <p className="mt-2 text-xs text-muted-foreground font-mono">brief → production</p>
            </div>
          </TiltCard>

          {/* Tech */}
          <TiltCard className="p-6 border border-border bg-elevated md:col-span-2">
            <p className="font-mono text-eyebrow uppercase text-accent">tech</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['TypeScript', 'Go', 'Kotlin', 'PostgreSQL', 'Kafka', 'k8s', 'Cloudflare', 'OpenTelemetry'].map((t) => (
                <span key={t} className="font-mono text-[11px] border border-border px-2 py-1 text-muted-foreground">
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
