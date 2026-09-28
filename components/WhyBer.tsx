'use client'

import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

const WHY_BER_ITEMS = [
  { key: 'singlepoint', icon: '🎯' },
  { key: 'engineer',    icon: '🏗️' },
  { key: 'budget',      icon: '📊' },
  { key: 'timeline',    icon: '📅' },
  { key: 'brands',      icon: '✅' },
  { key: 'aftercare',   icon: '🤝' },
]

export default function WhyBer() {
  const { t } = useLanguage()

  return (
    <section
      id="why-ber"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-50 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-4">
            {t('whyber.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif">
            {t('whyber.title')}
          </h2>
          <p className="mt-6 text-stone-500 text-base sm:text-lg leading-relaxed">
            {t('whyber.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_BER_ITEMS.map((item) => (
            <div
              key={item.key}
              className="group relative bg-white rounded-2xl p-8 border border-stone-200/60 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300">
                <span>{item.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 mb-3 font-serif group-hover:text-amber-700 transition-colors duration-300">
                {t(`whyber.item.${item.key}.title`)}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {t(`whyber.item.${item.key}.desc`)}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-amber-500 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-20 rounded-2xl bg-stone-900 px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: t('whyber.stat1.num'), label: t('whyber.stat1.label') },
            { num: t('whyber.stat2.num'), label: t('whyber.stat2.label') },
            { num: t('whyber.stat3.num'), label: t('whyber.stat3.label') },
            { num: t('whyber.stat4.num'), label: t('whyber.stat4.label') },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-amber-400 font-serif">{stat.num}</span>
              <span className="text-xs sm:text-sm text-stone-400 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 sm:mt-24">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-3">
              {t('whyber.reviews.badge')}
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight font-serif">
              {t('whyber.reviews.title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((id) => (
              <div
                key={id}
                className="group relative bg-white rounded-2xl p-7 sm:p-8 border border-stone-200/60 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4" aria-label="5 yıldız">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed italic">
                    “{t(`whyber.review${id}.comment`)}”
                  </p>
                </div>

                {/* Reviewer Name */}
                <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-base font-serif">
                    {t(`whyber.review${id}.name`)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    <svg className="w-3 h-3 fill-current text-emerald-600" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('whyber.reviews.verified')}
                  </span>
                </div>

                {/* Bottom accent hover line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-amber-500 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <SafeWhatsAppButton
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm bg-amber-500 text-stone-950 hover:bg-amber-400 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5"
            ariaLabel={t('whyber.cta')}
          >
            <span>{t('whyber.cta')}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </SafeWhatsAppButton>
        </div>
      </div>
    </section>
  )
}
