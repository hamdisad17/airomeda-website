'use client';
import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

function useTickingNumber(
  initial: number,
  deltaRange: [number, number],
  intervalMs = 1500,
) {
  const [val, setVal] = React.useState(initial);
  React.useEffect(() => {
    const t = setInterval(() => {
      const d =
        Math.random() * (deltaRange[1] - deltaRange[0]) + deltaRange[0];
      setVal((v) => v + d);
    }, intervalMs);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deltaRange[0], deltaRange[1], intervalMs]);
  return val;
}

function Sparkline({ accent = false }: { accent?: boolean }) {
  const [values, setValues] = React.useState<number[]>(() =>
    Array.from({ length: 24 }, () => Math.random() * 0.6 + 0.2),
  );

  React.useEffect(() => {
    const t = setInterval(() => {
      setValues((prev) => {
        const arr = [...prev];
        const head = arr.shift() ?? 0;
        const next = head + (Math.random() - 0.5) * 0.15;
        arr.push(Math.max(0.1, Math.min(0.9, next)));
        return arr;
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  const d = values
    .map(
      (y, i) =>
        `${i === 0 ? 'M' : 'L'}${(i / (values.length - 1)) * 100},${(1 - y) * 32}`,
    )
    .join(' ');

  return (
    <svg viewBox="0 0 100 32" className="w-full h-10" preserveAspectRatio="none">
      <path
        d={d}
        fill="none"
        stroke={accent ? 'hsl(189 100% 50%)' : 'currentColor'}
        strokeWidth="1"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={accent ? '' : 'text-muted-foreground/50'}
      />
    </svg>
  );
}

// stable initial heights generated once at module load to avoid Math.random in render
const HB_HEIGHTS = Array.from({ length: 32 }, () => Math.floor(30 + Math.random() * 70));

function HeartbeatBar() {
  const ref = React.useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const bars = ref.current.querySelectorAll('.hb-bar');
      bars.forEach((bar, i) => {
        gsap.to(bar, {
          scaleY: () => 0.3 + Math.random() * 0.7,
          duration: 0.6 + Math.random() * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.05,
        });
      });
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className="flex items-end gap-0.5 h-10">
      {HB_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="hb-bar w-1 bg-accent/60 origin-bottom"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const LOG_LINES = [
  { method: 'POST', path: '/api/v1/transactions/authorize', status: 200, ms: 18, region: 'fra1' },
  { method: 'GET',  path: '/api/v1/users/balance',           status: 200, ms: 12, region: 'fra1' },
  { method: 'POST', path: '/api/v1/games/spin',              status: 200, ms: 22, region: 'lon1' },
  { method: 'POST', path: '/api/v1/orders/checkout',         status: 200, ms: 34, region: 'fra1' },
  { method: 'PUT',  path: '/api/v1/inventory/sku/4421',      status: 204, ms: 9,  region: 'fra1' },
  { method: 'POST', path: '/api/v1/auth/verify',             status: 200, ms: 14, region: 'iad1' },
  { method: 'GET',  path: '/api/v1/transactions/12847',      status: 200, ms: 7,  region: 'fra1' },
  { method: 'POST', path: '/api/v1/payments/3ds',            status: 200, ms: 28, region: 'fra1' },
  { method: 'POST', path: '/api/v1/rng/generate',            status: 200, ms: 4,  region: 'lon1' },
  { method: 'POST', path: '/api/v1/webhook/iyzico',          status: 200, ms: 11, region: 'fra1' },
];

interface LogLine {
  method: string;
  path: string;
  status: number;
  ms: number;
  region: string;
  key?: number;
}

function LiveLog() {
  const [lines, setLines] = React.useState<LogLine[]>(() =>
    LOG_LINES.slice(0, 6).map((l, i) => ({ ...l, key: i })),
  );

  React.useEffect(() => {
    const t = setInterval(() => {
      setLines((curr) => {
        const template = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
        if (!template) return curr;
        const stamped: LogLine = {
          method: template.method,
          path: template.path,
          status: template.status,
          region: template.region,
          ms: Math.max(2, template.ms + Math.floor((Math.random() - 0.5) * 8)),
          key: Date.now() + Math.random(),
        };
        return [stamped, ...curr].slice(0, 6);
      });
    }, 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="font-mono text-[11px]">
      {lines.map((l, i) => (
        <div
          key={l.key ?? i}
          className="px-6 py-1.5 border-b border-border last:border-b-0 flex items-center gap-4 hover:bg-muted/30 transition-colors"
        >
          <span className="text-muted-foreground tabular-nums w-16">
            {new Date().toLocaleTimeString('tr-TR', { hour12: false })}
          </span>
          <span
            className={`w-12 ${
              l.method === 'GET'
                ? 'text-accent'
                : l.method === 'POST'
                  ? 'text-success'
                  : 'text-foreground/70'
            }`}
          >
            {l.method}
          </span>
          <span className="flex-1 text-foreground truncate">{l.path}</span>
          <span className="text-muted-foreground w-12 tabular-nums">{l.region}</span>
          <span className="text-success tabular-nums w-12">{l.status}</span>
          <span className="text-muted-foreground tabular-nums w-14 text-right">{l.ms}ms</span>
        </div>
      ))}
    </div>
  );
}

export function ProductionHeartbeat() {
  const txns = useTickingNumber(1847291, [6, 28], 900);
  const deploys = useTickingNumber(287, [0, 0.005], 4000);
  const latency = useTickingNumber(18, [-1.2, 1.5], 2200);
  const uptime = 99.973;

  return (
    <section id="production-heartbeat" className="border-b border-border bg-elevated/30 py-20 md:py-28 relative overflow-hidden">
      {/* atmospheric bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, hsl(189 100% 50% / 0.1), transparent 70%)',
        }}
      />

      <Container as="div" className="relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · canlı sistem'}</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Bizim sistemlerimiz.<br />Şu anda canlı.
              </h2>
            </div>
            <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              status.airomeda.com · all systems operational
            </div>
          </div>
        </RevealSection>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {/* Card: Transactions */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Bugün işlenen işlem
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {Math.floor(txns).toLocaleString('tr-TR')}
            </p>
            <div className="mt-4">
              <Sparkline accent />
            </div>
            <p className="mt-2 font-mono text-[10px] text-success">↑ 12.4% · son saat</p>
          </div>

          {/* Card: Latency */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Ortalama yanıt (P50)
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              <span>{latency.toFixed(0)}</span>
              <span className="text-base text-muted-foreground ml-1">ms</span>
            </p>
            <div className="mt-4">
              <HeartbeatBar />
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              tüm bölgeler · son 5 dk
            </p>
          </div>

          {/* Card: Uptime */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Aylık çalışma süresi
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {uptime.toFixed(3)}
              <span className="text-base text-muted-foreground">%</span>
            </p>
            <div
              className="mt-4 grid gap-px h-10"
              style={{ gridTemplateColumns: 'repeat(30, 1fr)' }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={i === 9 ? 'bg-accent/30' : 'bg-success/40'}
                />
              ))}
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              son 30 gün · SLA %99.95 · gözlemlenen %99.973
            </p>
          </div>

          {/* Card: Deploys */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Aylık deployment
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {Math.floor(deploys).toLocaleString('tr-TR')}
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px]">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-muted-foreground">son: 22 dk önce · fra1</span>
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              production · k8s rolling · auto-deploy
            </p>
          </div>
        </div>

        {/* Live request log strip */}
        <div className="mt-px border border-border bg-background overflow-hidden">
          <div className="border-b border-border px-6 py-2.5 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              canlı istek akışı · production
            </p>
            <p className="font-mono text-[10px] text-success">● live</p>
          </div>
          <LiveLog />
        </div>
      </Container>
    </section>
  );
}
