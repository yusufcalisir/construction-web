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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-4">
            {t('about.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif mb-6">
            {t('about.title')}
          </h2>
          <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
            {t('about.description')}
          </p>
        </div>

        {/* 3 Core Pillars in 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {['pillar1', 'pillar2', 'pillar3'].map((pillar, idx) => (
            <div
              key={pillar}
              className="relative p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 mb-6 group-hover:bg-amber-500 group-hover:text-stone-950 transition-colors duration-300">
                  <span className="font-mono font-bold text-base">0{idx + 1}</span>
                </div>
                <h3 className="font-bold text-stone-900 text-lg sm:text-xl font-serif mb-3 group-hover:text-amber-700 transition-colors">
                  {t(`about.${pillar}.title`)}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {t(`about.${pillar}.desc`)}
                </p>
              </div>

              {/* Bottom accent indicator */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono text-amber-600 font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Ber Tadilat Güvencesi</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
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
