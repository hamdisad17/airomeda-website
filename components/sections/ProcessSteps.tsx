import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const STEP_KEYS = ['discovery', 'design', 'build', 'support'] as const;

export async function ProcessSteps() {
  const t = await getTranslations('home.process');
  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// 03 — method'}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 max-w-2xl text-display-2 font-medium tracking-tight">{t('title')}</h2>
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden border border-border md:grid-cols-4">
          {STEP_KEYS.map((key, i) => (
            <li key={key} className="bg-background">
              <Reveal delay={i * 60}>
                <div className="relative flex h-full flex-col p-7">
                  <span className="font-mono text-eyebrow uppercase text-accent">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-lg font-medium tracking-tight">{t(`steps.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`steps.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
