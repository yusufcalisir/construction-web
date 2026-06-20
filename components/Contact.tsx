'use client'

import { useLanguage } from './LanguageProvider'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading and Description */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block">
              {t('contact.title')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif">
              {t('contact.subtitle')}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal pt-2">
              {t('overview.footer')}
            </p>
            
            {/* Elegant Line */}
            <div className="h-[2px] w-16 bg-amber-500 rounded-full" />
            
            {/* Quick WhatsApp Action button */}
            <div className="pt-6">
              <a
                href="https://wa.me/905458259495"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp ile İletişim</span>
              </a>
            </div>
          </div>
          
          {/* Right Column: Symmetrical & Tidy Info List */}
          <div className="lg:col-span-6 space-y-6 mt-8 lg:mt-0">
            
            {/* Phone Info Block */}
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-stone-300/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/5 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block">{t('contact.phone')}</span>
                <a
                  href="tel:+905458259495"
                  className="text-xl sm:text-2xl font-bold text-stone-900 hover:text-amber-600 transition-colors tracking-wide block"
                >
                  0545 825 94 95
                </a>
              </div>
            </div>

            {/* Address Info Block */}
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-stone-300/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/5 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block">{t('contact.address')}</span>
                <span className="text-lg font-bold text-stone-900 block">{t('contact.location')}</span>
              </div>
            </div>

            {/* Working Hours Info Block */}
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md hover:border-stone-300/60 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/5 text-amber-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold block">{t('contact.workingHours')}</span>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-stone-700">
                  <div>
                    <span className="text-stone-500 font-medium">{t('contact.weekdays')}: </span>
                    <span className="font-bold text-stone-900">{t('contact.allDay')}</span>
                  </div>
                  <span className="hidden sm:inline text-stone-300">|</span>
                  <div>
                    <span className="text-stone-500 font-medium">{t('contact.weekends')}: </span>
                    <span className="font-bold text-stone-900">{t('contact.allDay')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  )
}

