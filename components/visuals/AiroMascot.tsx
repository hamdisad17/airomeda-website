'use client';
import * as React from 'react';

/**
 * Airo — Airomeda's cute alien-tech mascot.
 * Pure SVG, no external assets. Floats softly, has a neon halo, eyes
 * blink occasionally. Antenna pulses in cyan/violet.
 *
 * Sizes: pass via className width/height (e.g. 'w-64 h-64', 'w-96 h-96').
 */
export function AiroMascot({ className }: { className?: string }) {
  return (
    <div className={`relative inline-block float-soft ${className ?? ''}`}>
      {/* Outer pulse halo */}
      <div
        aria-hidden
        className="absolute inset-[-15%] pulse-halo"
        style={{
          background:
            'radial-gradient(circle, rgb(0 212 255 / 0.30) 0%, rgb(168 85 247 / 0.20) 40%, transparent 70%)',
          filter: 'blur(20px)',
          borderRadius: '50%',
        }}
      />
      {/* Slow rotating ring around mascot */}
      <div
        aria-hidden
        className="absolute inset-0 rotate-slow"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0%, rgb(0 212 255 / 0.3) 25%, transparent 50%, rgb(168 85 247 / 0.3) 75%, transparent 100%)',
          borderRadius: '50%',
          maskImage: 'radial-gradient(circle, transparent 60%, black 62%, black 64%, transparent 66%)',
          WebkitMaskImage:
            'radial-gradient(circle, transparent 60%, black 62%, black 64%, transparent 66%)',
        }}
      />

      <svg viewBox="0 0 200 220" className="relative w-full h-full" aria-label="Airo mascot">
        <defs>
          <linearGradient id="body-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8edff" />
            <stop offset="60%" stopColor="#a8b4d6" />
            <stop offset="100%" stopColor="#6a78a8" />
          </linearGradient>
          <linearGradient id="eye-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="visor-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(0,212,255,0.6)" />
            <stop offset="60%" stopColor="rgba(168,85,247,0.45)" />
            <stop offset="100%" stopColor="rgba(5,9,26,0.95)" />
          </radialGradient>
          <linearGradient id="antenna-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Antenna */}
        <line x1="100" y1="20" x2="100" y2="48" stroke="#6a78a8" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="14" r="7" fill="url(#antenna-grad)" filter="url(#glow-strong)" />
        <circle cx="100" cy="14" r="3" fill="white" />

        {/* Head dome */}
        <ellipse cx="100" cy="80" rx="62" ry="55" fill="url(#body-grad)" />

        {/* Visor — the smiling screen */}
        <ellipse cx="100" cy="80" rx="50" ry="38" fill="url(#visor-glow)" />
        <ellipse
          cx="100"
          cy="80"
          rx="50"
          ry="38"
          fill="none"
          stroke="rgba(0,212,255,0.6)"
          strokeWidth="1.5"
        />

        {/* Eyes (sparkling) */}
        <g>
          <circle cx="80" cy="78" r="6" fill="url(#eye-grad)" filter="url(#glow-strong)" />
          <circle cx="78" cy="76" r="2" fill="white" />
          <circle cx="120" cy="78" r="6" fill="url(#eye-grad)" filter="url(#glow-strong)" />
          <circle cx="118" cy="76" r="2" fill="white" />
        </g>

        {/* Smile */}
        <path
          d="M 82 96 Q 100 110 118 96"
          fill="none"
          stroke="rgba(0,212,255,0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#glow-strong)"
        />

        {/* Side speakers / ears */}
        <ellipse cx="38" cy="84" rx="9" ry="14" fill="#4a5478" />
        <ellipse cx="38" cy="84" rx="4" ry="8" fill="url(#eye-grad)" filter="url(#glow-strong)" />
        <ellipse cx="162" cy="84" rx="9" ry="14" fill="#4a5478" />
        <ellipse cx="162" cy="84" rx="4" ry="8" fill="url(#eye-grad)" filter="url(#glow-strong)" />

        {/* Body / chest */}
        <path
          d="M 60 130
             Q 100 122 140 130
             L 140 188
             Q 100 195 60 188 Z"
          fill="url(#body-grad)"
        />

        {/* Chest plate / logo orb */}
        <circle
          cx="100"
          cy="158"
          r="14"
          fill="rgba(5,9,26,0.85)"
          stroke="url(#antenna-grad)"
          strokeWidth="2"
        />
        <circle cx="100" cy="158" r="6" fill="url(#eye-grad)" filter="url(#glow-strong)" />

        {/* Arms (resting) */}
        <ellipse cx="55" cy="148" rx="8" ry="22" fill="#5a6593" transform="rotate(-15 55 148)" />
        <ellipse cx="145" cy="148" rx="8" ry="22" fill="#5a6593" transform="rotate(15 145 148)" />

        {/* Bottom floor glow */}
        <ellipse
          cx="100"
          cy="210"
          rx="55"
          ry="6"
          fill="url(#eye-grad)"
          opacity="0.35"
          filter="url(#glow-strong)"
        />
      </svg>
    </div>
  );
}
