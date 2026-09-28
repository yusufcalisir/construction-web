'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'tr' | 'en' | 'ar' | 'fa'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Navigation
    'nav.home': 'Ana Sayfa',
    'nav.about': 'Hakkımızda',
    'nav.about.corporate': 'Kurumsal & Vizyonumuz',
    'nav.about.corporate.desc': 'Üst Segment Proje Yönetimi ve Uygulama',
    'nav.about.whyber': 'Müşteri Değerlendirmeleri',
    'nav.about.whyber.desc': 'Doğrulanmış müşteri deneyimleri ve referanslar',
    'nav.about.process': 'Çalışma Sürecimiz',
    'nav.about.process.desc': '6 adımda anahtar teslim profesyonel süreç',
    'nav.services': 'Hizmetlerimiz',
    'nav.howwework': 'Sürecimiz',
    'nav.whyber': 'Neden Ber?',
    'nav.gallery': 'Galeri',
    'nav.contact': 'İletişim',
    'nav.quote': 'Teklif Al',
    'nav.navigation': 'Navigasyon',

    // Hero
    'hero.badge': 'Ber Tadilat',
    'hero.headline': 'İstanbul\'da Anahtar Teslim\nÜst Segment Renovasyon',
    'hero.subheadline': '3D mimari tasarımdan anahtar teslim uygulamaya; konut, villa ve ticari mekânlarınızı uzman mimari denetim ve şeffaf bütçe garantisiyle tek elden teslim ediyoruz.',
    'hero.btnProjects': 'PROJELERİ İNCELE',
    'hero.btnDiscuss': 'PROJENİZİ GÖRÜŞELİM',
    'hero.getQuote': 'Keşif Talebi',
    'hero.slide0': 'Villa, rezidans ve büyük daireler için konseptten teslime tam kapsamlı proje yönetimi.',
    'hero.slide1': 'İç mimari tasarım, teknik denetim ve kusursuz uygulama, tek bir elden, tek bir sorumlulukla.',
    'hero.slide2': 'Şeffaf bütçe, belirli takvim. Sürpriz maliyet yok, taahhüdümüzden şaşmıyoruz.',
    'hero.slide3': 'Uzman proje denetiminde, premium markalarla; mekânlarınızı gelecek 20 yıl için yeniliyoruz.',

    // Gallery (Hizmetlerimiz)
    'gallery.title': 'Hizmetlerimiz',
    'gallery.project': 'Proje',
    'gallery.image': 'Görsel',

    // New Project Gallery (Galeri)
    'gallery2.title': 'Proje Galerisi',
    'gallery2.subtitle': 'İstanbul genelinde uzman mimari denetimde, 3D mimari projelendirme ve şeffaf bütçe garantisiyle tamamlanan üst segment renovasyon projelerimiz',
    'gallery2.close': 'Kapat',

    // Brands
    'brands.badge': 'İş Birliği Yaptığımız Markalar ve Çözüm Ortaklarımız',

    // Services, premium categories
    'services.badge': 'Hizmet Kapsamımız',
    'services.title': 'Bütünleşik Proje Hizmetleri',
    'services.subtitle': 'Uzman mimari denetim, 3D mimari projelendirme ve şeffaf bütçe garantisiyle tasarımdan anahtar teslim uygulamaya yanınızdayız.',
    'services.cta.label': 'Projenizi konuşmak için hemen iletişime geçin',
    'services.cta.button': 'Keşif Talebi',

    'service.turnkey.name': 'Anahtar Teslim Villa ve Daire Renovasyonu',
    'service.turnkey.desc': 'Büyük ölçekli konut projelerini konsept aşamasından teslim gününe kadar eksiksiz yönetiyoruz. Farklı ustalar arasında koordinasyon derdinden kurtulun, tek sözleşme, tek sorumluluk.',
    'service.turnkey.tag1': 'Proje Yönetimi',
    'service.turnkey.tag2': 'Komple Tadilat',
    'service.turnkey.tag3': 'Teslimata Kadar Takip',

    'service.interior.name': 'İç Mimari Tasarım ve Uygulama',
    'service.interior.desc': 'Mimar ve tasarımcılarımız yaşam alanınızı 3D konsept olarak tasarlar, uygulamacılarımız birebir hayata geçirir. Hayalinizi kâğıt üzerinde bırakmıyoruz.',
    'service.interior.tag1': 'Konsept ve 3D Tasarım',
    'service.interior.tag2': 'Mobilya ve Renk Danışmanlığı',
    'service.interior.tag3': 'Birebir Uygulama',

    'service.commercial.name': 'Ticari Alan ve Ofis Dönüşümleri',
    'service.commercial.desc': 'Otel, restoran, ofis, butik mağaza gibi ticari alanların eksiksiz dönüşüm projeleri. Zaman ve bütçeye tam sadakat, minimum iş akışı kesintisi.',
    'service.commercial.tag1': 'Otel ve Restoran',
    'service.commercial.tag2': 'Ofis ve Showroom',
    'service.commercial.tag3': 'Hızlı Teslimat',

    'service.systems.name': 'Tesisat, Elektrik ve Akıllı Ev',
    'service.systems.desc': 'Elektrik, su, doğalgaz tesisatından akıllı ev otomasyon sistemlerine kadar tüm teknik altyapıyı uzman teknik denetimde kuruyoruz. Enerji verimliliği ve güvenlik standartları ön planda.',
    'service.systems.tag1': 'Teknik Denetim',
    'service.systems.tag2': 'Akıllı Ev Otomasyonu',
    'service.systems.tag3': 'Enerji Verimliliği',

    'service.restoration.name': 'Restorasyon ve Tarihi Yapı Yenileme',
    'service.restoration.desc': 'Tarihi ve mimari değeri olan yapılarda orijinal karakteri koruyarak çağdaş konfor standartlarına kavuşturma. Geleneksel teknikler, modern malzemeler.',
    'service.restoration.tag1': 'Tarihi Yapılar',
    'service.restoration.tag2': 'Karakter Koruma',
    'service.restoration.tag3': 'Uzman Ekip',

    'service.exterior.name': 'Dış Cephe ve Yalıtım Projeleri',
    'service.exterior.desc': 'Binanın dış kabuğunu baştan sona yeniliyoruz: mantolama, cephe kaplaması, çatı yalıtımı. Enerji faturasında kalıcı düşüş, görsel değerde dramatik artış.',
    'service.exterior.tag1': 'Isı ve Ses Yalıtımı',
    'service.exterior.tag2': 'Cephe Kaplama',
    'service.exterior.tag3': 'Enerji Tasarrufu',

    // Contact
    'contact.title': 'Bize Ulaşın',
    'contact.subtitle': 'Projeleriniz için yerinde keşif ve fiyat teklifi alın',
    'contact.whatsapp': 'WhatsApp ile İletişim',
    'contact.phone': 'Telefon',
    'contact.revealPhone': 'Numarayı Göster',
    'contact.callNow': 'Hemen Ara',
    'contact.copied': 'Kopyalandı',
    'contact.clickToCall': 'Aramak için tıklayın',
    'contact.address': 'Adres',
    'contact.location': 'İstanbul, Türkiye',
    'contact.workingHours': 'Çalışma Saatleri',
    'contact.weekdays': 'Hafta İçi',
    'contact.weekends': 'Hafta Sonu',
    'contact.allDay': '7/24',

        'overview.footer': 'Tek bir odanın yenilenmesinden tüm yapının anahtar teslim renovasyonuna kadar, projelerinizi en yüksek kalite ve profesyonel disiplinle hayata geçiriyoruz. Keşif ve detaylı görüşme için bizimle iletişime geçebilirsiniz.',

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

    // About
    'about.badge': 'Hakkımızda',
    'about.title': 'Bir Proje Firması Olarak Biz',
    'about.description': 'Ber Tadilat olarak üst segment konut ve ticari projelerin tasarım, mimari denetim ve uygulamasını tek çatı altında yönetiyoruz. Her projeyi salt bir tadilat değil; mekânınıza değer katan kalıcı bir yatırım olarak ele alıyoruz.',
    'about.since': 'İstanbul • Üst Segment',
    'about.discipline': 'Mimari Renovasyon',
    'about.engineer.name': 'Ber Tadilat',
    'about.engineer.title': 'Üst Segment Renovasyon & Mimari Tasarım',
    'about.engineer.edu': '3D Mimari Tasarım & Projelendirme',
    'about.engineer.exp': 'İstanbul Geneli Seçkin Proje Portföyü',
    'about.engineer.desc': 'Ber Tadilat, İstanbul\'un seçkin semtlerinde konut, villa ve ticari mekânlar için anahtar teslim renovasyon hizmeti sunar. Tasarımdan malzeme seçimine, kırım ve altyapıdan ince işçilik ve montaja kadar her aşama şeffaf bütçe ve eksiksiz taahhüt güvencesiyle tek elden yönetilir.',
    'about.projects.num': '200+',
    'about.projects.label': 'Tamamlanan Proje',
    'about.audit.num': '%100',
    'about.audit.label': 'Kalite Güvencesi',
    'about.pillar1.title': 'Tek Elden Proje Yönetimi',
    'about.pillar1.desc': 'Tasarımcı, mimar, usta, tüm teknik ekibi sizin için koordine ediyoruz. Tek muhatap, tam sorumluluk.',
    'about.pillar2.title': 'Kusursuz Kalite ve Saha Denetimi',
    'about.pillar2.desc': 'Her aşamada titiz teknik denetim ve onaylı uygulamalar. Yapısal güvenlik ve malzeme kalitesi asla tavize uğramaz.',
    'about.pillar3.title': 'Şeffaf Sözleşme ve Taahhüt',
    'about.pillar3.desc': 'Başlangıçta net bütçe ve takvim. Süreç boyunca düzenli raporlama ve sürpriz maliyet yok.',
    'about.cta': 'Projenizi Konuşalım',

    // WhyBer
    'whyber.badge': 'Neden Ber?',
    'whyber.title': 'Farkımız Ne?',
    'whyber.subtitle': 'Yüksek bütçeli projelerde muhatap seçimi kritiktir. İşte bizi farklı kılan 6 temel unsur.',
    'whyber.item.singlepoint.title': 'Tek Muhatap, Tam Sorumluluk',
    'whyber.item.singlepoint.desc': 'Farklı ustalarla koordinasyon derdi yok. Tasarımdan teslime tüm süreç tek sözleşme altında.',
    'whyber.item.engineer.title': 'Uzman Teknik ve Mimari Denetim',
    'whyber.item.engineer.desc': 'Her kritik aşama Ber Tadilat teknik kadrosunun kalite kontrolünden geçer. Yapısal güvenlik ve kusursuz işçilik garantili.',
    'whyber.item.budget.title': 'Şeffaf ve Sabit Bütçe',
    'whyber.item.budget.desc': 'Proje başında detaylı keşif, kalem kalem maliyet tablosu. Sürpriz fatura yok, taahhüdümüzden sapma yok.',
    'whyber.item.timeline.title': 'Taahhütlü Takvim',
    'whyber.item.timeline.desc': 'Proje milestoneları sözleşmeye yazılır. Gecikme durumunda şeffaf bildirim ve çözüm planı.',
    'whyber.item.brands.title': 'Premium Marka Garantisi',
    'whyber.item.brands.desc': 'Vitra, Grohe, Knauf, Duravit gibi A-sınıfı markalarla çalışıyoruz. Malzeme kalitesi asla tavize uğramaz.',
    'whyber.item.aftercare.title': 'Teslim Sonrası Destek',
    'whyber.item.aftercare.desc': 'Proje tesliminin ardından oluşabilecek sorunlarda yanınızdayız. Uzun vadeli ilişki, kısa vadeli iş değil.',
    'whyber.stat1.num': '200+',
    'whyber.stat1.label': 'Tamamlanan Proje',
    'whyber.stat2.num': '15+',
    'whyber.stat2.label': 'Yıllık Deneyim',
    'whyber.stat3.num': '%98',
    'whyber.stat3.label': 'Müşteri Memnuniyeti',
    'whyber.stat4.num': '30+',
    'whyber.stat4.label': 'Partner Marka',
    'whyber.cta': 'Keşif Talebi',
    'whyber.reviews.badge': 'Müşteri Değerlendirmeleri',
    'whyber.reviews.title': 'Müşterilerimizin Gözünden Ber Tadilat',
    'whyber.reviews.verified': 'Doğrulanmış Müşteri',
    'whyber.review1.name': 'Elif A.',
    'whyber.review1.comment': 'Boya badana, alçıpan, dolap boyama, kapı pencere, asma tavan işlerimizi yaptırdık. Gerçekten çok profesyonel. İşçilikleri gayet temizdi ve fiyatları uygundu. Çok teşekkür ederiz.',
    'whyber.review2.name': 'Musa A.',
    'whyber.review2.comment': 'İstanbul\'a yeni geldim ve piyasayı araştırdım, gerçekten çok kaliteli ve titiz işçilikle çalışan bir şirket.',
    'whyber.review3.name': 'Büşra A.',
    'whyber.review3.comment': 'Salonu ve mutfağı yenilettik. Çok memnun kaldık. Oldukça kaliteli ve piyasaya göre uygun fiyat.',
    'evaluation.badge': 'Proje Ön Değerlendirme & Teklif',
    'evaluation.title': 'Projeniz İçin Hızlı Ön Değerlendirme Alın',
    'evaluation.subtitle': '300.000 TL ve üzeri üst segment anahtar teslim renovasyon projeleriniz için bilgilerinizi iletin; 24 saat içinde maliyet ve takvim ön fizibilitesini çıkaralım.',

    // HowWeWork
    'howwework.badge': 'Sürecimiz',
    'howwework.title': 'Nasıl Çalışıyoruz?',
    'howwework.subtitle': '6 adımda şeffaf, öngörülebilir ve profesyonel proje yönetimi.',
    'howwework.step.discovery.title': 'Yerinde Keşif ve İhtiyaç Analizi',
    'howwework.step.discovery.desc': 'Yerinde ziyaretle alanı inceler, istek ve bütçenizi anlayarak projenin kapsamını netleştiririz.',
    'howwework.step.design.title': 'Konsept Tasarım ve Malzeme Seçimi',
    'howwework.step.design.desc': '3D görsellerle projenizin nasıl görüneceğini önceden sunuyoruz. Onayınızla malzeme ve marka seçimlerini birlikte yapıyoruz.',
    'howwework.step.budget.title': 'Şeffaf Bütçe ve Sözleşme',
    'howwework.step.budget.desc': 'Kalem kalem maliyet tablosu, net takvim ve taahhütlerin yer aldığı resmi sözleşme imzalanır.',
    'howwework.step.execution.title': 'Uygulama ve Kalite Denetimi',
    'howwework.step.execution.desc': 'Tüm uygulamalar uzman proje yöneticilerimiz gözetiminde yürütülür. Düzenli ilerleme raporları sizi sürekli bilgilendirir.',
    'howwework.step.quality.title': 'Kalite Kontrol ve Punch-List',
    'howwework.step.quality.desc': 'Teslimden önce kapsamlı kalite kontrolü yapılır; tespit edilen her eksik tamamlanır.',
    'howwework.step.delivery.title': 'Anahtar Teslim ve Destek',
    'howwework.step.delivery.desc': 'Projenizi teslim alır, tüm garanti belgelerini edinirsiniz. Teslim sonrası destek kapsamında kalırsınız.',
    'howwework.callout': 'Her proje bir yolculuktur. Biz bu yolculuğu şeffaf, öngörülebilir ve stressiz hale getiriyoruz, siz sadece hayalinize odaklanın.',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.about.corporate': 'Corporate & Vision',
    'nav.about.corporate.desc': 'Premium Project Management & Execution',
    'nav.about.whyber': 'Client Reviews',
    'nav.about.whyber.desc': 'Verified customer experiences and references',
    'nav.about.process': 'How We Work',
    'nav.about.process.desc': '6-step turnkey professional methodology',
    'nav.services': 'Services',
    'nav.howwework': 'Our Process',
    'nav.whyber': 'Why Ber?',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.quote': 'Get a Quote',
    'nav.navigation': 'Navigation',

    // Hero
    'hero.badge': 'Ber Tadilat',
    'hero.headline': 'Premium Turnkey Renovation\nin Istanbul',
    'hero.subheadline': 'From interior design to execution; we manage and deliver residences, luxury villas, and commercial spaces with end-to-end accountability.',
    'hero.btnProjects': 'EXPLORE PROJECTS',
    'hero.btnDiscuss': 'DISCUSS YOUR PROJECT',
    'hero.getQuote': 'Request a Consultation',
    'hero.slide0': 'Full-scope project management for villas, residences and large apartments, from concept to handover.',
    'hero.slide1': 'Interior design, technical oversight and execution, single contract, single responsibility.',
    'hero.slide2': 'Transparent budget, fixed timeline. No surprise costs, no compromises on our commitments.',
    'hero.slide3': 'Under expert architectural supervision, with premium brands, we craft your home for the next 20 years.',

    // Gallery (Our Services)
    'gallery.title': 'Our Services',
    'gallery.project': 'Project',
    'gallery.image': 'Image',

    // New Project Gallery (Gallery)
    'gallery2.title': 'Project Gallery',
    'gallery2.subtitle': 'Moments from our completed renovation and decoration projects',
    'gallery2.close': 'Close',

    // Brands (Brand Partners)
    'brands.badge': 'Our Trusted Brand Partners and Collaborations',

    // Services, premium categories
    'services.badge': 'Our Service Scope',
    'services.title': 'Integrated Project Services',
    'services.subtitle': 'One point of contact, one complete project. We are with you at every step from design to handover.',
    'services.cta.label': 'Get in touch to discuss your project',
    'services.cta.button': 'Request a Consultation',

    'service.turnkey.name': 'Turnkey Villa and Apartment Renovation',
    'service.turnkey.desc': 'We manage large-scale residential projects from concept to handover without exception. No coordination headache with different contractors, one contract, one responsibility.',
    'service.turnkey.tag1': 'Project Management',
    'service.turnkey.tag2': 'Full Renovation',
    'service.turnkey.tag3': 'End-to-End Delivery',

    'service.interior.name': 'Interior Design and Application',
    'service.interior.desc': 'Our architects and designers create your living space as a 3D concept, and our applicators bring it to life exactly as designed. We don\'t leave your dream on paper.',
    'service.interior.tag1': 'Concept and 3D Design',
    'service.interior.tag2': 'Furniture and Colour Consultancy',
    'service.interior.tag3': 'Exact Application',

    'service.commercial.name': 'Commercial Space and Office Transformations',
    'service.commercial.desc': 'Complete transformation projects for hotels, restaurants, offices and boutique stores. Full adherence to time and budget, minimum disruption to operations.',
    'service.commercial.tag1': 'Hotels and Restaurants',
    'service.commercial.tag2': 'Offices and Showrooms',
    'service.commercial.tag3': 'Fast Delivery',

    'service.systems.name': 'Plumbing, Electrical and Smart Home',
    'service.systems.desc': 'From electrical, water and gas installations to smart home automation, all technical infrastructure installed under expert technical supervision. Energy efficiency and safety standards first.',
    'service.systems.tag1': 'Technical Oversight',
    'service.systems.tag2': 'Smart Home Automation',
    'service.systems.tag3': 'Energy Efficiency',

    'service.restoration.name': 'Restoration and Historic Building Renewal',
    'service.restoration.desc': 'Bringing historically and architecturally valuable buildings up to contemporary comfort standards while preserving their original character. Traditional techniques, modern materials.',
    'service.restoration.tag1': 'Historic Buildings',
    'service.restoration.tag2': 'Character Preservation',
    'service.restoration.tag3': 'Expert Team',

    'service.exterior.name': 'Exterior Cladding and Insulation Projects',
    'service.exterior.desc': 'We renew the entire building envelope: thermal cladding, facade coverings, roof insulation. Permanent reduction in energy bills, dramatic increase in visual value.',
    'service.exterior.tag1': 'Thermal and Acoustic Insulation',
    'service.exterior.tag2': 'Facade Cladding',
    'service.exterior.tag3': 'Energy Savings',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Request an on-site survey and detailed quote for your project',
    'contact.whatsapp': 'Contact via WhatsApp',
    'contact.phone': 'Phone',
    'contact.revealPhone': 'Show Number',
    'contact.callNow': 'Call Now',
    'contact.copied': 'Copied',
    'contact.clickToCall': 'Click to call',
    'contact.address': 'Address',
    'contact.location': 'Istanbul, Turkey',
    'contact.workingHours': 'Opening Hours',
    'contact.weekdays': 'Weekdays',
    'contact.weekends': 'Weekends',
    'contact.allDay': '24/7',

        'overview.footer': 'From a single-room renovation to full-scale turnkey villa and commercial projects, we execute every detail with superior quality and professional discipline. Contact us today to discuss your project.',

// Footer
    'footer.description': 'With extensive experience in Istanbul, we deliver premium turnkey renovation and interior design projects for high-end residential and commercial clients. Architecturally supervised, brand-guaranteed, transparent budget, your complete project partner.',
    'footer.copyright': '© 2026 Ber Tadilat. All rights reserved.',

    // WhatsApp Widget
    'whatsapp.title': 'Ber Tadilat',
    'whatsapp.status': 'Usually replies immediately',
    'whatsapp.message': 'How can I help you?',
    'whatsapp.connect': 'Start Chat',
    'whatsapp.ariaLabel': 'Contact via WhatsApp',
    'whatsapp.close': 'Close',

    // About
    'about.badge': 'About Us',
    'about.title': 'Who We Are as a Project Firm',
    'about.description': 'At Ber Tadilat, we manage the design, architectural oversight and application of premium residential and commercial projects under one roof. We treat every project not merely as a renovation, but as a lasting value investment.',
    'about.since': 'Istanbul • Premium',
    'about.discipline': 'Architectural Renovation',
    'about.engineer.name': 'Ber Tadilat',
    'about.engineer.title': 'High-End Renovation & Architectural Design',
    'about.engineer.edu': '3D Architectural Design & Planning',
    'about.engineer.exp': 'Extensive Istanbul Project Portfolio',
    'about.engineer.desc': 'Ber Tadilat delivers turnkey renovation services for residential spaces, villas, and commercial properties across Istanbul\'s premier neighborhoods. From initial concept and material curation to demolition, infrastructure, fine craftsmanship, and final handover, every step is coordinated with transparent budgeting and strict accountability.',
    'about.projects.num': '200+',
    'about.projects.label': 'Projects Completed',
    'about.audit.num': '100%',
    'about.audit.label': 'Quality Assurance',
    'about.pillar1.title': 'Single-Source Project Management',
    'about.pillar1.desc': 'Designer, architect, craftsmen, we coordinate the entire team for you. One point of contact, full accountability.',
    'about.pillar2.title': 'Quality & Field Oversight Assurance',
    'about.pillar2.desc': 'Rigorous technical oversight and verified execution at every stage. Structural safety and material quality are never compromised.',
    'about.pillar3.title': 'Transparent Contract and Commitment',
    'about.pillar3.desc': 'Clear budget and timeline from day one. Regular reporting throughout and no surprise costs.',
    'about.cta': 'Let\'s Discuss Your Project',

    // WhyBer
    'whyber.badge': 'Why Ber?',
    'whyber.title': 'What Makes Us Different?',
    'whyber.subtitle': 'Choosing the right partner for a high-budget project is critical. Here are the 6 fundamentals that set us apart.',
    'whyber.item.singlepoint.title': 'Single Point of Contact',
    'whyber.item.singlepoint.desc': 'No coordination headache with multiple contractors. The entire process from design to handover under one contract.',
    'whyber.item.engineer.title': 'Expert Technical & Architectural Supervision',
    'whyber.item.engineer.desc': 'Every critical milestone passes through Ber Tadilat\'s strict quality control. Structural integrity and flawless workmanship guaranteed.',
    'whyber.item.budget.title': 'Transparent and Fixed Budget',
    'whyber.item.budget.desc': 'Detailed survey at project start, itemised cost table. No surprise invoices, no deviation from our commitments.',
    'whyber.item.timeline.title': 'Committed Timeline',
    'whyber.item.timeline.desc': 'Project milestones are written into the contract. Transparent notification and solution plan in case of delays.',
    'whyber.item.brands.title': 'Premium Brand Guarantee',
    'whyber.item.brands.desc': 'We work with A-class brands such as Vitra, Grohe, Knauf and Duravit. Material quality is never compromised.',
    'whyber.item.aftercare.title': 'Post-Handover Support',
    'whyber.item.aftercare.desc': 'We are with you for any issues that may arise after project handover. Long-term relationship, not a short-term transaction.',
    'whyber.stat1.num': '200+',
    'whyber.stat1.label': 'Projects Completed',
    'whyber.stat2.num': '15+',
    'whyber.stat2.label': 'Years of Experience',
    'whyber.stat3.num': '98%',
    'whyber.stat3.label': 'Client Satisfaction',
    'whyber.stat4.num': '30+',
    'whyber.stat4.label': 'Partner Brands',
    'whyber.cta': 'Request a Consultation',
    'whyber.reviews.badge': 'Client Reviews',
    'whyber.reviews.title': 'What Our Clients Say About Ber Tadilat',
    'whyber.reviews.verified': 'Verified Client',
    'whyber.review1.name': 'Elif A.',
    'whyber.review1.comment': 'We had painting, drywall, cabinet painting, doors and windows, and suspended ceiling work done. Truly very professional. Their craftsmanship was very clean and their prices were reasonable. Thank you so much.',
    'whyber.review2.name': 'Musa A.',
    'whyber.review2.comment': 'I recently moved to Istanbul and researched the market; they are truly a company that works with high quality and meticulous craftsmanship.',
    'whyber.review3.name': 'Büşra A.',
    'whyber.review3.comment': 'We renovated our living room and kitchen. We were very satisfied. Quite high quality and fair prices compared to the market.',
    'evaluation.badge': 'Project Pre-Evaluation & Estimate',
    'evaluation.title': 'Get an Instant Pre-Evaluation For Your Project',
    'evaluation.subtitle': 'Submit your project details for turnkey renovation projects of 300,000 TL and above; we will prepare an initial cost and timeline feasibility within 24 hours.',

    // HowWeWork
    'howwework.badge': 'Our Process',
    'howwework.title': 'How Do We Work?',
    'howwework.subtitle': 'Transparent, predictable and professional project management in 6 steps.',
    'howwework.step.discovery.title': 'On-Site Survey and Needs Analysis',
    'howwework.step.discovery.desc': 'We visit the site, understand your wishes and budget, and clarify the project scope.',
    'howwework.step.design.title': 'Concept Design and Material Selection',
    'howwework.step.design.desc': 'We present how your project will look in advance with 3D visuals. Material and brand selections are made together with your approval.',
    'howwework.step.budget.title': 'Transparent Budget and Contract',
    'howwework.step.budget.desc': 'A formal contract is signed with an itemised cost table, clear timeline and all commitments.',
    'howwework.step.execution.title': 'Execution and Quality Oversight',
    'howwework.step.execution.desc': 'All applications are carried out under expert project manager supervision. Regular progress reports keep you continuously informed.',
    'howwework.step.quality.title': 'Quality Control and Punch-List',
    'howwework.step.quality.desc': 'A comprehensive quality check is carried out before handover; every identified deficiency is completed.',
    'howwework.step.delivery.title': 'Turnkey Handover and Support',
    'howwework.step.delivery.desc': 'You receive your project and all warranty documents. You remain within post-handover support coverage.',
    'howwework.callout': 'Every project is a journey. We make that journey transparent, predictable and stress-free, you just focus on your vision.',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.about.corporate': 'عن الشركة ورؤيتنا',
    'nav.about.corporate.desc': 'إدارة وتنفيذ المشاريع الراقية',
    'nav.about.whyber': 'آراء العملاء',
    'nav.about.whyber.desc': 'تجارب العملاء الموثقة والآراء الحقيقية',
    'nav.about.process': 'مراحل عملنا',
    'nav.about.process.desc': 'إدارة احترافية تسليم مفتاح في 6 مراحل',
    'nav.services': 'خدماتنا',
    'nav.howwework': 'مراحل عملنا',
    'nav.whyber': 'لماذا بير؟',
    'nav.gallery': 'معرض المشاريع',
    'nav.contact': 'اتصل بنا',
    'nav.quote': 'طلب عرض أسعار',
    'nav.navigation': 'التنقل',

    // Hero
    'hero.badge': 'بر تاديلات (Ber Tadilat)',
    'hero.headline': 'تجديد فاخر تسليم مفتاح\nفي إسطنبول',
    'hero.subheadline': 'من التصميم الداخلي المعماري حتى التسليم؛ ندير وننفذ منازلكم وفيلاتكم ومساحاتكم التجارية بجهة مسؤولة واحدة.',
    'hero.btnProjects': 'استعراض المشاريع',
    'hero.btnDiscuss': 'لنتحدث عن مشروعكم',
    'hero.getQuote': 'طلب معاينة',
    'hero.slide0': 'إدارة شاملة للمشاريع السكنية الكبرى من الفكرة حتى التسليم النهائي.',
    'hero.slide1': 'تصميم داخلي، إشراف فني وتنفيذ متقن، عقد واحد ومسؤولية شاملة.',
    'hero.slide2': 'ميزانية شفافة، جدول زمني محدد. لا تكاليف مفاجئة، لا تنازل عن التزاماتنا.',
    'hero.slide3': 'بإشراف معماري وفني متخصص ومع علامات تجارية راقية، نجدد مساحاتكم لعشرين عاماً قادمة.',

    // Gallery (Hizmetlerimiz)
    'gallery.title': 'خدماتنا ومشاريعنا',
    'gallery.project': 'مشروع',
    'gallery.image': 'صورة',

    // New Project Gallery (Galeri)
    'gallery2.title': 'معرض المشاريع',
    'gallery2.subtitle': 'لقطات مختارة من مشاريعنا المنجزة في التجديد والديكور',
    'gallery2.close': 'إغلاق',

    // Brands (Çözüm Ortakları & İş Birlikleri)
    'brands.badge': 'شركاء النجاح والعلامات التجارية التي نتعاون معها',

    // Services, premium categories
    'services.badge': 'نطاق خدماتنا',
    'services.title': 'خدمات المشاريع المتكاملة',
    'services.subtitle': 'جهة واحدة، مشروع متكامل. نرافقك في كل خطوة من التصميم حتى التسليم.',
    'services.cta.label': 'تواصل معنا لمناقشة مشروعك',
    'services.cta.button': 'طلب معاينة مجانية',

    'service.turnkey.name': 'تجديد فيلا وشقة تسليم مفتاح',
    'service.turnkey.desc': 'ندير المشاريع السكنية الكبرى من مرحلة الفكرة حتى التسليم النهائي. لا معاناة من التنسيق مع مقاولين مختلفين, عقد واحد، مسؤولية واحدة.',
    'service.turnkey.tag1': 'إدارة المشاريع',
    'service.turnkey.tag2': 'تجديد شامل',
    'service.turnkey.tag3': 'متابعة حتى التسليم',

    'service.interior.name': 'التصميم الداخلي والتنفيذ',
    'service.interior.desc': 'يصمم مهندسونا ومصممونا مساحتك كنموذج ثلاثي الأبعاد، ويُنفّذها فريق التطبيق بدقة. لا نترك حلمك على الورق.',
    'service.interior.tag1': 'تصميم ثلاثي الأبعاد',
    'service.interior.tag2': 'استشارة الأثاث والألوان',
    'service.interior.tag3': 'تنفيذ دقيق',

    'service.commercial.name': 'تحويل المساحات التجارية والمكاتب',
    'service.commercial.desc': 'مشاريع تحويل شاملة للفنادق والمطاعم والمكاتب والمحلات. الالتزام التام بالوقت والميزانية وأدنى تأثير على العمليات.',
    'service.commercial.tag1': 'فنادق ومطاعم',
    'service.commercial.tag2': 'مكاتب وصالات عرض',
    'service.commercial.tag3': 'تسليم سريع',

    'service.systems.name': 'السباكة والكهرباء والمنازل الذكية',
    'service.systems.desc': 'من التمديدات الكهربائية والمائية والغازية إلى أتمتة المنزل الذكي، جميع البنية التحتية التقنية تحت إشراف فني متخصص. معايير الكفاءة والسلامة أولاً.',
    'service.systems.tag1': 'إشراف فني متخصص',
    'service.systems.tag2': 'أتمتة المنزل الذكي',
    'service.systems.tag3': 'كفاءة الطاقة',

    'service.restoration.name': 'الترميم وتجديد المباني التاريخية',
    'service.restoration.desc': 'رفع المباني ذات القيمة التاريخية والمعمارية إلى معايير الراحة المعاصرة مع الحفاظ على طابعها الأصيل. تقنيات تقليدية، مواد حديثة.',
    'service.restoration.tag1': 'مباني تاريخية',
    'service.restoration.tag2': 'الحفاظ على الطابع',
    'service.restoration.tag3': 'فريق متخصص',

    'service.exterior.name': 'مشاريع الواجهات والعزل',
    'service.exterior.desc': 'نجدد الغلاف الخارجي للمبنى بالكامل: كسوة حرارية، كسوة واجهة، عزل السطح. انخفاض دائم في فاتورة الطاقة، ارتفاع درامي في القيمة البصرية.',
    'service.exterior.tag1': 'عزل حراري وصوتي',
    'service.exterior.tag2': 'كسوة الواجهة',
    'service.exterior.tag3': 'توفير الطاقة',

    // Service descriptions
    'service.dekorasyon.desc': 'نحول مساحاتك المعيشية بحلول ديكور عصرية وفاخرة. مع فريقنا المتخصص في التصميم الداخلي، وتنسيق الأثاث والألوان، نصنع المكان الذي تحلم به.',
    'service.restorasyon.desc': 'نمتلك خبرة واسعة في ترميم المباني ذات القيمة التاريخية والثقافية مع الحفاظ على طابعها الأصلي، بالجمع بين التقنيات الأصيلة والمواد المتطورة.',
    'service.boya.desc': 'نمنح جدرانك إطلالة جديدة ومشرقة بخدمات دهان احترافية. نضمن نتائج تدوم طويلاً بفضل الدهانات عالية الجودة والإعداد المتقن للأسطح.',
    'service.alciplan.desc': 'نبتكر جدران وأسقف جمالية ومستوية باستخدام أحدث تقنيات ألواح الجبس، والأسقف المعلقة، والقواطع الجدارية والديكورات العصرية.',
    'service.fayans.desc': 'نقدم خدمات متقنة لتركيب السيراميك والبورسلين للحمامات والمطابخ، مع مراعاة كاملة للعزل المائي والدقة الهندسية والجمال البصري.',
    'service.mutfak.desc': 'خبراء في تصميم وتركيب المطابخ الحديثة. نحقق توازناً مثالياً بين التصميم المريح والمواد المتينة والحلول العملية لتنظيم مطبخك.',
    'service.parke.desc': 'سنوات من الخبرة في تركيب وتجهيز أرضيات الباركيه والخشب الطبيعي والمصفح، مع تسوية ممتازة للأسطح وضمان متانة وطول عمر الأرضيات.',
    'service.isolation.desc': 'حلول متقدمة في العزل الحراري والصوتي لتوفير الطاقة والراحة، للحفاظ على اعتدال منزلك صيفاً ودفئه شتاءً بتقنيات معتمدة.',
    'service.facade.desc': 'تجديد كامل للواجهات الخارجية للمباني بالكسوات والدهانات والعوازل المقاومة لمختلف العوامل الجوية مع جودة تدوم طويلاً.',
    'service.akillisistem.desc': 'التحكم الذكي بالإضاءة، والتكييف، وكاميرات الأمان والأجهزة عبر نظام مركزي واحد، لإضفاء أقصى درجات الراحة والأمان وتوفير الطاقة.',
    'service.tesisat.desc': 'حلول سباكة وكهرباء شاملة وموثوقة للمنازل والمكاتب، وتحديث شبكات المياه والصرف الصحي وأنظمة التدفئة المركزية بأعلى معايير السلامة.',

    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'احصل على معاينة مجانية وعرض سعر مخصص لمشروعك',
    'contact.whatsapp': 'تواصل عبر واتساب',
    'contact.phone': 'الهاتف',
    'contact.revealPhone': 'إظهار الرقم',
    'contact.callNow': 'اتصل الآن',
    'contact.copied': 'تم النسخ',
    'contact.clickToCall': 'انقر للاتصال',
    'contact.address': 'العنوان',
    'contact.location': 'إسطنبول، تركيا',
    'contact.workingHours': 'ساعات العمل',
    'contact.weekdays': 'أيام الأسبوع',
    'contact.weekends': 'عطلة نهاية الأسبوع',
    'contact.allDay': 'على مدار الساعة 24/7',

    // Footer
    'footer.description': 'بسنوات طويلة من الخبرة في إسطنبول، نقدم مشاريع تجديد وتصميم داخلي فاخرة للعملاء الراقيين سكنياً وتجارياً. إشراف فني معماري، ضمان العلامة التجارية، ميزانية شفافة، شريكك المتكامل في المشاريع.',
    'footer.copyright': '© 2026 بر تاديلات. جميع الحقوق محفوظة.',

    // WhatsApp Widget
    'whatsapp.title': 'بر تاديلات',
    'whatsapp.status': 'متاح للرد السريع',
    'whatsapp.message': 'مرحباً، كيف يمكننا مساعدتك اليوم؟',
    'whatsapp.connect': 'بدء المحادثة',
    'whatsapp.ariaLabel': 'تواصل عبر واتساب',
    'whatsapp.close': 'إغلاق',

    // About
    'about.badge': 'من نحن',
    'about.title': 'نحن كشركة مشاريع متكاملة',
    'about.description': 'في بر تاديلات (Ber Tadilat)، ندير التصميم الداخلي، الإشراف الفني والتنفيذ المتكامل للمشاريع السكنية والتجارية الراقية تحت سقف واحد. نتعامل مع كل مشروع ليس مجرد تجديد، بل كاستثمار دائم يرفع قيمة المكان.',
    'about.since': 'إسطنبول • الفخامة',
    'about.discipline': 'التجديد المعماري',
    'about.engineer.name': 'بر تاديلات (Ber Tadilat)',
    'about.engineer.title': 'تجديد فاخر وتصميم معماري راقٍ',
    'about.engineer.edu': 'تصميم معماري ثلاثي الأبعاد وتخطيط شامل',
    'about.engineer.exp': 'سجل مشاريع متميزة في مختلف مناطق إسطنبول',
    'about.engineer.desc': 'تقدم بر تاديلات خدمات تجديد تسليم مفتاح للمساكن والفيلات والمساحات التجارية في أرقى أحياء إسطنبول. من الفكرة واختيار المواد إلى البنية التحتية والتشطيبات الفاخرة، تُدار جميع المراحل بميزانية شفافة والتزام تام.',
    'about.projects.num': '+200',
    'about.projects.label': 'مشروع منجز',
    'about.audit.num': '100%',
    'about.audit.label': 'ضمان الجودة',
    'about.pillar1.title': 'إدارة مشاريع من مصدر واحد',
    'about.pillar1.desc': 'مصممون، مهندسون معماريون، وحرفيون؛ ننسق الفريق كاملاً لأجلك. جهة اتصال واحدة ومسؤولية تامة.',
    'about.pillar2.title': 'ضمان الجودة والإشراف الميداني',
    'about.pillar2.desc': 'تنفيذ معتمد وإشراف فني دقيق في كل مرحلة. معايير الأمان والجودة العالية لا مساومة عليها.',
    'about.pillar3.title': 'عقد وتعهد شفاف',
    'about.pillar3.desc': 'ميزانية وجدول زمني واضحان من اليوم الأول. تقارير دورية طوال المشروع ولا تكاليف مفاجئة.',
    'about.cta': 'لنناقش مشروعك',

    // WhyBer
    'whyber.badge': 'لماذا بر؟',
    'whyber.title': 'ما الذي يميزنا؟',
    'whyber.subtitle': 'اختيار الشريك المناسب لمشروع عالي الميزانية أمر بالغ الأهمية. إليك 6 أسس تُميزنا.',
    'whyber.item.singlepoint.title': 'جهة اتصال واحدة',
    'whyber.item.singlepoint.desc': 'لا معاناة من التنسيق مع مقاولين متعددين. العملية بأكملها من التصميم إلى التسليم تحت عقد واحد.',
    'whyber.item.engineer.title': 'إشراف فني ومعماري متخصص',
    'whyber.item.engineer.desc': 'كل مرحلة حرجة تخضع للرقابة الصارمة من فريق بير تاديلات. سلامة إنشائية ودقة تنفيذ مضمونة.',
    'whyber.item.budget.title': 'ميزانية شفافة وثابتة',
    'whyber.item.budget.desc': 'مسح تفصيلي في بداية المشروع، جدول تكاليف مفصّل. لا فواتير مفاجئة، لا انحراف عن تعهداتنا.',
    'whyber.item.timeline.title': 'جدول زمني ملتزم',
    'whyber.item.timeline.desc': 'معالم المشروع مكتوبة في العقد. إشعار شفاف وخطة حل في حالة التأخير.',
    'whyber.item.brands.title': 'ضمان العلامات التجارية الراقية',
    'whyber.item.brands.desc': 'نتعامل مع علامات تجارية من الدرجة الأولى كفيترا وغروهه وكنوف وديفوريت. جودة المواد لا تُساوَم أبداً.',
    'whyber.item.aftercare.title': 'دعم ما بعد التسليم',
    'whyber.item.aftercare.desc': 'نحن معك لأي مشاكل قد تنشأ بعد تسليم المشروع. علاقة طويلة الأمد، لا مجرد صفقة قصيرة.',
    'whyber.stat1.num': '+200',
    'whyber.stat1.label': 'مشروع منجز',
    'whyber.stat2.num': '+15',
    'whyber.stat2.label': 'سنة خبرة',
    'whyber.stat3.num': '98%',
    'whyber.stat3.label': 'رضا العملاء',
    'whyber.stat4.num': '+30',
    'whyber.stat4.label': 'علامة شريكة',
    'whyber.cta': 'طلب معاينة مجانية',
    'whyber.reviews.badge': 'تقييمات العملاء',
    'whyber.reviews.title': 'آراء عملائنا في بر تاديلات',
    'whyber.reviews.verified': 'عميل موثق',
    'whyber.review1.name': 'Elif A.',
    'whyber.review1.comment': 'قمنا بأعمال الدهان والجبس بورد وطلاء الخزائن والأبواب والنوافذ والأسقف المعلقة. عمل احترافي للغاية ونظيف وبأسعار مناسبة. شكراً جزيلاً لكم.',
    'whyber.review2.name': 'Musa A.',
    'whyber.review2.comment': 'لقد انتقلت حديثاً إلى إسطنبول وبحثت في السوق، إنها حقاً شركة تعمل بجودة عالية وحرفية دقيقة للغاية.',
    'whyber.review3.name': 'Büşra A.',
    'whyber.review3.comment': 'قمنا بتجديد الصالون والمطبخ. كنا راضين جداً. جودة ممتازة وأسعار مناسبة جداً مقارنة بالسوق.',
    'evaluation.badge': 'التقييم الأولي للمشروع والتكلفة',
    'evaluation.title': 'احصل على تقييم أولي سريع لمشروعك',
    'evaluation.subtitle': 'أرسل تفاصيل مشروعك للمشاريع الشاملة تسليم مفتاح بقيمة 300,000 ليرة وما فوق؛ وسنقوم بإعداد دراسة أولية للجدول الزمني والتكلفة خلال 24 ساعة.',

    // HowWeWork
    'howwework.badge': 'أسلوب عملنا',
    'howwework.title': 'كيف نعمل؟',
    'howwework.subtitle': 'إدارة مشاريع شفافة وقابلة للتنبؤ واحترافية في 6 خطوات.',
    'howwework.step.discovery.title': 'معاينة مجانية وتحليل الاحتياجات',
    'howwework.step.discovery.desc': 'نزور الموقع، ونفهم رغباتك وميزانيتك، ونحدد نطاق المشروع.',
    'howwework.step.design.title': 'التصميم المفاهيمي واختيار المواد',
    'howwework.step.design.desc': 'نعرض كيف سيبدو مشروعك مسبقاً بمرئيات ثلاثية الأبعاد. اختيار المواد والعلامات التجارية يتم بموافقتك.',
    'howwework.step.budget.title': 'الميزانية الشفافة والعقد',
    'howwework.step.budget.desc': 'يُوقَّع عقد رسمي بجدول تكاليف مفصّل، جدول زمني واضح وجميع الالتزامات.',
    'howwework.step.execution.title': 'التنفيذ وضبط الجودة',
    'howwework.step.execution.desc': 'تتم جميع أعمال التنفيذ تحت إشراف مديري مشاريع خبراء، مع تزويدكم بتقارير تقدم دورية منتظمة.',
    'howwework.step.quality.title': 'مراقبة الجودة وقائمة الإنهاء',
    'howwework.step.quality.desc': 'فحص شامل للجودة قبل التسليم؛ كل نقص محدد يتم إتمامه.',
    'howwework.step.delivery.title': 'التسليم وما بعده',
    'howwework.step.delivery.desc': 'تستلم مشروعك وجميع وثائق الضمان. تبقى ضمن نطاق دعم ما بعد التسليم.',
    'howwework.callout': 'كل مشروع رحلة. نجعل تلك الرحلة شفافة وقابلة للتنبؤ وخالية من التوتر, أنت فقط ركّز على رؤيتك.',

    // Old overview (kept for Gallery component references)
    'overview.title': 'من التصميم وحتى التسليم، نهتم بأدق تفاصيل منزلك',
    'overview.description': 'نقدم خدمات تجديد وديكور شاملة ومتكاملة من المفهوم الأولي وحتى التسليم النهائي. نتولى إدارة كافة مراحل مشروعك دون عناء التنسيق مع حرفيين متعددين، لتقديم نتائج دقيقة بجهة اتصال ومسؤولية واحدة موثوقة.',
    'overview.description.slide0': 'نقدم خدمات تجديد وديكور شاملة ومتكاملة من الفكرة الأولية وحتى التسليم النهائي على المفتاح.',
    'overview.description.slide1': 'من أعمال التشطيبات والديكور وحتى الأنظمة الكهربائية والصحية، ندير مشروعك بخبرة متناهية.',
    'overview.description.slide2': 'من العزل الحراري والصوتي وحتى أنظمة المنازل الذكية، نجهز منزلك للمستقبل بأعلى كفاءة.',
    'overview.description.slide3': 'دون عناء التنسيق مع أطراف متعددة، تحصل على نتائج متكاملة ومتقنة من خلال جهة واحدة مسؤولة.',
    'overview.decorTitle': 'الديكور والتجديد',
    'overview.decor.item1': 'تطبيقات وتصاميم الديكور الداخلي',
    'overview.decor.item2': 'أعمال الترميم وإعادة التأهيل',
    'overview.decor.item3': 'الدهانات والطلاءات الجدارية الفاخرة',
    'overview.decor.item4': 'ألواح الجبس والقواطع والأسقف المعلقة',
    'overview.decor.item5': 'تركيب السيراميك والرخام والبورسلين',
    'overview.decor.item6': 'تصميم وتركيب المطابخ العصرية',
    'overview.decor.item7': 'تركيب أرضيات الباركيه والخشب',
    'overview.insulationTitle': 'العزل والواجهات',
    'overview.insulation.item1': 'العزل الحراري الخارجي والداخلي',
    'overview.insulation.item2': 'العزل الصوتي المتقدم',
    'overview.insulation.item3': 'دهانات وتشطيبات واجهات المباني',
    'overview.installTitle': 'التمديدات والأنظمة الذكية',
    'overview.install.item1': 'التمديدات والشبكات الكهربائية',
    'overview.install.item2': 'تمديدات المياه والصرف والغاز الطبيعي',
    'overview.install.item3': 'أنظمة المنازل الذكية والأتمتة الكاملة',
    'overview.footer': 'من تجديد غرفة واحدة وحتى إعادة تأهيل مبنى كامل، نقدم حلول تسليم مفتاح تناسب جميع المشروعات. اتصل بنا الآن لتحديد موعد معاينة وتنسيق المشروع.',
  },
  
  fa: {
    // Navigation
    'nav.home': 'صفحه اصلی',
    'nav.about': 'درباره ما',
    'nav.about.corporate': 'درباره شرکت و چشم‌انداز',
    'nav.about.corporate.desc': 'مدیریت و اجرای پروژه‌های لوکس',
    'nav.about.whyber': 'نظرات مشتریان',
    'nav.about.whyber.desc': 'تجربیات و نظرات تأیید شده مشتریان ما',
    'nav.about.process': 'فرایند کاری ما',
    'nav.about.process.desc': 'مدیریت حرفه‌ای کلید تحویل در ۶ گام',
    'nav.services': 'خدمات ما',
    'nav.howwework': 'فرآیند ما',
    'nav.whyber': 'چرا بر؟',
    'nav.gallery': 'گالری',
    'nav.contact': 'تماس با ما',
    'nav.quote': 'دریافت قیمت',
    'nav.navigation': 'دسترسی سریع',

    // Hero
    'hero.badge': 'بر تادیلات (Ber Tadilat)',
    'hero.headline': 'بازسازی لوکس کلید تحویل\nدر استانبول',
    'hero.subheadline': 'از طراحی معماری داخلی تا تحویل نهایی؛ مدیریت و اجرای یکپارچه پروژه‌های مسکونی، ویلایی و تجاری شما.',
    'hero.btnProjects': 'مشاهده پروژه‌ها',
    'hero.btnDiscuss': 'گفتگو درباره پروژه',
    'hero.getQuote': 'درخواست مشاوره و بازدید',
    'hero.slide0': 'مدیریت جامع پروژه‌های مسکونی بزرگ از ایده تا تحویل نهایی.',
    'hero.slide1': 'طراحی داخلی، نظارت فنی و اجرای دقیق، یک قرارداد، یک مسئولیت.',
    'hero.slide2': 'بودجه شفاف، برنامه زمانی مشخص. بدون هزینه غافلگیرکننده، بدون تنازل از تعهداتمان.',
    'hero.slide3': 'با نظارت تخصصی معماری و فنی و با برترین برندها، فضای شما را برای ۲۰ سال آینده می‌سازیم.',

    // Gallery (Hizmetlerimiz)
    'gallery.title': 'خدمات و پروژه‌های ما',
    'gallery.project': 'پروژه',
    'gallery.image': 'تصویر',

    // New Project Gallery (Galeri)
    'gallery2.title': 'گالری پروژه‌ها',
    'gallery2.subtitle': 'تصاویر منتخب از پروژه‌های اجرا شده بازسازی و دکوراسیون',
    'gallery2.close': 'بستن',

    // Brands (Brand Partners)
    'brands.badge': 'برندهای همکار و شرکای تجاری ما',

    // Services, premium categories
    'services.badge': 'دامنه خدمات ما',
    'services.title': 'خدمات یکپارچه پروژه',
    'services.subtitle': 'یک طرف قرارداد، یک پروژه کامل. از طراحی تا تحویل در هر مرحله همراه شما هستیم.',
    'services.cta.label': 'برای مشاوره درباره پروژه‌تان با ما تماس بگیرید',
    'services.cta.button': 'درخواست بازدید رایگان',

    'service.turnkey.name': 'بازسازی ویلا و آپارتمان کلید تحویل',
    'service.turnkey.desc': 'پروژه‌های مسکونی بزرگ را از مرحله ایده تا تحویل نهایی بدون استثنا مدیریت می‌کنیم. بدون دردسر هماهنگی با پیمانکاران مختلف, یک قرارداد، یک مسئولیت.',
    'service.turnkey.tag1': 'مدیریت پروژه',
    'service.turnkey.tag2': 'بازسازی کامل',
    'service.turnkey.tag3': 'پیگیری تا تحویل',

    'service.interior.name': 'طراحی داخلی و اجرا',
    'service.interior.desc': 'معماران و طراحان ما فضای زندگی شما را به عنوان یک مفهوم سه‌بعدی طراحی می‌کنند و تیم اجرا دقیقاً همان را پیاده می‌کند. رویای شما را روی کاغذ رها نمی‌کنیم.',
    'service.interior.tag1': 'مفهوم و طراحی سه‌بعدی',
    'service.interior.tag2': 'مشاوره مبلمان و رنگ',
    'service.interior.tag3': 'اجرای دقیق',

    'service.commercial.name': 'تحول فضاهای تجاری و اداری',
    'service.commercial.desc': 'پروژه‌های تحول کامل برای هتل‌ها، رستوران‌ها، دفاتر و مغازه‌های بوتیک. پایبندی کامل به زمان و بودجه، حداقل اختلال در عملیات.',
    'service.commercial.tag1': 'هتل و رستوران',
    'service.commercial.tag2': 'دفتر و نمایشگاه',
    'service.commercial.tag3': 'تحویل سریع',

    'service.systems.name': 'لوله‌کشی، برق و خانه هوشمند',
    'service.systems.desc': 'از تاسیسات برق، آب و گاز تا اتوماسیون خانه هوشمند، تمام زیرساخت فنی زیر نظارت فنی متخصص نصب می‌شود. معیارهای بهره‌وری انرژی و ایمنی در اولویت.',
    'service.systems.tag1': 'نظارت فنی متخصص',
    'service.systems.tag2': 'اتوماسیون خانه هوشمند',
    'service.systems.tag3': 'بهره‌وری انرژی',

    'service.restoration.name': 'مرمت و نوسازی ابنیه تاریخی',
    'service.restoration.desc': 'ارتقای ابنیه تاریخی و معماری ارزشمند به استانداردهای آسایش معاصر با حفظ شخصیت اصیل آن‌ها. تکنیک‌های سنتی، مصالح مدرن.',
    'service.restoration.tag1': 'ابنیه تاریخی',
    'service.restoration.tag2': 'حفظ شخصیت معماری',
    'service.restoration.tag3': 'تیم متخصص',

    'service.exterior.name': 'پروژه‌های نما و عایق‌کاری',
    'service.exterior.desc': 'پوسته خارجی ساختمان را به طور کامل نو می‌کنیم: عایق حرارتی، پوشش نما، عایق سقف. کاهش دائمی قبض انرژی، افزایش چشمگیر ارزش بصری.',
    'service.exterior.tag1': 'عایق حرارتی و صوتی',
    'service.exterior.tag2': 'پوشش نما',
    'service.exterior.tag3': 'صرفه‌جویی انرژی',

    // Contact
    'contact.title': 'تماس با ما',
    'contact.subtitle': 'جهت بازدید، مشاوره فنی و دریافت پیش‌فاکتور رایگان با ما در ارتباط باشید',
    'contact.whatsapp': 'ارتباط در واتس‌اپ',
    'contact.phone': 'تلفن تماس',
    'contact.revealPhone': 'نمایش شماره تماس',
    'contact.callNow': 'تماس تلفنی',
    'contact.copied': 'کپی شد',
    'contact.clickToCall': 'برای تماس ضربه بزنید',
    'contact.address': 'آدرس',
    'contact.location': 'استانبول، ترکیه',
    'contact.workingHours': 'ساعات کاری',
    'contact.weekdays': 'روزهای کاری',
    'contact.weekends': 'آخر هفته',
    'contact.allDay': '۲۴ ساعته / ۷ روز هفته',

    // Footer
    'footer.description': 'با سال‌ها تجربه درخشان در استانبول، ارائه‌دهنده پروژه‌های بازسازی لوکس و طراحی داخلی برای مشتریان مسکونی و تجاری برتر هستیم. نظارت تخصصی معماری، ضمانت برند، بودجه شفاف، شریک کامل پروژه شما.',
    'footer.copyright': '© ۲۰۲۶ بر تادیلات. تمامی حقوق محفوظ است.',

    // WhatsApp Widget
    'whatsapp.title': 'بر تادیلات (Ber Tadilat)',
    'whatsapp.status': 'پاسخگویی سریع',
    'whatsapp.message': 'سلام، چطور می‌توانیم در پروژه ساختمانی یا بازسازی‌تان به شما کمک کنیم؟',
    'whatsapp.connect': 'شروع گفتگو در واتس‌اپ',
    'whatsapp.ariaLabel': 'ارتباط در واتس‌اپ',
    'whatsapp.close': 'بستن',

    // About
    'about.badge': 'درباره ما',
    'about.title': 'ما به عنوان یک شرکت پروژه',
    'about.description': 'در بر تادیلات (Ber Tadilat)، طراحی، نظارت معماری و اجرای پروژه‌های مسکونی و تجاری برتر را زیر یک سقف مدیریت می‌کنیم. هر پروژه را نه صرفاً یک بازسازی، بلکه یک سرمایه‌گذاری ارزش ماندگار می‌دانیم.',
    'about.since': 'استانبول • لوکس',
    'about.discipline': 'بازسازی معماری',
    'about.engineer.name': 'بر تادیلات (Ber Tadilat)',
    'about.engineer.title': 'بازسازی لوکس و طراحی معماری',
    'about.engineer.edu': 'طراحی معماری سه‌بعدی و برنامه‌ریزی',
    'about.engineer.exp': 'پرتفوی گسترده پروژه‌های استانبول',
    'about.engineer.desc': 'بر تادیلات خدمات بازسازی کلید تحویل را برای واحدهای مسکونی، ویلایی و تجاری در بهترین مناطق استانبول ارائه می‌دهد. از ایده و انتخاب متریال تا تخریب، تأسیسات و نازک‌کاری دقیق، تمام مراحل با بودجه شفاف و تعهد کامل مدیریت می‌شود.',
    'about.projects.num': '+۲۰۰',
    'about.projects.label': 'پروژه تکمیل‌شده',
    'about.audit.num': '۱۰۰%',
    'about.audit.label': 'تضمین کیفیت',
    'about.pillar1.title': 'مدیریت پروژه از یک منبع',
    'about.pillar1.desc': 'طراح، معمار، استادکار؛ هماهنگی کامل تیم را برای شما بر عهده داریم. یک پاسخگو، مسئولیت کامل.',
    'about.pillar2.title': 'تضمین کیفیت و نظارت میدانی',
    'about.pillar2.desc': 'اجرای دقیق و نظارت فنی موشکافانه در تمام مراحل. ایمنی سازه و کیفیت متریال هرگز سازش‌پذیر نیست.',
    'about.pillar3.title': 'قرارداد و تعهد شفاف',
    'about.pillar3.desc': 'بودجه و برنامه زمانی واضح از روز اول. گزارش‌دهی منظم در طول پروژه و بدون هزینه غافلگیرکننده.',
    'about.cta': 'درباره پروژه‌تان صحبت کنیم',

    // WhyBer
    'whyber.badge': 'چرا بر؟',
    'whyber.title': 'چه چیزی ما را متمایز می‌کند؟',
    'whyber.subtitle': 'انتخاب شریک مناسب برای پروژه با بودجه بالا حیاتی است. اینجا ۶ اصل پایه‌ای است که ما را متمایز می‌کند.',
    'whyber.item.singlepoint.title': 'یک نقطه تماس',
    'whyber.item.singlepoint.desc': 'بدون دردسر هماهنگی با پیمانکاران متعدد. کل فرآیند از طراحی تا تحویل تحت یک قرارداد.',
    'whyber.item.engineer.title': 'نظارت فنی و معماری تخصصی',
    'whyber.item.engineer.desc': 'هر مرحله کلیدی از کنترل کیفیت دقیق تیم بر تادیلات عبور می‌کند. ایمنی سازه‌ای و کیفیت اجرای بی‌نقص تضمین‌شده.',
    'whyber.item.budget.title': 'بودجه شفاف و ثابت',
    'whyber.item.budget.desc': 'بررسی دقیق در شروع پروژه، جدول هزینه آیتم‌بندی‌شده. بدون فاکتور غافلگیرکننده، بدون انحراف از تعهداتمان.',
    'whyber.item.timeline.title': 'برنامه زمانی متعهد',
    'whyber.item.timeline.desc': 'مایل‌استون‌های پروژه در قرارداد نوشته می‌شود. اطلاع‌رسانی شفاف و برنامه راه‌حل در صورت تأخیر.',
    'whyber.item.brands.title': 'تضمین برند برتر',
    'whyber.item.brands.desc': 'با برندهای درجه یک مانند ویترا، گروهه، کنوف و دوراویت کار می‌کنیم. کیفیت مصالح هرگز به خطر نمی‌افتد.',
    'whyber.item.aftercare.title': 'پشتیبانی پس از تحویل',
    'whyber.item.aftercare.desc': 'برای هر مشکلی که پس از تحویل پروژه پیش آید همراه شما هستیم. رابطه بلندمدت، نه یک معامله کوتاه‌مدت.',
    'whyber.stat1.num': '+۲۰۰',
    'whyber.stat1.label': 'پروژه تکمیل‌شده',
    'whyber.stat2.num': '+۱۵',
    'whyber.stat2.label': 'سال تجربه',
    'whyber.stat3.num': '۹۸٪',
    'whyber.stat3.label': 'رضایت مشتری',
    'whyber.stat4.num': '+۳۰',
    'whyber.stat4.label': 'برند شریک',
    'whyber.cta': 'درخواست بازدید رایگان',
    'whyber.reviews.badge': 'نظرات مشتریان',
    'whyber.reviews.title': 'تجربه مشتریان با بر تادیلات',
    'whyber.reviews.verified': 'مشتری تأییدشده',
    'whyber.review1.name': 'Elif A.',
    'whyber.review1.comment': 'کارهای نقاشی، کناف، رنگ‌آمیزی کمد، درب و پنجره و سقف کاذب خود را انجام دادیم. واقعاً بسیار حرفه‌ای بودند. کیفیت کار بسیار تمیز و قیمت‌ها بسیار مناسب بود. با تشکر فراوان.',
    'whyber.review2.name': 'Musa A.',
    'whyber.review2.comment': 'به تازگی به استانبول آمدم و بازار را بررسی کردم، واقعاً شرکتی با کیفیت بالا و ظرافت و دقت بسیار در اجرا هستند.',
    'whyber.review3.name': 'Büşra A.',
    'whyber.review3.comment': 'سالن پذیرایی و آشپزخانه را بازسازی کردیم. بسیار راضی بودیم. کیفیت بسیار بالا و قیمتی کاملاً مناسب نسبت به بازار.',
    'evaluation.badge': 'ارزیابی اولیه و برآورد پروژه',
    'evaluation.title': 'ارزیابی اولیه سریع برای پروژه خود دریافت کنید',
    'evaluation.subtitle': 'اطلاعات پروژه خود را برای بازسازی‌های کلید تحویل ۳۰۰,۰۰۰ لیر و بالاتر ارسال کنید؛ ظرف ۲۴ ساعت برآورد اولیه هزینه و زمان‌بندی را آماده خواهیم کرد.',

    // HowWeWork
    'howwework.badge': 'فرآیند ما',
    'howwework.title': 'چطور کار می‌کنیم؟',
    'howwework.subtitle': 'مدیریت پروژه شفاف، قابل پیش‌بینی و حرفه‌ای در ۶ مرحله.',
    'howwework.step.discovery.title': 'بازدید رایگان و تحلیل نیازها',
    'howwework.step.discovery.desc': 'از محل بازدید می‌کنیم، خواسته‌ها و بودجه شما را درک کرده و دامنه پروژه را مشخص می‌کنیم.',
    'howwework.step.design.title': 'طراحی مفهومی و انتخاب مصالح',
    'howwework.step.design.desc': 'با تصاویر سه‌بعدی نشان می‌دهیم پروژه شما چگونه به نظر خواهد رسید. انتخاب مصالح و برندها با تأیید شما انجام می‌شود.',
    'howwework.step.budget.title': 'بودجه شفاف و قرارداد',
    'howwework.step.budget.desc': 'یک قرارداد رسمی با جدول هزینه آیتم‌بندی‌شده، برنامه زمانی واضح و تمام تعهدات امضا می‌شود.',
    'howwework.step.execution.title': 'اجرا و کنترل کیفیت',
    'howwework.step.execution.desc': 'کلیه مراحل اجرا تحت نظارت مدیران پروژه مجرب پیش می‌رود و گزارش‌های منظم پیشرفت به شما ارائه می‌شود.',
    'howwework.step.quality.title': 'کنترل کیفیت و فهرست نقص',
    'howwework.step.quality.desc': 'یک بررسی جامع کیفیت قبل از تحویل انجام می‌شود؛ هر نقص شناسایی‌شده تکمیل می‌گردد.',
    'howwework.step.delivery.title': 'تحویل کلید و پشتیبانی',
    'howwework.step.delivery.desc': 'پروژه و تمام اسناد ضمانت را دریافت می‌کنید. در پوشش پشتیبانی پس از تحویل باقی می‌مانید.',
    'howwework.callout': 'هر پروژه یک سفر است. ما آن سفر را شفاف، قابل پیش‌بینی و بدون استرس می‌کنیم, شما فقط روی چشم‌انداز خود تمرکز کنید.',

    // Old overview (kept for Gallery component references)
    'overview.title': 'از طراحی تا تحویل کلید؛ همراه در تمامی جزئیات خانه شما',
    'overview.description': 'از طراحی ایده تا اجرای نهایی، خدمات جامع بازسازی و دکوراسیون را به‌صورت صفر تا صد و کلید تحویل ارائه می‌دهیم. از بازسازی داخلی و مرمت سازه گرفته تا تاسیسات برق، آب، گاز، عایق‌بندی و هوشمندسازی، کلیه مراحل توسط تیم حرفه‌ای ما هدایت می‌شود. بدون دغدغه هماهنگی با استادکاران گوناگون، تمامی امور را با یک مدیریت منسجم و پاسخگو پیش ببرید.',
    'overview.description.slide0': 'از طراحی ایده تا اجرای نهایی، خدمات جامع بازسازی و دکوراسیون را به‌صورت صفر تا صد و کلید تحویل ارائه می‌دهیم.',
    'overview.description.slide1': 'از دکوراسیون و مرمت بنا تا سیستم‌های تاسیساتی، کلیه مراحل توسط تیم مهندسی باسابقه ما مدیریت می‌شود.',
    'overview.description.slide2': 'از عایق‌کاری حرارتی و صوتی تا سیستم‌های هوشمند، خانه‌تان را برای آینده‌ای باکیفیت آماده می‌سازیم.',
    'overview.description.slide3': 'بدون دغدغه هماهنگی میان چندین اکیپ و استادکار، با یک طرف قرارداد مسئول به بهترین نتیجه برسید.',
    'overview.decorTitle': 'دکوراسیون و نوسازی',
    'overview.decor.item1': 'طراحی معماری و اجرای دکوراسیون داخلی',
    'overview.decor.item2': 'مرمت و بازسازی اساسی ابنیه',
    'overview.decor.item3': 'نقاشی و رنگ‌آمیزی ساختمانی',
    'overview.decor.item4': 'کناف، سقف کاذب و دیوارهای پارتیشن',
    'overview.decor.item5': 'نصب کاشی، سرامیک و اسلب',
    'overview.decor.item6': 'طراحی و اجرای کابینت آشپزخانه',
    'overview.decor.item7': 'نصب انواع پارکت و کف‌پوش',
    'overview.insulationTitle': 'عایق‌کاری',
    'overview.insulation.item1': 'عایق‌کاری حرارتی ساختمان (مانتولاما)',
    'overview.insulation.item2': 'عایق‌کاری صوتی پیشرفته',
    'overview.insulation.item3': 'نماکاری و پوشش‌های مقاوم خارجی',
    'overview.installTitle': 'تاسیسات و هوشمندسازی',
    'overview.install.item1': 'تاسیسات و سیم‌کشی الکتریکی',
    'overview.install.item2': 'لوله‌کشی آب، فاضلاب و گاز',
    'overview.install.item3': 'هوشمندسازی ساختمان و اتوماسیون خانگی',
    'overview.footer': 'از بازسازی یک اتاق تا نوسازی کامل ساختمان و نما، پروژه‌های شما را با بالاترین کیفیت و به‌صورت کلید تحویل اجرا می‌کنیم. جهت بازدید و برآورد رایگان با ما تماس بگیرید.',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('language') as Language | null
    if (saved && (saved === 'tr' || saved === 'en' || saved === 'ar' || saved === 'fa')) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language)
    }
    if (typeof document !== 'undefined') {
      const isRTL = language === 'ar' || language === 'fa'
      document.documentElement.lang = language
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
      if (language === 'fa') {
        document.documentElement.classList.add('lang-fa')
      } else {
        document.documentElement.classList.remove('lang-fa')
      }
      if (language === 'ar') {
        document.documentElement.classList.add('lang-ar')
      } else {
        document.documentElement.classList.remove('lang-ar')
      }
    }
  }, [language, mounted])

  const toggleLanguage = () => {
    setLanguage((prev) => {
      if (prev === 'tr') return 'en'
      if (prev === 'en') return 'ar'
      if (prev === 'ar') return 'fa'
      return 'tr'
    })
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['tr']?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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
