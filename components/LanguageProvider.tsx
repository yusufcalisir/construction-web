'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'tr' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.works': 'Çalışmalarımız',
    'nav.services': 'Hizmetler',
    'nav.contact': 'İletişim',
    'nav.navigation': 'Navigasyon',
    
    // Hero
    'hero.title': 'Ber Tadilat',
    'hero.subtitle': 'Evinizi hayalinizdeki gibi yenileyin. Kaliteli işçilik, güvenilir hizmet, müşteri memnuniyeti.',
    
    // Gallery
    'gallery.title': 'Çalışmalarımız',
    'gallery.subtitle': 'Gerçekleştirdiğimiz projelerden örnekler',
    'gallery.project': 'Proje',
    'gallery.image': 'Görsel',
    
    // Services
    'services.title': 'Hizmetlerimiz',
    'services.subtitle': 'Geniş hizmet yelpazemiz ile ihtiyacınıza uygun çözümler sunuyoruz',
    
    // Service names
    'service.dekorasyon': 'Dekorasyon',
    'service.restorasyon': 'Restorasyon',
    'service.boya': 'Boya Badana',
    'service.alciplan': 'Alçıpan',
    'service.fayans': 'Fayans',
    'service.mutfak': 'Mutfak',
    'service.parke': 'Parke',
    'service.isolation': 'Isı ve Ses Yalıtımı',
    'service.facade': 'Dış Cephe',
    
    // Service descriptions
    'service.dekorasyon.desc': 'Modern ve şık dekorasyon çözümleri ile yaşam alanlarınızı dönüştürüyoruz. İç mimari tasarım, mobilya seçimi ve renk uyumu konularında uzman ekibimizle hayalinizdeki mekanı yaratıyoruz.',
    'service.restorasyon.desc': 'Tarihi ve kültürel değeri olan yapıların özgün karakterini koruyarak restore edilmesi konusunda deneyimliyiz. Geleneksel teknikler ve modern malzemelerin birleşimi ile kalıcı çözümler sunuyoruz.',
    'service.boya.desc': 'Profesyonel boya badana hizmeti ile duvarlarınıza yeni bir görünüm kazandırıyoruz. Kaliteli boyalar, düzgün yüzey hazırlığı ve titiz işçilik ile uzun ömürlü sonuçlar garantiliyoruz.',
    'service.alciplan.desc': 'Alçıpan uygulamalarında modern teknikler kullanarak düzgün ve estetik duvarlar oluşturuyoruz. Asma tavan, bölme duvar ve dekoratif uygulamalar için profesyonel çözümler sunuyoruz.',
    'service.fayans.desc': 'Banyo, mutfak ve diğer alanlar için kaliteli fayans döşeme hizmeti veriyoruz. Su geçirmezlik, düzgün yerleşim ve estetik görünüm konularında titizlikle çalışıyoruz.',
    'service.mutfak.desc': 'Modern mutfak tasarımı ve montajı konusunda uzmanız. Ergonomik planlama, kaliteli malzemeler ve fonksiyonel çözümler ile mutfağınızı hem güzel hem de kullanışlı hale getiriyoruz.',
    'service.parke.desc': 'Ahşap parke ve laminat parke döşeme hizmetlerinde yılların deneyimi ile hizmet veriyoruz. Doğru alt yapı hazırlığı, düzgün döşeme ve cilalama işlemleri ile uzun ömürlü zeminler oluşturuyoruz.',
    'service.isolation.desc': 'Enerji tasarrufu ve konfor için ısı ve ses yalıtımı çözümleri sunuyoruz. Modern yalıtım malzemeleri ve doğru uygulama teknikleri ile evinizi yazın serin, kışın sıcak tutuyoruz.',
    'service.facade.desc': 'Dış cephe kaplama, boyama ve yalıtım hizmetleri ile binanızın görünümünü yeniliyoruz. Hava koşullarına dayanıklı malzemeler ve profesyonel uygulama ile uzun ömürlü sonuçlar garantiliyoruz.',
    
    // Contact
    'contact.title': 'Bize Ulaşın',
    'contact.subtitle': 'Projeleriniz için ücretsiz keşif ve fiyat teklifi alın',
    'contact.phone': 'Telefon',
    'contact.address': 'Adres',
    'contact.location': 'İstanbul, Türkiye',
    'contact.hours': 'Çalışma Saatleri: Pazartesi - Cumartesi 09:00 - 18:00',
    
    // Footer
    'footer.description': 'Yılların deneyimi ile İstanbul\'da inşaat, renovasyon ve dekorasyon hizmetleri sunuyoruz. Evinizi, iş yerinizi veya ticari alanlarınızı modern standartlara uygun şekilde dönüştürüyoruz. Kaliteli malzemeler, profesyonel işçilik ve zamanında teslimat garantisi ile müşteri memnuniyetini ön planda tutuyoruz.',
    'footer.copyright': '© 2025 Ber Tadilat. Tüm hakları saklıdır.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.works': 'Our Works',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.navigation': 'Navigation',
    
    // Hero
    'hero.title': 'Ber Tadilat',
    'hero.subtitle': 'Renovate your home as you dream. Quality craftsmanship, reliable service, customer satisfaction.',
    
    // Gallery
    'gallery.title': 'Our Works',
    'gallery.subtitle': 'Examples from our completed projects',
    'gallery.project': 'Project',
    'gallery.image': 'Image',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer solutions tailored to your needs with our wide range of services',
    
    // Service names
    'service.dekorasyon': 'Decoration',
    'service.restorasyon': 'Restoration',
    'service.boya': 'Painting',
    'service.alciplan': 'Drywall',
    'service.fayans': 'Tiles',
    'service.mutfak': 'Kitchen',
    'service.parke': 'Flooring',
    'service.isolation': 'Thermal and Acoustic Insulation',
    'service.facade': 'Facade',
    
    // Service descriptions
    'service.dekorasyon.desc': 'We transform your living spaces with modern and elegant decoration solutions. With our expert team in interior design, furniture selection, and color harmony, we create the space of your dreams.',
    'service.restorasyon.desc': 'We are experienced in restoring buildings with historical and cultural value while preserving their original character. We offer lasting solutions by combining traditional techniques with modern materials.',
    'service.boya.desc': 'We give your walls a new look with professional painting services. We guarantee long-lasting results with quality paints, proper surface preparation, and meticulous workmanship.',
    'service.alciplan.desc': 'We create smooth and aesthetic walls using modern techniques in drywall applications. We offer professional solutions for suspended ceilings, partition walls, and decorative applications.',
    'service.fayans.desc': 'We provide quality tile installation services for bathrooms, kitchens, and other areas. We work meticulously on waterproofing, proper placement, and aesthetic appearance.',
    'service.mutfak.desc': 'We specialize in modern kitchen design and installation. We make your kitchen both beautiful and functional with ergonomic planning, quality materials, and functional solutions.',
    'service.parke.desc': 'We provide services in wood and laminate flooring with years of experience. We create long-lasting floors with proper subfloor preparation, proper installation, and finishing processes.',
    'service.isolation.desc': 'We offer thermal and acoustic insulation solutions for energy savings and comfort. We keep your home cool in summer and warm in winter with modern insulation materials and proper application techniques.',
    'service.facade.desc': 'We renew your building\'s appearance with facade cladding, painting, and insulation services. We guarantee long-lasting results with weather-resistant materials and professional application.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get a free consultation and quote for your projects',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.location': 'Istanbul, Turkey',
    'contact.hours': 'Working Hours: Monday - Saturday 09:00 - 18:00',
    
    // Footer
    'footer.description': 'With years of experience, we provide construction, renovation, and decoration services in Istanbul. We transform your homes, offices, or commercial spaces according to modern standards. We prioritize customer satisfaction with quality materials, professional craftsmanship, and on-time delivery guarantee.',
    'footer.copyright': '© 2025 Ber Tadilat. All rights reserved.',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'tr' || saved === 'en')) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  // Always provide the context, even during SSR
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

