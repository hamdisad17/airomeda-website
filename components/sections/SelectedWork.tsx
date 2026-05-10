import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function SelectedWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.selected_work' });
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);
  const featured = cases[0];
  if (!featured) return null;

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container as="div" className="mb-16 flex items-end justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
            — Selected Work · 05
          </p>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
            }}
          >
            {t('title')}
          </h2>
        </div>
        <Link
          href="/calismalarimiz"
          className="hidden font-display text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-coral md:inline-block"
        >
          all work →
        </Link>
      </Container>

      <Link href={`/calismalarimiz/${featured.slug}`} className="group block">
        <div className="img-cine relative aspect-[16/8] w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2400&q=85"
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-[1.02]"
            sizes="100vw"
          />
        </div>
        <Container as="div" className="mt-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-coral">
                {featured.client}
              </p>
              <h3
                className="font-display mt-4"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  fontVariationSettings: "'opsz' 72, 'wdth' 100, 'wght' 500",
                }}
              >
                {featured.title}
              </h3>
              <p className="mt-6 max-w-xl text-ink/70" style={{ lineHeight: 1.55 }}>
                {featured.excerpt}
              </p>
            </div>
            <div className="lg:col-span-5">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
                {featured.metrics.slice(0, 4).map((m) => (
                  <li key={m.label} className="border-t-2 border-ink pt-3">
                    <p
                      className="font-display"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        lineHeight: 1,
                        fontVariationSettings: "'opsz' 36, 'wdth' 75, 'wght' 700",
                      }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-2 text-sm leading-tight text-ink/70">{m.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Link>
    </section>
  );
}
