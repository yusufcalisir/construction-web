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
          fa: `${baseUrl}/?lang=fa#contact`,
        },
      },
    },
  ]
}

