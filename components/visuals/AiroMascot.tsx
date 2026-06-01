'use client';
import * as React from 'react';

/**
 * Airo V3 — actually-alive alien-tech mascot.
 * Combines SMIL animation, CSS keyframes, mouse tracking. Blinks,
 * smiles, waves periodically, breathes, dollies in/out, eyes follow
 * cursor, antenna sparks, and emits speech bubbles.
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
      tX = dx * 18;
      tY = dy * -14;
      const pdx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / 200));
      const pdy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 200));
      tpX = pdx * 3.5;
      tpY = pdy * 3.5;
    };

    const tick = () => {
      cX += (tX - cX) * 0.09;
      cY += (tY - cY) * 0.09;
      tilt.style.transform = `perspective(900px) rotateY(${cX}deg) rotateX(${cY}deg)`;
      pX += (tpX - pX) * 0.15;
      pY += (tpY - pY) * 0.15;
      if (lp) {
        lp.setAttribute('cx', String(130 + pX));
        lp.setAttribute('cy', String(118 + pY));
      }
      if (rp) {
        rp.setAttribute('cx', String(190 + pX));
        rp.setAttribute('cy', String(118 + pY));
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
        {/* Step-out — Airo periodically lunges toward viewer and rocks side to side */}
        <div style={{ animation: staticMode ? undefined : 'airo-stepout 14s ease-in-out infinite' }}>
          {/* Dolly camera zoom */}
          <div style={{ animation: staticMode ? undefined : 'airo-dolly 5s ease-in-out infinite' }}>
            {/* Breathe */}
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
        /* Step-out: Airo lunges out of the page periodically, rocks
           side-to-side, then settles. Combined with the dolly + tilt
           you get true 3D presence. */
        @keyframes airo-stepout {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateZ(0deg);
          }
          15% {
            transform: translate3d(-10px, -4px, 0) rotateZ(-3deg) scale(1.04);
          }
          30% {
            transform: translate3d(8px, 2px, 0) rotateZ(2deg) scale(1.10);
          }
          45% {
            transform: translate3d(-4px, -8px, 0) rotateZ(-2deg) scale(1.06);
          }
          60% {
            transform: translate3d(0, -2px, 0) rotateZ(0deg) scale(1.02);
          }
          75% {
            transform: translate3d(6px, 4px, 0) rotateZ(3deg) scale(1.05);
          }
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
    <svg viewBox="0 0 320 380" className="relative w-full h-full" aria-label="Airo mascot">
      <defs>
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
        <radialGradient id="visor-deep" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.95)" />
          <stop offset="22%" stopColor="rgba(0,156,255,0.7)" />
          <stop offset="55%" stopColor="rgba(50,30,120,0.85)" />
          <stop offset="100%" stopColor="rgba(5,9,26,1)" />
        </radialGradient>
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
        <linearGradient id="neon-strip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="antenna-tip" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="rgba(0,80,255,0)" />
        </radialGradient>
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
      </defs>

      <ellipse cx="160" cy="355" rx="90" ry="10" fill="url(#eye-flare)" opacity="0.35" filter="url(#soft-glow)" />

      {/* Antenna — pulsing spark */}
      <g>
        <line x1="160" y1="30" x2="160" y2="60" stroke="#5a6593" strokeWidth="4" strokeLinecap="round" />
        <circle cx="160" cy="22" r="16" fill="url(#antenna-tip)" filter="url(#soft-glow)">
          {animated && <animate attributeName="r" values="16;22;14;16" dur="1.4s" repeatCount="indefinite" />}
        </circle>
        <circle cx="160" cy="22" r="8" fill="url(#antenna-tip)" />
        <circle cx="160" cy="22" r="3.5" fill="#ffffff">
          {animated && <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />}
        </circle>
        <g opacity="0.7">
          <line x1="148" y1="14" x2="142" y2="8" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="172" y1="14" x2="178" y2="8" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="160" y1="6" x2="160" y2="0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Head */}
      <g>
        <ellipse cx="160" cy="120" rx="95" ry="82" fill="url(#head-glass)" />
        <ellipse cx="160" cy="120" rx="95" ry="82" fill="none" stroke="url(#head-rim)" strokeWidth="2.5" />
        <ellipse cx="135" cy="80" rx="50" ry="20" fill="white" opacity="0.35" filter="url(#soft-glow)" />
        <ellipse cx="135" cy="80" rx="30" ry="8" fill="white" opacity="0.7" />
      </g>

      <g>
        <ellipse cx="55" cy="125" rx="14" ry="22" fill="#3a4566" />
        <ellipse cx="55" cy="125" rx="9" ry="16" fill="url(#visor-deep)" />
        <circle cx="55" cy="125" r="5" fill="url(#eye-flare)" filter="url(#strong-glow)" />
        <ellipse cx="265" cy="125" rx="14" ry="22" fill="#3a4566" />
        <ellipse cx="265" cy="125" rx="9" ry="16" fill="url(#visor-deep)" />
        <circle cx="265" cy="125" r="5" fill="url(#eye-flare-violet)" filter="url(#strong-glow)" />
      </g>

      {/* Visor */}
      <g>
        <ellipse cx="160" cy="125" rx="72" ry="55" fill="url(#visor-deep)" />
        <ellipse cx="160" cy="125" rx="72" ry="55" fill="none" stroke="rgba(0,212,255,0.7)" strokeWidth="1.8" />
        <line x1="92" x2="228" y1="100" y2="100" stroke="rgba(0,255,255,0.6)" strokeWidth="1">
          {animated && <animate attributeName="y1" values="80;170;80" dur="4s" repeatCount="indefinite" />}
          {animated && <animate attributeName="y2" values="80;170;80" dur="4s" repeatCount="indefinite" />}
        </line>
        <g opacity="0.15" stroke="rgba(0,255,255,0.9)" strokeWidth="0.5">
          <line x1="92" y1="100" x2="228" y2="100" />
          <line x1="92" y1="115" x2="228" y2="115" />
          <line x1="92" y1="130" x2="228" y2="130" />
          <line x1="92" y1="145" x2="228" y2="145" />
          <line x1="92" y1="160" x2="228" y2="160" />
        </g>

        {/* Eyes — blink */}
        <g>
          <circle cx="130" cy="118" r="18" fill="url(#eye-flare)" filter="url(#soft-glow)" />
          <circle cx="130" cy="118" r="9" fill="url(#eye-flare)">
            {animated && (
              <animate
                attributeName="r"
                values="9;9;9;9;9;9;9;0.1;9"
                keyTimes="0;0.6;0.65;0.7;0.75;0.8;0.85;0.92;1"
                dur="5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle ref={leftPupilRef} cx="130" cy="118" r="3.5" fill="#ffffff" />

          <circle cx="190" cy="118" r="18" fill="url(#eye-flare-violet)" filter="url(#soft-glow)" />
          <circle cx="190" cy="118" r="9" fill="url(#eye-flare-violet)">
            {animated && (
              <animate
                attributeName="r"
                values="9;9;9;9;9;9;9;0.1;9"
                keyTimes="0;0.6;0.65;0.7;0.75;0.8;0.85;0.92;1"
                dur="5s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle ref={rightPupilRef} cx="190" cy="118" r="3.5" fill="#ffffff" />
        </g>

        {/* Smile — morphs */}
        <path
          d="M 128 148 Q 160 168 192 148"
          fill="none"
          stroke="url(#neon-strip)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#strong-glow)"
        >
          {animated && (
            <animate
              attributeName="d"
              values="M 128 148 Q 160 168 192 148;
                      M 128 148 Q 160 178 192 148;
                      M 128 148 Q 160 162 192 148;
                      M 128 150 Q 160 174 192 150;
                      M 128 148 Q 160 168 192 148"
              dur="6s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <circle cx="160" cy="160" r="1.6" fill="white" opacity="0.7" />
      </g>

      <rect x="148" y="195" width="24" height="14" rx="3" fill="#3a4566" />
      <rect x="148" y="195" width="24" height="3" rx="1.5" fill="url(#neon-strip)" />

      {/* Body */}
      <g>
        <path d="M 90 215 Q 160 205 230 215 L 234 305 Q 160 315 86 305 Z" fill="url(#body-chrome)" />
        <path d="M 90 215 Q 160 205 230 215" fill="none" stroke="url(#body-edge)" strokeWidth="2" filter="url(#soft-glow)" />
        <rect x="155" y="217" width="10" height="92" rx="5" fill="url(#neon-strip)" opacity="0.85" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="0.65;1;0.65" dur="2.5s" repeatCount="indefinite" />}
        </rect>

        <circle cx="160" cy="253" r="22" fill="rgba(5,9,26,0.92)" stroke="url(#body-edge)" strokeWidth="2.5" />
        <circle cx="160" cy="253" r="14" fill="url(#visor-deep)" />
        <circle cx="160" cy="253" r="7" fill="url(#eye-flare)" filter="url(#strong-glow)">
          {animated && <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="158" cy="251" r="2.5" fill="white" />

        <circle cx="108" cy="248" r="2.5" fill="#00d4ff" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <circle cx="108" cy="260" r="2.5" fill="#a855f7" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="0.5s" repeatCount="indefinite" />}
        </circle>
        <circle cx="212" cy="248" r="2.5" fill="#ec4899" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="2s" begin="0.8s" repeatCount="indefinite" />}
        </circle>
        <circle cx="212" cy="260" r="2.5" fill="#00d4ff" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="1.2s" repeatCount="indefinite" />}
        </circle>
      </g>

      {/* Left arm */}
      <g>
        <ellipse cx="78" cy="245" rx="12" ry="32" fill="url(#body-chrome)" transform="rotate(-12 78 245)" />
        <circle cx="68" cy="278" r="11" fill="#3a4566" />
        <circle cx="68" cy="278" r="6" fill="url(#eye-flare)" filter="url(#strong-glow)" />
      </g>

      {/* === RIGHT ARM with real mechanical hand === */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 242 220;
                    0 242 220;
                    -50 242 220;
                    -30 242 220;
                    -70 242 220;
                    -30 242 220;
                    -55 242 220;
                    0 242 220;
                    0 242 220"
            keyTimes="0;0.55;0.62;0.69;0.76;0.83;0.90;0.97;1"
            dur="9s"
            repeatCount="indefinite"
          />
        )}

        {/* Upper arm (shoulder + biceps) */}
        <ellipse cx="242" cy="240" rx="13" ry="30" fill="url(#body-chrome)" transform="rotate(12 242 240)" />
        {/* Elbow joint with neon ring */}
        <circle cx="248" cy="268" r="8" fill="#3a4566" stroke="rgba(0,212,255,0.5)" strokeWidth="1" />
        <circle cx="248" cy="268" r="3" fill="url(#eye-flare)" filter="url(#strong-glow)" />
        {/* Forearm */}
        <ellipse cx="256" cy="290" rx="9" ry="22" fill="url(#body-chrome)" transform="rotate(18 256 290)" />

        {/* === Wrist === */}
        <g transform="translate(266 314)">
          <circle r="9" fill="#3a4566" stroke="rgba(168,85,247,0.6)" strokeWidth="1.5" />
          <circle r="5" fill="url(#eye-flare-violet)" filter="url(#strong-glow)">
            {animated && <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />}
          </circle>
        </g>

        {/* === Hand with fingers — fingers spread when waving === */}
        <g transform="translate(266 314)">
          {/* Palm — domed mechanical plate */}
          <path
            d="M -9 0 Q -10 14 -4 22 L 12 24 Q 18 22 18 12 Q 17 4 12 -3 Z"
            fill="url(#body-chrome)"
            stroke="rgba(168,85,247,0.4)"
            strokeWidth="0.5"
          />
          {/* Inner palm shadow */}
          <path
            d="M -7 4 Q -7 16 0 22 L 12 22 Q 16 18 15 10"
            fill="rgba(0,0,30,0.35)"
          />

          {/* === 5 fingers === */}
          {/* Each finger: 3 segments (proximal, middle, distal) + neon tip */}
          {/* Thumb (short, angled left) */}
          <g>
            {animated && (
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                values="0 -6 8; 0 -6 8; -30 -6 8; -10 -6 8; -30 -6 8; 0 -6 8; 0 -6 8"
                keyTimes="0;0.55;0.65;0.75;0.85;0.95;1"
                dur="9s"
                repeatCount="indefinite"
              />
            )}
            <rect x="-12" y="6" width="6" height="10" rx="3" fill="#5a6593" transform="rotate(-25 -9 11)" />
            <circle cx="-13" cy="6" r="2" fill="#3a4566" />
            <circle cx="-13" cy="6" r="1" fill="#00d4ff" />
          </g>

          {/* Index finger */}
          {finger({ baseX: -2, color: '#00d4ff', restAngle: -8, openAngle: -45, animated })}

          {/* Middle finger (longest) */}
          {finger({ baseX: 3, color: '#a855f7', restAngle: 0, openAngle: 0, length: 1.15, animated })}

          {/* Ring finger */}
          {finger({ baseX: 8, color: '#ec4899', restAngle: 6, openAngle: 30, animated })}

          {/* Pinky (smaller) */}
          {finger({ baseX: 13, color: '#22d3a4', restAngle: 12, openAngle: 50, length: 0.8, animated })}
        </g>
      </g>
    </svg>
  );
}

/** A mechanical finger: 3 segments with joints + neon tip.
 *  Animates rotation between rest and open positions during the wave. */
function finger({
  baseX,
  color,
  restAngle,
  openAngle,
  length = 1,
  animated,
}: {
  baseX: number;
  color: string;
  restAngle: number;
  openAngle: number;
  length?: number;
  animated: boolean;
}) {
  const len1 = 8 * length;
  const len2 = 7 * length;
  const len3 = 5 * length;

  return (
    <g transform={`translate(${baseX} -2)`}>
      {animated && (
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values={`${restAngle} 0 0; ${restAngle} 0 0; ${openAngle} 0 0; ${openAngle - 10} 0 0; ${openAngle + 5} 0 0; ${openAngle} 0 0; ${restAngle} 0 0`}
          keyTimes="0;0.55;0.65;0.75;0.85;0.95;1"
          dur="9s"
          repeatCount="indefinite"
          additive="sum"
        />
      )}
      {/* Knuckle joint */}
      <circle cx="0" cy="0" r="2.2" fill="#3a4566" stroke={color} strokeWidth="0.4" opacity="0.8" />
      {/* Proximal segment */}
      <rect x="-1.8" y={-len1} width="3.6" height={len1} rx="1.4" fill="#5a6593" stroke="rgba(0,0,30,0.5)" strokeWidth="0.3" />
      {/* Middle joint */}
      <circle cx="0" cy={-len1} r="1.8" fill="#3a4566" />
      {/* Middle segment */}
      <rect x="-1.6" y={-len1 - len2} width="3.2" height={len2} rx="1.2" fill="#5a6593" stroke="rgba(0,0,30,0.5)" strokeWidth="0.3" />
      {/* Distal joint */}
      <circle cx="0" cy={-len1 - len2} r="1.4" fill="#3a4566" />
      {/* Distal segment + neon tip */}
      <rect x="-1.3" y={-len1 - len2 - len3} width="2.6" height={len3} rx="1" fill="#5a6593" />
      <circle cx="0" cy={-len1 - len2 - len3} r="1.6" fill={color}>
        {animated && (
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
        )}
      </circle>
    </g>
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
