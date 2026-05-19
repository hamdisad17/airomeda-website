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

const CATEGORY_ORDER: PricingCategory[] = ['pazarlama', 'yazilim', 'web'];

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Group services by category
  const byCategory: Record<PricingCategory, string[]> = {
    pazarlama: [],
    yazilim: [],
    web: [],
  };
  for (const slug of Object.keys(PACKAGES_BY_SLUG)) {
    const cat = SERVICE_CATEGORY[slug];
    if (cat) byCategory[cat].push(slug);
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <Container as="div" className="py-20 md:py-28">
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Fiyatlar</p>
          <h1
            className="mt-6 max-w-3xl font-semibold tracking-tight text-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Şeffaf paketler, müzakere edilebilir kapsam.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Her hizmet için üç ana paket: <strong>Başlangıç</strong> (küçük ve hızlı),
            <strong> Profesyonel</strong> (büyüyen markalar için tam paket),
            <strong> Kurumsal</strong> (özel ekip + SLA). Aylık aboneliklerde yıllık taahhütle
            %15 indirim.
          </p>

          {/* Quick jump */}
          <nav className="mt-10 flex flex-wrap gap-3">
            {CATEGORY_ORDER.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {CATEGORY_LABELS[cat].title} →
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
              className="mt-4 font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
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
      className={`relative flex flex-col border p-6 ${
        pkg.highlight
          ? 'border-accent bg-accent/5'
          : 'border-border bg-elevated'
      }`}
    >
      {pkg.highlight && (
        <span className="absolute -top-2.5 left-4 bg-accent px-3 py-0.5 text-[10px] uppercase tracking-wider text-accent-foreground">
          En popüler
        </span>
      )}
      <p
        className={`text-eyebrow uppercase tracking-wider font-medium ${
          pkg.highlight ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        {pkg.name}
      </p>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {pkg.desc}
      </p>
      {pkg.price && (
        <div className="mt-3 pb-3 border-b border-border">
          <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
            {pkg.price}
          </p>
          {pkg.priceNote && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">{pkg.priceNote}</p>
          )}
          {pkg.annualPrice && (
            <p className="mt-1 text-[11px]">
              <span className="text-muted-foreground">yıllık </span>
              <span className="text-foreground font-medium">{pkg.annualPrice}</span>
              {pkg.annualSavings && (
                <span className="ml-1 text-accent">· {pkg.annualSavings}</span>
              )}
            </p>
          )}
        </div>
      )}
      <ul className="mt-4 space-y-1.5 flex-1 text-[13px]">
        {pkg.features.slice(0, 5).map((f) => (
          <li key={f} className="flex items-start gap-1.5 text-foreground/90">
            <span className="mt-1 text-accent shrink-0">✓</span>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
        {pkg.features.length > 5 && (
          <li className="text-[11px] text-muted-foreground pl-3.5">
            +{pkg.features.length - 5} özellik daha
          </li>
        )}
      </ul>
      <Link
        href="/iletisim"
        className={`mt-5 block text-center px-3 py-2.5 text-xs font-medium transition-all ${
          pkg.highlight
            ? 'bg-accent text-accent-foreground hover:shadow-[0_0_20px_-5px_hsl(173_80%_40%_/_0.5)]'
            : 'border border-border text-foreground hover:border-accent hover:text-accent'
        }`}
      >
        {pkg.cta}
      </Link>
    </div>
  );
}
