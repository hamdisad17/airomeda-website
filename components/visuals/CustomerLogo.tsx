import * as React from 'react';

type Variant =
  | 'fortuneris' | 'airomedaMarkets' | 'airomedata' | 'topratebet'
  | 'pazarliman' | 'entegrasys' | 'markaco' | 'studio'
  | 'ziraat' | 'kumtel' | 'aras' | 'hsd' | 'kodland' | 'widegame' | 'tsdigital' | 'excellence'
  | 'mavikule' | 'finansa' | 'vitrinplus' | 'stokakis'
  | 'casinoy' | 'spor7' | 'bulutla' | 'klinika'
  | 'hizliyol' | 'akademi360' | 'reformmob' | 'driveplus';

const SHAPES: Record<Variant, React.ReactNode> = {
  fortuneris: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="Fortuneris">
      <path d="M4 18V6h10v3H7v2h6v3H7v4H4z"/>
      <text x="18" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Fortuneris</text>
    </svg>
  ),
  airomedaMarkets: (
    <svg viewBox="0 0 140 24" fill="currentColor" aria-label="Airomeda Markets">
      <path d="M4 18l4-12 4 12M6 14h4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="18" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Airomeda Markets</text>
    </svg>
  ),
  airomedata: (
    <svg viewBox="0 0 120 24" fill="currentColor" aria-label="Airomedata">
      <circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="8" r="2"/>
      <circle cx="14" cy="16" r="2"/>
      <line x1="8" y1="11" x2="13" y2="9" stroke="currentColor" strokeWidth="1"/>
      <line x1="8" y1="13" x2="13" y2="15" stroke="currentColor" strokeWidth="1"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Airomedata</text>
    </svg>
  ),
  topratebet: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="TopRateBet">
      <path d="M4 18V8h6v10h-2v-8H6v8H4zm9 0V8h2v3h2V8h2v10h-2v-5h-2v5h-2z"/>
      <text x="24" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">TopRateBet</text>
    </svg>
  ),
  pazarliman: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="Pazarlıman">
      <path d="M4 6l6 12 6-12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Pazarlıman</text>
    </svg>
  ),
  entegrasys: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="Entegrasys">
      <circle cx="6" cy="6" r="2"/>
      <circle cx="14" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <circle cx="14" cy="18" r="2"/>
      <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="6" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      <text x="24" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Entegrasys</text>
    </svg>
  ),
  markaco: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Marka Co.">
      <path d="M4 18V6l5 6 5-6v12" stroke="currentColor" strokeWidth="2" fill="none"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Marka Co.</text>
    </svg>
  ),
  studio: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Stüdyo">
      <path d="M4 6h12v3H8v2h6v3H8v1h8v3H4z"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Stüdyo</text>
    </svg>
  ),
  ziraat: (
    <svg viewBox="0 0 130 24" fill="currentColor" aria-label="Ziraat Bankası">
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 7h10l-10 10h10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="26" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="700" letterSpacing="-0.02em">Ziraat Bankası</text>
    </svg>
  ),
  kumtel: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Kumtel A.Ş.">
      <path d="M4 6h4v12H4zm6 0l6 6-6 6V6z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Kumtel</text>
    </svg>
  ),
  aras: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Aras Kargo">
      <path d="M4 18l6-12 6 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14h6" stroke="currentColor" strokeWidth="1.5"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Aras Kargo</text>
    </svg>
  ),
  hsd: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="HSD Core Labs">
      <circle cx="10" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 12h6M10 9v6" stroke="currentColor" strokeWidth="1.5"/>
      <text x="22" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">HSD Core Labs</text>
    </svg>
  ),
  kodland: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Kodland">
      <path d="M5 8l-4 4 4 4M11 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Kodland</text>
    </svg>
  ),
  widegame: (
    <svg viewBox="0 0 120 24" fill="currentColor" aria-label="Wide Game Studio">
      <rect x="4" y="8" width="12" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12h4M10 10v4" stroke="currentColor" strokeWidth="1.5"/>
      <text x="22" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Wide Game Studio</text>
    </svg>
  ),
  tsdigital: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="TS Digital">
      <path d="M4 8h12M10 8v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">TS Digital</text>
    </svg>
  ),
  excellence: (
    <svg viewBox="0 0 130 24" fill="currentColor" aria-label="Excellence Talks">
      <path d="M4 8h10v3H7v2h6v3H7v1h7v3H4z" fill="currentColor"/>
      <text x="22" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Excellence Talks</text>
    </svg>
  ),
  mavikule: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="Mavikule">
      <path d="M5 18V6h3v5h4V6h3v12h-3v-4H8v4H5z"/>
      <text x="22" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Mavikule</text>
    </svg>
  ),
  finansa: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Finansa">
      <path d="M5 18V6h9v3H8v2h5v3H8v4H5z"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Finansa</text>
    </svg>
  ),
  vitrinplus: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Vitrin+">
      <path d="M4 6l5 12 5-12h-2L9 14 6 6H4z"/>
      <text x="18" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Vitrin+</text>
    </svg>
  ),
  stokakis: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="StokAkış">
      <path d="M5 8h8v3H8v2h5v3H5z"/>
      <text x="18" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">StokAkış</text>
    </svg>
  ),
  casinoy: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="CasinoY">
      <circle cx="9" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="12" r="1.5"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">CasinoY</text>
    </svg>
  ),
  spor7: (
    <svg viewBox="0 0 90 24" fill="currentColor" aria-label="Spor7">
      <path d="M5 6h10l-7 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Spor7</text>
    </svg>
  ),
  bulutla: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Bulutla">
      <path d="M6 14a3 3 0 010-6 4 4 0 017-1 3 3 0 011 6H6z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Bulutla</text>
    </svg>
  ),
  klinika: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Klinika">
      <path d="M8 6v12M4 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <text x="18" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Klinika</text>
    </svg>
  ),
  hizliyol: (
    <svg viewBox="0 0 110 24" fill="currentColor" aria-label="Hızlı Yol">
      <path d="M4 12h10M11 9l3 3-3 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Hızlı Yol</text>
    </svg>
  ),
  akademi360: (
    <svg viewBox="0 0 130 24" fill="currentColor" aria-label="Akademi360">
      <path d="M9 6L4 9l5 3 5-3-5-3zM4 13l5 3 5-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      <text x="20" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Akademi360</text>
    </svg>
  ),
  reformmob: (
    <svg viewBox="0 0 130 24" fill="currentColor" aria-label="Reform Mobilya">
      <rect x="4" y="8" width="12" height="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 14v3M14 14v3" stroke="currentColor" strokeWidth="1.5"/>
      <text x="22" y="17" fontSize="10" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Reform Mobilya</text>
    </svg>
  ),
  driveplus: (
    <svg viewBox="0 0 100 24" fill="currentColor" aria-label="Drive+">
      <path d="M4 14h12l-2-5H6l-2 5zM6 15v2M14 15v2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <text x="20" y="17" fontSize="11" fontFamily="Geist, sans-serif" fontWeight="600" letterSpacing="-0.02em">Drive+</text>
    </svg>
  ),
};

export function CustomerLogo({ variant, className }: { variant: Variant; className?: string }) {
  return <span className={`inline-block h-6 ${className ?? ''}`}>{SHAPES[variant]}</span>;
}
