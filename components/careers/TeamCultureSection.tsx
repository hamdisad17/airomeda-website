import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const VALUE_KEYS = ['ownership', 'craft', 'transparency'] as const;

export async function TeamCultureSection() {
  const t = await getTranslations('careers');

  return (
    <section className="border-b border-border bg-muted/20">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">{t('team_culture_title')}</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t('team_culture_intro')}</p>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUE_KEYS.map((key) => (
            <li key={key} className="rounded-lg border border-border bg-background p-6">
              <h3 className="text-lg font-semibold">{t(`values.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`values.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
