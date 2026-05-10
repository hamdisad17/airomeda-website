import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TerminalDemo } from '@/components/mockups/TerminalDemo';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { TextReveal } from '@/components/motion/TextReveal';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative border-b border-border">
      <Container as="div" className="relative pt-24 pb-28 md:pt-36 md:pb-40">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-eyebrow uppercase text-muted-foreground">
              Software studio &middot; Türkiye &middot; 2018
            </p>
            <h1 className="mt-8 text-display-1 font-medium tracking-tight">
              <TextReveal as="span">{t('home.hero.title')}</TextReveal>
            </h1>
            <p className="mt-8 max-w-xl text-body-lg text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)]"
                >
                  {t('common.primary_cta')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </MagneticButton>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-accent"
              >
                <span className="border-b border-foreground/40 pb-0.5 group-hover:border-accent">
                  {t('common.secondary_cta')}
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <TerminalDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
