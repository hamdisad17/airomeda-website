import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.airomeda.com' }],
  },
};

export default withNextIntl(nextConfig);
