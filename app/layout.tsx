import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const baseUrl = 'https://bertadilat.com' // Domain ayarlandıktan sonra güncellenecek

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  
  // Temel SEO
  title: {
    default: 'Ber Tadilat',
    template: '%s | Ber Tadilat',
  },
  description: 'Ber Tadilat - İstanbul\'da ev, iş yeri ve her türlü mekân için profesyonel tadilat, dekorasyon, restorasyon, boya badana, alçıpan, fayans, mutfak dekorasyon, mutfak tadilat, dekorasyon tavan, tadilat işleri, dekorasyon tadilat, parke, ısı-ses yalıtımı ve dış cephe hizmetleri. Dekorasyon firmaları arasında güvenilir çözümler. 7/24 hizmet, ücretsiz keşif. ☎ 0545 825 94 95',
  keywords: [
    'ber tadilat',
    'ber tadilat istanbul',
    'istanbul tadilat',
    'istanbul tadilat firması',
    'istanbul dekorasyon',
    'istanbul renovasyon',
    'ev tadilat',
    'ev tadilat istanbul',
    'iş yeri tadilat',
    'iş yeri tadilat istanbul',
    'dekorasyon',
    'dekorasyon istanbul',
    'restorasyon',
    'restorasyon istanbul',
    'boya badana',
    'boya badana istanbul',
    'alçıpan',
    'alçıpan uygulama',
    'fayans döşeme',
    'fayans döşeme istanbul',
    'mutfak tadilat',
    'mutfak tadilat istanbul',
    'parke döşeme',
    'parke döşeme istanbul',
    'ısı yalıtımı',
    'ses yalıtımı',
    'yalıtım istanbul',
    'dış cephe',
    'dış cephe kaplama',
    'tadilat firması',
    'tadilat firması istanbul',
    'ev yenileme',
    'ev yenileme istanbul',
    'iç mimari',
    'iç mimari istanbul',
    'tadilat ustası',
    'tadilat ustası istanbul',
    'inşaat',
    'inşaat istanbul',
    'renovasyon',
    'renovasyon istanbul',
    'tadilat hizmetleri',
    'tadilat şirketi',
    'güvenilir tadilat',
    'profesyonel tadilat',
    'kaliteli tadilat',
    'mutfak dekorasyon',
    'dekorasyon firmaları',
    'tadilat işleri dekorasyon tadilat',
    'dekorasyon tavan',
    'tadilat dekorasyon',
  ],
  authors: [{ name: 'Ber Tadilat', url: baseUrl }],
  creator: 'Ber Tadilat',
  publisher: 'Ber Tadilat',
  applicationName: 'Ber Tadilat',
  
  // Favicon
  icons: {
    icon: [
      { url: '/favicon/ber1-tadilat.png', sizes: 'any' },
      { url: '/favicon/ber1-tadilat.png', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/ber1-tadilat.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon/ber1-tadilat.png',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, WhatsApp vb.)
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US', 'tr_TR'],
    siteName: 'Ber Tadilat',
    url: baseUrl,
    title: 'Ber Tadilat | İstanbul Tadilat, Dekorasyon ve Renovasyon Hizmetleri',
    description: 'İstanbul\'da ev, iş yeri ve her türlü mekân için profesyonel tadilat hizmetleri. Mutfak dekorasyon, mutfak tadilat, dekorasyon tavan, tadilat işleri, dekorasyon tadilat, dekorasyon firmaları arasında güvenilir çözümler. Dekorasyon, boya badana, alçıpan, fayans, parke ve daha fazlası. 7/24 hizmet, ücretsiz keşif!',
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ber Tadilat - İstanbul Tadilat Hizmetleri',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Ber Tadilat | İstanbul Tadilat ve Dekorasyon',
    description: 'İstanbul\'da profesyonel tadilat, dekorasyon ve renovasyon hizmetleri. Mutfak dekorasyon, mutfak tadilat, dekorasyon tavan, tadilat işleri, dekorasyon tadilat. Dekorasyon firmaları arasında güvenilir çözümler. Ücretsiz keşif için hemen arayın! 7/24 hizmet.',
    images: [`${baseUrl}/og-image.jpg`],
    creator: '@berdekorasyontadilat',
  },
  
  // Diğer meta etiketleri
  category: 'construction',
  classification: 'Tadilat ve Dekorasyon Hizmetleri',
  
  // Verification (Google Search Console, Bing vb. doğrulama kodları buraya eklenebilir)
  // verification: {
  //   google: 'google-site-verification-code',
  //   yandex: 'yandex-verification-code',
  //   bing: 'bing-verification-code',
  // },
  
  // Alternatif diller ve canonical
  alternates: {
    canonical: baseUrl,
    languages: {
      'tr-TR': baseUrl,
      'en-US': `${baseUrl}/?lang=en`,
    },
  },
  
  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ber Tadilat',
  },
  
  // Format detection
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: false,
    url: false,
  },
}

// JSON-LD Sanitization Helper (XSS koruması için)
const sanitizeJSONLD = (schema: object): string => {
  try {
    // JSON.stringify zaten XSS'i önler, ancak ekstra güvenlik için:
    const jsonString = JSON.stringify(schema, null, 0)
    // Potansiyel script tag'lerini kontrol et
    if (jsonString.includes('<script') || jsonString.includes('</script>')) {
      throw new Error('Invalid JSON-LD: contains script tags')
    }
    return jsonString
  } catch (error) {
    console.error('JSON-LD sanitization error:', error)
    return '{}'
  }
}

// JSON-LD Yapılandırılmış Veri (Google için)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}#business`,
  name: 'Ber Tadilat',
  alternateName: ['Ber Tadilat Dekorasyon', 'Ber Tadilat İstanbul', 'Mutfak Dekorasyon', 'Dekorasyon Firmaları', 'Mutfak Tadilat', 'Dekorasyon Tavan', 'Tadilat Dekorasyon'],
  description: 'İstanbul\'da ev, iş yeri ve her türlü mekân için profesyonel tadilat, dekorasyon ve renovasyon hizmetleri. Mutfak dekorasyon, mutfak tadilat, dekorasyon tavan, tadilat işleri, dekorasyon tadilat. Dekorasyon firmaları arasında güvenilir çözümler. 7/24 hizmet, ücretsiz keşif.',
  keywords: 'mutfak dekorasyon, dekorasyon firmaları, mutfak tadilat, tadilat işleri dekorasyon tadilat, dekorasyon tavan, tadilat dekorasyon, ber tadilat, istanbul tadilat, istanbul dekorasyon',
  url: baseUrl,
  telephone: '+905458259495',
  email: 'info@bertadilat.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'İstanbul',
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    postalCode: '34000',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.989541,
    longitude: 29.026138,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  priceRange: '₺₺',
  image: [`${baseUrl}/og-image.jpg`],
  logo: `${baseUrl}/favicon/ber-tadilat.png`,
  sameAs: [
    'https://www.instagram.com/berdekorasyontadilat/',
  ],
  areaServed: {
    '@type': 'City',
    name: 'İstanbul',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tadilat Hizmetleri',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dekorasyon',
          description: 'Modern ve şık dekorasyon çözümleri. Ev ve iş yerleri için iç mimari tasarım.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restorasyon',
          description: 'Tarihi yapıların profesyonel restorasyonu ve korunması.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Boya Badana',
          description: 'Profesyonel boya badana hizmetleri. İç ve dış cephe boyama.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Alçıpan',
          description: 'Alçıpan uygulama, asma tavan ve bölme duvar işleri.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fayans',
          description: 'Fayans ve seramik döşeme. Banyo ve mutfak uygulamaları.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mutfak Tadilat',
          description: 'Mutfak yenileme, tadilat ve modernizasyon hizmetleri.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Parke',
          description: 'Parke döşeme, cilalama ve bakım hizmetleri.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Isı ve Ses Yalıtımı',
          description: 'Profesyonel ısı ve ses yalıtım çözümleri.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dış Cephe',
          description: 'Dış cephe kaplama, boyama ve izolasyon hizmetleri.',
        },
      },
    ],
  },
}

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}#organization`,
  name: 'Ber Tadilat',
  url: baseUrl,
  logo: `${baseUrl}/favicon/ber-tadilat.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+905458259495',
    contactType: 'customer service',
    areaServed: 'TR',
    availableLanguage: ['Turkish', 'English'],
  },
  sameAs: [
    'https://www.instagram.com/berdekorasyontadilat/',
  ],
}

// Breadcrumb Schema
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Ana Sayfa',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Çalışmalarımız',
      item: `${baseUrl}#works`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Hizmetler',
      item: `${baseUrl}#services`,
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'İletişim',
      item: `${baseUrl}#contact`,
    },
  ],
}

// WebSite Schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}#website`,
  url: baseUrl,
  name: 'Ber Tadilat',
  description: 'İstanbul\'da profesyonel tadilat, dekorasyon ve renovasyon hizmetleri',
  publisher: {
    '@id': `${baseUrl}#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preload critical hero image - Highest priority */}
        <link 
          rel="preload" 
          href="/calisma-galeri/hero.png" 
          as="image" 
          fetchPriority="high"
          type="image/png"
        />
        <link rel="dns-prefetch" href="/calisma-galeri/" />
        
        {/* JSON-LD Yapılandırılmış Veri - Non-blocking data scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJSONLD(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJSONLD(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJSONLD(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeJSONLD(websiteSchema) }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="TR-34" />
        <meta name="geo.placename" content="İstanbul" />
        <meta name="geo.position" content="40.989541;29.026138" />
        <meta name="ICBM" content="40.989541, 29.026138" />
        <meta name="language" content="Turkish" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

