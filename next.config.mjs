// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();  // or './i18n.ts'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // other options
};

export default withNextIntl(nextConfig);