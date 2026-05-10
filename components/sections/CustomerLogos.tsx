import { CustomerLogo } from '@/components/visuals/CustomerLogo';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

export function CustomerLogos() {
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-center font-mono text-eyebrow uppercase text-muted-foreground">
            {'// 2018\'den beri Türkiye\'nin önde gelen markalarına teslim ediyoruz'}
          </p>
          <ul className="mt-12 grid grid-cols-2 items-center gap-x-12 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
            {(['paygate', 'bahis', 'hubert', 'topratebet', 'pazarliman', 'entegrasys', 'markaco', 'studio'] as const).map((v) => (
              <li key={v} className="flex items-center justify-center text-muted-foreground/60 transition-colors hover:text-foreground">
                <CustomerLogo variant={v} />
              </li>
            ))}
          </ul>
        </RevealSection>
      </Container>
    </section>
  );
}
