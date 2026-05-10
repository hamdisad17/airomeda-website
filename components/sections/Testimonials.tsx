import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const QUOTES = [
  {
    quote: '4 ayda core banking modernizasyonumuzu canlıya aldılar. Sıfır kesintili geçiş ve denetlenebilir bir mimari teslim ettiler.',
    author: 'Ad Soyad',
    role: 'CTO',
    company: 'PayGate Bankası',
    industry: 'Finans',
  },
  {
    quote: 'Lisans onayını ilk sunuşta aldık. RNG denetim raporunu beklediğimizden hızlı, eksiksiz teslim ettiler.',
    author: 'Ad Soyad',
    role: 'CPO',
    company: 'Bahis.io',
    industry: 'iGaming',
  },
  {
    quote: 'Headless mimariye geçişi 6 hafta içinde, kesinti yaşamadan tamamladılar. Aynı ekip operasyon desteğini sürdürüyor.',
    author: 'Ad Soyad',
    role: 'CTO',
    company: 'Hubert Commerce',
    industry: 'E-Ticaret',
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-28 md:py-40">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase text-muted-foreground">06 — In their words</p>
          <h2 className="mt-4 max-w-3xl text-display-2 font-medium tracking-tight">
            Müşterilerimiz ne diyor?
          </h2>
        </RevealSection>
        <StaggerGrid className="mt-16 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              data-stagger-item
              key={q.company}
              className="flex h-full flex-col border border-border bg-elevated p-7"
            >
              <p className="text-eyebrow uppercase text-muted-foreground">{q.industry}</p>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="text-sm font-medium">{q.author}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {q.role} &middot; {q.company}
                </p>
              </figcaption>
            </figure>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
