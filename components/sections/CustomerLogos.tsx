import { CustomerLogo } from '@/components/visuals/CustomerLogo';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const VARIANTS = [
  'paygate',
  'bahis',
  'hubert',
  'topratebet',
  'pazarliman',
  'entegrasys',
  'markaco',
  'studio',
] as const;

export function CustomerLogos() {
  const doubled = [...VARIANTS, ...VARIANTS];
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-center font-mono text-eyebrow uppercase text-muted-foreground">
            {"2018'den beri Türkiye'nin önde gelen markalarına teslim ediyoruz"}
          </p>
        </RevealSection>
      </Container>
      <div
        className="mt-12 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max items-center gap-16 animate-marquee-slow whitespace-nowrap">
          {doubled.map((v, i) => (
            <span
              key={`${v}-${i}`}
              className="inline-flex items-center text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <CustomerLogo variant={v} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
