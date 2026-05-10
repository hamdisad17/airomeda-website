import { SITE, type SiteLocale } from './site';

type WithContext<T> = T & { '@context': 'https://schema.org' };

export function organizationSchema(): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    sameAs: [],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: SITE.email,
        contactType: 'sales',
        availableLanguage: ['tr', 'en'],
      },
    ],
  };
}

export function websiteSchema(locale: SiteLocale): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: locale === 'tr' ? 'tr-TR' : 'en-US',
    description: SITE.description[locale],
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  url: string;
  locale: SiteLocale;
}): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: args.url,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: 'Worldwide',
    inLanguage: args.locale === 'tr' ? 'tr-TR' : 'en-US',
  };
}

export function articleSchema(args: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author: string;
  image?: string;
  locale: SiteLocale;
}): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@type': 'Organization', name: args.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    image: args.image,
    inLanguage: args.locale === 'tr' ? 'tr-TR' : 'en-US',
  };
}

export function jobPostingSchema(args: {
  title: string;
  description: string;
  url: string;
  datePosted: string;
  employmentType: string;
  hiringOrganizationName: string;
  jobLocation: string;
  locale: SiteLocale;
}): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: args.title,
    description: args.description,
    url: args.url,
    datePosted: args.datePosted,
    employmentType: args.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: args.hiringOrganizationName,
      sameAs: SITE.url,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: args.jobLocation,
        addressCountry: 'TR',
      },
    },
    inLanguage: args.locale === 'tr' ? 'tr-TR' : 'en-US',
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): WithContext<Record<string, unknown>> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jobSchemaEmploymentType(t: string): string {
  const map: Record<string, string> = {
    'full-time': 'FULL_TIME',
    'part-time': 'PART_TIME',
    contract: 'CONTRACTOR',
    internship: 'INTERN',
  };
  return map[t] ?? 'FULL_TIME';
}
