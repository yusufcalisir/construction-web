import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ber Tadilat - İstanbul Tadilat Hizmetleri',
    short_name: 'Ber Tadilat',
    description: 'İstanbul\'da profesyonel tadilat, dekorasyon ve renovasyon hizmetleri',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a1a',
    theme_color: '#1a1a1a',
    icons: [
      {
        src: '/favicon/ber-tadilat.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/ber-tadilat.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

