import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listServices, loadServiceContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { ServiceHero } from '@/components/service/ServiceHero';
import { ServiceCapabilities } from '@/components/service/ServiceCapabilities';
import { ServiceTechStrip } from '@/components/service/ServiceTechStrip';
import { ServiceFAQ } from '@/components/service/ServiceFAQ';
import { CTASection } from '@/components/sections/CTASection';
import { Container } from '@/components/layout/Container';
import { DemoForm } from '@/components/forms/DemoForm';
import { SERVICE_SLUGS, type ServiceKey } from '@/lib/i18n/slug-map';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo/jsonld';
import { SITE } from '@/lib/seo/site';
import { makeAlternates } from '@/lib/seo/alternates';
import { ServiceOverview } from '@/components/sections/services/ServiceOverview';
import { ServiceGallery } from '@/components/sections/services/ServiceGallery';
import { ServiceBenefits } from '@/components/sections/services/ServiceBenefits';
import { ServicePackages } from '@/components/sections/services/ServicePackages';
import { AddOnList } from '@/components/sections/services/AddOnList';
import { LegalDisclaimer } from '@/components/sections/services/LegalDisclaimer';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const services = await listServices(locale);
    for (const s of services) params.push({ locale, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadServiceContent(slug, locale);
  if (!content) return {};
  const path = `/hizmetler/${slug}`;
  const alts = makeAlternates(path, locale);
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.excerpt,
    alternates: alts,
    openGraph: {
      type: 'website' as const,
      url: alts.canonical,
      title: content.frontmatter.title,
      description: content.frontmatter.excerpt,
      siteName: SITE.name,
      locale: SITE.ogLocale[locale],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: content.frontmatter.title,
      description: content.frontmatter.excerpt,
    },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await loadServiceContent(slug, locale);
  if (!content) notFound();

  const serviceEntry = SERVICE_SLUGS.find((s) => s.slugs[locale] === slug);
  const serviceKey = serviceEntry?.key as ServiceKey | undefined;

  const tDemo = await getTranslations({ locale, namespace: 'demo_form' });

  const url = makeAlternates(`/hizmetler/${slug}`, locale).canonical;
  const breadcrumbs = breadcrumbSchema([
    { name: 'Airomeda', url: `${SITE.url}/${locale}` },
    {
      name: locale === 'tr' ? 'Hizmetler' : 'Services',
      url: `${SITE.url}/${locale}/hizmetler`,
    },
    { name: content.frontmatter.title, url },
  ]);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: content.frontmatter.title,
            description: content.frontmatter.excerpt,
            url,
            locale,
          }),
          breadcrumbs,
          ...(content.frontmatter.faq && content.frontmatter.faq.length > 0
            ? [faqPageSchema(content.frontmatter.faq)]
            : []),
        ]}
      />
      <ServiceHero
        title={content.frontmatter.title}
        subtitle={content.frontmatter.hero_subtitle}
        ctaText={content.frontmatter.cta_text}
        slug={slug}
      />
      <ServiceOverview
        title={content.frontmatter.title}
        body1={content.frontmatter.excerpt ?? ''}
        body2="11 yıllık deneyimimizle, her projeyi işletmenizin ihtiyaçlarına özel olarak tasarlıyoruz. Kurumsal kalitede yazılım çözümlerini sizinle buluşturuyoruz."
        imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
        imageAlt={content.frontmatter.title}
      />
      <ServiceGallery />
      <ServiceBenefits />
      <Container as="article" className="prose-invert max-w-3xl py-20">
        <MDXContent source={content.body} />
      </Container>
      <ServiceCapabilities items={content.frontmatter.capabilities} />
      <ServicePackages slug={slug} />
      <AddOnList slug={slug} />
      <ServiceTechStrip items={content.frontmatter.tech_stack} />
      <ServiceFAQ items={content.frontmatter.faq} />
      {(slug === 'sans-oyunlari' || slug === 'finans') && <LegalDisclaimer />}
      {serviceKey ? (
        <Container as="section" className="max-w-3xl py-20">
          <h2 className="text-display-2 font-semibold tracking-tight">{tDemo('title')}</h2>
          <p className="mt-3 text-muted-foreground">{tDemo('subtitle')}</p>
          <div className="mt-10">
            <DemoForm service={serviceKey} />
          </div>
        </Container>
      ) : (
        <CTASection />
      )}
    </>
  );
}
