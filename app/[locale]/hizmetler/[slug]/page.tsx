import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listServices, loadServiceContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { ServiceHero } from '@/components/service/ServiceHero';
import { ServiceCapabilities } from '@/components/service/ServiceCapabilities';
import { ServiceTechStrip } from '@/components/service/ServiceTechStrip';
import { ServiceFAQ } from '@/components/service/ServiceFAQ';
import { CTABlock } from '@/components/sections/CTABlock';
import { Container } from '@/components/layout/Container';
import { DemoForm } from '@/components/forms/DemoForm';
import { SERVICE_SLUGS, type ServiceKey } from '@/lib/i18n/slug-map';

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
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.excerpt,
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

  return (
    <>
      <ServiceHero
        title={content.frontmatter.title}
        subtitle={content.frontmatter.hero_subtitle}
        ctaText={content.frontmatter.cta_text}
      />
      <Container as="article" className="prose-invert max-w-3xl py-20">
        <MDXContent source={content.body} />
      </Container>
      <ServiceCapabilities items={content.frontmatter.capabilities} />
      <ServiceTechStrip items={content.frontmatter.tech_stack} />
      <ServiceFAQ items={content.frontmatter.faq} />
      {serviceKey ? (
        <Container as="section" className="max-w-3xl py-20">
          <h2 className="text-display-2 font-semibold tracking-tight">{tDemo('title')}</h2>
          <p className="mt-3 text-muted-foreground">{tDemo('subtitle')}</p>
          <div className="mt-10">
            <DemoForm service={serviceKey} />
          </div>
        </Container>
      ) : (
        <CTABlock />
      )}
    </>
  );
}
