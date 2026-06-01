'use client';
import * as React from 'react';
import createGlobe, { type COBEOptions } from 'cobe';

// cobe v2 ships an outdated .d.ts that omits the `onRender` callback, but
// the runtime supports it (it's the canonical pattern in the README).
// Extend the type locally so we can drive the rotation per-frame.
type CobeOptionsWithRender = COBEOptions & {
  onRender?: (state: Record<string, number>) => void;
};

/**
 * Airomeda Globe — a Stripe/Vercel-style WebGL globe rendered via cobe.
 * Slowly auto-rotates, supports mouse drag, marks 10 cities Airomeda
 * works across. Wrapped in tilted orbital rings, satellite particles
 * and a layered cyan/violet glow so it reads as the brand's network.
 */

type Props = {
  className?: string;
};

// [lat, lng, marker size]
const CITIES: [number, number, number][] = [
  [41.0082, 28.9784, 0.08],   // Istanbul (HQ — bigger)
  [51.5074, -0.1278, 0.05],   // London
  [40.7128, -74.006, 0.06],   // New York
  [37.7749, -122.4194, 0.05], // San Francisco
  [35.6762, 139.6503, 0.05],  // Tokyo
  [1.3521, 103.8198, 0.04],   // Singapore
  [25.2048, 55.2708, 0.05],   // Dubai
  [52.52, 13.405, 0.04],      // Berlin
  [-33.8688, 151.2093, 0.04], // Sydney
  [-23.5505, -46.6333, 0.05], // São Paulo
];

export function Globe({ className }: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const pointerInteracting = React.useRef<number | null>(null);
  const pointerInteractionMovement = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0;
    let width = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const options: CobeOptionsWithRender = {
      devicePixelRatio: window.devicePixelRatio || 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.32,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      // mapBrightness controls how bright the continent dots are.
      // baseColor is the OCEAN colour; the continent dots draw multiplied
      // against baseColor and brightened by mapBrightness. We need a
      // visible ocean tone + high enough brightness for crisp landmasses.
      mapBrightness: 7,
      mapBaseBrightness: 0.05,
      baseColor: [0.15, 0.22, 0.42],
      markerColor: [0.49, 1, 1],
      glowColor: [0.4, 0.55, 1],
      markers: CITIES.map(([lat, lng, size]) => ({ location: [lat, lng], size })),
      onRender: (state) => {
        if (pointerInteracting.current === null) phi += 0.0035;
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    };
    const globe = createGlobe(canvas, options);

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      canvas.style.cursor = 'grabbing';
    };
    const onPointerUp = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = 'grab';
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta / 100;
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    // Fade-in once the first frame has been rendered.
    requestAnimationFrame(() => {
      canvas.style.opacity = '1';
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      {/* Outer ambient pulse halo */}
      <div
        aria-hidden
        className="absolute inset-[-22%] pulse-halo pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgb(0 212 255 / 0.28) 0%, rgb(168 85 247 / 0.18) 45%, transparent 75%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
        }}
      />

      {/* 3 conic halo rings (existing rotate-slow utility) */}
      <div
        aria-hidden
        className="absolute inset-[-8%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(0 212 255 / 0.55) 18%, transparent 36%, rgb(168 85 247 / 0.5) 60%, transparent 78%, rgb(236 72 153 / 0.4) 92%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-14%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 90deg, transparent 0%, rgb(255 255 255 / 0.35) 25%, transparent 50%, rgb(168 85 247 / 0.3) 75%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
          animationDuration: '32s',
          animationDirection: 'reverse',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-22%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 180deg, transparent 0%, rgb(0 212 255 / 0.25) 33%, transparent 66%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          animationDuration: '48s',
        }}
      />

      {/* === TILTED ORBITAL RINGS — light beams passing around globe === */}
      <div
        aria-hidden
        className="absolute inset-[-2%] pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0,212,255,0.45)',
            boxShadow:
              '0 0 30px rgba(0,212,255,0.35), inset 0 0 30px rgba(0,212,255,0.25)',
            transform: 'rotateX(75deg) rotateZ(8deg)',
            animation: 'orbit-ring-spin 18s linear infinite',
          }}
        />
        <div
          className="absolute inset-[-6%] rounded-full"
          style={{
            border: '1px solid rgba(168,85,247,0.4)',
            boxShadow:
              '0 0 30px rgba(168,85,247,0.3), inset 0 0 30px rgba(168,85,247,0.2)',
            transform: 'rotateX(60deg) rotateZ(-22deg)',
            animation: 'orbit-ring-spin 26s linear infinite reverse',
          }}
        />
        <div
          className="absolute inset-[-12%] rounded-full"
          style={{
            border: '1px solid rgba(236,72,153,0.32)',
            boxShadow:
              '0 0 30px rgba(236,72,153,0.25), inset 0 0 30px rgba(236,72,153,0.15)',
            transform: 'rotateX(70deg) rotateZ(45deg)',
            animation: 'orbit-ring-spin 34s linear infinite',
          }}
        />
      </div>

      {/* === SATELLITE PARTICLES orbiting the globe === */}
      {Array.from({ length: 8 }).map((_, i) => (
        <SatelliteOrbit key={i} index={i} />
      ))}

      {/* === GLOBE CANVAS === */}
      <div className="relative aspect-square w-full" style={{ maxWidth: '600px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            cursor: 'grab',
            opacity: 0,
            transition: 'opacity 800ms ease',
            contain: 'layout paint size',
          }}
        />
        {/* Subtle inner vignette so the globe seats into the cosmic depth */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(circle, transparent 56%, rgba(2,5,18,0.35) 100%)',
          }}
        />
      </div>

      <style>{`
        @keyframes orbit-ring-spin {
          from { transform: rotateX(75deg) rotateZ(8deg) rotate(0deg); }
          to   { transform: rotateX(75deg) rotateZ(8deg) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function SatelliteOrbit({ index }: { index: number }) {
  const colors = ['#00d4ff', '#a855f7', '#ec4899', '#7dffff', '#c084fc', '#22d3ee', '#ffffff', '#00d4ff'];
  const color = colors[index % colors.length];
  const angle = (index * 45) % 360;
  const radius = 50 + (index % 4) * 5;
  const duration = 12 + (index % 5) * 3;
  const delay = -(index * 1.5);
  const size = index % 3 === 0 ? 9 : 6;

  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: 0,
        height: 0,
        transformOrigin: '0 0',
        animation: `sat-${index} ${duration}s linear ${delay}s infinite`,
      }}
    >
      <style>{`
        @keyframes sat-${index} {
          from { transform: rotate(${angle}deg) translateX(${radius}%) rotate(-${angle}deg); }
          to   { transform: rotate(${angle + 360}deg) translateX(${radius}%) rotate(-${angle + 360}deg); }
        }
      `}</style>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}, 0 0 36px ${color}`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
