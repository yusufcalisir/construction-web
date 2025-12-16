'use client'

import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export default function Contact() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <section
      id="contact"
      className={`py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-stone-900'
          }`}>
            {t('contact.title')}
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            theme === 'dark' ? 'text-dark-400' : 'text-stone-600'
          }`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className={`rounded-xl p-8 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-dark-800 border-dark-700 hover:border-dark-600'
                : 'bg-stone-50 border-stone-200 hover:border-stone-300'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}>
                {t('contact.phone')}
              </h3>
              <a
                href="tel:+905458259495"
                className={`text-2xl font-semibold transition-colors duration-300 ${
                  theme === 'dark'
                    ? 'text-white hover:text-accent-400'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                0545 825 94 95
              </a>
            </div>

            <div className={`rounded-xl p-8 border transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-dark-800 border-dark-700 hover:border-dark-600'
                : 'bg-stone-50 border-stone-200 hover:border-stone-300'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-stone-900'
              }`}>
                {t('contact.address')}
              </h3>
              <p className={`text-lg leading-relaxed transition-colors ${
                theme === 'dark' ? 'text-dark-300' : 'text-stone-600'
              }`}>
                {t('contact.location')}
                <br />
                <span className={theme === 'dark' ? 'text-dark-400' : 'text-stone-500'}>
                  {t('contact.hours')}
                </span>
              </p>
            </div>
          </div>

          {/* Map */}
          <div className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
            theme === 'dark'
              ? 'border-dark-800 shadow-2xl'
              : 'border-stone-200 shadow-lg'
          }`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.631878707191!2d29.026137999999996!3d40.989541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f29fafa289%3A0x2fa3fe6b2656f5e3!2sBER%20TAD%C4%B0LAT%2C%20DEKORASYON%2C%20RESTORASYON%2C%20BOYA%20BADANA%2C%20AL%C3%87IPAN%2C%20FAYANS%2C%20MUTFAK%2C%20PARKE%2C%20ISI%20-%20SES%20YALITIMI%2C%20DI%C5%9E%20CEPHE!5e0!3m2!1str!2str!4v1720032709476!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ minHeight: '450px', border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('contact.title')}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

