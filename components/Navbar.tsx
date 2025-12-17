'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Determine active section based on scroll position
      const sections = ['home', 'works', 'services', 'contact']
      const scrollPosition = window.scrollY + 150
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
    setIsMobileMenuOpen(false)
  }

  // Get background color based on active section
  const getNavbarBg = () => {
    if (!isScrolled) {
      // On homepage, match hero background
      return theme === 'dark'
        ? 'bg-dark-950/95 backdrop-blur-sm'
        : 'bg-stone-50/95 backdrop-blur-sm'
    }
    
    // Match active section background
    switch (activeSection) {
      case 'home':
        return theme === 'dark'
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/50'
      case 'works':
        return theme === 'dark'
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-white/95 backdrop-blur-md border-b border-stone-200/50'
      case 'services':
        return theme === 'dark'
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/50'
      case 'contact':
        return theme === 'dark'
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-white/95 backdrop-blur-md border-b border-stone-200/50'
      default:
        return theme === 'dark'
          ? 'bg-dark-950/95 backdrop-blur-md border-b border-dark-800/50'
          : 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/50'
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBg()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className={`text-2xl font-bold transition-colors duration-300 tracking-tight ${
                  theme === 'dark'
                    ? 'text-white hover:text-accent-400'
                    : 'text-stone-900 hover:text-stone-700'
                }`}
              >
                Ber Tadilat
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className={`relative transition-colors duration-300 font-medium text-base tracking-wide group ${
                  theme === 'dark'
                    ? 'text-dark-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.home')}
                <span className={`absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-accent-400' : 'bg-stone-700'
                }`} />
              </a>
              <a
                href="#works"
                onClick={(e) => handleNavClick(e, 'works')}
                className={`relative transition-colors duration-300 font-medium text-base tracking-wide group ${
                  theme === 'dark'
                    ? 'text-dark-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.works')}
                <span className={`absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-accent-400' : 'bg-stone-700'
                }`} />
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className={`relative transition-colors duration-300 font-medium text-base tracking-wide group ${
                  theme === 'dark'
                    ? 'text-dark-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.services')}
                <span className={`absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-accent-400' : 'bg-stone-700'
                }`} />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`relative transition-colors duration-300 font-medium text-base tracking-wide group ${
                  theme === 'dark'
                    ? 'text-dark-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.contact')}
                <span className={`absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                  theme === 'dark' ? 'bg-accent-400' : 'bg-stone-700'
                }`} />
              </a>
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700 border border-stone-300'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleLanguage}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm border ${
                  theme === 'dark'
                    ? 'bg-dark-800 hover:bg-dark-700 text-white border-dark-700 hover:border-dark-600'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700 border-stone-300 hover:border-stone-400'
                }`}
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700 border border-stone-300'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleLanguage}
                className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm border ${
                  theme === 'dark'
                    ? 'bg-dark-800 hover:bg-dark-700 text-white border-dark-700'
                    : 'bg-stone-200 hover:bg-stone-300 text-stone-700 border-stone-300'
                }`}
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`focus:outline-none transition-colors ${
                  theme === 'dark'
                    ? 'text-dark-300 hover:text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay - Outside navbar for proper z-index */}
      {isMobileMenuOpen && (
        <div 
          className={`lg:hidden fixed inset-0 top-24 z-[60] overflow-y-auto ${
            theme === 'dark' 
              ? 'bg-dark-950' 
              : 'bg-stone-50'
          }`}
        >
          <div className="min-h-full flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-md space-y-4">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className={`block w-full text-center px-6 py-4 rounded-lg transition-all duration-300 font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-dark-900 text-white hover:bg-dark-800 border border-dark-800'
                    : 'bg-white text-stone-900 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                {t('nav.home')}
              </a>
              <a
                href="#works"
                onClick={(e) => handleNavClick(e, 'works')}
                className={`block w-full text-center px-6 py-4 rounded-lg transition-all duration-300 font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-dark-900 text-white hover:bg-dark-800 border border-dark-800'
                    : 'bg-white text-stone-900 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                {t('nav.works')}
              </a>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className={`block w-full text-center px-6 py-4 rounded-lg transition-all duration-300 font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-dark-900 text-white hover:bg-dark-800 border border-dark-800'
                    : 'bg-white text-stone-900 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                {t('nav.services')}
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`block w-full text-center px-6 py-4 rounded-lg transition-all duration-300 font-semibold text-lg ${
                  theme === 'dark'
                    ? 'bg-dark-900 text-white hover:bg-dark-800 border border-dark-800'
                    : 'bg-white text-stone-900 hover:bg-stone-100 border border-stone-300'
                }`}
              >
                {t('nav.contact')}
              </a>
              
              {/* WhatsApp Button */}
              <div className="pt-4">
                <a
                  href="https://wa.me/905458259495"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 font-bold text-base shadow-lg ${
                    theme === 'dark'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>{t('hero.getQuote')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

