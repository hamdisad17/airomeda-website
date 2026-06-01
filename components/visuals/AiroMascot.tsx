'use client';
import * as React from 'react';

/**
 * Airo V2 — premium alien-tech mascot.
 * Pure SVG with deep gradients, lens-flare eyes, hologram rings,
 * floating energy orbs, and reactive mouse-tilt.
 */

type Props = {
  className?: string;
  /** Disable mouse tilt — useful inside cards / small versions. */
  staticMode?: boolean;
};

export function AiroMascot({ className, staticMode = false }: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (staticMode) return;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      targetX = dx * 16; // degrees of tilt
      targetY = dy * -12;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      inner.style.transform = `perspective(900px) rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [staticMode]);

  return (
    <div ref={wrapRef} className={`relative inline-block ${className ?? ''}`}>
      {/* Bottom hologram platform */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-[-6%] -translate-x-1/2 w-[70%] h-[10%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 50% 50%, rgb(168 85 247 / 0.6) 0%, rgb(0 212 255 / 0.4) 40%, transparent 75%)',
          filter: 'blur(14px)',
        }}
      />
      {/* Three layered rotating rings */}
      <div
        aria-hidden
        className="absolute inset-[-8%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(0 212 255 / 0.55) 18%, transparent 36%, rgb(168 85 247 / 0.50) 60%, transparent 78%, rgb(236 72 153 / 0.40) 92%, transparent 100%)',
          borderRadius: '50%',
          maskImage:
            'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-14%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 90deg, transparent 0%, rgb(255 255 255 / 0.35) 25%, transparent 50%, rgb(168 85 247 / 0.30) 75%, transparent 100%)',
          borderRadius: '50%',
          maskImage:
            'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 62%, black 64%, black 65%, transparent 67%)',
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
          maskImage:
            'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          animationDuration: '48s',
        }}
      />

      {/* Outer pulse halo */}
      <div
        aria-hidden
        className="absolute inset-[-20%] pulse-halo pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgb(0 212 255 / 0.30) 0%, rgb(168 85 247 / 0.18) 40%, transparent 70%)',
          filter: 'blur(28px)',
          borderRadius: '50%',
        }}
      />

      {/* Floating energy particles around mascot */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ParticleOrbit key={i} index={i} />
      ))}

      {/* Mascot main SVG — wrapped in 3D-tilting inner */}
      <div ref={innerRef} className="relative float-soft will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
        <svg viewBox="0 0 320 360" className="relative w-full h-full" aria-label="Airo mascot">
          <defs>
            {/* Glass head — multi-stop gradient + highlight */}
            <radialGradient id="head-glass" cx="40%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#f0f5ff" />
              <stop offset="35%" stopColor="#c5cee8" />
              <stop offset="70%" stopColor="#7a85aa" />
              <stop offset="100%" stopColor="#3a4566" />
            </radialGradient>
            <linearGradient id="head-rim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="20%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(0,212,255,0.0)" />
              <stop offset="80%" stopColor="rgba(168,85,247,0.3)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
            </linearGradient>

            {/* Visor — dark glass with inner glow */}
            <radialGradient id="visor-deep" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="rgba(0,212,255,0.95)" />
              <stop offset="22%" stopColor="rgba(0,156,255,0.7)" />
              <stop offset="55%" stopColor="rgba(50,30,120,0.85)" />
              <stop offset="100%" stopColor="rgba(5,9,26,1)" />
            </radialGradient>

            {/* Lens-flare eyes */}
            <radialGradient id="eye-flare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#7dffff" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="80%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="rgba(0,0,40,0)" />
            </radialGradient>
            <radialGradient id="eye-flare-violet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#ddaaff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="80%" stopColor="#6a00cc" />
              <stop offset="100%" stopColor="rgba(40,0,80,0)" />
            </radialGradient>

            {/* Body — brushed chrome */}
            <linearGradient id="body-chrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8edff" />
              <stop offset="25%" stopColor="#a8b4d6" />
              <stop offset="55%" stopColor="#5a6593" />
              <stop offset="100%" stopColor="#2a3258" />
            </linearGradient>
            <linearGradient id="body-edge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,212,255,0.7)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.7)" />
            </linearGradient>

            {/* Neon strip — body accent */}
            <linearGradient id="neon-strip" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Filters */}
            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="inner-shadow">
              <feGaussianBlur stdDeviation="3" />
              <feOffset dy="2" />
              <feComposite in="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="inner" />
              <feFlood floodColor="#000" floodOpacity="0.6" />
              <feComposite in2="inner" operator="in" />
              <feComposite in="SourceGraphic" operator="over" />
            </filter>

            {/* Antenna lightning */}
            <radialGradient id="antenna-tip" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="rgba(0,80,255,0)" />
            </radialGradient>
          </defs>

          {/* === Background floor reflection === */}
          <ellipse cx="160" cy="335" rx="90" ry="10" fill="url(#eye-flare)" opacity="0.35" filter="url(#soft-glow)" />

          {/* === Antenna === */}
          <g>
            <line x1="160" y1="30" x2="160" y2="60" stroke="#5a6593" strokeWidth="4" strokeLinecap="round" />
            {/* Spark glow */}
            <circle cx="160" cy="22" r="16" fill="url(#antenna-tip)" filter="url(#soft-glow)" />
            <circle cx="160" cy="22" r="8" fill="url(#antenna-tip)" />
            <circle cx="160" cy="22" r="3.5" fill="#ffffff" />
            {/* Energy spark lines */}
            <g opacity="0.7">
              <line x1="148" y1="14" x2="142" y2="8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="172" y1="14" x2="178" y2="8" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="160" y1="6" x2="160" y2="0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>

          {/* === Head === */}
          {/* Outer head shell */}
          <g>
            <ellipse cx="160" cy="120" rx="95" ry="82" fill="url(#head-glass)" />
            {/* Rim highlight */}
            <ellipse cx="160" cy="120" rx="95" ry="82" fill="none" stroke="url(#head-rim)" strokeWidth="2.5" />
            {/* Top highlight reflection */}
            <ellipse cx="135" cy="80" rx="50" ry="20" fill="white" opacity="0.35" filter="url(#soft-glow)" />
            <ellipse cx="135" cy="80" rx="30" ry="8" fill="white" opacity="0.7" />
          </g>

          {/* Side circuit/ear caps */}
          <g>
            <ellipse cx="55" cy="125" rx="14" ry="22" fill="#3a4566" />
            <ellipse cx="55" cy="125" rx="9" ry="16" fill="url(#visor-deep)" />
            <circle cx="55" cy="125" r="5" fill="url(#eye-flare)" filter="url(#strong-glow)" />
            <line x1="40" y1="115" x2="40" y2="135" stroke="#00d4ff" strokeWidth="1.5" opacity="0.7" />

            <ellipse cx="265" cy="125" rx="14" ry="22" fill="#3a4566" />
            <ellipse cx="265" cy="125" rx="9" ry="16" fill="url(#visor-deep)" />
            <circle cx="265" cy="125" r="5" fill="url(#eye-flare-violet)" filter="url(#strong-glow)" />
            <line x1="280" y1="115" x2="280" y2="135" stroke="#a855f7" strokeWidth="1.5" opacity="0.7" />
          </g>

          {/* === Visor — face screen === */}
          <g>
            <ellipse cx="160" cy="125" rx="72" ry="55" fill="url(#visor-deep)" />
            <ellipse cx="160" cy="125" rx="72" ry="55" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="1.8" />
            {/* Scan lines */}
            <g opacity="0.18" stroke="rgba(0,255,255,0.9)" strokeWidth="0.5">
              <line x1="92" y1="100" x2="228" y2="100" />
              <line x1="92" y1="115" x2="228" y2="115" />
              <line x1="92" y1="130" x2="228" y2="130" />
              <line x1="92" y1="145" x2="228" y2="145" />
              <line x1="92" y1="160" x2="228" y2="160" />
            </g>

            {/* Lens-flare eyes */}
            <g>
              <circle cx="130" cy="118" r="18" fill="url(#eye-flare)" filter="url(#soft-glow)" />
              <circle cx="130" cy="118" r="9" fill="url(#eye-flare)" />
              <circle cx="126" cy="114" r="3.5" fill="#ffffff" />
              <circle cx="135" cy="123" r="1.5" fill="#ffffff" opacity="0.85" />

              <circle cx="190" cy="118" r="18" fill="url(#eye-flare-violet)" filter="url(#soft-glow)" />
              <circle cx="190" cy="118" r="9" fill="url(#eye-flare-violet)" />
              <circle cx="186" cy="114" r="3.5" fill="#ffffff" />
              <circle cx="195" cy="123" r="1.5" fill="#ffffff" opacity="0.85" />
            </g>

            {/* Smile — energy arc */}
            <path
              d="M 128 148 Q 160 168 192 148"
              fill="none"
              stroke="url(#neon-strip)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#strong-glow)"
            />
            {/* Tiny mouth dot beneath */}
            <circle cx="160" cy="160" r="1.6" fill="white" opacity="0.7" />
          </g>

          {/* === Neck connector === */}
          <rect x="148" y="195" width="24" height="14" rx="3" fill="#3a4566" />
          <rect x="148" y="195" width="24" height="3" rx="1.5" fill="url(#neon-strip)" />

          {/* === Body === */}
          <g>
            {/* Body shell */}
            <path
              d="M 90 215
                 Q 160 205 230 215
                 L 234 305
                 Q 160 315 86 305 Z"
              fill="url(#body-chrome)"
            />
            {/* Body rim glow */}
            <path
              d="M 90 215
                 Q 160 205 230 215"
              fill="none"
              stroke="url(#body-edge)"
              strokeWidth="2"
              filter="url(#soft-glow)"
            />
            {/* Center neon strip */}
            <rect x="155" y="217" width="10" height="92" rx="5" fill="url(#neon-strip)" opacity="0.85" filter="url(#strong-glow)" />

            {/* Chest core */}
            <circle cx="160" cy="253" r="22" fill="rgba(5,9,26,0.92)" stroke="url(#body-edge)" strokeWidth="2.5" />
            <circle cx="160" cy="253" r="14" fill="url(#visor-deep)" />
            <circle cx="160" cy="253" r="7" fill="url(#eye-flare)" filter="url(#strong-glow)" />
            <circle cx="158" cy="251" r="2.5" fill="white" />

            {/* Side panel lights */}
            <circle cx="108" cy="248" r="2.5" fill="#00d4ff" filter="url(#strong-glow)" />
            <circle cx="108" cy="260" r="2.5" fill="#a855f7" filter="url(#strong-glow)" />
            <circle cx="212" cy="248" r="2.5" fill="#ec4899" filter="url(#strong-glow)" />
            <circle cx="212" cy="260" r="2.5" fill="#00d4ff" filter="url(#strong-glow)" />
          </g>

          {/* === Arms === */}
          <g>
            <ellipse cx="78" cy="245" rx="12" ry="32" fill="url(#body-chrome)" transform="rotate(-12 78 245)" />
            <circle cx="68" cy="278" r="11" fill="#3a4566" />
            <circle cx="68" cy="278" r="6" fill="url(#eye-flare)" filter="url(#strong-glow)" />

            <ellipse cx="242" cy="245" rx="12" ry="32" fill="url(#body-chrome)" transform="rotate(12 242 245)" />
            <circle cx="252" cy="278" r="11" fill="#3a4566" />
            <circle cx="252" cy="278" r="6" fill="url(#eye-flare-violet)" filter="url(#strong-glow)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

/** Single floating particle that orbits the mascot. */
function ParticleOrbit({ index }: { index: number }) {
  // Each particle gets its own delay, radius, color, speed
  const colors = ['#00d4ff', '#a855f7', '#ec4899', '#7dffff', '#c084fc', '#22d3ee'];
  const color = colors[index % colors.length];
  const angle = (index * 60) % 360;
  const radius = 45 + (index % 3) * 8;
  const duration = 14 + (index % 4) * 3;
  const delay = -(index * 2);

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
        animation: `orbit-${index} ${duration}s linear ${delay}s infinite`,
      }}
    >
      <style>{`
        @keyframes orbit-${index} {
          from { transform: rotate(${angle}deg) translateX(${radius}%) rotate(-${angle}deg); }
          to   { transform: rotate(${angle + 360}deg) translateX(${radius}%) rotate(-${angle + 360}deg); }
        }
      `}</style>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
