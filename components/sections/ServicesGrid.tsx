import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.services_section');
  const services = await listServices(locale);

  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// 01 — services'}</p>
        </Reveal>
        <div className="mt-6 mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal delay={80} className="max-w-2xl">
            <h2 className="text-display-2 font-medium tracking-tight">{t('title')}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">{t('subtitle')}</p>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-accent">{services.length.toString().padStart(2, '0')}</span>
              {' / '}
              {services.length.toString().padStart(2, '0')} disciplines
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="bg-background">
              <Reveal delay={i * 40}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group relative flex h-full flex-col p-7 transition-colors duration-200 hover:bg-muted/40"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-eyebrow uppercase text-muted-foreground">
                      / {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      open →
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-medium tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.excerpt}
                  </p>
                  <div className="mt-8 h-px w-full bg-border transition-colors duration-200 group-hover:bg-accent" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
