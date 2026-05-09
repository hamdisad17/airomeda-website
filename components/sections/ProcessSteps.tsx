import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const STEP_KEYS = ['discovery', 'design', 'build', 'support'] as const;

export async function ProcessSteps() {
  const t = await getTranslations('home.process');

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {STEP_KEYS.map((key, i) => (
            <li key={key} className="rounded-lg border border-border bg-muted/20 p-6">
              <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
