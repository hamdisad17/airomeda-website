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
    <section className="border-b border-border bg-muted/30 py-14">
      <div className="container">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Türkiye&apos;nin önde gelen finans, iGaming ve perakende firmalarına teslim eden stüdyo
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {LOGOS.map((name) => (
            <li key={name} className="flex items-center justify-center text-center">
              <span className="font-semibold text-muted-foreground tracking-tight opacity-60 grayscale transition-opacity hover:opacity-100">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
