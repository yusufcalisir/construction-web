'use client'

import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-stone-50"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-4">
            {t('about.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif mb-6">
            {t('about.title')}
          </h2>
          <p className="text-stone-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* 3 Pillars - horizontal layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="group bg-white rounded-2xl border border-stone-200/80 p-7 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-900 group-hover:bg-amber-500 text-white flex items-center justify-center shrink-0 font-black text-xs font-mono transition-colors duration-300 mb-5">
                0{n}
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2 leading-snug">
                {t(`about.pillar${n}.title`)}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {t(`about.pillar${n}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center items-center text-center">
          <SafeWhatsAppButton
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 cursor-pointer"
            ariaLabel={t('about.cta')}
          >
            <span>{t('about.cta')}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SafeWhatsAppButton>
        </div>

      </div>
    </section>
  )
}
