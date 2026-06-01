'use client';
import * as React from 'react';

/**
 * Airo V5 — "Cyborg" — humanoid 3/4 profile portrait inspired by a
 * chrome-and-neon character study. Anatomical face silhouette, single
 * glowing eye (mouse-tracked iris), mechanical exhaust disc replacing
 * the ear, neon plate seams revealing internal mechanism beneath the
 * chrome armour. No arms — bust-style portrait composition.
 */

type Props = {
  className?: string;
  staticMode?: boolean;
};

const GREETINGS = [
  'Selam! 👋',
  'Sizi bekliyordum',
  'Hadi başlayalım!',
  'İşinize tutkunum 🚀',
  'Birlikte harika işler!',
  'Sorun mu var? Yardım edeyim',
  'Hayalinizdeki ürün burada',
];

export function AiroMascot({ className, staticMode = false }: Props) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const tiltRef = React.useRef<HTMLDivElement>(null);
  const leftPupilRef = React.useRef<SVGCircleElement>(null);
  const rightPupilRef = React.useRef<SVGCircleElement>(null);

  const [speech, setSpeech] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (staticMode) return;
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    const lp = leftPupilRef.current;
    const rp = rightPupilRef.current;
    if (!wrap || !tilt) return;

    let raf = 0;
    let tX = 0, tY = 0, cX = 0, cY = 0;
    let pX = 0, pY = 0, tpX = 0, tpY = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      tX = dx * 14;
      tY = dy * -10;
      const pdx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 200));
      const pdy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 200));
      tpX = pdx * 3.5;
      tpY = pdy * 2;
    };

    const tick = () => {
      cX += (tX - cX) * 0.09;
      cY += (tY - cY) * 0.09;
      tilt.style.transform = `perspective(900px) rotateY(${cX}deg) rotateX(${cY}deg)`;
      pX += (tpX - pX) * 0.15;
      pY += (tpY - pY) * 0.15;
      if (lp) {
        lp.setAttribute('cx', String(118 + pX));
        lp.setAttribute('cy', String(115 + pY));
      }
      if (rp) {
        rp.setAttribute('cx', String(-100));
        rp.setAttribute('cy', String(-100));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [staticMode]);

  React.useEffect(() => {
    if (staticMode) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const msg = GREETINGS[Math.floor(Math.random() * GREETINGS.length)] ?? 'Selam!';
        setSpeech(msg);
        setTimeout(() => setSpeech(null), 3500);
        schedule();
      }, 9000 + Math.random() * 5000);
    };
    timer = setTimeout(() => {
      setSpeech(GREETINGS[0] ?? 'Selam!');
      setTimeout(() => setSpeech(null), 3500);
      schedule();
    }, 3000);
    return () => clearTimeout(timer);
  }, [staticMode]);

  return (
    <div ref={wrapRef} className={`relative inline-block ${className ?? ''}`}>
      {!staticMode && speech && (
        <div
          aria-hidden
          className="absolute z-20 -top-6 left-1/2 -translate-x-1/2 lg:left-[110%] lg:top-[18%] lg:translate-x-0 whitespace-nowrap pointer-events-none"
          style={{ animation: 'airo-bubble-pop 400ms ease-out, airo-bubble-out 400ms ease-in 3.1s both' }}
        >
          <div
            className="relative glass-panel rounded-2xl px-5 py-3 text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.18))',
              border: '1.5px solid rgb(0 212 255 / 0.5)',
              boxShadow: '0 0 30px -4px rgb(0 212 255 / 0.5)',
            }}
          >
            <span className="neon-text">{speech}</span>
            <span
              className="absolute -bottom-2 lg:bottom-[40%] left-1/2 lg:left-[-8px] -translate-x-1/2 lg:translate-x-0 w-3 h-3 rotate-45"
              style={{
                background: 'rgba(0,212,255,0.4)',
                borderLeft: '1.5px solid rgb(0 212 255 / 0.5)',
                borderBottom: '1.5px solid rgb(0 212 255 / 0.5)',
              }}
            />
          </div>
        </div>
      )}

      <div
        aria-hidden
        className="absolute left-1/2 bottom-[-6%] -translate-x-1/2 w-[70%] h-[10%] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 50% 50%, rgb(168 85 247 / 0.6) 0%, rgb(0 212 255 / 0.4) 40%, transparent 75%)',
          filter: 'blur(14px)',
          animation: 'airo-floor 4s ease-in-out infinite',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-[-8%] rotate-slow pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(0 212 255 / 0.55) 18%, transparent 36%, rgb(168 85 247 / 0.50) 60%, transparent 78%, rgb(236 72 153 / 0.40) 92%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 56%, black 58%, black 60%, transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-[-14%] rotate-slow pointer-events-none"
        style={{
          background: 'conic-gradient(from 90deg, transparent 0%, rgb(255 255 255 / 0.35) 25%, transparent 50%, rgb(168 85 247 / 0.30) 75%, transparent 100%)',
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
          background: 'conic-gradient(from 180deg, transparent 0%, rgb(0 212 255 / 0.25) 33%, transparent 66%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          WebkitMaskImage: 'radial-gradient(circle, transparent 68%, black 70%, black 70.5%, transparent 73%)',
          animationDuration: '48s',
        }}
      />

      <div
        aria-hidden
        className="absolute inset-[-20%] pulse-halo pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgb(0 212 255 / 0.30) 0%, rgb(168 85 247 / 0.18) 40%, transparent 70%)',
          filter: 'blur(28px)',
          borderRadius: '50%',
        }}
      />

      {Array.from({ length: 6 }).map((_, i) => (
        <ParticleOrbit key={i} index={i} />
      ))}

      <div ref={tiltRef} className="relative will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
        <div style={{ animation: staticMode ? undefined : 'airo-stepout 14s ease-in-out infinite' }}>
          <div style={{ animation: staticMode ? undefined : 'airo-dolly 5s ease-in-out infinite' }}>
            <div style={{ animation: staticMode ? undefined : 'airo-breathe 3.5s ease-in-out infinite' }}>
              <AiroSvg leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} animated={!staticMode} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes airo-dolly {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        @keyframes airo-breathe {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50%      { transform: scaleY(1.025) translateY(-2px); }
        }
        @keyframes airo-stepout {
          0%, 100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
          15%      { transform: translate3d(-10px, -4px, 0) rotateZ(-3deg) scale(1.04); }
          30%      { transform: translate3d(8px, 2px, 0) rotateZ(2deg) scale(1.10); }
          45%      { transform: translate3d(-4px, -8px, 0) rotateZ(-2deg) scale(1.06); }
          60%      { transform: translate3d(0, -2px, 0) rotateZ(0deg) scale(1.02); }
          75%      { transform: translate3d(6px, 4px, 0) rotateZ(3deg) scale(1.05); }
        }
        @keyframes airo-floor {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scaleX(1); }
          50%      { opacity: 1.0; transform: translateX(-50%) scaleX(1.1); }
        }
        @keyframes airo-bubble-pop {
          0%   { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.85); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        @keyframes airo-bubble-out {
          0%   { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}

function AiroSvg({
  leftPupilRef,
  rightPupilRef,
  animated,
}: {
  leftPupilRef: React.RefObject<SVGCircleElement | null>;
  rightPupilRef: React.RefObject<SVGCircleElement | null>;
  animated: boolean;
}) {
  return (
    <svg viewBox="0 0 320 380" className="relative w-full h-full" aria-label="Airo cyborg">
      <defs>
        <linearGradient id="chrome-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0f4ff" />
          <stop offset="30%" stopColor="#b8c4e0" />
          <stop offset="65%" stopColor="#5a6593" />
          <stop offset="100%" stopColor="#1a2046" />
        </linearGradient>
        <linearGradient id="chrome-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#384266" />
          <stop offset="50%" stopColor="#a8b4d6" />
          <stop offset="100%" stopColor="#384266" />
        </linearGradient>
        <linearGradient id="neon-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#7dffff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="violet-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <radialGradient id="eye-glow-bright" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="15%" stopColor="#7dffff" />
          <stop offset="40%" stopColor="#00d4ff" />
          <stop offset="85%" stopColor="#0055aa" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="internal-mech" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a0a3a" />
          <stop offset="100%" stopColor="#02050f" />
        </radialGradient>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="wide-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id="eye-clip">
          <ellipse cx="118" cy="115" rx="14" ry="8" />
        </clipPath>
      </defs>

      {/* Floor / ambient shadow under bust */}
      <ellipse cx="160" cy="368" rx="95" ry="9" fill="url(#eye-glow-bright)" opacity="0.35" filter="url(#wide-blur)" />

      {/* === INNER MECH SHEET behind the chest (dark base) === */}
      <path
        d="M 50 250 L 100 240 L 220 238 L 270 252 L 280 380 L 40 380 Z"
        fill="url(#internal-mech)"
      />

      {/* Scattered red/violet pinpoints visible through plate seams (internal wiring) */}
      <g>
        {[
          [72, 270], [88, 295], [105, 320], [85, 345],
          [148, 268], [160, 295], [142, 330], [165, 355],
          [205, 270], [225, 300], [240, 335], [218, 360],
        ].map(([x, y], i) => (
          <circle
            key={`mech-${i}`}
            cx={x}
            cy={y}
            r="0.9"
            fill={i % 2 === 0 ? '#a855f7' : '#ec4899'}
            filter="url(#neon-glow)"
            opacity="0.7"
          >
            {animated && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur={`${1.4 + (i % 4) * 0.3}s`}
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </g>

      {/* === NECK MECH PILLAR (visible spine between collar plates) === */}
      <g>
        <rect x="130" y="195" width="44" height="80" fill="url(#internal-mech)" />
        {[200, 215, 230, 245, 260].map((y, i) => (
          <g key={`vert-${i}`}>
            <rect x="138" y={y} width="28" height="6" rx="2" fill="#2a3268" stroke="rgba(0,212,255,0.55)" strokeWidth="0.4" />
            <circle cx="152" cy={y + 3} r="1.1" fill="#00d4ff" filter="url(#neon-glow)">
              {animated && (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur={`${1.2 + i * 0.2}s`}
                  begin={`${i * 0.15}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </g>
        ))}
        {/* Side neck collar plates */}
        <path d="M 102 218 L 132 213 L 132 268 L 100 280 Z" fill="url(#chrome-plate)" stroke="#00d4ff" strokeWidth="1.2" filter="url(#neon-glow)" />
        <path d="M 218 218 L 188 213 L 188 268 L 220 280 Z" fill="url(#chrome-plate)" stroke="#00d4ff" strokeWidth="1.2" filter="url(#neon-glow)" />
        <line x1="115" y1="240" x2="125" y2="240" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        <line x1="195" y1="240" x2="205" y2="240" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      </g>

      {/* === SHOULDER PAULDRONS === */}
      <g>
        {/* Left pauldron */}
        <path
          d="M 48 240 Q 65 218 100 222 L 108 275 L 78 282 L 45 268 Z"
          fill="url(#chrome-plate)"
          stroke="url(#violet-edge)"
          strokeWidth="1.6"
          filter="url(#neon-glow)"
        />
        <path d="M 58 234 Q 75 226 96 230" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
        <line x1="68" y1="258" x2="92" y2="262" stroke="#a855f7" strokeWidth="1" filter="url(#neon-glow)" />

        {/* Right pauldron */}
        <path
          d="M 272 240 Q 255 218 220 222 L 212 275 L 242 282 L 275 268 Z"
          fill="url(#chrome-plate)"
          stroke="url(#violet-edge)"
          strokeWidth="1.6"
          filter="url(#neon-glow)"
        />
        <path d="M 262 234 Q 245 226 224 230" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
        <line x1="252" y1="258" x2="228" y2="262" stroke="#a855f7" strokeWidth="1" filter="url(#neon-glow)" />
      </g>

      {/* === CHEST PLATES === */}
      <g>
        {/* Left pectoral */}
        <path
          d="M 80 270 Q 100 258 145 262 L 158 290 Q 158 308 148 318 L 102 322 Q 80 312 78 296 Z"
          fill="url(#chrome-plate)"
          stroke="url(#neon-edge)"
          strokeWidth="1.6"
          filter="url(#neon-glow)"
        />
        <path d="M 92 274 Q 110 268 138 270" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
        {/* small vent slot */}
        <rect x="108" y="298" width="22" height="3" rx="1.2" fill="#0a0a20" stroke="#00d4ff" strokeWidth="0.4" />

        {/* Right pectoral */}
        <path
          d="M 175 262 Q 220 258 240 270 L 242 296 Q 240 312 218 322 L 172 318 Q 162 308 162 290 Z"
          fill="url(#chrome-plate)"
          stroke="url(#neon-edge)"
          strokeWidth="1.6"
          filter="url(#neon-glow)"
        />
        <path d="M 182 270 Q 210 268 228 274" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
        <rect x="190" y="298" width="22" height="3" rx="1.2" fill="#0a0a20" stroke="#00d4ff" strokeWidth="0.4" />

        {/* Central sternum seam */}
        <line x1="160" y1="265" x2="160" y2="320" stroke="#a855f7" strokeWidth="0.9" filter="url(#neon-glow)" />
        <circle cx="160" cy="282" r="1.4" fill="#7dffff" filter="url(#neon-glow)">
          {animated && <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />}
        </circle>
        <circle cx="160" cy="305" r="1.4" fill="#a855f7" filter="url(#neon-glow)">
          {animated && <animate attributeName="opacity" values="0.5;1;0.5" dur="2.2s" begin="0.4s" repeatCount="indefinite" />}
        </circle>

        {/* Upper-abdomen plate band */}
        <path
          d="M 100 326 L 220 326 L 215 348 L 105 348 Z"
          fill="url(#chrome-plate)"
          stroke="#00d4ff"
          strokeWidth="1.3"
          filter="url(#neon-glow)"
        />
        <line x1="160" y1="328" x2="160" y2="346" stroke="rgba(168,85,247,0.6)" strokeWidth="0.8" filter="url(#neon-glow)" />
        <path d="M 108 330 Q 160 326 212 330" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />

        {/* Lower-abdomen plate band */}
        <path
          d="M 110 351 L 210 351 L 205 372 L 115 372 Z"
          fill="url(#chrome-plate)"
          stroke="#00d4ff"
          strokeWidth="1.3"
          filter="url(#neon-glow)"
        />
        <line x1="160" y1="353" x2="160" y2="370" stroke="rgba(168,85,247,0.6)" strokeWidth="0.8" filter="url(#neon-glow)" />
        <path d="M 118 355 Q 160 352 202 355" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
      </g>

      {/* === HEAD (anatomical 3/4 profile, facing left) === */}
      <g>
        {/* Outer head silhouette */}
        <path
          d="M 148 36
             C 184 32, 216 56, 220 100
             C 224 130, 216 158, 200 174
             L 196 188
             C 196 200, 178 208, 162 205
             L 140 200
             L 115 188
             L 100 175
             L 92 158
             L 86 145
             L 80 132
             L 74 120
             L 76 105
             L 82 92
             L 90 82
             L 96 70
             L 104 60
             C 112 48, 128 38, 148 36 Z"
          fill="url(#chrome-plate)"
          stroke="url(#neon-edge)"
          strokeWidth="1.8"
          filter="url(#neon-glow)"
        />

        {/* Cranium dome high-gloss highlight */}
        <path d="M 130 50 Q 165 38 200 62" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 138 54 Q 168 44 195 64" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />

        {/* Mid-cranium parting seam (front to back) */}
        <path d="M 152 40 Q 168 100 178 170" fill="none" stroke="#0a0a20" strokeWidth="1.1" opacity="0.85" />
        <path d="M 152 40 Q 168 100 178 170" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="0.4" filter="url(#neon-glow)" />

        {/* Side cranium plate seam (separates frontal plate from helmet) */}
        <path d="M 100 88 Q 130 96 155 102" fill="none" stroke="#0a0a20" strokeWidth="1.4" />
        <path d="M 100 88 Q 130 96 155 102" fill="none" stroke="#00d4ff" strokeWidth="0.5" filter="url(#neon-glow)" />

        {/* Forehead horizontal seam */}
        <path d="M 100 80 L 200 76" stroke="#0a0a20" strokeWidth="0.8" opacity="0.75" />
        <circle cx="112" cy="78" r="1.2" fill="#3a4566" />
        <circle cx="150" cy="74" r="1.2" fill="#3a4566" />
        <circle cx="188" cy="78" r="1.2" fill="#3a4566" />

        {/* Brow ridge shadow */}
        <path d="M 95 105 Q 115 100 138 106" fill="none" stroke="rgba(0,0,30,0.55)" strokeWidth="3" />

        {/* === EYE SOCKET + glowing mouse-tracked iris === */}
        <g>
          {/* Deep socket cup */}
          <ellipse cx="118" cy="115" rx="18" ry="11" fill="#02050f" />
          {/* Inner socket trim */}
          <ellipse cx="118" cy="115" rx="15" ry="9" fill="#0a0a20" stroke="rgba(0,212,255,0.7)" strokeWidth="0.8" />
          <g clipPath="url(#eye-clip)">
            {/* Outer glow halo */}
            <circle cx="118" cy="115" r="9" fill="url(#eye-glow-bright)" filter="url(#strong-glow)">
              {animated && <animate attributeName="r" values="8;10;8" dur="2.4s" repeatCount="indefinite" />}
            </circle>
            {/* Mouse-tracked iris */}
            <circle ref={leftPupilRef} cx="118" cy="115" r="5" fill="#ffffff" filter="url(#neon-glow)" />
            {/* Pupil */}
            <circle cx="118" cy="115" r="1.4" fill="#02050f" opacity="0.85" />
          </g>
          {/* Periodic chrome-shutter blink */}
          {animated && (
            <rect x="100" y="107" width="36" height="0" fill="url(#chrome-plate)" stroke="rgba(0,212,255,0.4)" strokeWidth="0.5">
              <animate
                attributeName="height"
                values="0;0;0;0;0;0;0;16;0"
                keyTimes="0;0.6;0.7;0.75;0.8;0.85;0.9;0.95;1"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </rect>
          )}
        </g>

        {/* Hidden ref for prop compat (rightPupilRef unused in V5) */}
        <circle ref={rightPupilRef} cx="-100" cy="-100" r="0" opacity="0" />

        {/* Cheekbone glowing seam */}
        <path d="M 108 132 L 92 162 L 105 185" fill="none" stroke="#00d4ff" strokeWidth="1.8" filter="url(#neon-glow)" />

        {/* Cheek plate inset shadow */}
        <path d="M 100 145 Q 95 165 105 180" fill="rgba(0,0,30,0.35)" />

        {/* Nose ridge highlight */}
        <path d="M 86 95 L 78 118 L 80 128" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="84" cy="134" rx="2" ry="1.2" fill="#0a0a20" />

        {/* Mouth seam */}
        <path d="M 95 152 Q 110 160 128 157" fill="none" stroke="url(#neon-edge)" strokeWidth="1.8" filter="url(#strong-glow)" />
        <path d="M 95 152 Q 110 160 128 157" fill="none" stroke="#ffffff" strokeWidth="0.5" />

        {/* Jaw separator seam */}
        <path d="M 105 178 Q 138 188 172 188" fill="none" stroke="#a855f7" strokeWidth="1.3" filter="url(#neon-glow)" opacity="0.85" />

        {/* Internal jaw mech glints */}
        <circle cx="120" cy="187" r="1" fill="#a855f7" filter="url(#neon-glow)">
          {animated && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <circle cx="148" cy="190" r="1" fill="#ec4899" filter="url(#neon-glow)">
          {animated && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" begin="0.3s" repeatCount="indefinite" />}
        </circle>

        {/* === MECHANICAL EXHAUST DISC (replaces ear) === */}
        <g>
          {/* Outer ring */}
          <circle cx="180" cy="120" r="28" fill="#1a2046" stroke="rgba(0,212,255,0.7)" strokeWidth="1.5" />
          <circle cx="180" cy="120" r="28" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="0.5" filter="url(#neon-glow)" />
          {/* Mid ring */}
          <circle cx="180" cy="120" r="20" fill="#02050f" stroke="rgba(0,212,255,0.9)" strokeWidth="1" />
          {/* Inner well */}
          <circle cx="180" cy="120" r="12" fill="url(#internal-mech)" stroke="rgba(125,255,255,0.7)" strokeWidth="0.6" />
          {/* Pulsing core */}
          <circle cx="180" cy="120" r="6" fill="url(#eye-glow-bright)" filter="url(#strong-glow)">
            {animated && <animate attributeName="r" values="5;7;5" dur="2.2s" repeatCount="indefinite" />}
          </circle>
          <circle cx="180" cy="120" r="1.6" fill="#ffffff" />
          {/* 6 small dots around middle ring */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * 60) * Math.PI / 180;
            const x = 180 + Math.cos(a) * 16;
            const y = 120 + Math.sin(a) * 16;
            return (
              <circle key={`vent-${i}`} cx={x} cy={y} r="1.3" fill="#a855f7" filter="url(#neon-glow)">
                {animated && (
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur={`${1.5 + (i % 3) * 0.3}s`}
                    begin={`${i * 0.15}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            );
          })}
          {/* Slow rotating turbine spokes */}
          {animated && (
            <g>
              <animateTransform attributeName="transform" type="rotate" from="0 180 120" to="360 180 120" dur="14s" repeatCount="indefinite" />
              <line x1="180" y1="102" x2="180" y2="107" stroke="rgba(125,255,255,0.55)" strokeWidth="0.6" />
              <line x1="180" y1="133" x2="180" y2="138" stroke="rgba(125,255,255,0.55)" strokeWidth="0.6" />
              <line x1="162" y1="120" x2="167" y2="120" stroke="rgba(125,255,255,0.55)" strokeWidth="0.6" />
              <line x1="193" y1="120" x2="198" y2="120" stroke="rgba(125,255,255,0.55)" strokeWidth="0.6" />
            </g>
          )}
        </g>

        {/* Back-of-head plate seam (vertical line behind exhaust disc) */}
        <path d="M 210 70 Q 218 130 200 180" fill="none" stroke="#0a0a20" strokeWidth="1" opacity="0.7" />
        <path d="M 210 70 Q 218 130 200 180" fill="none" stroke="rgba(0,212,255,0.4)" strokeWidth="0.4" filter="url(#neon-glow)" />

        {/* White highlights — porcelain reflections */}
        <ellipse cx="160" cy="56" rx="35" ry="6" fill="white" opacity="0.45" filter="url(#soft-blur)" />
        <ellipse cx="100" cy="135" rx="6" ry="14" fill="white" opacity="0.28" filter="url(#soft-blur)" transform="rotate(-15 100 135)" />
        <ellipse cx="140" cy="178" rx="14" ry="3" fill="white" opacity="0.25" filter="url(#soft-blur)" />
      </g>

      {/* Floating particles around head */}
      {animated && (
        <g opacity="0.75">
          <circle cx="248" cy="78" r="1.6" fill="#00d4ff" filter="url(#strong-glow)">
            <animate attributeName="cy" values="78;62;78" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="52" cy="100" r="1.6" fill="#a855f7" filter="url(#strong-glow)">
            <animate attributeName="cy" values="100;82;100" dur="4s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="200" r="1.4" fill="#ec4899" filter="url(#strong-glow)">
            <animate attributeName="cy" values="200;185;200" dur="4.5s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="278" cy="190" r="1.4" fill="#7dffff" filter="url(#strong-glow)">
            <animate attributeName="cy" values="190;175;190" dur="4.2s" begin="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4.2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}
    </svg>
  );
}

function ParticleOrbit({ index }: { index: number }) {
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
