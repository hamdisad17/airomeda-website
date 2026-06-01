'use client';
import * as React from 'react';

/**
 * Airo V4 — "Sentinel" — alien-tech mascot, deliberately non-humanoid.
 * Single horizontal visor slit (not two cute eyes), crystalline floating
 * head disconnected from body, hex chest with visible energy core,
 * asymmetric arms (left = mechanical claw, right = holographic), and a
 * hover ring instead of legs.
 *
 * Behaviour stays: mouse-tracked sensor dots inside the visor, blink,
 * breathe, dolly, step-out, periodic wave + speech bubble.
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
      tpX = pdx * 4.5;
      tpY = pdy * 1.8;
    };

    const tick = () => {
      cX += (tX - cX) * 0.09;
      cY += (tY - cY) * 0.09;
      tilt.style.transform = `perspective(900px) rotateY(${cX}deg) rotateX(${cY}deg)`;
      pX += (tpX - pX) * 0.15;
      pY += (tpY - pY) * 0.15;
      if (lp) {
        lp.setAttribute('cx', String(140 + pX));
        lp.setAttribute('cy', String(100 + pY));
      }
      if (rp) {
        rp.setAttribute('cx', String(180 + pX));
        rp.setAttribute('cy', String(100 + pY));
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
    <svg viewBox="0 0 320 380" className="relative w-full h-full" aria-label="Airo sentinel">
      <defs>
        <linearGradient id="crystal-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(195,220,255,0.85)" />
          <stop offset="35%" stopColor="rgba(70,90,170,0.7)" />
          <stop offset="100%" stopColor="rgba(8,12,40,0.95)" />
        </linearGradient>
        <linearGradient id="crystal-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="visor-slit" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="15%" stopColor="#7dffff" />
          <stop offset="40%" stopColor="#00d4ff" />
          <stop offset="80%" stopColor="#0a1640" />
          <stop offset="100%" stopColor="#020514" />
        </radialGradient>
        <linearGradient id="hex-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5060a0" />
          <stop offset="50%" stopColor="#2a3268" />
          <stop offset="100%" stopColor="#0a0e26" />
        </linearGradient>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#7dffff" />
          <stop offset="50%" stopColor="#00d4ff" />
          <stop offset="80%" stopColor="#5028a8" />
          <stop offset="100%" stopColor="rgba(0,0,30,0)" />
        </radialGradient>
        <radialGradient id="hologram-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(125,255,255,0.8)" />
          <stop offset="50%" stopColor="rgba(0,212,255,0.5)" />
          <stop offset="100%" stopColor="rgba(0,212,255,0)" />
        </radialGradient>
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="visor-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
        <clipPath id="visor-clip">
          <rect x="116" y="93" width="88" height="14" rx="7" />
        </clipPath>
      </defs>

      <ellipse cx="160" cy="360" rx="70" ry="8" fill="url(#core-glow)" opacity="0.5" filter="url(#soft-glow)" />

      {/* === Floating halo ring above the head === */}
      <g>
        <ellipse cx="160" cy="22" rx="46" ry="9" fill="none" stroke="url(#crystal-rim)" strokeWidth="1.8" opacity="0.9">
          {animated && (
            <animate attributeName="opacity" values="0.65;1;0.65" dur="3s" repeatCount="indefinite" />
          )}
        </ellipse>
        <ellipse cx="160" cy="22" rx="46" ry="9" fill="none" stroke="rgba(125,255,255,0.4)" strokeWidth="0.6" filter="url(#soft-glow)" />
        <g>
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 160 22"
              to="360 160 22"
              dur="9s"
              repeatCount="indefinite"
            />
          )}
          <circle cx="206" cy="22" r="2.6" fill="#00d4ff" filter="url(#strong-glow)" />
          <circle cx="114" cy="22" r="2.6" fill="#a855f7" filter="url(#strong-glow)" />
          <circle cx="160" cy="13" r="2" fill="#ec4899" filter="url(#strong-glow)" />
        </g>
      </g>

      {/* === Floating crystal head (disconnected from body) === */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -2; 0 2; 0 0"
            dur="4.5s"
            repeatCount="indefinite"
          />
        )}
        <polygon
          points="160,50 215,75 215,125 160,150 105,125 105,75"
          fill="url(#crystal-face)"
          stroke="url(#crystal-rim)"
          strokeWidth="1.6"
        />
        <g stroke="rgba(125,255,255,0.20)" strokeWidth="0.6" fill="none">
          <line x1="160" y1="50" x2="160" y2="150" />
          <line x1="105" y1="75" x2="215" y2="125" />
          <line x1="215" y1="75" x2="105" y2="125" />
        </g>
        <polygon points="160,50 215,75 160,90 105,75" fill="rgba(255,255,255,0.13)" />
        <polygon points="105,125 160,150 215,125" fill="rgba(0,0,40,0.35)" />

        {/* Visor slit */}
        <g>
          <rect x="116" y="93" width="88" height="14" rx="7" fill="#020514" stroke="rgba(0,212,255,0.75)" strokeWidth="1.2" />
          <rect x="119" y="95" width="82" height="10" rx="5" fill="url(#visor-slit)" filter="url(#visor-blur)" />
          {animated && (
            <line x1="119" y1="100" x2="201" y2="100" stroke="rgba(255,255,255,0.9)" strokeWidth="0.4" filter="url(#strong-glow)">
              <animate attributeName="y1" values="95;105;95" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="95;105;95" dur="2.4s" repeatCount="indefinite" />
            </line>
          )}
          <g clipPath="url(#visor-clip)">
            <circle cx="160" cy="100" r="2.5" fill="#ffffff" filter="url(#strong-glow)" opacity="0.9">
              {animated && (
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite" />
              )}
            </circle>
            <circle ref={leftPupilRef} cx="140" cy="100" r="2.2" fill="#7dffff" filter="url(#strong-glow)" />
            <circle ref={rightPupilRef} cx="180" cy="100" r="2.2" fill="#ddaaff" filter="url(#strong-glow)" />
          </g>
          {/* Slit blink — periodic dark sweep covers slit briefly */}
          {animated && (
            <rect x="119" y="95" width="82" height="0" rx="5" fill="#020514">
              <animate
                attributeName="height"
                values="0;0;0;0;0;0;0;10;0"
                keyTimes="0;0.6;0.7;0.75;0.8;0.85;0.9;0.95;1"
                dur="6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="100;100;100;100;100;100;100;95;100"
                keyTimes="0;0.6;0.7;0.75;0.8;0.85;0.9;0.95;1"
                dur="6s"
                repeatCount="indefinite"
              />
            </rect>
          )}
        </g>

        {/* Tiny chin indicator */}
        <polygon points="155,138 165,138 160,148" fill="url(#crystal-rim)" filter="url(#strong-glow)" opacity="0.85" />
      </g>

      {/* === Energy arc connecting floating head to body === */}
      <g>
        <line x1="160" y1="155" x2="160" y2="178" stroke="rgba(125,255,255,0.8)" strokeWidth="2" filter="url(#strong-glow)">
          {animated && (
            <animate attributeName="opacity" values="0.5;1;0.6;1;0.5" dur="0.8s" repeatCount="indefinite" />
          )}
        </line>
        <path d="M 158 158 L 162 165 L 158 172 L 162 178" stroke="#00d4ff" strokeWidth="0.7" fill="none" opacity="0.85">
          {animated && (
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
          )}
        </path>
      </g>

      {/* === Floating pauldrons (disconnected shoulders) === */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -1.5; 0 1.5; 0 0"
            dur="5s"
            repeatCount="indefinite"
          />
        )}
        <polygon points="62,196 84,188 94,210 80,222 62,216" fill="url(#hex-body)" stroke="url(#crystal-rim)" strokeWidth="1" />
        <line x1="80" y1="210" x2="92" y2="212" stroke="rgba(0,212,255,0.75)" strokeWidth="1.5" filter="url(#strong-glow)" />
        <polygon points="258,196 236,188 226,210 240,222 258,216" fill="url(#hex-body)" stroke="url(#crystal-rim)" strokeWidth="1" />
        <line x1="226" y1="212" x2="240" y2="210" stroke="rgba(168,85,247,0.75)" strokeWidth="1.5" filter="url(#strong-glow)" />
      </g>

      {/* === Hex body with visible energy core === */}
      <g>
        <polygon
          points="160,180 232,210 232,278 160,308 88,278 88,210"
          fill="url(#hex-body)"
          stroke="url(#crystal-rim)"
          strokeWidth="1.8"
        />
        <g stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" fill="none">
          <polygon points="160,200 212,222 212,268 160,290 108,268 108,222" />
          <line x1="160" y1="180" x2="160" y2="200" />
          <line x1="160" y1="290" x2="160" y2="308" />
        </g>
        <polyline points="160,180 232,210 232,232" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

        {/* Core window */}
        <polygon
          points="160,212 200,232 200,266 160,286 120,266 120,232"
          fill="rgba(2,5,18,0.95)"
          stroke="rgba(0,212,255,0.6)"
          strokeWidth="1.2"
        />
        {/* Rotating inner diamond core */}
        <g>
          {animated && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 160 249"
              to="360 160 249"
              dur="7s"
              repeatCount="indefinite"
            />
          )}
          <polygon points="160,228 178,249 160,270 142,249" fill="url(#core-glow)" opacity="0.9" />
        </g>
        <circle cx="160" cy="249" r="14" fill="url(#core-glow)" filter="url(#strong-glow)">
          {animated && (
            <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="160" cy="249" r="4" fill="#ffffff">
          {animated && (
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
          )}
        </circle>

        {/* Side telemetry LEDs */}
        <circle cx="100" cy="240" r="2" fill="#00d4ff" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />}
        </circle>
        <circle cx="100" cy="252" r="2" fill="#a855f7" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.8s" begin="0.5s" repeatCount="indefinite" />}
        </circle>
        <circle cx="100" cy="264" r="2" fill="#7dffff" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="1s" repeatCount="indefinite" />}
        </circle>
        <circle cx="220" cy="240" r="2" fill="#ec4899" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="2s" begin="0.8s" repeatCount="indefinite" />}
        </circle>
        <circle cx="220" cy="252" r="2" fill="#22d3a4" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.7s" begin="1.2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="220" cy="264" r="2" fill="#a855f7" filter="url(#strong-glow)">
          {animated && <animate attributeName="opacity" values="1;0.2;1" dur="1.9s" begin="0.3s" repeatCount="indefinite" />}
        </circle>
      </g>

      {/* === LEFT mechanical claw arm === */}
      <g>
        <ellipse cx="78" cy="240" rx="9" ry="22" fill="url(#hex-body)" transform="rotate(-15 78 240)" />
        <circle cx="68" cy="268" r="6" fill="#1a2050" stroke="rgba(0,212,255,0.7)" strokeWidth="1" />
        <circle cx="68" cy="268" r="2.5" fill="url(#core-glow)" filter="url(#strong-glow)" />
        <ellipse cx="62" cy="294" rx="7" ry="18" fill="url(#hex-body)" transform="rotate(8 62 294)" />
        <g transform="translate(62 318)">
          <circle r="6" fill="#1a2050" stroke="rgba(0,212,255,0.6)" strokeWidth="1" />
          <circle r="3" fill="url(#core-glow)" filter="url(#strong-glow)" />
          <path d="M -5 4 L -9 14 L -7 16" fill="none" stroke="#5060a0" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 0 5 L 0 17" fill="none" stroke="#5060a0" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 5 4 L 9 14 L 7 16" fill="none" stroke="#5060a0" strokeWidth="2.2" strokeLinecap="round" />
          <circle cy="17" r="1.4" fill="#00d4ff" filter="url(#strong-glow)" />
          <circle cx="-7" cy="16" r="1.2" fill="#a855f7" filter="url(#strong-glow)" />
          <circle cx="7" cy="16" r="1.2" fill="#ec4899" filter="url(#strong-glow)" />
        </g>
      </g>

      {/* === RIGHT holographic arm (waves periodically) === */}
      <g>
        {animated && (
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 240 220; 0 240 220; -45 240 220; -25 240 220; -60 240 220; -25 240 220; -50 240 220; 0 240 220; 0 240 220"
            keyTimes="0;0.55;0.62;0.69;0.76;0.83;0.90;0.97;1"
            dur="9s"
            repeatCount="indefinite"
          />
        )}
        <ellipse
          cx="242" cy="240" rx="10" ry="26"
          fill="url(#hologram-grad)"
          stroke="rgba(125,255,255,0.75)" strokeWidth="1"
          opacity="0.75"
          transform="rotate(12 242 240)"
        />
        <g stroke="rgba(125,255,255,0.6)" strokeWidth="0.4" opacity="0.7">
          <line x1="235" y1="222" x2="251" y2="222" />
          <line x1="234" y1="232" x2="252" y2="232" />
          <line x1="234" y1="242" x2="252" y2="242" />
          <line x1="235" y1="252" x2="251" y2="252" />
        </g>
        <circle cx="248" cy="266" r="6" fill="rgba(125,255,255,0.3)" stroke="rgba(125,255,255,0.9)" strokeWidth="1" filter="url(#strong-glow)">
          {animated && (
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.8s" repeatCount="indefinite" />
          )}
        </circle>
        <ellipse
          cx="256" cy="290" rx="8" ry="20"
          fill="url(#hologram-grad)"
          stroke="rgba(125,255,255,0.75)" strokeWidth="1"
          opacity="0.7"
          transform="rotate(18 256 290)"
        />
        <g stroke="rgba(125,255,255,0.6)" strokeWidth="0.4" opacity="0.7">
          <line x1="248" y1="280" x2="266" y2="284" />
          <line x1="247" y1="290" x2="265" y2="294" />
          <line x1="246" y1="300" x2="264" y2="304" />
        </g>
        {/* Wireframe holographic hand */}
        <g transform="translate(266 314)">
          <path
            d="M -9 0 Q -10 14 -2 22 L 14 22 Q 18 18 18 8 Q 17 -2 12 -4 Z"
            fill="rgba(125,255,255,0.18)"
            stroke="rgba(125,255,255,0.9)"
            strokeWidth="1"
          />
          <line x1="-6" y1="6" x2="14" y2="8" stroke="rgba(125,255,255,0.5)" strokeWidth="0.4" />
          <line x1="-5" y1="14" x2="14" y2="16" stroke="rgba(125,255,255,0.5)" strokeWidth="0.4" />
          {[-3, 2, 7, 12].map((bx, i) => (
            <g key={i}>
              <rect
                x={bx - 1.5} y={-22} width="3" height="22" rx="1.5"
                fill="rgba(125,255,255,0.25)"
                stroke="rgba(125,255,255,0.85)"
                strokeWidth="0.5"
              />
              <circle cx={bx} cy={-22} r="1.6" fill="#7dffff" filter="url(#strong-glow)">
                {animated && (
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                )}
              </circle>
            </g>
          ))}
          <rect
            x="-14" y="2" width="3" height="12" rx="1.5"
            fill="rgba(125,255,255,0.25)"
            stroke="rgba(125,255,255,0.85)"
            strokeWidth="0.5"
            transform="rotate(-25 -13 8)"
          />
        </g>
      </g>

      {/* === Hover base — anti-grav ring instead of legs === */}
      <g>
        <ellipse cx="160" cy="338" rx="38" ry="6" fill="rgba(0,212,255,0.55)" filter="url(#soft-glow)">
          {animated && (
            <animate attributeName="ry" values="5;9;5" dur="2.2s" repeatCount="indefinite" />
          )}
        </ellipse>
        <ellipse cx="160" cy="320" rx="50" ry="10" fill="rgba(0,212,255,0.16)" />
        <ellipse cx="160" cy="320" rx="50" ry="10" fill="none" stroke="url(#crystal-rim)" strokeWidth="2" />
        <ellipse cx="160" cy="320" rx="44" ry="8" fill="none" stroke="rgba(125,255,255,0.6)" strokeWidth="0.6" />
        {/* 3 energy thruster beams */}
        <line x1="135" y1="328" x2="125" y2="358" stroke="rgba(0,212,255,0.75)" strokeWidth="1.3" filter="url(#strong-glow)" opacity="0.85">
          {animated && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />}
        </line>
        <line x1="160" y1="328" x2="160" y2="362" stroke="rgba(168,85,247,0.8)" strokeWidth="1.5" filter="url(#strong-glow)" opacity="0.9">
          {animated && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" begin="0.4s" repeatCount="indefinite" />}
        </line>
        <line x1="185" y1="328" x2="195" y2="358" stroke="rgba(236,72,153,0.75)" strokeWidth="1.3" filter="url(#strong-glow)" opacity="0.85">
          {animated && <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" begin="0.8s" repeatCount="indefinite" />}
        </line>
      </g>
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
