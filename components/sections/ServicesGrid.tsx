import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

const SERVICE_IMG: Record<string, string> = {
  finans: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&w=1200&q=85',
  finance: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&w=1200&q=85',
  'sans-oyunlari':
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&w=1200&q=85',
  gaming: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&w=1200&q=85',
  'e-ticaret':
    'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&w=1200&q=85',
  ecommerce:
    'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&w=1200&q=85',
  entegrasyon:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=1200&q=85',
  integration:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=1200&q=85',
  'seo-reklam':
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=1200&q=85',
  'seo-ads': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&w=1200&q=85',
  'sosyal-medya':
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&w=1200&q=85',
  'social-media':
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&w=1200&q=85',
  crm: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&w=1200&q=85',
};

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&w=1200&q=85';

export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.services_section');
  const services = await listServices(locale);

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container
        as="div"
        className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
            — Services · 03
          </p>
          <h2
            className="font-display mt-4 max-w-4xl"
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
            }}
          >
            {t('title')}
          </h2>
        </div>
      </Container>
      <Container as="div">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Link href={`/hizmetler/${s.slug}`} className="group block">
                <div className="img-cine relative aspect-[4/5] overflow-hidden bg-bone">
                  <Image
                    src={SERVICE_IMG[s.slug] ?? FALLBACK_IMG}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
                    / {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60 transition-colors group-hover:text-coral">
                    read →
                  </p>
                </div>
                <h3
                  className="font-display mt-3 transition-colors duration-300 group-hover:text-coral"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    fontVariationSettings: "'opsz' 48, 'wdth' 100, 'wght' 500",
                  }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
