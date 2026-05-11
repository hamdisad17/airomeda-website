'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const REGIONS = [
  { name: 'Frankfurt', lat: 50.11, lon: 8.68, weight: 1.0 },
  { name: 'London', lat: 51.51, lon: -0.13, weight: 0.9 },
  { name: 'New York', lat: 40.71, lon: -74.01, weight: 0.85 },
  { name: 'San Francisco', lat: 37.77, lon: -122.42, weight: 0.7 },
  { name: 'Singapore', lat: 1.35, lon: 103.82, weight: 0.6 },
  { name: 'Sydney', lat: -33.87, lon: 151.21, weight: 0.5 },
  { name: 'São Paulo', lat: -23.55, lon: -46.63, weight: 0.5 },
  { name: 'Tokyo', lat: 35.68, lon: 139.69, weight: 0.7 },
  { name: 'Istanbul', lat: 41.01, lon: 28.98, weight: 1.0 },
  { name: 'Mumbai', lat: 19.08, lon: 72.88, weight: 0.4 },
];

function latLonTo3D(lat: number, lon: number, r: number, rotation: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + rotation) * (Math.PI / 180);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

export function DeploymentGlobe() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    let rotation = 0;
    let raf = 0;
    const arcs: { from: number; to: number; t: number; speed: number }[] = [];

    function spawnArc() {
      const from = Math.floor(Math.random() * REGIONS.length);
      let to = from;
      while (to === from) to = Math.floor(Math.random() * REGIONS.length);
      arcs.push({ from, to, t: 0, speed: 0.008 + Math.random() * 0.008 });
    }
    const arcTimer = setInterval(spawnArc, 700);
    for (let i = 0; i < 3; i++) spawnArc();

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      rotation += 0.08;

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      // Dot grid sphere
      const latStep = 8;
      for (let lat = -80; lat <= 80; lat += latStep) {
        const ringR = Math.cos((lat * Math.PI) / 180);
        const ringCount = Math.max(4, Math.round(36 * ringR));
        for (let i = 0; i < ringCount; i++) {
          const lon = (i / ringCount) * 360 - 180;
          const p = latLonTo3D(lat, lon, r, rotation);
          if (p.z < 0) continue; // back face cull
          const alpha = Math.max(0, p.z / r) * 0.4;
          ctx.fillStyle = `hsla(189, 100%, 50%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(cx + p.x, cy + p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Region markers
      const projected = REGIONS.map((reg) => {
        const p = latLonTo3D(reg.lat, reg.lon, r, rotation);
        return { reg, p, visible: p.z >= -r * 0.1 };
      });
      projected.forEach(({ reg, p, visible }) => {
        if (!visible) return;
        const px = cx + p.x;
        const py = cy + p.y;
        const alpha = Math.max(0.3, p.z / r);
        // Outer pulse
        ctx.fillStyle = `hsla(189, 100%, 60%, ${0.15 * alpha})`;
        ctx.beginPath();
        ctx.arc(
          px,
          py,
          8 + Math.sin(rotation * 0.04 + reg.weight * 3) * 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        // Core
        ctx.fillStyle = `hsla(189, 100%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fill();
        // Outer ring
        ctx.strokeStyle = `hsla(189, 100%, 60%, ${alpha * 0.6})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Arcs — filter completed ones in-place
      for (let ai = arcs.length - 1; ai >= 0; ai--) {
        const a = arcs[ai];
        if (!a) continue;
        if (a.t >= 1) {
          arcs.splice(ai, 1);
          continue;
        }
        const fromRegion = REGIONS[a.from];
        const toRegion = REGIONS[a.to];
        if (!fromRegion || !toRegion) { a.t += a.speed; continue; }
        const pFrom = latLonTo3D(fromRegion.lat, fromRegion.lon, r, rotation);
        const pTo = latLonTo3D(toRegion.lat, toRegion.lon, r, rotation);
        if (pFrom.z < -r * 0.3 && pTo.z < -r * 0.3) {
          a.t += a.speed;
          continue;
        }
        // Bezier curve through arc height
        const midX = (pFrom.x + pTo.x) / 2;
        const midY = (pFrom.y + pTo.y) / 2;
        const midZ = (pFrom.z + pTo.z) / 2;
        const distToCenter = Math.sqrt(midX * midX + midY * midY + midZ * midZ);
        const lift = (r * 0.4) / Math.max(distToCenter, 1);
        const liftX = midX * (1 + lift);
        const liftY = midY * (1 + lift);

        const t = a.t;
        const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        // Quadratic interpolation head position
        const px =
          (1 - easeT) * (1 - easeT) * pFrom.x +
          2 * (1 - easeT) * easeT * liftX +
          easeT * easeT * pTo.x;
        const py =
          (1 - easeT) * (1 - easeT) * pFrom.y +
          2 * (1 - easeT) * easeT * liftY +
          easeT * easeT * pTo.y;

        ctx.strokeStyle = `hsla(189, 100%, 60%, ${1 - Math.abs(t - 0.5) * 2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Draw fading tail
        const steps = 12;
        for (let i = 0; i < steps; i++) {
          const tt = Math.max(0, t - i * 0.012);
          const eT = tt < 0.5 ? 2 * tt * tt : 1 - Math.pow(-2 * tt + 2, 2) / 2;
          const xx =
            (1 - eT) * (1 - eT) * pFrom.x +
            2 * (1 - eT) * eT * liftX +
            eT * eT * pTo.x;
          const yy =
            (1 - eT) * (1 - eT) * pFrom.y +
            2 * (1 - eT) * eT * liftY +
            eT * eT * pTo.y;
          if (i === 0) ctx.moveTo(cx + xx, cy + yy);
          else ctx.lineTo(cx + xx, cy + yy);
        }
        ctx.stroke();

        // Head dot
        ctx.fillStyle = 'hsl(189 100% 70%)';
        ctx.beginPath();
        ctx.arc(cx + px, cy + py, 1.8, 0, Math.PI * 2);
        ctx.fill();

        a.t += a.speed;
      }

      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(arcTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="border-b border-border py-20 md:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(189 100% 50% / 0.08), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <RevealSection>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Dünya Çapında</p>
            <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
              İstanbul&apos;dan yazıyoruz.
              <br />
              Tüm dünyaya hizmet veriyoruz.
            </h2>
            <p className="mt-4 max-w-md text-body-lg text-muted-foreground">
              İstanbul ofisimizden 130&apos;dan fazla ülkedeki müşterilerimize kesintisiz hizmet sunuyoruz. Dünyanın her yerinden erişilebilir, hızlı ve güvenilir.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                  hizmet verilen ülke
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">
                  130+
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                  aktif müşteri
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">
                  85+
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                  uzman ekip
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">
                  36 <span className="text-base text-muted-foreground">kişi</span>
                </dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                  destek hattı
                </dt>
                <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-foreground">
                  7/24
                </dd>
              </div>
            </dl>
          </RevealSection>
          <div className="relative aspect-square w-full max-w-[640px] mx-auto">
            <canvas ref={canvasRef} className="w-full h-full" aria-hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}
