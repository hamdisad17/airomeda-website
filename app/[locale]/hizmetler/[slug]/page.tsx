import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listServices, loadServiceContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { ServiceHero } from '@/components/service/ServiceHero';
import { ServiceCapabilities } from '@/components/service/ServiceCapabilities';
import { ServiceTechStrip } from '@/components/service/ServiceTechStrip';
import { ServiceFAQ } from '@/components/service/ServiceFAQ';
import { CTABlock } from '@/components/sections/CTABlock';
import { Container } from '@/components/layout/Container';

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
      <CTABlock />
    </>
  );
}
