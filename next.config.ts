import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/blog.html', destination: '/blog', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ];
  },
};

export default config;
