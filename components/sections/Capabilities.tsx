import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';
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
          <RevealSection>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Kapasitelerimiz</p>
            <h2 className="mt-4 text-display-2 font-semibold tracking-tight">{t('title')}</h2>
            <p className="mt-4 text-body-lg text-muted-foreground">{t('subtitle')}</p>
          </RevealSection>
        </div>

        <StaggerGrid className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li data-stagger-item key={s.slug} className="list-none bg-background">
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group relative flex h-full flex-col p-7 transition-colors hover:bg-muted/40"
              >
                <CapabilityIcon slug={s.slug} className="h-8 w-8 text-accent" />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-accent">
                  İncele
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </li>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
