'use client'

import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export default function Hero() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative overflow-hidden ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950'
          : 'bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200'
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

        {/* WhatsApp Quote Button */}
        <div className="flex justify-center items-center">
          <a
            href="https://wa.me/905458259495"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative px-12 py-5 rounded-full transition-all duration-300 font-semibold text-base tracking-wide overflow-hidden flex items-center gap-3 ${
              theme === 'dark'
                ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/30'
                : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-2xl hover:shadow-green-500/30'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="relative z-10">{t('hero.getQuote')}</span>
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

