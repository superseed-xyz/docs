const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/start-here',
        permanent: true, // For SEO benefits, use 308 for permanent redirects
        // Use 308 for permanent redirects, 307 for temporary, based on your needs
      },
    ];
  },
});

module.exports = withNextra();

// Optionally, you can add environment-specific redirects:
const isProd = process.env.NODE_ENV === 'production';

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: '/',
        destination: isProd ? '/start-here' : '/dev-start',
        permanent: true,
      },
    ];
  },
});
