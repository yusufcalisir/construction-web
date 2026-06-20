'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
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
      return 'bg-transparent'
    }

    // Match active section background
    switch (activeSection) {
      case 'home':
        return 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200/40 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
      case 'works':
        return 'bg-white/90 backdrop-blur-md border-b border-stone-200/40 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
      case 'services':
        return 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200/40 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
      case 'contact':
        return 'bg-white/90 backdrop-blur-md border-b border-stone-200/40 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
      default:
        return 'bg-stone-50/90 backdrop-blur-md border-b border-stone-200/40 shadow-[0_2px_15px_rgba(0,0,0,0.02)]'
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBg()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-20' : 'h-24'}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="flex items-center group focus:outline-none"
              >
                <span className={`text-2xl font-bold tracking-widest leading-none transition-colors duration-500 font-serif ${
                  isMobileMenuOpen
                    ? 'text-white'
                    : !isScrolled ? 'text-white' : 'text-stone-900'
                }`}>
                  BER<span className="text-amber-500 font-light tracking-[0.15em] ml-1">TADİLAT</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['home', 'works', 'services', 'contact'].map((section) => {
                const isActive = activeSection === section;
                return (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={(e) => handleNavClick(e, section)}
                    className={`relative py-2 text-xs uppercase font-semibold tracking-[0.2em] transition-all duration-300 group focus:outline-none ${
                      isActive
                        ? !isScrolled
                          ? 'text-amber-400 font-bold'
                          : 'text-amber-600 font-bold'
                        : !isScrolled
                          ? 'text-stone-200 hover:text-white'
                          : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {t(`nav.${section}`)}
                    {/* Modern animated accent line */}
                    <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                      isActive 
                        ? 'w-6 bg-amber-500' 
                        : 'w-0 group-hover:w-4 bg-amber-500/60'
                    }`} />
                  </a>
                );
              })}
              
              {/* Vertical separator */}
              <span className={`h-4 w-[1px] transition-colors duration-500 ${!isScrolled ? 'bg-white/20' : 'bg-stone-200'}`} />

              <div className="flex items-center space-x-3">
                {/* Call Button */}
                <a
                  href="tel:+905458259495"
                  className={`flex items-center justify-center p-2 rounded-xl transition-all duration-300 border focus:outline-none ${
                    !isScrolled
                      ? 'text-white border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 shadow-md backdrop-blur-sm'
                      : 'text-stone-700 border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-950 shadow-sm'
                  }`}
                  aria-label="Call us"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
                
                {/* Language Button */}
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-1.5 rounded-xl transition-all duration-300 text-xs font-bold tracking-wider border focus:outline-none ${
                    !isScrolled
                      ? 'text-white border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 shadow-md backdrop-blur-sm'
                      : 'text-stone-700 border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-950 shadow-sm'
                  }`}
                >
                  {language === 'tr' ? 'EN' : 'TR'}
                </button>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center space-x-2">
              <a
                href="tel:+905458259495"
                className={`p-2 rounded-xl transition-all duration-300 border focus:outline-none ${
                  isMobileMenuOpen
                    ? 'text-white border-white/10 bg-white/10'
                    : !isScrolled
                      ? 'text-white border-white/25 bg-white/10'
                      : 'text-stone-700 border-stone-200 bg-white'
                }`}
                aria-label="Call us"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              
              <button
                onClick={toggleLanguage}
                className={`px-2.5 py-1.5 rounded-xl transition-all duration-300 text-xs font-bold border focus:outline-none ${
                  isMobileMenuOpen
                    ? 'text-white border-white/10 bg-white/10'
                    : !isScrolled
                      ? 'text-white border-white/25 bg-white/10'
                      : 'text-stone-700 border-stone-200 bg-white'
                }`}
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors focus:outline-none ${
                  isMobileMenuOpen || !isScrolled
                    ? 'text-white hover:text-amber-400'
                    : 'text-stone-900 hover:text-amber-600'
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

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-stone-950/95 backdrop-blur-lg flex flex-col justify-center px-6 py-20">
          <div className="flex flex-col space-y-4 max-w-sm mx-auto w-full text-center">
            {['home', 'works', 'services', 'contact'].map((section) => {
              const isActive = activeSection === section;
              return (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                  className={`block py-4 px-6 rounded-2xl text-sm font-bold tracking-[0.25em] uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20'
                      : 'text-stone-300 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  {t(`nav.${section}`)}
                </a>
              );
            })}
            
            {/* WhatsApp CTA Button */}
            <div className="pt-6">
              <a
                href="https://wa.me/905458259495"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-green-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>{t('hero.getQuote')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

