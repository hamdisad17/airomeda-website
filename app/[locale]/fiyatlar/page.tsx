import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { CTASection } from '@/components/sections/CTASection';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import {
  PACKAGES_BY_SLUG,
  SERVICE_LABELS,
  SERVICE_CATEGORY,
  type PricingCategory,
  type ServicePackage,
} from '@/lib/data/service-packages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const alts = makeAlternates('/fiyatlar', locale);
  return {
    title: 'Fiyatlar — Paketler ve Şeffaf Ücretlendirme',
    description:
      "Tüm hizmetlerimiz için paketli fiyatlandırma — SEO, sosyal medya, CRM, yazılım geliştirme, e-ticaret ve daha fazlası. Şeffaf, müzakere edilebilir, yıllık taahhütle %15 indirimli.",
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title: 'Airomeda Fiyatlar',
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
  };
}

const CATEGORY_LABELS: Record<PricingCategory, { title: string; subtitle: string }> = {
  pazarlama: {
    title: 'Pazarlama & Büyüme',
    subtitle:
      'SEO, sosyal medya, reklam yönetimi ve CRM — aylık abonelik veya tek seferlik paketlerle.',
  },
  yazilim: {
    title: 'Yazılım Geliştirme',
    subtitle:
      'Finans, iGaming, e-ticaret ve sistem entegrasyonu — proje bazlı veya uzun vadeli ortaklık.',
  },
  web: {
    title: 'Web & Kurumsal',
    subtitle: 'Kurumsal web sitesi ve markalı dijital deneyim. Tek seferlik teslim modelleriyle.',
  },
};

// Visitor journey order: software first (integration & e-commerce up top),
// then corporate web, then marketing/SEO last.
const CATEGORY_ORDER: PricingCategory[] = ['yazilim', 'web', 'pazarlama'];

// Explicit service order *within* each category. Drives what a visitor sees
// first: entegrasyon + e-ticaret, then oyun + finans, … SEO dead last.
const SERVICE_ORDER: Record<PricingCategory, string[]> = {
  yazilim: ['entegrasyon', 'e-ticaret', 'sans-oyunlari', 'finans'],
  web: ['kurumsal-web'],
  pazarlama: ['sosyal-medya', 'crm', 'seo-reklam'],
};

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Group services by category, honoring the explicit SERVICE_ORDER and
  // dropping any slug that has no packages. Falls back to appending any
  // slug that exists but wasn't listed in SERVICE_ORDER (defensive).
  const byCategory: Record<PricingCategory, string[]> = {
    pazarlama: [],
    yazilim: [],
    web: [],
  };
  for (const cat of CATEGORY_ORDER) {
    const ordered = SERVICE_ORDER[cat].filter((slug) => PACKAGES_BY_SLUG[slug]);
    const extras = Object.keys(PACKAGES_BY_SLUG).filter(
      (slug) => SERVICE_CATEGORY[slug] === cat && !ordered.includes(slug),
    );
    byCategory[cat] = [...ordered, ...extras];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(50% 60% at 20% 0%, rgb(20 184 166 / 0.14), transparent 70%), radial-gradient(45% 55% at 85% 10%, rgb(129 140 248 / 0.14), transparent 70%)',
          }}
        />
        <Container as="div" className="py-20 md:py-28">
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Paketlerimiz</p>
          <h1
            className="mt-6 max-w-3xl font-semibold tracking-tight text-foreground"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
            }}
          >
            Şeffaf paketler, <span className="text-gradient">müzakere edilebilir</span> kapsam.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Her hizmet için üç ana paket: <strong className="text-foreground">Başlangıç</strong> (küçük ve hızlı),
            <strong className="text-foreground"> Profesyonel</strong> (büyüyen markalar için tam paket),
            <strong className="text-foreground"> Kurumsal</strong> (özel ekip + SLA). Aylık aboneliklerde yıllık taahhütle
            %15 indirim.
          </p>

          {/* Quick jump */}
          <nav className="mt-10 flex flex-wrap gap-3">
            {CATEGORY_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-elevated/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {CATEGORY_LABELS[cat].title} <span aria-hidden>→</span>
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Category sections */}
      {CATEGORY_ORDER.map((cat) => (
        <section
          key={cat}
          id={cat}
          className="border-b border-border py-20 md:py-28 scroll-mt-20"
        >
          <Container as="div">
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
              {CATEGORY_LABELS[cat].title}
            </p>
            <h2
              className="mt-4 max-w-3xl font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              {CATEGORY_LABELS[cat].subtitle}
            </h2>

            <div className="mt-14 space-y-16">
              {byCategory[cat].map((slug) => (
                <ServiceBlock key={slug} slug={slug} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* Footer CTA */}
      <CTASection />
    </>
  );
}

function ServiceBlock({ slug, locale }: { slug: string; locale: Locale }) {
  const packages = PACKAGES_BY_SLUG[slug] ?? [];
  const label = SERVICE_LABELS[slug] ?? slug;
  // Service path uses TR slug consistently across locales (current routing)
  const detailHref = `/hizmetler/${slug}` as const;

  return (
    <div>
      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
        <h3 className="text-display-3 font-semibold tracking-tight text-foreground">
          {label}
        </h3>
        <Link
          href={detailHref}
          locale={locale}
          className="text-sm font-medium text-accent hover:underline underline-offset-4 shrink-0"
        >
          Hizmet detayı →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.name} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <div
      className={`hover-lift hover:hover-lift-on relative flex flex-col overflow-hidden rounded-2xl p-6 ${
        pkg.highlight
          ? 'border border-accent/60 bg-accent/[0.06] shadow-[0_24px_60px_-32px_hsl(173_80%_45%_/_0.5)]'
          : 'surface-elevated'
      }`}
    >
      {/* gradient top hairline on the highlighted card */}
      {pkg.highlight && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'var(--gradient-brand)' }}
        />
      )}
      {pkg.highlight && (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#07111d]"
          style={{ background: 'var(--gradient-brand)' }}
        >
          ★ En popüler
        </span>
      )}
      <p
        className={`text-eyebrow uppercase tracking-wider font-semibold ${
          pkg.highlight ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        {pkg.name}
      </p>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {pkg.desc}
      </p>
      {pkg.price && (
        <div className="mt-4 pb-4 border-b border-border">
          <p
            className={`text-3xl font-semibold tracking-tight tabular-nums ${
              pkg.highlight ? 'text-gradient' : 'text-foreground'
            }`}
          >
            {pkg.price}
          </p>
          {pkg.priceNote && (
            <p className="mt-1 text-[11px] text-muted-foreground">{pkg.priceNote}</p>
          )}
          {pkg.annualPrice && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-[11px]">
              <span className="text-muted-foreground">yıllık </span>
              <span className="text-foreground font-medium">{pkg.annualPrice}</span>
              {pkg.annualSavings && (
                <span className="font-semibold text-accent">· {pkg.annualSavings}</span>
              )}
            </p>
          )}
        </div>
      )}
      <ul className="mt-4 space-y-2 flex-1 text-[13px]">
        {pkg.features.slice(0, 5).map((f) => (
          <li key={f} className="flex items-start gap-2 text-foreground/90">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-[10px] text-accent">
              ✓
            </span>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
        {pkg.features.length > 5 && (
          <li className="text-[11px] text-muted-foreground pl-6">
            +{pkg.features.length - 5} özellik daha
          </li>
        )}
      </ul>
      <Link
        href="/iletisim"
        className={`mt-6 block rounded-xl px-3 py-2.5 text-center text-xs font-semibold transition-all ${
          pkg.highlight
            ? 'btn-brand hover:btn-brand-hover'
            : 'border border-border text-foreground hover:border-accent hover:text-accent'
        }`}
      >
        {pkg.cta}
      </Link>
    </div>
  );
}
