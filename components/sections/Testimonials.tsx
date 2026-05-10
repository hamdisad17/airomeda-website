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
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 09 · referanslar'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">Müşterilerimiz ne diyor?</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <li key={q.company} className="bg-background">
              <Reveal delay={i * 80}>
                <figure className="h-full p-7">
                  <blockquote className="text-base leading-relaxed text-foreground">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center border border-border font-mono text-sm font-semibold text-accent">
                      {q.author[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{q.author}</p>
                      <p className="font-mono text-xs text-muted-foreground">{q.company}</p>
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
