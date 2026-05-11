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
        stroke={accent ? '#14B8A6' : 'currentColor'}
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

interface ActivityLine {
  actor: string;
  action: string;
  badge?: string;
  badgeTone?: 'success' | 'accent' | 'muted';
  minsAgo: number;
  key?: number;
}

const ACTIVITY_TEMPLATES: Omit<ActivityLine, 'minsAgo' | 'key'>[] = [
  { actor: 'Ahmet K.', action: 'yeni sipariş verdi · ₺245', badge: 'Sipariş', badgeTone: 'success' },
  { actor: 'Ayşe T.', action: 'üyelik oluşturdu', badge: 'Yeni Üye', badgeTone: 'accent' },
  { actor: 'Mehmet Y.', action: 'yorum bıraktı · ⭐⭐⭐⭐⭐', badge: 'Yorum', badgeTone: 'accent' },
  { actor: 'Sistem', action: 'stok güncellendi · 234 yeni ürün', badge: 'Stok', badgeTone: 'muted' },
  { actor: 'Kampanya', action: 'bildirimi gönderildi · 1.247 müşteri', badge: 'Pazarlama', badgeTone: 'accent' },
  { actor: 'Selin A.', action: 'yeni mesaj gönderdi', badge: 'Mesaj', badgeTone: 'success' },
  { actor: 'Kemal B.', action: 'siparişini teslim aldı', badge: 'Teslim', badgeTone: 'success' },
  { actor: 'Sistem', action: 'günlük satış raporu hazırlandı', badge: 'Rapor', badgeTone: 'muted' },
  { actor: 'Fatma D.', action: 'sepetine ürün ekledi · ₺189', badge: 'Sepet', badgeTone: 'muted' },
  { actor: 'Ali R.', action: 'fatura talebinde bulundu', badge: 'Fatura', badgeTone: 'muted' },
];

function badgeClass(tone?: ActivityLine['badgeTone']): string {
  switch (tone) {
    case 'success': return 'bg-success/15 text-success';
    case 'accent': return 'bg-accent/15 text-accent';
    default: return 'bg-muted text-muted-foreground';
  }
}

function LiveLog() {
  const [lines, setLines] = React.useState<ActivityLine[]>(() =>
    ACTIVITY_TEMPLATES.slice(0, 6).map((l, i) => ({ ...l, minsAgo: i * 5 + 2, key: i })),
  );

  React.useEffect(() => {
    const t = setInterval(() => {
      setLines((curr) => {
        const template = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
        if (!template) return curr;
        const stamped: ActivityLine = {
          ...template,
          minsAgo: Math.floor(Math.random() * 3) + 1,
          key: Date.now() + Math.random(),
        };
        return [stamped, ...curr.map((l) => ({ ...l, minsAgo: l.minsAgo + 1 }))].slice(0, 6);
      });
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="text-[11px]">
      {lines.map((l, i) => (
        <div
          key={l.key ?? i}
          className="px-4 md:px-6 py-2 border-b border-border last:border-b-0 flex items-center gap-2 md:gap-3 hover:bg-muted/30 transition-colors"
        >
          <span className="text-muted-foreground tabular-nums w-16 md:w-20 shrink-0">
            {l.minsAgo} dk
          </span>
          <span className="font-medium text-foreground shrink-0 hidden sm:inline">{l.actor}</span>
          <span className="flex-1 text-muted-foreground truncate min-w-0">{l.action}</span>
          {l.badge && (
            <span className={`px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-sm shrink-0 hidden sm:inline ${badgeClass(l.badgeTone)}`}>
              {l.badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProductionHeartbeat() {
  const orders = useTickingNumber(1247, [1, 3], 2200);
  const revenue = useTickingNumber(247890, [150, 400], 3000);
  const newCustomers = useTickingNumber(127, [0, 0.8], 4500);
  const messages = useTickingNumber(8, [0, 0.1], 6000);

  return (
    <section id="production-heartbeat" className="border-b border-border bg-elevated/30 py-20 md:py-28 relative overflow-hidden">
      {/* atmospheric bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgb(20 184 166 / 0.1), transparent 70%)',
        }}
      />

      <Container as="div" className="relative">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">Yönetim Panosu</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Her Şey Tek Yerde.<br />Her An Göz Önünde.
              </h2>
            </div>
            <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Canlı · Gerçek zamanlı takip
            </div>
          </div>
        </RevealSection>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {/* Card: Orders */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Bugünkü siparişler
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {Math.floor(orders).toLocaleString('tr-TR')}
            </p>
            <div className="mt-4">
              <Sparkline accent />
            </div>
            <p className="mt-2 font-mono text-[10px] text-success">↑ artıyor · son saat</p>
          </div>

          {/* Card: Revenue */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Toplam ciro · 7 gün
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              ₺{Math.floor(revenue).toLocaleString('tr-TR')}
            </p>
            <div className="mt-4">
              <HeartbeatBar />
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              bu hafta · tüm kanallar
            </p>
          </div>

          {/* Card: New customers */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Yeni müşteri · bugün
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {Math.floor(newCustomers).toLocaleString('tr-TR')}
            </p>
            <div
              className="mt-4 grid gap-px h-10"
              style={{ gridTemplateColumns: 'repeat(30, 1fr)' }}
            >
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={i >= 27 ? 'bg-accent/40' : 'bg-success/35'}
                />
              ))}
            </div>
            <p className="mt-2 font-mono text-[10px] text-success">↑ %18 · geçen haftaya göre</p>
          </div>

          {/* Card: Messages */}
          <div className="bg-background p-6">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              Bekleyen mesajlar
            </p>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-foreground">
              {Math.floor(messages)}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px]">
              <span className="inline-flex px-2 py-0.5 bg-accent/15 text-accent font-mono uppercase tracking-wider text-[10px]">Yanıtla</span>
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              müşteri soruları · gelen kutusu
            </p>
          </div>
        </div>

        {/* Live activity feed */}
        <div className="mt-px border border-border bg-background overflow-hidden">
          <div className="border-b border-border px-6 py-2.5 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Müşterilerin Canlı Aktiviteleri
            </p>
            <p className="font-mono text-[10px] text-success">● canlı</p>
          </div>
          <LiveLog />
        </div>
      </Container>
    </section>
  );
}
