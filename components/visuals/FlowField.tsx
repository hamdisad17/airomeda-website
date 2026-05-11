'use client';
import * as React from 'react';

export function FlowField() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (typeof window === 'undefined') return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (ctx) ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function onLeave() {
      mouseX = -1000;
      mouseY = -1000;
    }
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    // Particles
    type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };
    const PARTICLE_COUNT = 80;
    const particles: Particle[] = [];
    function spawn(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      };
    }
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(spawn());

    let raf = 0;
    let time = 0;

    function noise(x: number, y: number, t: number): number {
      // Cheap perlin-like via sine sums
      return (
        Math.sin(x * 0.005 + t * 0.0008) * Math.cos(y * 0.005 - t * 0.0006) +
        Math.sin(x * 0.012 - t * 0.0004) * 0.5
      );
    }

    function tick() {
      if (!ctx) return;
      time++;
      // Trail effect — erase old pixels with destination-out so it works on any bg (light/dark)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.strokeStyle = 'hsla(173, 80%, 45%, 0.45)';
      ctx.lineWidth = 0.7;

      for (const p of particles) {
        // Flow field direction
        const angle = noise(p.x, p.y, time) * Math.PI * 2;
        p.vx += Math.cos(angle) * 0.15;
        p.vy += Math.sin(angle) * 0.15;

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 30000) {
          const dist = Math.sqrt(dist2) || 1;
          const force = (1 - dist / 173) * 1.2;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Damping
        p.vx *= 0.94;
        p.vy *= 0.94;

        const px = p.x;
        const py = p.y;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Draw line segment
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Respawn if out or expired
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.life > p.maxLife) {
          Object.assign(p, spawn());
        }
      }

      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
      }}
    />
  );
}
