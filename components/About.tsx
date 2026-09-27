'use client'

import Image from 'next/image'
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Executive Engineer Card (5 cols on lg) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            {/* Background subtle ambient glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/10 via-stone-200/50 to-amber-500/5 blur-xl -z-10" />

            {/* Main Executive Card */}
            <div className="relative bg-stone-900 rounded-3xl p-8 sm:p-10 border border-stone-800 shadow-2xl overflow-hidden">
              {/* Radial warm lighting in card header */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

              {/* Top Bar: Location & Est pill */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800/90 border border-stone-700/60 text-stone-300 text-[11px] font-mono tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {t('about.since')}
                </span>
                <span className="text-amber-400 text-xs font-mono tracking-wider font-semibold">
                  Civil Engineering
                </span>
              </div>

              {/* Circular Portrait with Design-Matched Metallic Ring */}
              <div className="relative mx-auto my-4 w-44 h-44 sm:w-52 sm:h-52">
                {/* Ambient glow behind ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-500/40 via-amber-300/20 to-amber-600/40 blur-md" />

                {/* Luxury Metallic Gold/Amber Ring */}
                <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-600 shadow-2xl">
                  {/* Inner contrast ring */}
                  <div className="w-full h-full rounded-full p-1 bg-stone-950">
                    {/* Image Container — strictly rounded with transparent background */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-stone-900">
                      <Image
                        src="/about/livan-gur.png"
                        alt={t('about.engineer.name')}
                        fill
                        className="object-cover scale-105"
                        sizes="(max-width: 640px) 176px, 208px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Verified Civil Engineer Seal */}
                <div
                  className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-stone-900 shadow-xl flex items-center justify-center text-stone-950"
                  title="İnşaat Mühendisi"
                >
                  <svg className="w-5 h-5 text-stone-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                </div>
              </div>

              {/* Engineer Name & Title */}
              <div className="text-center mt-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                  {t('about.engineer.name')}
                </h3>
                <p className="text-amber-400 text-xs sm:text-sm font-mono tracking-widest uppercase mt-1">
                  {t('about.engineer.title')}
                </p>
              </div>

              {/* Professional Credential Pills */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-stone-800/60 border border-stone-700/60 text-xs text-stone-200">
                  <span className="text-base shrink-0">🎓</span>
                  <span className="font-medium">{t('about.engineer.edu')}</span>
                </div>
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-stone-800/60 border border-stone-700/60 text-xs text-stone-200">
                  <span className="text-base shrink-0">🌍</span>
                  <span className="font-medium">{t('about.engineer.exp')}</span>
                </div>
              </div>

              {/* Executive Bio Paragraph */}
              <p className="mt-5 pt-4 border-t border-stone-800 text-stone-300 text-xs sm:text-sm leading-relaxed text-justify">
                {t('about.engineer.desc')}
              </p>

              {/* Bottom Stat Ribbon */}
              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-amber-400 font-serif block">
                    {t('about.projects.num')}
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                    {t('about.projects.label')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white font-serif block">
                    %100
                  </span>
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                    Mühendis Denetimi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Company Pillars & Vision (7 cols on lg) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
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

            {/* 3 Core Pillars */}
            <div className="space-y-4">
              {['pillar1', 'pillar2', 'pillar3'].map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-stone-200/70 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500 shrink-0 mt-0.5 flex items-center justify-center shadow-sm">
                    <svg className="w-3.5 h-3.5 text-stone-950 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 text-sm sm:text-base font-serif">
                      {t(`about.${pillar}.title`)}
                    </p>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      {t(`about.${pillar}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
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

        </div>
      </div>
    </section>
  )
}
