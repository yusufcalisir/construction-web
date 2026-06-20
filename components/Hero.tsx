'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const backgroundImages = [
  {
    src: '/calisma-galeri/hero_luxury_renovation.png',
    position: 'object-left sm:object-center',
  },
  {
    src: '/calisma-galeri/hero_luxury_kitchen.png',
    position: 'object-center',
  },
  {
    src: '/calisma-galeri/hero_luxury_bathroom.png',
    position: 'object-center',
  },
  {
    src: '/calisma-galeri/hero_luxury_exterior.png',
    position: 'object-center',
  },
]

const slideDescriptions = [
  'overview.description.slide0',
  'overview.description.slide1',
  'overview.description.slide2',
  'overview.description.slide3',
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
                alt="Ber Tadilat Portfolio Slide"
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
            {t('hero.title')}
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight leading-[1.15]" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            {t('overview.title')}
          </h1>

          {/* Dynamic Slide Description Container */}
          <div className="relative flex flex-col items-center max-w-2xl min-h-[70px] mt-4 px-4">
            <p
              className={`text-base sm:text-lg lg:text-xl text-stone-200 font-normal leading-relaxed tracking-wide transition-all duration-500 ${
                highlightActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.6)'
              }}
            >
              {t(slideDescriptions[currentImageIndex])}
            </p>
            {/* Elegant minimal gold divider line */}
            <div className={`h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent transition-all duration-[1000ms] ease-out mt-5 rounded-full ${
              highlightActive ? 'w-24 opacity-100' : 'w-0 opacity-0'
            }`} />
          </div>

          {/* WhatsApp CTA Button (Compact & Centered) */}
          <div className="mt-8">
            <a
              href="https://wa.me/905458259495"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm bg-[#25D366] text-white hover:bg-[#20BA5A] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>{t('hero.getQuote')}</span>
            </a>
          </div>
        </div>

        {/* Bouncing Scroll Down Indicator */}
        <a
          href="#works"
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById('works')
            if (element) {
              const offsetTop = element.offsetTop - 80
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
              })
            }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] animate-bounce text-white/50 hover:text-amber-400 transition-colors duration-300 hidden sm:block focus:outline-none cursor-pointer"
          aria-label="Scroll to portfolio"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>


    </section>
  )
}
