import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TerminalDemo } from '@/components/mockups/TerminalDemo';
import { AnimatedDotGrid } from '@/components/visuals/AnimatedDotGrid';
import { ParticleField } from '@/components/visuals/ParticleField';
import { GradientOrb } from '@/components/visuals/GradientOrb';
import { FloatingUIPeeks } from '@/components/visuals/FloatingUIPeeks';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { KineticHeadline } from '@/components/sections/KineticHeadline';
import { RecentShipments } from '@/components/sections/RecentShipments';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <AnimatedDotGrid />
      <ParticleField />
      <GradientOrb />

      <Container as="div" className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 border border-border bg-elevated/50 backdrop-blur-sm px-3 py-1 font-mono text-eyebrow uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-foreground">v.2026.05</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">production</span>
            </span>

            <KineticHeadline
              words={t.raw('home.hero.kinetic_words') as string[]}
              connector={t('home.hero.kinetic_connector')}
              tailLine={t('home.hero.title')}
            />

            <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)] hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
                >
                  {t('common.primary_cta')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </MagneticButton>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 border border-border px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t('common.secondary_cta')}
              </Link>
            </div>

            {/* Trust mini-line */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> BDDK uyumlu
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> 99.994% uptime
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> 8–16 hafta teslim
              </span>
            </div>

            {/* Recent shipments rotating indicator */}
            <RecentShipments />
          </div>

          {/* Terminal column with floating UI peeks */}
          <div className="relative">
            <FloatingUIPeeks />
            <TerminalDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
