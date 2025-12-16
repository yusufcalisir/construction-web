'use client'

import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export default function Hero() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  const handleScrollClick = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950'
          : 'bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100'
      }`}
    >
      {/* Continuous gradient drift background */}
      <div 
        className="absolute inset-0 pointer-events-none animate-gradient-drift"
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.012) 0%, rgba(255,255,255,0.003) 50%, rgba(255,255,255,0.012) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.006) 0%, rgba(0,0,0,0.002) 50%, rgba(0,0,0,0.006) 100%)',
        }}
      />

      {/* Continuous oscillating shape */}
      <div 
        className="absolute inset-0 pointer-events-none animate-oscillate-shape"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse 500px 350px at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 500px 350px at 50% 50%, rgba(0,0,0,0.015) 0%, transparent 70%)',
        }}
      />

      {/* Continuous light sweep effect */}
      <div 
        className={`absolute inset-0 pointer-events-none animate-light-sweep ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-transparent via-white/8 to-transparent'
            : 'bg-gradient-to-r from-transparent via-stone-900/6 to-transparent'
        }`}
        style={{
          width: '50%',
          height: '100%',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Decorative top line */}
        <div className={`h-px w-24 mx-auto mb-8 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-transparent via-dark-700 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
        }`} />

        {/* Main Title */}
        <h1 className={`text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 leading-[1.1] transition-colors duration-300 tracking-tight ${
          theme === 'dark' ? 'text-white' : 'text-stone-900'
        }`}>
          {t('hero.title')}
        </h1>

        {/* Decorative accent line under title */}
        <div className={`h-1 w-32 mx-auto mb-6 ${
          theme === 'dark' ? 'bg-dark-700' : 'bg-stone-300'
        }`} />

        {/* Subtitle */}
        <p className={`text-xl sm:text-2xl lg:text-3xl mb-10 max-w-4xl mx-auto leading-relaxed font-light transition-colors duration-300 ${
          theme === 'dark' ? 'text-dark-300' : 'text-stone-600'
        }`}>
          {t('hero.subtitle')}
        </p>

        {/* Modern CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              handleScrollClick('services')
            }}
            className={`group relative px-12 py-5 rounded-full transition-all duration-300 font-semibold text-base tracking-wide overflow-hidden ${
              theme === 'dark'
                ? 'bg-white text-dark-950 hover:shadow-2xl hover:shadow-white/20'
                : 'bg-stone-900 text-white hover:shadow-2xl hover:shadow-stone-900/20'
            }`}
          >
            <span className="relative z-10">{t('nav.services')}</span>
            <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              theme === 'dark' ? 'bg-dark-200' : 'bg-stone-800'
            }`} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleScrollClick('contact')
            }}
            className={`group relative px-12 py-5 rounded-full border-2 transition-all duration-300 font-semibold text-base tracking-wide ${
              theme === 'dark'
                ? 'text-white border-dark-600 hover:border-dark-500 hover:bg-dark-900/50'
                : 'text-stone-900 border-stone-400 hover:border-stone-500 hover:bg-stone-100'
            }`}
          >
            {t('nav.contact')}
          </a>
        </div>

        {/* Decorative bottom line */}
        <div className={`h-px w-24 mx-auto mt-10 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-transparent via-dark-700 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent'
        }`} />
      </div>
    </section>
  )
}

