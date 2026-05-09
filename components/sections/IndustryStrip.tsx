import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const INDUSTRIES = [
  'Finance',
  'iGaming',
  'E-Commerce',
  'Insurance',
  'Manufacturing',
  'Public Sector',
  'Retail',
  'SaaS',
];

export async function IndustryStrip() {
  const t = await getTranslations('home.industries');

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('title')}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium text-foreground/80">
          {INDUSTRIES.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
