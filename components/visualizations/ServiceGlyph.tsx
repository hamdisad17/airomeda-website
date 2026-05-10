type Kind =
  | 'finance'
  | 'gaming'
  | 'ecommerce'
  | 'integration'
  | 'seo-ads'
  | 'social-media'
  | 'crm'
  | 'default';

const SLUG_TO_KIND: Record<string, Kind> = {
  finans: 'finance',
  finance: 'finance',
  'sans-oyunlari': 'gaming',
  gaming: 'gaming',
  'e-ticaret': 'ecommerce',
  ecommerce: 'ecommerce',
  entegrasyon: 'integration',
  integration: 'integration',
  'seo-reklam': 'seo-ads',
  'seo-ads': 'seo-ads',
  'sosyal-medya': 'social-media',
  'social-media': 'social-media',
  crm: 'crm',
};

export function ServiceGlyph({ slug, className }: { slug: string; className?: string }) {
  const kind = SLUG_TO_KIND[slug] ?? 'default';
  // 64×40, line drawings, single-stroke. Animates on group-hover via parent's :hover.
  return (
    <svg
      viewBox="0 0 64 40"
      width="64"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      className={className}
      aria-hidden
    >
      {kind === 'finance' && (
        <>
          <path d="M2 20 L18 20 L26 8 L34 32 L42 14 L50 26 L62 26" />
          <circle cx="2" cy="20" r="1.5" fill="currentColor" />
          <circle cx="62" cy="26" r="1.5" fill="currentColor" />
        </>
      )}
      {kind === 'gaming' && (
        <>
          <circle cx="32" cy="20" r="14" />
          <circle cx="32" cy="20" r="6" />
          <line x1="32" y1="6" x2="32" y2="10" />
          <line x1="32" y1="30" x2="32" y2="34" />
          <line x1="18" y1="20" x2="22" y2="20" />
          <line x1="42" y1="20" x2="46" y2="20" />
        </>
      )}
      {kind === 'ecommerce' && (
        <>
          <rect x="6" y="10" width="14" height="20" />
          <rect x="25" y="10" width="14" height="20" />
          <rect x="44" y="10" width="14" height="20" />
          <line x1="6" y1="14" x2="20" y2="14" />
          <line x1="25" y1="14" x2="39" y2="14" />
          <line x1="44" y1="14" x2="58" y2="14" />
        </>
      )}
      {kind === 'integration' && (
        <>
          <circle cx="10" cy="20" r="3" />
          <circle cx="32" cy="10" r="3" />
          <circle cx="32" cy="30" r="3" />
          <circle cx="54" cy="20" r="3" />
          <line x1="13" y1="20" x2="29" y2="11" />
          <line x1="13" y1="20" x2="29" y2="29" />
          <line x1="35" y1="11" x2="51" y2="20" />
          <line x1="35" y1="29" x2="51" y2="20" />
        </>
      )}
      {kind === 'seo-ads' && (
        <>
          <circle cx="20" cy="20" r="10" />
          <line x1="28" y1="28" x2="38" y2="38" />
          <path d="M44 14 L52 14 L52 26 L44 26 Z" />
          <line x1="48" y1="14" x2="48" y2="26" />
        </>
      )}
      {kind === 'social-media' && (
        <>
          <circle cx="14" cy="20" r="4" />
          <circle cx="32" cy="10" r="4" />
          <circle cx="32" cy="30" r="4" />
          <circle cx="50" cy="20" r="4" />
          <line x1="18" y1="20" x2="28" y2="12" />
          <line x1="18" y1="20" x2="28" y2="28" />
          <line x1="36" y1="12" x2="46" y2="20" />
          <line x1="36" y1="28" x2="46" y2="20" />
          <line x1="32" y1="14" x2="32" y2="26" />
        </>
      )}
      {kind === 'crm' && (
        <>
          <circle cx="32" cy="14" r="6" />
          <path d="M16 34 Q16 22 32 22 Q48 22 48 34" />
        </>
      )}
      {kind === 'default' && <rect x="6" y="6" width="52" height="28" rx="2" />}
    </svg>
  );
}
