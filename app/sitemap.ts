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
        },
      },
    },
  ]
}

