/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    unoptimized: false,
  },


  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com https://tagassistant.google.com https://www.google-analytics.com https://*.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.com.tr https://www.gstatic.com https://fonts.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://tagmanager.google.com https://tagassistant.google.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://*.google.com.tr https://*.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://ad.doubleclick.net https://ade.googlesyndication.com https://adservice.google.com https://ssl.gstatic.com https://www.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://*.googletagmanager.com https://tagmanager.google.com https://tagassistant.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://*.g.doubleclick.net https://*.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://*.google.com https://www.google.com.tr https://*.google.com.tr https://wa.me https://www.instagram.com",
              "frame-src 'self' https://www.googletagmanager.com https://tagmanager.google.com https://tagassistant.google.com https://www.google.com https://www.google.com.tr https://td.doubleclick.net https://*.fls.doubleclick.net https://*.doubleclick.net https://www.googleadservices.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
