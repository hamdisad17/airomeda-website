const LOGOS = [
  'PayGate',
  'Bahis.io',
  'Hubert',
  'TopRateBet',
  'Pazarlıman',
  'Entegrasys',
  'Marka Co.',
  'Stüdyo',
];

export function CustomerLogos() {
  return (
    <section className="border-b border-border py-16">
      <div className="container">
        <p className="text-center font-mono text-eyebrow uppercase text-muted-foreground">
          production-grade systems · 2018→2026
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {LOGOS.map((name) => (
            <li key={name} className="flex items-center justify-center">
              <span className="font-mono text-sm font-medium text-muted-foreground/70 tracking-tight transition-colors hover:text-foreground">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
