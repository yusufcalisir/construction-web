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
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/#about`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          tr: `${baseUrl}/#about`,
          en: `${baseUrl}/?lang=en#about`,
          ar: `${baseUrl}/?lang=ar#about`,
          fa: `${baseUrl}/?lang=fa#about`,
          'x-default': `${baseUrl}/#about`,
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
          'x-default': `${baseUrl}/#services`,
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
          'x-default': `${baseUrl}/#gallery`,
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
          'x-default': `${baseUrl}/#contact`,
        },
      },
    },
  ]
}

