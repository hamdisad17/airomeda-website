import { ImageResponse } from 'next/og';
import { loadBlogPostContent } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export const runtime = 'nodejs';
export const alt = 'Airomeda — Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadBlogPostContent(slug, locale);
  const title = content?.frontmatter.title ?? 'Airomeda';
  const subtitle = content?.frontmatter.excerpt ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #0a1628 0%, #143862 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: '#f97316',
              color: '#0a1628',
              fontSize: 32,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, display: 'flex' }}>
            <span>airomeda</span><span style={{ color: '#f97316' }}>.</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 22,
              color: '#f97316',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              display: 'flex',
            }}
          >
            {locale === 'tr' ? 'Yazı' : 'Article'}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              maxWidth: 1000,
              display: 'flex',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 24, color: '#cbd5e1', maxWidth: 1000, display: 'flex' }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: 6, width: 200, background: '#f97316', borderRadius: 3 }} />
          <div style={{ fontSize: 22, color: '#94a3b8', display: 'flex' }}>airomeda.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
