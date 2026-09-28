'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import SafeWhatsAppButton from './SafeWhatsAppButton'

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
    alt: 'Sarıyer Üst Segment Banyo Yenileme ve Doğal Mermer Tasarımı - Ber Tadilat',
  },
  {
    src: '/calisma-galeri/hero_luxury_exterior.png',
    position: 'object-center',
    alt: 'İstanbul Villa Dış Cephe Kaplama ve Isı Yalıtımı - Ber Tadilat',
  },
]

const slideDescriptions = [
  'hero.slide0',
  'hero.slide1',
  'hero.slide2',
  'hero.slide3',
]

export default function Hero() {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [highlightActive, setHighlightActive] = useState(false)

  // Rotate images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Trigger draw-in highlighter animation when slide changes
  useEffect(() => {
    setHighlightActive(false)
    const timeout = setTimeout(() => {
      setHighlightActive(true)
    }, 200)
    return () => clearTimeout(timeout)
  }, [currentImageIndex])



  return (
    <section id="home" className="relative w-full" suppressHydrationWarning>
      {/* 1. Full-screen Hero Landing Banner */}
      <div className="relative h-screen w-full flex items-center justify-center bg-stone-950 overflow-hidden">
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
        <div className="absolute inset-0 z-[1] bg-stone-950/50 backdrop-blur-[1px] bg-gradient-to-b from-stone-950/60 via-stone-950/40 to-stone-950/60" />

        {/* Typography Content Container */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-[2] flex flex-col items-center text-center pt-16">
          {/* Branding Title */}
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold block mb-4 uppercase">
            {t('hero.badge')}
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.18] whitespace-pre-line font-serif" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            {t('hero.headline')}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-stone-200 font-normal leading-relaxed tracking-wide max-w-2xl mx-auto mb-8" style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
          }}>
            {t('hero.subheadline')}
          </p>

          {/* Two Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full sm:w-auto">
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
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-amber-500 text-stone-950 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer"
            >
              {t('hero.btnProjects')}
            </a>

            <SafeWhatsAppButton
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-stone-900/80 hover:bg-stone-850 text-white border border-stone-700/80 backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
              ariaLabel={t('hero.btnDiscuss')}
            >
              <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('hero.btnDiscuss')}</span>
            </SafeWhatsAppButton>
          </div>

          {/* Dynamic rotating slide feature pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/60 border border-white/10 backdrop-blur-sm text-xs sm:text-sm text-stone-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className={`transition-opacity duration-500 ${highlightActive ? 'opacity-100' : 'opacity-40'}`}>
              {t(slideDescriptions[currentImageIndex])}
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] animate-bounce text-white/50 hover:text-amber-400 transition-colors duration-300 hidden sm:block focus:outline-none cursor-pointer"
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
