import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TerminalDemo } from '@/components/mockups/TerminalDemo';
import { ParticleField } from '@/components/visuals/ParticleField';
import { FlowField } from '@/components/visuals/FlowField';
import { FloatingUIPeeks } from '@/components/visuals/FloatingUIPeeks';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { KineticHeadline } from '@/components/sections/KineticHeadline';
import { RecentShipments } from '@/components/sections/RecentShipments';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section id="hero" className="relative overflow-hidden border-b border-border">
      <FlowField />
      <ParticleField />

      <Container as="div" className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 border border-border bg-elevated/50 backdrop-blur-sm px-3 py-1 text-eyebrow uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-foreground">11 yıl</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">36 uzman · 130+ ülke</span>
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
                  className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)] hover:shadow-[0_0_40px_-5px_hsl(173_80%_40%_/_0.6)]"
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
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> 11 yıl deneyim · 36 kişilik ekip
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> 130+ ülkeye hizmet
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span> 7/24 destek
              </span>
            </div>

            {/* Recent shipments rotating indicator */}
            <RecentShipments />
          </div>

          {/* Terminal demo with floating UI peeks */}
          <div className="relative">
            <FloatingUIPeeks />
            <TerminalDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}
