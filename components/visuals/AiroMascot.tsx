'use client';
import * as React from 'react';

/**
 * Airo V6 — real generated video mascot, blended into the cosmic
 * background. The video plays on loop, muted, with mix-blend-mode
 * screen so its dark background dissolves into the page, leaving only
 * the bright cyborg + neon visible. Halo rings, particles, speech
 * bubble and mouse-tracked tilt parallax still wrap around it.
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
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [speech, setSpeech] = React.useState<string | null>(null);

  // Mouse-tracked 3D tilt parallax on the wrapping container.
  React.useEffect(() => {
    if (staticMode) return;
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;

    let raf = 0;
    let tX = 0, tY = 0, cX = 0, cY = 0;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      tX = dx * 10;
      tY = dy * -8;
    };

    const tick = () => {
      cX += (tX - cX) * 0.09;
      cY += (tY - cY) * 0.09;
      tilt.style.transform = `perspective(900px) rotateY(${cX}deg) rotateX(${cY}deg)`;
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

  // Try to start playback; some browsers pause muted+autoplay until user gesture.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      const resume = () => {
        v.play().catch(() => {});
        window.removeEventListener('pointerdown', resume);
        window.removeEventListener('scroll', resume);
      };
      window.addEventListener('pointerdown', resume, { once: true, passive: true });
      window.addEventListener('scroll', resume, { once: true, passive: true });
    });
  }, []);

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
        className="absolute inset-[-22%] pulse-halo pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgb(0 212 255 / 0.32) 0%, rgb(168 85 247 / 0.22) 40%, transparent 70%)',
          filter: 'blur(34px)',
          borderRadius: '50%',
        }}
      />

      {Array.from({ length: 6 }).map((_, i) => (
        <ParticleOrbit key={i} index={i} />
      ))}

      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ animation: staticMode ? undefined : 'airo-stepout 14s ease-in-out infinite' }}>
          <div style={{ animation: staticMode ? undefined : 'airo-dolly 5s ease-in-out infinite' }}>
            <div style={{ animation: staticMode ? undefined : 'airo-breathe 3.5s ease-in-out infinite' }}>
              <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
                {/* Behind-video soft glow disc — picks up the screen-blend
                    so the dark video edges fade into glow instead of a hard
                    rectangle */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,212,255,0.22), rgba(168,85,247,0.12) 55%, transparent 80%)',
                    filter: 'blur(10px)',
                  }}
                />
                <video
                  ref={videoRef}
                  src="/airo-hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster=""
                  className="relative w-full h-full object-contain"
                  style={{
                    mixBlendMode: 'screen',
                    filter:
                      'contrast(1.08) saturate(1.18) brightness(1.08) drop-shadow(0 0 26px rgba(0,212,255,0.45)) drop-shadow(0 0 60px rgba(168,85,247,0.28))',
                    maskImage:
                      'radial-gradient(ellipse 92% 96% at 50% 50%, black 62%, transparent 96%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 92% 96% at 50% 50%, black 62%, transparent 96%)',
                  }}
                />
                {/* Inner edge vignette to soften any remaining seam */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 72% 82% at 50% 50%, transparent 58%, rgba(2,5,18,0.45) 96%)',
                    mixBlendMode: 'multiply',
                  }}
                />
                {/* Top neon shimmer overlay — subtle scanline sweep */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,212,255,0.0) 0%, rgba(0,212,255,0.08) 40%, rgba(168,85,247,0.06) 60%, transparent 100%)',
                    mixBlendMode: 'screen',
                    animation: staticMode ? undefined : 'airo-sheen 6s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes airo-dolly {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @keyframes airo-breathe {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50%      { transform: scaleY(1.015) translateY(-2px); }
        }
        @keyframes airo-stepout {
          0%, 100% { transform: translate3d(0, 0, 0) rotateZ(0deg); }
          25%      { transform: translate3d(-6px, -3px, 0) rotateZ(-1.5deg) scale(1.02); }
          50%      { transform: translate3d(4px, 2px, 0) rotateZ(1deg) scale(1.04); }
          75%      { transform: translate3d(-2px, -4px, 0) rotateZ(-0.8deg) scale(1.02); }
        }
        @keyframes airo-floor {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scaleX(1); }
          50%      { opacity: 1.0; transform: translateX(-50%) scaleX(1.1); }
        }
        @keyframes airo-sheen {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
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
