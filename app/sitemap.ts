import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bertadilat.com' // Domain ayarlandıktan sonra güncellenecek
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          tr: baseUrl,
          en: `${baseUrl}/?lang=en`,
          ar: `${baseUrl}/?lang=ar`,
          fa: `${baseUrl}/?lang=fa`,
        },
      },
    },
    {
      url: `${baseUrl}/#works`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${baseUrl}/#works`,
          en: `${baseUrl}/?lang=en#works`,
          ar: `${baseUrl}/?lang=ar#works`,
          fa: `${baseUrl}/?lang=fa#works`,
        },
      },
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${baseUrl}/#services`,
          en: `${baseUrl}/?lang=en#services`,
          ar: `${baseUrl}/?lang=ar#services`,
          fa: `${baseUrl}/?lang=fa#services`,
        },
      },
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${baseUrl}/#gallery`,
          en: `${baseUrl}/?lang=en#gallery`,
          ar: `${baseUrl}/?lang=ar#gallery`,
          fa: `${baseUrl}/?lang=fa#gallery`,
        },
      },
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
      alternates: {
        languages: {
          tr: `${baseUrl}/#contact`,
          en: `${baseUrl}/?lang=en#contact`,
          ar: `${baseUrl}/?lang=ar#contact`,
          fa: `${baseUrl}/?lang=fa#contact`,
        },
      },
    },
  ]
}

