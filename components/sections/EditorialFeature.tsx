import { Container } from '@/components/layout/Container';
import { WordReveal } from '@/components/ui/WordReveal';

export function EditorialFeature() {
  return (
    <section className="bg-coral py-32 md:py-44 text-paper">
      <Container as="div">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-paper/70">
          — Note · 04
        </p>
        <p
          className="font-display mt-12 max-w-5xl"
          style={{
            fontSize: 'clamp(2.25rem, 6vw, 5.5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          }}
        >
          <WordReveal>
            Yazılım, çalışmadığında şikâyet edilen şeydir. Çalıştığında — kimse fark etmez.
          </WordReveal>
        </p>
        <p className="mt-12 font-display text-xs uppercase tracking-[0.2em] text-paper/70">
          Biz, kimsenin fark etmediği üretim altyapılarını kuruyoruz.
        </p>
      </Container>
    </section>
  );
}
