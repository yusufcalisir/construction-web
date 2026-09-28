'use client'

import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title: Hakkımızda */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif mb-8">
          {t('nav.about')}
        </h2>

        {/* Narrative text without arbitrary sub-boxes or secondary headers */}
        <div className="space-y-6 text-stone-600 leading-relaxed text-base sm:text-lg max-w-3xl mx-auto mb-12">
          <p>
            {t('about.description')}
          </p>
          <p>
            Ber Tadilat, İstanbul&apos;un seçkin semtlerinde konut, villa ve ticari mekânlar için anahtar teslim mimari renovasyon hizmeti sunar. Tasarımdan malzeme seçimine, kırım ve altyapıdan ince işçilik ve montaja kadar her aşama şeffaf bütçe, net takvim ve eksiksiz taahhüt güvencesiyle tek elden yönetilir.
          </p>
        </div>

        {/* CTA */}
        <div>
          <SafeWhatsAppButton
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
            ariaLabel={t('about.cta')}
          >
            <span>{t('about.cta')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SafeWhatsAppButton>
        </div>
      </div>
    </section>
  )
}
