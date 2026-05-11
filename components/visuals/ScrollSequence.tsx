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

function CommitVisual() {
  return (
    <div className="font-mono text-xs space-y-2 text-left w-full max-w-sm">
      <p className="text-muted-foreground">$ git commit -m &quot;feat(banking): add 3DS challenge&quot;</p>
      <p className="text-success">✓ pre-commit hook passed</p>
      <p className="text-success">✓ lint — 0 errors</p>
      <p className="text-success">✓ typecheck — 0 errors</p>
      <p className="text-foreground/70">[main 6422b59] feat(banking): add 3DS challenge</p>
      <p className="text-foreground/70"> 3 files changed, 47 insertions(+), 12 deletions(-)</p>
    </div>
  );
}

function CIVisual() {
  return (
    <div className="font-mono text-xs space-y-2 text-left w-full max-w-sm">
      <p className="text-muted-foreground">GitHub Actions · build #4827 · triggered by push</p>
      <div className="space-y-1">
        {[
          { label: 'setup Node 24', done: true },
          { label: 'pnpm install (cached)', done: true },
          { label: 'lint check', done: true },
          { label: 'typecheck', done: true },
          { label: 'test suite', done: true },
        ].map((step) => (
          <p key={step.label} className={step.done ? 'text-success' : 'text-muted-foreground'}>
            {step.done ? '✓' : '↻'} {step.label}
          </p>
        ))}
      </div>
      <p className="text-accent pt-1">⏱ 4m 18s · all checks passed</p>
    </div>
  );
}

function TestVisual() {
  const suites = [
    { name: 'unit', count: 847, duration: '3.4s' },
    { name: 'integration', count: 124, duration: '12.1s' },
    { name: 'e2e', count: 28, duration: '47.8s' },
  ];
  return (
    <div className="font-mono text-xs space-y-3 text-left w-full max-w-sm">
      {suites.map((s) => (
        <div key={s.name} className="space-y-1">
          <div className="flex items-center justify-between text-muted-foreground uppercase tracking-wider text-[10px]">
            <span>{s.name}</span>
            <span>{s.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-border">
              <div className="h-full bg-success" style={{ width: '100%' }} />
            </div>
            <span className="text-success tabular-nums">{s.count} passed</span>
          </div>
        </div>
      ))}
      <p className="pt-2 text-success border-t border-border">✓ 999 tests · 0 failed · coverage 94.2%</p>
    </div>
  );
}

function BuildVisual() {
  return (
    <div className="font-mono text-xs space-y-2 text-left w-full max-w-sm">
      <p className="text-muted-foreground">$ docker buildx build --platform linux/amd64,arm64</p>
      <p className="text-foreground/70">↻ Building airomeda/core:6422b59...</p>
      <p className="text-success">✓ Layer cache hit: 3/4</p>
      <p className="text-success">✓ multi-arch build complete (2m 41s)</p>
      <p className="text-success">✓ Pushed to ghcr.io/airomeda/core:6422b59</p>
      <p className="text-muted-foreground">   Size: 24.8 MB · 4 layers</p>
    </div>
  );
}

function DeployVisual() {
  return (
    <div className="font-mono text-xs space-y-2 text-left w-full max-w-sm">
      <p className="text-muted-foreground">$ kubectl apply -f k8s/deployment.yaml</p>
      <p className="text-foreground/70">↻ deployment.apps/airomeda-core configured</p>
      <p className="text-foreground/70">↻ Rolling update: 0/3 pods ready...</p>
      <p className="text-foreground/70">↻ Rolling update: 1/3 pods ready...</p>
      <p className="text-foreground/70">↻ Rolling update: 2/3 pods ready...</p>
      <p className="text-accent">✓ 3/3 pods ready (8s) · fra1 + lon1 + ist1</p>
    </div>
  );
}

function LiveVisual() {
  return (
    <div className="font-mono text-xs space-y-2 text-left w-full max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="text-success uppercase tracking-wider text-[10px]">production · all systems operational</span>
      </div>
      {[
        { label: 'uptime', value: '99.973%' },
        { label: 'P50 latency', value: '18ms' },
        { label: 'traffic', value: '100% new version' },
        { label: 'region', value: 'fra1 · lon1 · ist1 · iad1' },
      ].map((row) => (
        <div key={row.label} className="flex justify-between">
          <span className="text-muted-foreground">{row.label}</span>
          <span className="text-accent tabular-nums">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

const FRAMES: Frame[] = [
  {
    id: 1,
    eyebrow: '01 · commit',
    title: 'feat(banking): add 3DS challenge',
    subtitle: "Her değişiklik belgelenir, lint ve typecheck geçmeden pipeline'a girmez.",
    tone: 'foreground',
    visual: <CommitVisual />,
  },
  {
    id: 2,
    eyebrow: '02 · CI',
    title: 'GitHub Actions · 4m 18s',
    subtitle: "Paralel job'lar — lint, typecheck, build cache — her push'ta otomatik tetiklenir.",
    tone: 'foreground',
    visual: <CIVisual />,
  },
  {
    id: 3,
    eyebrow: '03 · test',
    title: '847 unit · 124 integration · 28 e2e',
    subtitle: "%94.2 test coverage. Hiçbir commit 999 testi geçmeden pipeline'ı ilerletemiyor.",
    tone: 'foreground',
    visual: <TestVisual />,
  },
  {
    id: 4,
    eyebrow: '04 · build',
    title: 'multi-arch docker · ghcr.io',
    subtitle: 'linux/amd64 + arm64. Layer cache ile 4 dakikadan 2.7 dakikaya.',
    tone: 'foreground',
    visual: <BuildVisual />,
  },
  {
    id: 5,
    eyebrow: '05 · deploy',
    title: 'k8s rolling update · 8 saniye',
    subtitle: 'Sıfır downtime. fra1 birincil, lon1 yedek, ist1 edge — paralel rolling update.',
    tone: 'accent',
    visual: <DeployVisual />,
  },
  {
    id: 6,
    eyebrow: '06 · live',
    title: 'production · 100% traffic',
    subtitle: '99.973% uptime, 18ms P50. Devir teslimde bu hattın sahibi siz olacaksınız.',
    tone: 'accent',
    visual: <LiveVisual />,
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
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.1), transparent 70%)' }}
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
          scroll ↓ to advance pipeline
        </p>
      </Container>
    </section>
  );
}
