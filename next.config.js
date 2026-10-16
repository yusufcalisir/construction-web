/** @type {import('next').NextConfig} */
const nextConfig = {
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

  // ─── Google Tag Gateway (First-Party Proxy) ───────────────────────────────
  // GTM ve Google Analytics trafiği kendi domain'imizden (bertadilat.com) geçer.
  // Reklam engelleyiciler artık blokleyemez; dönüşüm ölçümü daha doğru olur.
  async rewrites() {
    return [
      // GTM Container: GTM-MMZXVCDS → /metrics/
      {
        source: '/metrics/:path*',
        destination: 'https://gtm-mmzxvcds.fps.goog/:path*',
      },
      // Google Analytics / Google Ads: G-53L3SGSVNJ → /gtag/
      {
        source: '/gtag/:path*',
        destination: 'https://g-53l3sgsvnj.fps.goog/:path*',
      },
    ]
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
              // script-src: kendi domain'imiz üzerinden proxy olduğundan sadece 'self'.
              // fonts.googleapis.com ve gstatic.com font yüklemesi için kalıyor.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              // connect-src: ölçüm istekleri kendi domain'imiz üzerinden geçiyor.
              // WhatsApp ve Instagram için harici izinler gerekli.
              "connect-src 'self' https://wa.me https://www.instagram.com",
              // frame-src: Google iframe gerektiren özellikler için (reCAPTCHA vs.)
              "frame-src 'self' https://www.google.com https://www.google.com.tr",
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
