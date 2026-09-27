'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

export default function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Visual card */}
          <div className="relative order-2 lg:order-1">
            {/* Background decoration */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-50 to-stone-100 -z-10" />

            {/* Main card */}
            <div className="relative bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <Image
                  src="/about/livan-gur.jpg"
                  alt={t('about.engineer.name')}
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/10 text-stone-200 text-xs font-mono tracking-wider uppercase">
                  {t('about.since')}
                </div>
              </div>

              {/* Engineer name badge */}
              <div className="p-7 border-t border-stone-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <span className="text-stone-950 font-bold text-lg font-serif">LG</span>
                  </div>
                  <div>
                    <p className="text-white font-bold font-serif">{t('about.engineer.name')}</p>
                    <p className="text-amber-400 text-xs font-mono tracking-widest uppercase mt-0.5">
                      {t('about.engineer.title')}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-stone-400 text-sm leading-relaxed">
                  {t('about.engineer.desc')}
                </p>
              </div>
            </div>

            {/* Floating stat badge */}
            <div className="absolute -bottom-5 -right-5 bg-amber-500 rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-stone-950 font-bold text-2xl font-serif">{t('about.projects.num')}</p>
              <p className="text-stone-900 text-xs font-bold tracking-widest uppercase mt-0.5">{t('about.projects.label')}</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-4">
                {t('about.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif">
                {t('about.title')}
              </h2>
            </div>

            <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
              {t('about.description')}
            </p>

            {/* Pillars */}
            <div className="space-y-4">
              {['pillar1', 'pillar2', 'pillar3'].map((pillar) => (
                <div key={pillar} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-amber-500 shrink-0 mt-0.5 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm">{t(`about.${pillar}.title`)}</p>
                    <p className="text-stone-500 text-sm mt-0.5 leading-relaxed">{t(`about.${pillar}.desc`)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <SafeWhatsAppButton
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm bg-stone-900 text-white hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5"
                ariaLabel={t('about.cta')}
              >
                <span>{t('about.cta')}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </SafeWhatsAppButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
