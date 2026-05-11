import * as React from 'react';

export function AiromedaMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Top step trace (white) */}
      <path d="M8 18 L26 18 L32 14 L48 14" stroke="#F8FAFC" strokeWidth="2.5" />
      <circle cx="48" cy="14" r="2.5" fill="#14B8A6" />
      {/* Left blue node */}
      <circle cx="14" cy="32" r="2.5" fill="#2563EB" />
      {/* Middle horizontal (teal) */}
      <path d="M14 32 L54 32" stroke="#14B8A6" strokeWidth="2.5" />
      <circle cx="54" cy="32" r="2.5" fill="#2563EB" />
      {/* Hexagonal G body (teal outline) */}
      <path d="M20 24 L44 24 L50 34 L44 44 L20 44 L14 34 Z" stroke="#14B8A6" strokeWidth="2.5" fill="none" />
      {/* Inner bar (white) */}
      <path d="M34 40 L44 40" stroke="#F8FAFC" strokeWidth="2.5" />
      <circle cx="34" cy="40" r="2.5" fill="#F8FAFC" />
      {/* Right exit (white) */}
      <path d="M44 40 L58 40" stroke="#F8FAFC" strokeWidth="2.5" />
      <circle cx="58" cy="40" r="2.5" fill="#F8FAFC" />
    </svg>
  );
}

export function AiromedaLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 480 80"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Mark portion (left) */}
      <g transform="translate(0,8)">
        {/* Top step trace (white) */}
        <path d="M8 18 L26 18 L32 14 L48 14" stroke="#F8FAFC" strokeWidth="2.5" />
        <circle cx="48" cy="14" r="2.5" fill="#14B8A6" />
        {/* Left blue node */}
        <circle cx="14" cy="32" r="2.5" fill="#2563EB" />
        {/* Middle horizontal (teal) */}
        <path d="M14 32 L54 32" stroke="#14B8A6" strokeWidth="2.5" />
        <circle cx="54" cy="32" r="2.5" fill="#2563EB" />
        {/* Hexagonal G body (teal outline) */}
        <path d="M20 24 L44 24 L50 34 L44 44 L20 44 L14 34 Z" stroke="#14B8A6" strokeWidth="2.5" fill="none" />
        {/* Inner bar (white) */}
        <path d="M34 40 L44 40" stroke="#F8FAFC" strokeWidth="2.5" />
        <circle cx="34" cy="40" r="2.5" fill="#F8FAFC" />
        {/* Right exit (white) */}
        <path d="M44 40 L58 40" stroke="#F8FAFC" strokeWidth="2.5" />
        <circle cx="58" cy="40" r="2.5" fill="#F8FAFC" />
      </g>
      {/* Vertical divider */}
      <line x1="90" y1="16" x2="90" y2="64" stroke="currentColor" strokeWidth="0.5" opacity={0.4} />
      {/* Wordmark */}
      <text
        x="110"
        y="46"
        fontFamily="Manrope, Inter, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="3"
      >
        AIROMEDA
      </text>
      <text
        x="112"
        y="62"
        fontFamily="Manrope, Inter, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#14B8A6"
        letterSpacing="3.5"
      >
        SOFTWARE &amp; INTEGRATION
      </text>
    </svg>
  );
}
