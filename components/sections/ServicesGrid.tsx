import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.services_section');
  const services = await listServices(locale);

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-accent hover:bg-muted/40"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-accent">Detay →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
