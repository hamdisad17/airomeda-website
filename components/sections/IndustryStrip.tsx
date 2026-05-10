import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const INDUSTRIES = [
  'Finance', 'iGaming', 'E-Commerce', 'Insurance',
  'Manufacturing', 'Public Sector', 'Retail', 'SaaS',
];

export async function IndustryStrip() {
  return (
    <section className="relative border-y border-border">
      <Container as="div" className="py-10">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// fields of practice'}</p>
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-3">
            {INDUSTRIES.map((i) => (
              <li
                key={i}
                className="font-mono text-sm tracking-tight text-foreground/70 transition-colors duration-150 hover:text-foreground"
              >
                {i}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
