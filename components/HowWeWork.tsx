'use client'

import { useLanguage } from './LanguageProvider'

const STEPS = [
  { key: 'discovery',   icon: '🔍' },
  { key: 'design',      icon: '📐' },
  { key: 'budget',      icon: '📊' },
  { key: 'execution',   icon: '🏗️' },
  { key: 'quality',     icon: '✅' },
  { key: 'delivery',    icon: '🔑' },
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
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold uppercase block mb-4">
            {t('howwework.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            {t('howwework.title')}
          </h2>
          <p className="mt-6 text-stone-400 text-base sm:text-lg leading-relaxed">
            {t('howwework.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.key}
              className="group relative bg-stone-900/90 rounded-2xl p-8 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1"
            >
              {/* Step Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-2xl mb-6 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                <span>{step.icon}</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-3 font-serif group-hover:text-amber-400 transition-colors duration-300">
                {t(`howwework.step.${step.key}.title`)}
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed">
                {t(`howwework.step.${step.key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="mt-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center max-w-4xl mx-auto">
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            {t('howwework.callout')}
          </p>
        </div>
      </div>
    </section>
  )
}
