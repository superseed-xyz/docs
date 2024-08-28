const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/start-here',
        permanent: true, // Set to true for a 308 permanent redirect, or false for a 307 temporary redirect
      },
    ];
  },
})

module.exports = withNextra()
