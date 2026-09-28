'use client'

import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

export default function WhyBer() {
  const { t } = useLanguage()

  return (
    <section
      id="why-ber"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-100/60 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          {/* Trust rating badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 mb-5 shadow-sm">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 tracking-wider">
              5.0 / 5.0 MEMNUNİYET
            </span>
          </div>

          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-3">
            {t('whyber.reviews.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif mb-6">
            {t('whyber.reviews.title')}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            İstanbul&apos;un seçkin semtlerinde tamamladığımız anahtar teslim renovasyon projelerimizden gerçek müşteri referansları.
          </p>
        </div>

        {/* Customer Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="group relative bg-white rounded-3xl p-8 sm:p-9 border border-stone-200/80 shadow-sm hover:shadow-2xl hover:border-amber-400/70 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* 5 Stars and Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 yıldız">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-3xl font-serif text-amber-400/40 select-none leading-none">“</span>
                </div>

                {/* Comment */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
                  “{t(`whyber.review${id}.comment`)}”
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                    {t(`whyber.review${id}.name`).charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 text-base font-serif block">
                      {t(`whyber.review${id}.name`)}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400 block">
                      İstanbul
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  <svg className="w-3 h-3 fill-current text-emerald-600" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('whyber.reviews.verified')}
                </span>
              </div>

              {/* Bottom accent hover line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <SafeWhatsAppButton
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5"
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
