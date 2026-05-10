import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { WordReveal } from '@/components/ui/WordReveal';
import { Parallax } from '@/components/ui/Parallax';

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className="relative bg-paper overflow-hidden">
      {/* Top tiny eyebrow */}
      <Container as="div" className="pt-16 md:pt-24">
        <p className="font-display text-sm uppercase tracking-[0.18em] text-ink/60">
          ✻ Airomeda — Software Studio · Est. 2018 · İstanbul
        </p>
      </Container>

      {/* Hero typography — oversized, breathing */}
      <Container as="div" className="relative pt-12 pb-12 md:pt-20 md:pb-20">
        <h1
          className="font-display max-w-[1400px]"
          style={{
            fontSize: 'clamp(3.5rem, 13vw, 13rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.045em',
            fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          }}
        >
          <WordReveal as="span" delayPerWord={120}>
            {t('home.hero.title')}
          </WordReveal>
        </h1>
      </Container>

      {/* Full-bleed atmospheric photograph with parallax */}
      <div className="relative">
        <Parallax speed={0.08}>
          <div className="img-cine relative aspect-[21/9] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2400&q=85"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </Parallax>
      </div>

      {/* Subtitle + CTAs after the image — gives breathing rhythm */}
      <Container as="div" className="pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="max-w-2xl text-ink/80"
              style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', lineHeight: 1.55 }}
            >
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-sm font-medium text-paper transition-all duration-300 ease-[var(--ease-out-quint)] hover:bg-coral"
              >
                {t('common.primary_cta')}
                <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <span className="border-b border-ink pb-px transition-colors duration-200 group-hover:border-coral group-hover:text-coral">
                  {t('common.secondary_cta')}
                </span>
                <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="border-l-2 border-ink pl-6">
              <p
                className="font-display text-xs uppercase tracking-[0.2em] text-ink/60"
                style={{ fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 500" }}
              >
                — Disiplinler
              </p>
              <ul className="mt-4 space-y-1.5">
                {[
                  'Finans Yazılımları',
                  'Şans Oyunları & iGaming',
                  'E-Ticaret',
                  'Entegrasyon',
                  'SEO & Reklam',
                  'Sosyal Medya',
                  'CRM',
                ].map((d) => (
                  <li
                    key={d}
                    className="font-display text-base font-medium"
                    style={{
                      fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 500",
                    }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
