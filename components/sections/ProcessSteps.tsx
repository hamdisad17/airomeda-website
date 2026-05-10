import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const STEPS = ['discovery', 'design', 'build', 'support'] as const;

export async function ProcessSteps() {
  const t = await getTranslations('home.process');
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container as="div">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
          — Method · 06
        </p>
        <h2
          className="font-display mt-4 max-w-4xl"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          }}
        >
          {t('title')}
        </h2>
        <ol className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((key, i) => (
            <li key={key} className="border-t-2 border-ink pt-5">
              <p
                className="font-display"
                style={{
                  fontSize: '4rem',
                  lineHeight: 0.9,
                  fontVariationSettings: "'opsz' 48, 'wdth' 75, 'wght' 700",
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3
                className="mt-6 font-display text-xl"
                style={{ fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 500" }}
              >
                {t(`steps.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
