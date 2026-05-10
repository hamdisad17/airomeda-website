import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = ['discovery', 'design', 'build', 'support'] as const;

export async function ProcessSteps() {
  const t = await getTranslations('home.process');
  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <div className="mb-16">
          <Reveal>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              {'// 05 — method'}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-4 max-w-2xl font-medium tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              {t('title')}
            </h2>
          </Reveal>
        </div>

        {/* Horizontal track */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-border" aria-hidden></div>
          <ol className="relative grid grid-cols-2 gap-y-16 md:grid-cols-4 md:gap-x-8">
            {STEPS.map((key, i) => (
              <li key={key}>
                <Reveal delay={i * 100}>
                  <div className="relative">
                    <div className="absolute left-0 top-0 h-6 w-6 -translate-y-1/2">
                      <div className="absolute inset-0 rounded-full bg-background"></div>
                      <div className="absolute inset-1 rounded-full border border-accent bg-background"></div>
                      <div className="absolute inset-[7px] rounded-full bg-accent"></div>
                    </div>
                    <div className="pl-9 pt-1">
                      <p className="font-mono text-eyebrow uppercase text-accent">
                        phase {(i + 1).toString().padStart(2, '0')}
                      </p>
                      <h3 className="mt-4 text-lg font-medium tracking-tight">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {t(`steps.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
