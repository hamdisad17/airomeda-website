import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withMDX = createMDX();

const nextConfig: NextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  typedRoutes: false,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.airomeda.com' }],
  },
};

export default withNextIntl(withMDX(nextConfig));
