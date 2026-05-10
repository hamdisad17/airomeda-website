import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const QUOTES = [
  {
    quote: '4 ayda core banking modernizasyonumuzu canlıya aldılar. Hız ve kalite el ele geldi.',
    author: 'CTO',
    company: 'PayGate Bankası',
  },
  {
    quote: 'Lisans onayını ilk sunuşta aldık. RNG raporumuzu beklediğimizden hızlı yaptılar.',
    author: 'CPO',
    company: 'Bahis.io',
  },
  {
    quote: 'Headless mimariye geçişi 6 hafta içinde, kesinti yaşamadan tamamladılar.',
    author: 'CTO',
    company: 'Hubert Commerce',
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">Referanslar</p>
          <h2 className="mt-3 text-display-2 font-semibold tracking-tight">Müşterilerimiz ne diyor?</h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <li key={q.company}>
              <Reveal delay={i * 80}>
                <figure className="rounded-xl border border-border bg-white p-7 shadow-card">
                  <blockquote className="text-base leading-relaxed text-foreground">&ldquo;{q.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                      {q.author[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{q.author}</p>
                      <p className="text-xs text-muted-foreground">{q.company}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
