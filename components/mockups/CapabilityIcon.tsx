type Props = { slug: string; className?: string };

export function CapabilityIcon({ slug, className }: Props) {
  const ICONS: Record<string, React.ReactNode> = {
    fastpay: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M13 13l-3 4h3l-1 3"/>
      </>
    ),
    finans: <path d="M3 3v18h18M7 14l3-3 3 3 5-5"/>,
    finance: <path d="M3 3v18h18M7 14l3-3 3 3 5-5"/>,
    'sans-oyunlari': (
      <>
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="3" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="21"/>
      </>
    ),
    gaming: (
      <>
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="3" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="21"/>
      </>
    ),
    'e-ticaret': (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <circle cx="9" cy="14" r="1"/>
        <circle cx="13" cy="14" r="1"/>
      </>
    ),
    ecommerce: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <circle cx="9" cy="14" r="1"/>
        <circle cx="13" cy="14" r="1"/>
      </>
    ),
    entegrasyon: (
      <>
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="6" y1="8" x2="6" y2="16"/>
        <line x1="18" y1="8" x2="18" y2="16"/>
        <line x1="8" y1="18" x2="16" y2="18"/>
      </>
    ),
    integration: (
      <>
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="6" y1="8" x2="6" y2="16"/>
        <line x1="18" y1="8" x2="18" y2="16"/>
        <line x1="8" y1="18" x2="16" y2="18"/>
      </>
    ),
    'seo-reklam': (
      <>
        <circle cx="11" cy="11" r="7"/>
        <line x1="21" y1="21" x2="16.5" y2="16.5"/>
        <path d="M11 8v6M8 11h6"/>
      </>
    ),
    'seo-ads': (
      <>
        <circle cx="11" cy="11" r="7"/>
        <line x1="21" y1="21" x2="16.5" y2="16.5"/>
        <path d="M11 8v6M8 11h6"/>
      </>
    ),
    'sosyal-medya': (
      <>
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="12" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <line x1="8" y1="7" x2="16" y2="11"/>
        <line x1="8" y1="17" x2="16" y2="13"/>
      </>
    ),
    'social-media': (
      <>
        <circle cx="6" cy="6" r="2"/>
        <circle cx="18" cy="12" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <line x1="8" y1="7" x2="16" y2="11"/>
        <line x1="8" y1="17" x2="16" y2="13"/>
      </>
    ),
    crm: (
      <>
        <circle cx="9" cy="8" r="3"/>
        <path d="M3 19c0-3 3-5 6-5s6 2 6 5"/>
        <circle cx="17" cy="9" r="2"/>
        <path d="M14 16c1-2 2-3 3-3s2 1 3 3"/>
      </>
    ),
    'kurumsal-web': (
      <>
        <rect x="3" y="3" width="18" height="14" rx="2"/>
        <line x1="3" y1="7" x2="21" y2="7"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="9"/>}
    </svg>
  );
}
