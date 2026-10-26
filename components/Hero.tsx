'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'
import { triggerPhoneCall, getDisplayPhone } from '@/lib/safeContact'

const backgroundImages = [
  {
    src: '/calisma-galeri/hero_luxury_renovation.png',
    position: 'object-left sm:object-center',
    alt: 'Kadıköy Modern Salon ve Daire Renovasyonu - Ber Tadilat',
  },
  {
    src: '/calisma-galeri/hero_luxury_kitchen.png',
    position: 'object-center',
    alt: 'Beşiktaş Lüks Ada Mutfak Dekorasyon ve Tadilatı - Ber Tadilat',
  },
  {
    src: '/calisma-galeri/hero_luxury_bathroom.png',
    position: 'object-center',
    alt: 'Sarıyer Lüks Banyo Yenileme ve Doğal Mermer Tasarımı - Ber Tadilat',
  },
  {
    src: '/calisma-galeri/hero_luxury_exterior.png',
    position: 'object-center',
    alt: 'İstanbul Villa Dış Cephe Kaplama ve Isı Yalıtımı - Ber Tadilat',
  },
]

export default function Hero() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative w-full" suppressHydrationWarning>
      <div className="relative min-h-[100svh] lg:h-screen w-full flex items-center justify-center bg-stone-950 overflow-hidden">

        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full z-0">
          {backgroundImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                unoptimized
                className={`object-cover ${image.position} transform scale-105 transition-transform duration-[10000ms] ease-out`}
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-stone-950/75 via-stone-950/50 to-stone-950/80" />

        {/* Content */}
        <div className="w-full max-w-2xl mx-auto px-5 sm:px-6 relative z-[2] flex flex-col items-center text-center pt-28 pb-16 lg:pt-0 lg:pb-0">

          {/* Phone number - top of hero */}
          <button
            type="button"
            onClick={() => triggerPhoneCall()}
            className="group inline-flex items-center gap-3 mb-6 cursor-pointer focus:outline-none"
            title="Aramak için tıklayın"
            aria-label={`${t('hero.discoveryLine247')}: ${getDisplayPhone()}`}
          >
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500/20 border border-amber-500/30 shrink-0 group-hover:bg-amber-500/40 transition-colors">
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-amber-400" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400 group-hover:text-amber-300 transition-colors tracking-wider" dir="ltr">
              {getDisplayPhone()}
            </span>
            <span className="hidden sm:inline-block text-white/60 text-xs sm:text-sm font-medium">· {t('hero.discoveryLine247')}</span>
          </button>

          {/* Headline */}
          <h1
            className="text-[2rem] sm:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight leading-[1.12] font-serif"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            {t('hero.headline')}
          </h1>

          {/* Subtext */}
          <p
            className="text-white/75 text-sm sm:text-lg leading-relaxed max-w-lg mx-auto mb-8"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
          >
            {t('hero.desc1')}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl mx-auto mb-5" dir="ltr">
            {/* WhatsApp - primary */}
            <SafeWhatsAppButton
              id="hero-whatsapp-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-[15px] bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
              ariaLabel={t('hero.btnWhatsAppFree')}
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('hero.btnWhatsAppFree')}</span>
            </SafeWhatsAppButton>

            {/* Call - secondary */}
            <button
              type="button"
              id="hero-call-btn"
              onClick={() => triggerPhoneCall()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-[15px] bg-white/10 hover:bg-white/18 text-white border border-white/25 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              <span>{t('nav.callNow')}</span>
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {[
              t('hero.trust.engineering'),
              t('hero.trust.pricing'),
              t('hero.trust.turnkey'),
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="text-emerald-400 text-xs font-bold">✓</span>
                <span className="text-white/70 text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            const el = document.getElementById('about')
            if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
            if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
              window.history.replaceState(null, '', window.location.pathname)
            }
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] animate-bounce text-white/30 hover:text-amber-400 transition-colors duration-300 hidden sm:block focus:outline-none cursor-pointer"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
