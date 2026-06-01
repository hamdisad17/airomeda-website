import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withMDX = createMDX();

// Content-Security-Policy
// ----------------------------------------------------------------------
// Shipped in Report-Only mode initially — violations are logged to the
// browser console + the optional CSP_REPORT_URI endpoint, but nothing is
// blocked. After a few days of clean reports, flip the header name from
// 'Content-Security-Policy-Report-Only' to 'Content-Security-Policy' to
// enforce.
//
// Sources allowlisted:
//   - challenges.cloudflare.com — Turnstile iframe + scripts
//   - images.unsplash.com, api.dicebear.com — image hosts already in
//     next.config images.remotePatterns
//   - *.sentry.io — Sentry ingest endpoint when SENTRY_DSN is set
//
// 'unsafe-inline' on style-src is required because Tailwind 4 ships some
// preflight rules via inline <style> at runtime, and several components
// (visuals/, motion/) compose inline transform/opacity styles for GSAP.
// We can tighten this with nonces once we audit every inline style.
// ----------------------------------------------------------------------
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://api.dicebear.com",
  "media-src 'self' blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://challenges.cloudflare.com https://*.sentry.io https://*.ingest.sentry.io",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
];
const CSP = CSP_DIRECTIVES.join('; ');

const PERMISSIONS_POLICY = [
  'camera=()',
  'microphone=()',
  'geolocation=()',
  'payment=()',
  'usb=()',
  'magnetometer=()',
  'accelerometer=()',
  'gyroscope=()',
  'interest-cohort=()',
].join(', ');

const securityHeaders = [
  { key: 'Content-Security-Policy-Report-Only', value: CSP },
  { key: 'Permissions-Policy', value: PERMISSIONS_POLICY },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  typedRoutes: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.airomeda.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
