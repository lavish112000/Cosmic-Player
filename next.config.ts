/**
 * Next.js Configuration File
 * Configures how the Next.js framework builds and runs the application
 *
 * Learn more: https://nextjs.org/docs/app/api-reference/next-config-js
 */

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* ===== TypeScript Configuration ===== */
  typescript: {
    // Allow building even if there are TypeScript errors (useful during development)
    // Set to false in production to catch type errors
    ignoreBuildErrors: true,
  },

  /* ===== ESLint Configuration ===== */
  eslint: {
    // Allow building even if there are ESLint warnings (code quality checks)
    // Set to false in production to enforce code quality
    ignoreDuringBuilds: true,
  },

  /* ===== Image Optimization Configuration ===== */
  images: {
    // Allow loading images from external domains
    // Required for Next.js Image component to optimize external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Allow placeholder images from placehold.co
        port: '',
        pathname: '/**', // Allow all paths from this domain
      },
    ],
    // Disable image optimization for static export
    unoptimized: true,
  },

  // Export as static HTML/CSS/JS files
  output: 'export',
};

// Export the configuration for Next.js to use
export default nextConfig;
