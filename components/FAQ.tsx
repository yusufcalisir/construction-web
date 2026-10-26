'use client'

import React, { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'
import { triggerPhoneCall } from '@/lib/safeContact'

const FAQ_ITEMS = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
]

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-950 border-t border-stone-800 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">
            {t('faq.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif mb-5">
            {t('faq.title')}
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-14">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-stone-900/90 border-amber-500/40 shadow-xl shadow-amber-500/5'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/60'
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${idx}`}
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-2xl"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-semibold text-white tracking-tight">
                      {t(item.q)}
                    </span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 rotate-180'
                        : 'bg-stone-800/60 border-stone-700/60 text-stone-400'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 fill-none stroke-current"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                    isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <div className="pt-2 pl-10 border-t border-stone-800/80">
                    <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                      {t(item.a)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ask Expert Consultation Callout */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900/90 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-sm">
          <div className="text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mb-1">
              {t('hero.phoneSubtext')}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-serif">
              {t('faq.askExpert')}
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <SafeWhatsAppButton
              id="faq-whatsapp-btn"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all hover:scale-105 cursor-pointer"
              ariaLabel={t('faq.btnWhatsApp')}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('faq.btnWhatsApp')}</span>
            </SafeWhatsAppButton>
            <button
              type="button"
              id="faq-call-btn"
              onClick={() => triggerPhoneCall()}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              <span>{t('faq.btnCall')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
