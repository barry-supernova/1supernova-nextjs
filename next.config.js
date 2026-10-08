const withMDX = require('@next/mdx')({
  // Specify the file extensions for MDX
  extension: /\.mdx?$/,
});

const path = require('path');
const config = require('./config/config.json');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Enable React's strict mode for better error handling
  reactStrictMode: true,

  // Set the base path based on the configuration
  basePath: config.base_path !== '/' ? config.base_path : '',

  // Control trailing slashes for URLs
  trailingSlash: config.site.trailing_slash,

  // Serve AVIF (smallest) where the browser supports it, otherwise WebP
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  webpack: (webpackConfig) => {
    // Points straight at react-icons' CommonJS files so DynamicIcon's lazy
    // fallback gets its own chunks instead of stopping tree-shaking of the
    // icons that are imported normally (see layouts/components/DynamicIcon.jsx).
    webpackConfig.resolve.alias['react-icons-lazy'] = path.join(
      __dirname,
      'node_modules/react-icons'
    );
    return webpackConfig;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

// Export the combined MDX and Next.js configuration
module.exports = withMDX(nextConfig);
