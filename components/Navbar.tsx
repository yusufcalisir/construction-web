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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBg()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 relative">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`text-2xl font-bold transition-colors duration-300 tracking-tight relative inline-block ${
                theme === 'dark'
                  ? 'text-white hover:text-accent-400'
                  : 'text-stone-900 hover:text-stone-700'
              }`}
            >
              <span className="relative z-10">Ber Tadilat</span>
              {/* Subtle light animation passing through logo */}
              <span 
                className={`absolute inset-0 pointer-events-none overflow-hidden animate-logo-light-pass ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-stone-900/15 to-transparent'
                }`}
                style={{
                  width: '40%',
                  height: '100%',
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`transition-colors duration-300 font-medium text-base tracking-wide ${
                theme === 'dark'
                  ? 'text-dark-300 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('nav.home')}
            </a>
            <a
              href="#works"
              onClick={(e) => handleNavClick(e, 'works')}
              className={`transition-colors duration-300 font-medium text-base tracking-wide ${
                theme === 'dark'
                  ? 'text-dark-300 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('nav.works')}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`transition-colors duration-300 font-medium text-base tracking-wide ${
                theme === 'dark'
                  ? 'text-dark-300 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('nav.services')}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`transition-colors duration-300 font-medium text-base tracking-wide ${
                theme === 'dark'
                  ? 'text-dark-300 hover:text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('nav.contact')}
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
          <div className="md:hidden flex items-center space-x-3">
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-1">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'text-dark-300 hover:bg-dark-900 hover:text-white'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t('nav.home')}
            </a>
            <a
              href="#works"
              onClick={(e) => handleNavClick(e, 'works')}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'text-dark-300 hover:bg-dark-900 hover:text-white'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t('nav.works')}
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'text-dark-300 hover:bg-dark-900 hover:text-white'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t('nav.services')}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                theme === 'dark'
                  ? 'text-dark-300 hover:bg-dark-900 hover:text-white'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {t('nav.contact')}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

