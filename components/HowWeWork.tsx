'use client'

import { useLanguage } from './LanguageProvider'

const STEPS = [
  { key: 'discovery',   icon: '🔍', color: 'from-amber-500/20 to-amber-400/10' },
  { key: 'design',      icon: '📐', color: 'from-stone-500/20 to-stone-400/10' },
  { key: 'budget',      icon: '📊', color: 'from-amber-500/20 to-amber-400/10' },
  { key: 'execution',   icon: '🏗️', color: 'from-stone-500/20 to-stone-400/10' },
  { key: 'quality',     icon: '✅', color: 'from-amber-500/20 to-amber-400/10' },
  { key: 'delivery',    icon: '🔑', color: 'from-stone-500/20 to-stone-400/10' },
]

export default function HowWeWork() {
  const { t } = useLanguage()

  return (
    <section
      id="how-we-work"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold uppercase block mb-4">
            {t('howwework.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            {t('howwework.title')}
          </h2>
          <p className="mt-6 text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('howwework.subtitle')}
          </p>
          <div className="h-[2px] w-16 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mt-8 rounded-full" />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[8.5%] right-[8.5%] h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <div
                key={step.key}
                className="group relative bg-stone-900/60 rounded-2xl p-7 border border-stone-800/60 hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
              >
                {/* Step number badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-300">
                    <span className="text-amber-400 text-sm font-bold font-mono group-hover:text-stone-950 transition-colors duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-2xl">{step.icon}</div>
                </div>

                <h3 className="text-base font-bold text-white mb-3 font-serif group-hover:text-amber-400 transition-colors duration-300">
                  {t(`howwework.step.${step.key}.title`)}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {t(`howwework.step.${step.key}.desc`)}
                </p>

                {/* Arrow for non-last items */}
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-8 h-8">
                    <svg className="w-4 h-4 text-amber-500/30 group-hover:text-amber-500/60 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('howwework.callout')}
          </p>
        </div>
      </div>
    </section>
  )
}
