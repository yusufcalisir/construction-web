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
    'hero.subtitle': 'Ev, iş yeri ve her türlü mekânınızı hayalinizdeki gibi yenileyin. Kaliteli işçilik, güvenilir hizmet, müşteri memnuniyeti.',
    'hero.getQuote': 'Hemen Teklif Al',

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
    'service.akillisistem': 'Akıllı Ev Sistemleri',
    'service.tesisat': 'Tesisat',

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
    'service.akillisistem.desc': 'Ev otomasyonu, akıllı aydınlatma, güvenlik kameraları ve iklimlendirme sistemlerinin tek bir merkezden kontrolü. Yaşam alanlarınıza konfor ve yüksek enerji tasarrufu katıyoruz.',
    'service.tesisat.desc': 'Ev ve iş yerleriniz için komple tesisat çözümleri. Elektrik tesisatı yenileme, sıhhi tesisat ve temiz/atık su altyapısı ile kalorifer ve ısıtma sistemleri kurulumlarını modern ve güvenli standartlarda gerçekleştiriyoruz.',

    // Contact
    'contact.title': 'Bize Ulaşın',
    'contact.subtitle': 'Projeleriniz için ücretsiz keşif ve fiyat teklifi alın',
    'contact.phone': 'Telefon',
    'contact.address': 'Adres',
    'contact.location': 'İstanbul, Türkiye',
    'contact.workingHours': 'Çalışma Saatleri',
    'contact.weekdays': 'Hafta İçi',
    'contact.weekends': 'Hafta Sonu',
    'contact.allDay': '7/24',

    // Footer
    'footer.description': 'Yılların deneyimi ile İstanbul\'da inşaat, renovasyon, dekorasyon, tesisat ve akıllı ev sistemleri hizmetleri sunuyoruz. Evinizi, iş yerinizi veya ticari alanlarınızı modern standartlara uygun şekilde dönüştürüyoruz. Kaliteli malzemeler, profesyonel işçilik ve zamanında teslimat garantisi ile müşteri memnuniyetini ön planda tutuyoruz.',
    'footer.copyright': '© 2026 Ber Tadilat. Tüm hakları saklıdır.',

    // WhatsApp Widget
    'whatsapp.title': 'Ber Tadilat',
    'whatsapp.status': 'Genellikle hemen yanıt verir',
    'whatsapp.message': 'Size nasıl yardımcı olabilirim?',
    'whatsapp.connect': 'Sohbete bağlan',
    'whatsapp.ariaLabel': 'WhatsApp ile iletişime geç',
    'whatsapp.close': 'Kapat',

    // Overview Section
    'overview.title': 'Tasarımdan Teslime, Evinizin Her Detayına Dokunuyoruz',
    'overview.description': 'Konseptten uygulamaya, tek elden tam kapsamlı tadilat ve dekorasyon hizmeti sunuyoruz. Dekorasyon ve restorasyondan elektrik, su, doğalgaz tesisatına; yalıtımdan akıllı ev sistemlerine kadar projenizin her aşamasını deneyimli ekibimizle yönetiyoruz. Farklı ustalarla koordinasyon derdi yaşamadan, tek bir muhatap ve tek bir sorumluluk ile eksiksiz sonuçlara ulaşırsınız.',
    'overview.description.slide0': 'Konseptten uygulamaya, tek elden tam kapsamlı tadilat ve dekorasyon hizmeti sunuyoruz.',
    'overview.description.slide1': 'Dekorasyon ve restorasyondan tesisat sistemlerine kadar projenizin her aşamasını deneyimli ekibimizle yönetiyoruz.',
    'overview.description.slide2': 'Isı ve ses yalıtımından akıllı ev elektrik sistemlerine kadar evinizi geleceğe hazırlıyoruz.',
    'overview.description.slide3': 'Farklı ustalarla koordinasyon derdi yaşamadan, tek bir muhatap ve tek bir sorumluluk ile eksiksiz sonuçlara ulaşırsınız.',
    'overview.decorTitle': 'Dekorasyon & Yenileme',
    'overview.decor.item1': 'İç mekan dekorasyon ve tasarım uygulamaları',
    'overview.decor.item2': 'Restorasyon',
    'overview.decor.item3': 'Boya badana',
    'overview.decor.item4': 'Alçıpan (duvar, tavan, bölme sistemleri)',
    'overview.decor.item5': 'Fayans ve seramik döşeme',
    'overview.decor.item6': 'Mutfak tasarımı ve kurulumu',
    'overview.decor.item7': 'Parke döşeme',
    'overview.insulationTitle': 'Yalıtım',
    'overview.insulation.item1': 'Isı yalıtımı (mantolama)',
    'overview.insulation.item2': 'Ses yalıtımı',
    'overview.insulation.item3': 'Dış cephe kaplama ve boya uygulamaları',
    'overview.installTitle': 'Tesisat & Akıllı Ev',
    'overview.install.item1': 'Elektrik tesisatı',
    'overview.install.item2': 'Su ve doğalgaz tesisatı',
    'overview.install.item3': 'Akıllı ev elektrik sistemleri ve otomasyon',
    'overview.footer': 'Küçük bir oda yenilemesinden komple bina cephesine kadar, her ölçekte projeye anahtar teslim çözüm sunuyoruz. Projenizi ücretsiz keşifle planlamak için bizimle iletişime geçin.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.works': 'Our Portfolio',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.navigation': 'Navigation',

    // Hero
    'hero.title': 'Ber Tadilat',
    'hero.subtitle': 'Transform your home, workplace, and any space into exactly what you envision. Expert craftsmanship, dependable service, and complete customer satisfaction.',
    'hero.getQuote': 'Get a Quick Quote',

    // Gallery
    'gallery.title': 'Our Portfolio',
    'gallery.subtitle': 'A showcase of our completed projects',
    'gallery.project': 'Project',
    'gallery.image': 'Image',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive solutions tailored to meet your every need',

    // Service names
    'service.dekorasyon': 'Interior Design',
    'service.restorasyon': 'Restoration',
    'service.boya': 'Painting & Decorating',
    'service.alciplan': 'Drywall & Partitions',
    'service.fayans': 'Tiling',
    'service.mutfak': 'Kitchen Renovation',
    'service.parke': 'Flooring',
    'service.isolation': 'Insulation Services',
    'service.facade': 'Exterior Cladding',
    'service.akillisistem': 'Smart Home Systems',
    'service.tesisat': 'Installations & Plumbing',

    // Service descriptions
    'service.dekorasyon.desc': 'Our expert team brings your vision to life with contemporary interior design solutions. From concept to completion, we handle everything from furniture selection to colour schemes, creating spaces that truly reflect your style.',
    'service.restorasyon.desc': 'Specialising in the careful restoration of historic and culturally significant buildings, we preserve their authentic character while ensuring structural integrity. Our approach blends time-honoured techniques with contemporary materials for lasting results.',
    'service.boya.desc': 'Professional painting services that breathe new life into your property. Using premium paints and meticulous preparation, we deliver flawless finishes that stand the test of time.',
    'service.alciplan.desc': 'Expert drywall installation and finishing for smooth, seamless walls. Whether you need suspended ceilings, partition walls, or decorative features, we provide precision workmanship and professional results.',
    'service.fayans.desc': 'Quality tile installation for bathrooms, kitchens, and wet areas. We ensure perfect waterproofing, precise alignment, and a finish that combines durability with aesthetic appeal.',
    'service.mutfak.desc': 'Complete kitchen design and installation services. We create beautiful, highly functional spaces through thoughtful planning, quality materials, and attention to every detail.',
    'service.parke.desc': 'Professional wood and laminate flooring installation backed by years of expertise. From subfloor preparation to final finishing, we ensure your floors look stunning and last for years to come.',
    'service.isolation.desc': 'Comprehensive thermal and acoustic insulation solutions for improved energy efficiency and comfort. Using advanced materials and proven techniques, we help keep your property comfortable year-round.',
    'service.facade.desc': 'Transform your building\'s exterior with our cladding, painting, and insulation services. We use weather-resistant materials and professional application methods to deliver results that protect and enhance your property.',
    'service.akillisistem.desc': 'Centralized control of home automation, smart lighting, security cameras, and climate control. We bring comfort and energy efficiency to your living spaces.',
    'service.tesisat.desc': 'Complete installation and plumbing solutions for homes and workplaces. We perform electrical wiring renovations, plumbing and water infrastructure, and heating/radiator system installations to modern and safe standards.',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Request a free consultation and detailed quote for your project',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.location': 'Istanbul, Turkey',
    'contact.workingHours': 'Opening Hours',
    'contact.weekdays': 'Weekdays',
    'contact.weekends': 'Weekends',
    'contact.allDay': '24/7',

    // Footer
    'footer.description': 'With extensive experience in Istanbul, we deliver construction, renovation, interior design, installation, plumbing, and smart home services that meet the highest standards. Whether it\'s residential, commercial, or retail spaces, we transform properties using quality materials, skilled craftsmanship, and a commitment to timely completion. Your satisfaction is our priority.',
    'footer.copyright': '© 2026 Ber Tadilat. All rights reserved.',

    // WhatsApp Widget
    'whatsapp.title': 'Ber Tadilat',
    'whatsapp.status': 'Usually replies immediately',
    'whatsapp.message': 'How can I help you?',
    'whatsapp.connect': 'Start Chat',
    'whatsapp.ariaLabel': 'Contact via WhatsApp',
    'whatsapp.close': 'Close',

    // Overview Section
    'overview.title': 'From Design to Delivery, We Touch Every Detail of Your Home',
    'overview.description': 'From concept to application, we offer a single-source comprehensive renovation and decoration service. From decoration and restoration to electrical, water, and gas installations; from insulation to smart home systems, we manage every stage of your project with our experienced team. You achieve complete results with a single point of contact and single responsibility, without the hassle of coordinating different craftsmen.',
    'overview.description.slide0': 'From concept to application, we offer a single-source comprehensive renovation and decoration service.',
    'overview.description.slide1': 'We manage every stage of your project with our experienced team, from decoration and restoration to installation systems.',
    'overview.description.slide2': 'We prepare your home for the future, from thermal and acoustic insulation to smart home electrical systems.',
    'overview.description.slide3': 'You achieve complete results with a single point of contact and single responsibility, without the hassle of coordinating different craftsmen.',
    'overview.decorTitle': 'Decoration & Renovation',
    'overview.decor.item1': 'Interior decoration and design applications',
    'overview.decor.item2': 'Restoration',
    'overview.decor.item3': 'Painting & decorating',
    'overview.decor.item4': 'Drywall (wall, ceiling, partition systems)',
    'overview.decor.item5': 'Tile and ceramic tiling',
    'overview.decor.item6': 'Kitchen design and installation',
    'overview.decor.item7': 'Flooring installation',
    'overview.insulationTitle': 'Insulation',
    'overview.insulation.item1': 'Thermal insulation (sheathing)',
    'overview.insulation.item2': 'Sound insulation',
    'overview.insulation.item3': 'Exterior cladding and painting applications',
    'overview.installTitle': 'Installation & Smart Home',
    'overview.install.item1': 'Electrical installation',
    'overview.install.item2': 'Water and natural gas installation',
    'overview.install.item3': 'Smart home electrical systems and automation',
    'overview.footer': 'From a small room renovation to a complete building facade, we offer turnkey solutions for projects of all sizes. Contact us to plan your project with a free survey.',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Always start with Turkish, don't read from localStorage on initial load
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

