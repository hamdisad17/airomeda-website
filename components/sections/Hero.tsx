import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function Hero() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  const buildId = `BUILD.${year}.05.07`;

  return (
    <section className="relative overflow-hidden">
      {/* Dim ambient glow — stays subtle, just enough to anchor the eye */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[800px] w-[1200px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(48 100% 50% / 0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <Container as="div" className="relative pt-28 pb-32 md:pt-40 md:pb-44">
        {/* Tiny precision label */}
        <Reveal>
          <div className="mb-12 flex items-center gap-4 font-mono text-eyebrow uppercase">
            <span className="inline-flex items-center gap-2 text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              live
            </span>
            <span className="h-px w-8 bg-border"></span>
            <span className="text-muted-foreground">{buildId}</span>
            <span className="h-px w-8 bg-border"></span>
            <span className="text-muted-foreground">İstanbul · İstanbul</span>
          </div>
        </Reveal>

        {/* Hero typography — display-1, but bigger, breathing */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-9">
            <Reveal delay={80}>
              <h1
                className="font-medium tracking-tight"
                style={{
                  fontSize: 'clamp(3rem, 9.5vw, 9rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.045em',
                }}
              >
                {t('home.hero.title')}
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-3 flex flex-col justify-end">
            <Reveal delay={160}>
              <div className="border-l border-border pl-6">
                <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// est.'}</p>
                <p className="mt-2 font-mono text-3xl text-foreground">2018</p>
                <p className="mt-1 font-mono text-eyebrow uppercase text-muted-foreground">
                  active disciplines
                </p>
                <p className="mt-2 font-mono text-3xl text-accent">07</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={240}>
          <p className="mt-12 max-w-xl text-body-lg text-muted-foreground">
            {t('home.hero.subtitle')}
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/iletisim"
              className="group relative inline-flex items-center gap-3 rounded-md bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_hsl(48_100%_50%_/_0.5)]"
            >
              {t('common.primary_cta')}
              <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/calismalarimiz"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <span className="border-b border-border pb-px transition-colors duration-200 group-hover:border-foreground">
                {t('common.secondary_cta')}
              </span>
              <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Bottom rail — three small system labels with mono */}
        <Reveal delay={480}>
          <div className="mt-24 flex flex-wrap items-center gap-x-12 gap-y-4 border-t border-border pt-8 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">[01]</span>
              <span className="text-foreground/80">finans · igaming · e-ticaret</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">[02]</span>
              <span className="text-foreground/80">production-grade · auditable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">[03]</span>
              <span className="text-foreground/80">8–16 wk delivery · TR/EN</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
