'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'
import { getDisplayPhone, triggerPhoneCall } from '@/lib/safeContact'

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

  // Rotate images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative w-full" suppressHydrationWarning>
      {/* 1. Full-screen Hero Landing Banner */}
      <div className="relative min-h-[100svh] lg:h-screen w-full flex items-center justify-center bg-stone-950 overflow-hidden py-20 sm:py-24 lg:py-0">
        {/* Fading Background Slideshow */}
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

        {/* Sophisticated Overlay */}
        <div className="absolute inset-0 z-[1] bg-stone-950/60 backdrop-blur-[1px] bg-gradient-to-b from-stone-950/70 via-stone-950/45 to-stone-950/70" />

        {/* Typography Content Container */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-[2] flex flex-col items-center text-center pt-8 sm:pt-12 lg:pt-0">
          {/* Branding Title */}
          <span className="font-mono text-xs sm:text-sm md:text-base tracking-[0.25em] sm:tracking-[0.3em] text-amber-400 font-extrabold block mb-2 sm:mb-3 uppercase">
            {t('hero.badge')}
          </span>

          {/* Main Headline */}
          <h1
            className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white tracking-tight leading-[1.18] font-serif max-w-3xl"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
          >
            {t('hero.headline')}
          </h1>

          {/* Subtitle / Subhead Intro */}
          <h2
            className="text-base sm:text-xl lg:text-2xl font-semibold text-amber-300 font-serif mb-3 sm:mb-4 tracking-wide"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
          >
            {t('hero.subheadIntro')}
          </h2>

          {/* Subheadline Paragraphs */}
          <div
            className="space-y-1.5 sm:space-y-2 text-stone-200/90 text-[13px] sm:text-base lg:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-5 sm:mb-7"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}
          >
            <p>{t('hero.desc1')}</p>
            <p>{t('hero.desc2')}</p>
          </div>

          {/* Hero CTAs - Call + WhatsApp + Projects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-4 sm:mb-6 w-full max-w-md sm:max-w-none">
            {/* 1. Ücretsiz Keşif İçin Hemen Ara with Visible Phone */}
            <button
              type="button"
              onClick={() => triggerPhoneCall()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-lg shadow-amber-500/25 border border-amber-300/40 group"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-950 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </span>
              <span>{t('hero.btnCall')}</span>
              <span
                className="font-mono font-bold tracking-normal text-xs sm:text-sm px-2 py-0.5 rounded-full bg-stone-950/20 text-stone-950 border border-stone-950/20"
                dir="ltr"
              >
                {getDisplayPhone()}
              </span>
            </button>

            {/* 2. WhatsApp'tan Projenizi Anlatın */}
            <SafeWhatsAppButton
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
              ariaLabel={t('hero.btnWhatsApp')}
            >
              <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('hero.btnWhatsApp')}</span>
            </SafeWhatsAppButton>

            {/* 3. Tamamladığımız Projeleri İnceleyin */}
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('gallery')
                if (element) {
                  const offsetTop = element.offsetTop - 80
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' })
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-stone-900/80 hover:bg-stone-850 text-white border border-stone-700/80 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer"
            >
              <span>{t('hero.btnProjects')}</span>
              <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-stone-200 mb-4 sm:mb-5">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 font-bold">
                ✓
              </span>
              <span>{t('hero.trust.engineering')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 font-bold">
                ✓
              </span>
              <span>{t('hero.trust.pricing')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 font-bold">
                ✓
              </span>
              <span>{t('hero.trust.turnkey')}</span>
            </div>
          </div>

          {/* Prominent Vade Farksız Taksit Pill */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2 rounded-full bg-stone-900/90 border border-amber-500/40 backdrop-blur-md text-[11px] sm:text-xs text-stone-200 shadow-xl shadow-amber-500/10 hover:border-amber-400/70 transition-all duration-300 group cursor-default">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 shrink-0 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all duration-300">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-none stroke-current" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </span>
            <span className="font-semibold tracking-wide text-stone-200">
              {t('hero.installment')}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {t('hero.installmentBadge')}
            </span>
          </div>
        </div>

        {/* Bouncing Scroll Down Indicator */}
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById('about')
            if (element) {
              const offsetTop = element.offsetTop - 80
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
              })
            }
          }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-[2] animate-bounce text-white/50 hover:text-amber-400 transition-colors duration-300 hidden sm:block focus:outline-none cursor-pointer"
          aria-label="Scroll to about"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
