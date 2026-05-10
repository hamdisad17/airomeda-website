import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

export function TrustLine() {
  return (
    <section className="border-b border-border py-16 md:py-20">
      <Container as="div">
        <RevealSection>
          <p className="mx-auto max-w-4xl text-center text-display-3 font-medium tracking-tight text-foreground/80">
            Finans, iGaming ve e-ticaret sektörlerinde, üretim ortamında çalışan sistemler kuruyoruz —{' '}
            <span className="font-serif-italic text-foreground/60">2018&apos;den bu yana</span>.
          </p>
        </RevealSection>
      </Container>
    </section>
  );
}
