'use client'

import React from 'react'
import { useLanguage } from './LanguageProvider'
import { getDisplayPhone, triggerPhoneCall, redirectWhatsApp } from '@/lib/safeContact'

export default function ProjectEvaluation() {
  const { t } = useLanguage()

  const handleCall = () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        dataLayer?: Array<Record<string, unknown>>
        gtag?: (...args: unknown[]) => void
      }
      if (win.dataLayer) {
        win.dataLayer.push({
          event: 'qualified_project_lead',
          action: 'phone_call',
          is_qualified: true,
          budget_threshold: '300.000 TL ve üzeri',
        })
      }
      if (typeof win.gtag === 'function') {
        win.gtag('event', 'qualified_project_lead', {
          event_category: 'Lead',
          action: 'phone_call',
          is_qualified: true,
        })
      }
    }
    triggerPhoneCall()
  }

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const win = window as unknown as {
        dataLayer?: Array<Record<string, unknown>>
        gtag?: (...args: unknown[]) => void
      }
      if (win.dataLayer) {
        win.dataLayer.push({
          event: 'qualified_project_lead',
          action: 'whatsapp_chat',
          is_qualified: true,
          budget_threshold: '300.000 TL ve üzeri',
        })
      }
      if (typeof win.gtag === 'function') {
        win.gtag('event', 'qualified_project_lead', {
          event_category: 'Lead',
          action: 'whatsapp_chat',
          is_qualified: true,
        })
      }
    }
    redirectWhatsApp(
      'Merhaba Ber Tadilat, 300.000 TL ve üzeri komple ev tadilatı ve dekorasyon projem için ücretsiz keşif ve danışmanlık talep ediyorum.'
    )
  }

  return (
    <section
      id="on-degerlendirme"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-stone-950 text-white relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold uppercase block mb-3">
            {t('evaluation.badge')}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif mb-4 sm:mb-6">
            {t('evaluation.title')}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('evaluation.subtitle')}
          </p>

          {/* 300K+ Project Criteria & Installment Banner */}
          <div className="mt-6 sm:mt-8 mx-auto max-w-2xl bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 text-start space-y-3">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
                <strong className="text-amber-300 font-bold">{t('evaluation.criterionTitle')}</strong>{' '}
                {t('evaluation.criterionText')}
              </p>
            </div>
            <div className="pt-2.5 border-t border-amber-500/20 flex items-center gap-2.5 text-xs sm:text-sm text-amber-200/90">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <p className="leading-snug">
                {t('evaluation.installmentNotice')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Card: No forms, direct one-click communication */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif mb-3">
              Projenizi Hemen Görüşelim
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Form doldurma zahmetine girmeden doğrudan ekibimize ulaşın. Evinizin ihtiyaçlarını birlikte belirleyelim, yerinde ücretsiz keşif takviminizi netleştirelim.
            </p>
          </div>

          {/* Large Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-xl mx-auto">
            {/* Direct Call Button */}
            <button
              type="button"
              onClick={handleCall}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20 group"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-950 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </span>
              <span>{t('hero.btnCall')}</span>
              <span className="font-mono font-bold text-xs bg-stone-950/20 px-2 py-0.5 rounded-full" dir="ltr">
                {getDisplayPhone()}
              </span>
            </button>

            {/* Direct WhatsApp Button */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <svg className="w-5 h-5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('hero.btnWhatsApp')}</span>
            </button>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-stone-800 text-center sm:text-start">
            <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800/80">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <span className="font-bold">✓</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{t('hero.trust.engineering')}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Mühendislerimiz evinizi yerinde detaylı analiz ederek en doğru malzeme ve teknik çözümleri sunar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800/80">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <span className="font-bold">✓</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{t('hero.trust.pricing')}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Sürpriz ek maliyet olmadan, kalem kalem bütçe ve kesin teslim takvimiyle sözleşmeli güvence.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800/80">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                <span className="font-bold">✓</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{t('hero.trust.turnkey')}</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Kırım, tesisat, mutfak, banyo, zemin ve boya işlerinizin tamamı tek muhatapla anahtar teslim tamamlanır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
