'use client'

import React, { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'
import { triggerPhoneCall, getDisplayPhone, copyPhoneNumber } from '@/lib/safeContact'

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyPhoneNumber()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-900 border-t border-stone-800 relative overflow-hidden transition-colors duration-300"
    >
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">
            {t('contact.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif mb-5">
            {t('contact.subtitle')}
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t('overview.footer')}
          </p>
        </div>

        {/* Two Main Action Cards: WhatsApp & Direct Call */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">

          {/* Card 1: WhatsApp */}
          <div className="relative bg-stone-950/80 border border-stone-800 hover:border-emerald-500/50 rounded-3xl p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-sm group">
            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {t('whatsapp.status')}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2.5 font-serif">
                {t('contact.whatsapp')}
              </h3>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed mb-8">
                {t('contact.whatsappDesc')}
              </p>
            </div>

            <SafeWhatsAppButton
              id="contact-whatsapp-btn"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-green-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              ariaLabel={t('contact.whatsapp')}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('contact.whatsappBtn')}</span>
            </SafeWhatsAppButton>
          </div>

          {/* Card 2: Telefon */}
          <div className="relative bg-stone-950/80 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-sm group">
            <div>
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                  </svg>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  {t('contact.discoveryBadge')}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2.5 font-serif">
                {t('contact.callNow')}
              </h3>

              {/* Large Clickable Phone Number + Copy */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => triggerPhoneCall()}
                  className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 hover:text-amber-300 tracking-wider transition-colors focus:outline-none cursor-pointer"
                  dir="ltr"
                  title={t('contact.clickToCall')}
                >
                  {getDisplayPhone()}
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 transition-colors focus:outline-none cursor-pointer"
                  title={copied ? t('contact.copied') : t('contact.copyPhone')}
                  aria-label={copied ? t('contact.copied') : t('contact.copyPhone')}
                >
                  {copied ? (
                    <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t('contact.copied')}
                    </span>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="text-stone-400 text-sm sm:text-base leading-relaxed mb-8">
                {t('contact.phoneDesc')}
              </p>
            </div>

            <button
              type="button"
              id="contact-call-btn"
              onClick={() => triggerPhoneCall()}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              <span>{t('contact.callNow')}</span>
            </button>
          </div>

        </div>

        {/* 3 Trust & Detail Features (Horizontal Luxury Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Feature 1 */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
                {t('contact.address')}
              </div>
              <div className="text-white font-bold text-sm mb-1">
                {t('contact.location')}
              </div>
              <div className="text-stone-400 text-xs leading-relaxed">
                {t('contact.locationDetail')}
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
                {t('contact.workingHours')}
              </div>
              <div className="text-white font-bold text-sm mb-1">
                {t('contact.allDay')} · {t('contact.weekdays')} & {t('contact.weekends')}
              </div>
              <div className="text-stone-400 text-xs leading-relaxed">
                {t('contact.workingHoursDetail')}
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-stone-950/60 border border-stone-800/80 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-1">
                {t('contact.guaranteeTitle')}
              </div>
              <div className="text-white font-bold text-sm mb-1">
                {t('contact.guaranteeSubtitle')}
              </div>
              <div className="text-stone-400 text-xs leading-relaxed">
                {t('contact.guaranteeDetail')}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
