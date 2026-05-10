import { Container } from '@/components/layout/Container';

const QUOTES = [
  {
    quote:
      '4 ay içinde core banking modernizasyonumuzu canlıya aldılar. Hız ile kalite el ele geldi.',
    author: 'CTO',
    role: 'PayGate Bankası',
  },
  {
    quote: 'Lisans onayını ilk sunuşta aldık. RNG raporumuzu beklediğimizden hızlı yaptılar.',
    author: 'CPO',
    role: 'Bahis.io',
  },
];

export function Testimonials() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <Container as="div">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
          — Voices · 07
        </p>
        <ul className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {QUOTES.map((q) => (
            <li key={q.author + q.role}>
              <blockquote
                className="font-display"
                style={{
                  fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.018em',
                  fontVariationSettings: "'opsz' 72, 'wdth' 100, 'wght' 400",
                }}
              >
                <span className="text-coral">&ldquo;</span>
                {q.quote}
                <span className="text-coral">&rdquo;</span>
              </blockquote>
              <p className="mt-6 font-display text-xs uppercase tracking-[0.2em] text-ink/60">
                — {q.author} · {q.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
