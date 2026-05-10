import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { listServices } from '@/lib/mdx';
import { CapabilityIcon } from '@/components/mockups/CapabilityIcon';
import type { Locale } from '@/i18n/routing';

export async function Capabilities({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.services_section');
  const services = await listServices(locale);

  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">Yetkinlikler</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-body-lg text-muted-foreground">{t('subtitle')}</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal delay={i * 60}>
                <Link href={`/hizmetler/${s.slug}`} className="group block">
                  <CapabilityIcon slug={s.slug} className="h-10 w-10 text-accent" />
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform duration-200 group-hover:translate-x-1">
                    Detay <span>→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
