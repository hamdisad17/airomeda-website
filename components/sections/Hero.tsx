import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className="relative">
      <Container as="div" className="relative pt-24 pb-32 md:pt-36 md:pb-44">
        {/* Tiny brand line at top */}
        <Reveal>
          <p className="font-mono text-eyebrow uppercase text-muted-foreground">
            Airomeda — Bilişim Teknolojileri · Est. 2018
          </p>
        </Reveal>

        {/* Editorial display headline — Fraunces, hugely refined */}
        <Reveal delay={120}>
          <h1
            className="font-display mt-12 max-w-5xl tracking-tight"
            style={{
              fontSize: 'clamp(2.75rem, 8.5vw, 8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              fontVariationSettings: "'opsz' 96, 'SOFT' 20, 'wght' 400",
            }}
          >
            {t('home.hero.title')}
          </h1>
        </Reveal>

        {/* Two-column: subtitle + meta */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal delay={240} className="lg:col-span-7">
            <p className="max-w-xl text-body-lg text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 rounded-md bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-px hover:bg-accent/90"
              >
                {t('common.primary_cta')}
                <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <span className="border-b border-foreground/30 pb-px transition-colors duration-200 group-hover:border-foreground">
                  {t('common.secondary_cta')}
                </span>
                <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={360} className="lg:col-span-5">
            <div className="space-y-5 border-t border-border pt-6 md:pt-0 md:border-t-0 md:border-l md:pl-12">
              <div>
                <p className="font-mono text-eyebrow uppercase text-muted-foreground">Disiplinler</p>
                <p className="mt-2 font-display text-3xl text-foreground" style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 20, 'wght' 400" }}>
                  Yedi farklı alan
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Finans · iGaming · E-Ticaret · Entegrasyon · CRM · Pazarlama · Sosyal Medya
                </p>
              </div>
              <div>
                <p className="font-mono text-eyebrow uppercase text-muted-foreground">Yaklaşım</p>
                <p className="mt-2 font-display text-3xl italic text-foreground" style={{ fontVariationSettings: "'opsz' 36, 'SOFT' 100, 'wght' 400" }}>
                  Sessiz mükemmellik
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed atmospheric photograph */}
      <Reveal delay={480}>
        <div className="relative mx-auto mt-12 max-w-7xl overflow-hidden rounded-lg">
          <div className="img-warm relative aspect-[16/7] w-full">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2400&q=85"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            {/* Soft vignette + warm tint overlay for premium cohesion */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 90% 70% at 50% 60%, transparent 0%, hsl(40 28% 95% / 0.35) 100%)',
              }}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
