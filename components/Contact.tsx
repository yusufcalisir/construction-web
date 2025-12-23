'use client'

import { useLanguage } from './LanguageProvider'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section
      id="contact"
      className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 text-stone-900">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 text-stone-600">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="rounded-2xl p-8 border-2 transition-[shadow,border-color] duration-300 hover:shadow-xl bg-white border-stone-300 hover:border-stone-400 shadow-lg shadow-stone-200/50">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 bg-transparent text-accent-400">
              <svg className="w-8 h-8 flex-shrink-0" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 transition-colors text-stone-900">
              {t('contact.phone')}
            </h3>
            <a
              href="tel:+905458259495"
              className="text-2xl font-bold transition-colors duration-300 inline-block focus:outline-none text-stone-800 hover:text-stone-900"
            >
              0545 825 94 95
            </a>
          </div>

          {/* Address */}
          <div className="rounded-2xl p-8 border-2 transition-[shadow,border-color] duration-300 hover:shadow-xl bg-white border-stone-300 hover:border-stone-400 shadow-lg shadow-stone-200/50">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 bg-transparent text-accent-400">
              <svg className="w-8 h-8 flex-shrink-0" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 transition-colors text-stone-900">
              {t('contact.address')}
            </h3>
            <p className="text-lg leading-relaxed transition-colors text-stone-700">
              {t('contact.location')}
            </p>
          </div>

          {/* Working Hours */}
          <div className="rounded-2xl p-8 border-2 transition-[shadow,border-color] duration-300 hover:shadow-xl bg-white border-stone-300 hover:border-stone-400 shadow-lg shadow-stone-200/50">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 bg-transparent text-accent-400">
              <svg className="w-8 h-8 flex-shrink-0" width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 transition-colors text-stone-900">
              {t('contact.workingHours')}
            </h3>
            <div className="space-y-3 text-lg text-stone-700">
              <div className="flex justify-between items-center py-2 border-b border-opacity-20" style={{
                borderColor: 'rgba(0,0,0,0.1)'
              }}>
                <span className="font-medium">{t('contact.weekdays')}:</span>
                <span className="font-bold text-lg text-stone-900">{t('contact.allDay')}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">{t('contact.weekends')}:</span>
                <span className="font-bold text-lg text-stone-900">{t('contact.allDay')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

