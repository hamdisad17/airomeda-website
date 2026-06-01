'use client';
import * as React from 'react';

/**
 * Galaxy — a layered starfield that actually looks like deep space.
 *
 *  • Three depth layers (far / mid / near) with different sizes + opacities
 *  • Stars are deterministically placed via a seeded PRNG so SSR/CSR match
 *  • Two nebula clouds (violet + cyan) drift slowly
 *  • Background-color radial drop-in for the void
 *  • Slow whole-galaxy rotation gives the depth a parallax feel
 *
 * Place this once inside any section that wants the deep-space look.
 * It absolutely-positions itself; needs a `relative` parent.
 */

type GalaxyProps = {
  /** How many stars per depth layer. Defaults: 60 far / 35 mid / 18 near. */
  density?: 'low' | 'normal' | 'high';
  /** Disable the slow rotation for cards / reduced-motion contexts. */
  static?: boolean;
};

// Tiny seeded PRNG so layouts are stable between renders / SSR vs CSR.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  color: string;
  twinkleDur: number;
  twinkleDelay: number;
};

function generateStars(seed: number, count: number, opts: { rMin: number; rMax: number; opacity: [number, number]; colors: string[] }): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const colorIdx = Math.floor(rand() * opts.colors.length);
    return {
      x: rand() * 100,
      y: rand() * 100,
      r: opts.rMin + rand() * (opts.rMax - opts.rMin),
      opacity: opts.opacity[0] + rand() * (opts.opacity[1] - opts.opacity[0]),
      color: opts.colors[colorIdx] ?? '#ffffff',
      twinkleDur: 2 + rand() * 4,
      twinkleDelay: rand() * -4,
    };
  });
}

export function Galaxy({ density = 'normal', static: isStatic = false }: GalaxyProps) {
  const counts =
    density === 'low'
      ? { far: 40, mid: 22, near: 12 }
      : density === 'high'
        ? { far: 90, mid: 55, near: 28 }
        : { far: 65, mid: 38, near: 18 };

  const far = React.useMemo(
    () =>
      generateStars(11, counts.far, {
        rMin: 0.4,
        rMax: 0.9,
        opacity: [0.3, 0.7],
        colors: ['#cfd6ff', '#ffffff', '#a8b4d6'],
      }),
    [counts.far],
  );
  const mid = React.useMemo(
    () =>
      generateStars(91, counts.mid, {
        rMin: 0.8,
        rMax: 1.6,
        opacity: [0.5, 0.95],
        colors: ['#ffffff', '#7dffff', '#c084fc', '#ffd6f0'],
      }),
    [counts.mid],
  );
  const near = React.useMemo(
    () =>
      generateStars(173, counts.near, {
        rMin: 1.6,
        rMax: 2.6,
        opacity: [0.8, 1],
        colors: ['#ffffff', '#00d4ff', '#a855f7', '#ec4899'],
      }),
    [counts.near],
  );

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgb(40 12 80 / 0.25) 0%, transparent 55%),' +
            'radial-gradient(ellipse 70% 50% at 90% 80%, rgb(0 60 120 / 0.30) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 55% at 15% 70%, rgb(60 8 90 / 0.20) 0%, transparent 65%),' +
            'linear-gradient(180deg, #02050f 0%, #060b22 30%, #02050f 100%)',
        }}
      />

      {/* Nebula clouds — slow drifting violet + cyan + pink */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 35% 22% at 22% 28%, rgb(168 85 247 / 0.32) 0%, transparent 60%),' +
            'radial-gradient(ellipse 28% 18% at 75% 62%, rgb(0 212 255 / 0.22) 0%, transparent 60%),' +
            'radial-gradient(ellipse 25% 15% at 55% 18%, rgb(236 72 153 / 0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
          animation: isStatic ? undefined : 'galaxy-drift 28s ease-in-out infinite',
        }}
      />

      {/* Whole-galaxy slow rotation wrapper */}
      <div
        className="absolute inset-0"
        style={{
          animation: isStatic ? undefined : 'galaxy-spin 240s linear infinite',
        }}
      >
        {/* Far layer — distant pinprick stars (dimmest) */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {far.map((s, i) => (
            <circle
              key={`f${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r * 0.2}
              fill={s.color}
              opacity={s.opacity}
            >
              {!isStatic && (
                <animate
                  attributeName="opacity"
                  values={`${s.opacity};${s.opacity * 0.3};${s.opacity}`}
                  dur={`${s.twinkleDur}s`}
                  begin={`${s.twinkleDelay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </svg>

        {/* Mid layer — medium stars, some colored */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="star-glow-mid" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="0.3" />
            </filter>
          </defs>
          {mid.map((s, i) => (
            <circle
              key={`m${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r * 0.25}
              fill={s.color}
              opacity={s.opacity}
              filter="url(#star-glow-mid)"
            >
              {!isStatic && (
                <animate
                  attributeName="opacity"
                  values={`${s.opacity};${s.opacity * 0.4};${s.opacity}`}
                  dur={`${s.twinkleDur}s`}
                  begin={`${s.twinkleDelay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </svg>

        {/* Near layer — big bright stars, four-point spike + halo */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="star-glow-near" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>
          {near.map((s, i) => (
            <g key={`n${i}`}>
              {/* Halo */}
              <circle
                cx={s.x}
                cy={s.y}
                r={s.r * 0.9}
                fill={s.color}
                opacity={s.opacity * 0.4}
                filter="url(#star-glow-near)"
              />
              {/* Core */}
              <circle cx={s.x} cy={s.y} r={s.r * 0.35} fill="white" opacity={s.opacity}>
                {!isStatic && (
                  <animate
                    attributeName="opacity"
                    values={`${s.opacity};${s.opacity * 0.5};${s.opacity}`}
                    dur={`${s.twinkleDur}s`}
                    begin={`${s.twinkleDelay}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              {/* Cross spikes (subtle 4-point flare) */}
              <line
                x1={s.x - s.r}
                y1={s.y}
                x2={s.x + s.r}
                y2={s.y}
                stroke={s.color}
                strokeWidth={0.04}
                opacity={s.opacity * 0.55}
              />
              <line
                x1={s.x}
                y1={s.y - s.r}
                x2={s.x}
                y2={s.y + s.r}
                stroke={s.color}
                strokeWidth={0.04}
                opacity={s.opacity * 0.55}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* A handful of diagonal shooting streaks */}
      <div className="absolute inset-0 shooting-stars pointer-events-none" />

      <style>{`
        @keyframes galaxy-spin {
          from { transform: rotate(0deg) scale(1.05); }
          to   { transform: rotate(360deg) scale(1.05); }
        }
        @keyframes galaxy-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-3%, 2%) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
