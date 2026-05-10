const ITEMS = [
  'Finans',
  'iGaming',
  'E-Ticaret',
  'Entegrasyon',
  'SEO & Reklam',
  'Sosyal Medya',
  'CRM',
  '— production-grade —',
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="relative overflow-hidden bg-ink py-12 md:py-16 text-paper">
      <div
        className="flex animate-marquee whitespace-nowrap font-display"
        style={{
          fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          fontSize: 'clamp(4rem, 12vw, 12rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {doubled.map((t, i) => (
          <span key={i} className="mx-12 flex items-center gap-12">
            <span>{t}</span>
            <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-coral" />
          </span>
        ))}
      </div>
    </section>
  );
}
