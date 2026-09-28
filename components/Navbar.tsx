'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageProvider'
import SafePhoneLink from './SafePhoneLink'
import SafeWhatsAppButton from './SafeWhatsAppButton'

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('home')

  // All languages in order: TR, EN, AR, FA (Arabic between EN and FA)
  const ALL_LANGUAGES = [
    { code: 'tr' as const, label: 'TR', title: 'Türkçe' },
    { code: 'en' as const, label: 'EN', title: 'English' },
    { code: 'ar' as const, label: 'AR', title: 'العربية' },
    { code: 'fa' as const, label: 'FA', title: 'فارسی' },
  ]

  // Always show only the OTHER 3 languages to switch to
  const otherLanguages = ALL_LANGUAGES.filter((item) => item.code !== language)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'why-ber', 'how-we-work', 'services', 'gallery', 'contact', 'footer']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll and signal menu state when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('mobile-menu-open')
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setActiveSection(targetId)
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

  // Check if current active section has a dark background
  const isDarkSection = (section: string) => {
    return ['home', 'how-we-work', 'services', 'footer'].includes(section)
  }

  const isDark = !isScrolled || isMobileMenuOpen || isDarkSection(activeSection)
  const isAboutActive = activeSection === 'about' || activeSection === 'why-ber' || activeSection === 'how-we-work'

  // Get background color based on active section
  const getNavbarBg = () => {
    if (!isScrolled) {
      return 'bg-transparent'
    }

    if (isDark) {
      return 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
    }

    return 'bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavbarBg()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16 sm:h-18 lg:h-20' : 'h-18 sm:h-20 lg:h-24'}`}>
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="flex items-center group focus:outline-none"
              >
                <span className={`text-xl sm:text-2xl font-bold tracking-widest leading-none transition-colors duration-500 font-serif ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  BER<span className={`${isDark ? 'text-amber-400' : 'text-amber-600'} font-light tracking-[0.15em] ml-1 transition-colors duration-500`}>TADİLAT</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-8">
              {/* Home */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className={`relative py-2 text-xs uppercase font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'home'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.home')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'home' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>

              {/* Hakkımızda with Section Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <a
                  href="#about"
                  onClick={(e) => {
                    handleNavClick(e, 'about')
                    setIsAboutDropdownOpen(false)
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs uppercase font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 focus:outline-none cursor-pointer ${
                    isAboutActive
                      ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                      : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>{t('nav.about')}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 opacity-70 ${isAboutDropdownOpen ? 'rotate-180' : 'group-hover:rotate-180'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                    isAboutActive ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                  }`} />
                </a>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 z-50 ${
                  isAboutDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
                }`}>
                  <div className={`w-80 p-2.5 rounded-2xl shadow-2xl border backdrop-blur-xl ${
                    isDark
                      ? 'bg-stone-900/95 border-stone-800 shadow-black/60'
                      : 'bg-white/95 border-stone-200/90 shadow-stone-900/10'
                  }`}>
                    {/* Item 1: Kurumsal & Mühendislik */}
                    <a
                      href="#about"
                      onClick={(e) => {
                        handleNavClick(e, 'about')
                        setIsAboutDropdownOpen(false)
                      }}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group/item ${
                        activeSection === 'about'
                          ? isDark ? 'bg-white/10 text-amber-400' : 'bg-stone-100 text-amber-600'
                          : isDark ? 'hover:bg-white/5 text-stone-200' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDark ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold font-serif tracking-normal group-hover/item:text-amber-400 transition-colors">{t('nav.about.corporate')}</div>
                        <div className="text-[11px] text-stone-400 leading-snug mt-0.5 line-clamp-1">{t('nav.about.corporate.desc')}</div>
                      </div>
                    </a>

                    {/* Item 2: Neden Ber? */}
                    <a
                      href="#why-ber"
                      onClick={(e) => {
                        handleNavClick(e, 'why-ber')
                        setIsAboutDropdownOpen(false)
                      }}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group/item ${
                        activeSection === 'why-ber'
                          ? isDark ? 'bg-white/10 text-amber-400' : 'bg-stone-100 text-amber-600'
                          : isDark ? 'hover:bg-white/5 text-stone-200' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDark ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold font-serif tracking-normal group-hover/item:text-amber-400 transition-colors">{t('nav.about.whyber')}</div>
                        <div className="text-[11px] text-stone-400 leading-snug mt-0.5 line-clamp-1">{t('nav.about.whyber.desc')}</div>
                      </div>
                    </a>

                    {/* Item 3: Çalışma Sürecimiz */}
                    <a
                      href="#how-we-work"
                      onClick={(e) => {
                        handleNavClick(e, 'how-we-work')
                        setIsAboutDropdownOpen(false)
                      }}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group/item ${
                        activeSection === 'how-we-work'
                          ? isDark ? 'bg-white/10 text-amber-400' : 'bg-stone-100 text-amber-600'
                          : isDark ? 'hover:bg-white/5 text-stone-200' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDark ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold font-serif tracking-normal group-hover/item:text-amber-400 transition-colors">{t('nav.about.process')}</div>
                        <div className="text-[11px] text-stone-400 leading-snug mt-0.5 line-clamp-1">{t('nav.about.process.desc')}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Services */}
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className={`relative py-2 text-xs uppercase font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'services'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.services')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'services' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>

              {/* Gallery */}
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery')}
                className={`relative py-2 text-xs uppercase font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'gallery'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.gallery')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'gallery' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>

              {/* Contact */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`relative py-2 text-xs uppercase font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'contact'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.contact')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'contact' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>
              
              {/* Vertical separator */}
              <span className={`h-4 w-[1px] transition-colors duration-500 ${isDark ? 'bg-white/20' : 'bg-stone-200'}`} />

              <div className="flex items-center gap-2.5">
                {/* Call Button */}
                <SafePhoneLink
                  variant="icon-button"
                  iconSize="w-4 h-4"
                  className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-300 border focus:outline-none shrink-0 ${
                    isDark
                      ? 'text-white border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 shadow-md backdrop-blur-sm'
                      : 'text-stone-700 border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-950 shadow-sm'
                  }`}
                  ariaLabel="Call us"
                />
                
                {/* Modern Capsule Language Switcher */}
                <div
                  dir="ltr"
                  className={`h-10 inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-all duration-300 select-none shadow-sm ${
                    isDark
                      ? 'bg-stone-900/80 border-white/20'
                      : 'bg-stone-100/90 border-stone-200/90'
                  }`}
                  role="group"
                  aria-label="Dil seçenekleri"
                >
                  {otherLanguages.map((target, idx) => (
                    <span key={target.code} className="inline-flex items-center h-full">
                      {idx > 0 && (
                        <span
                          className={`w-[1px] h-3.5 transition-colors duration-300 mx-0.5 ${
                            isDark ? 'bg-white/20' : 'bg-stone-300'
                          }`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setLanguage(target.code)}
                        title={target.title}
                        aria-label={target.title}
                        className={`h-8 px-2.5 flex items-center justify-center min-w-[32px] text-center rounded-lg text-xs font-bold tracking-wider transition-all duration-200 focus:outline-none touch-manipulation active:scale-95 ${
                          isDark
                            ? 'text-stone-200 hover:text-white hover:bg-white/15'
                            : 'text-stone-700 hover:text-amber-600 hover:bg-stone-200/70'
                        }`}
                      >
                        {target.label}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
              {!isMobileMenuOpen && (
                <>
                  <SafePhoneLink
                    variant="icon-button"
                    iconSize="w-4 h-4"
                    className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 border focus:outline-none shrink-0 ${
                      isDark
                        ? 'text-white border-white/20 bg-white/10 hover:bg-white/20 active:scale-95 shadow-sm'
                        : 'text-stone-800 border-stone-300/80 bg-stone-100/90 hover:bg-stone-200 active:scale-95 shadow-sm'
                    }`}
                    ariaLabel="Call us"
                  />
                  
                  {/* Mobile Capsule Language Switcher */}
                  <div
                    dir="ltr"
                    className={`h-9 inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-all duration-300 select-none shadow-sm shrink-0 ${
                      isDark
                        ? 'bg-stone-900/80 border-white/20'
                        : 'bg-stone-100/90 border-stone-300/80'
                    }`}
                    role="group"
                    aria-label="Dil seçenekleri"
                  >
                    {otherLanguages.map((target, idx) => (
                      <span key={target.code} className="inline-flex items-center h-full">
                        {idx > 0 && (
                          <span
                            className={`w-[1px] h-3 transition-colors duration-300 mx-0.5 ${
                              isDark ? 'bg-white/20' : 'bg-stone-300'
                            }`}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => setLanguage(target.code)}
                          title={target.title}
                          aria-label={target.title}
                          className={`h-7 px-1.5 sm:px-2 flex items-center justify-center min-w-[26px] text-center rounded-lg text-[11px] font-bold tracking-wider transition-all duration-200 focus:outline-none touch-manipulation active:scale-95 ${
                            isDark
                              ? 'text-stone-300 hover:text-white hover:bg-white/10 active:bg-white/20'
                              : 'text-stone-700 hover:text-amber-600 hover:bg-stone-200/70 active:bg-stone-200'
                          }`}
                        >
                          {target.label}
                        </button>
                      </span>
                    ))}
                  </div>
                </>
              )}
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 border focus:outline-none shrink-0 ${
                  isDark
                    ? 'text-white border-white/20 bg-white/10 hover:bg-white/20 active:scale-95 shadow-sm'
                    : 'text-stone-800 border-stone-300/80 bg-stone-100/90 hover:bg-stone-200 active:scale-95 shadow-sm'
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-5 h-5"
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
          <div className="flex flex-col space-y-2 max-w-sm mx-auto w-full text-center">
            {/* Home */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className={`block py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeSection === 'home'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'text-stone-300 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              {t('nav.home')}
            </a>

            {/* Hakkımızda Section with sub-items */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2 space-y-1.5 text-center">
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={`block py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeSection === 'about'
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-white hover:text-amber-400'
                }`}
              >
                {t('nav.about')}
              </a>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <a
                  href="#why-ber"
                  onClick={(e) => handleNavClick(e, 'why-ber')}
                  className={`block py-2 px-2.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 border text-center ${
                    activeSection === 'why-ber'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'text-stone-400 hover:text-white border-white/5 bg-white/[0.02]'
                  }`}
                >
                  {t('nav.about.whyber')}
                </a>
                <a
                  href="#how-we-work"
                  onClick={(e) => handleNavClick(e, 'how-we-work')}
                  className={`block py-2 px-2.5 rounded-lg text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 border text-center ${
                    activeSection === 'how-we-work'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'text-stone-400 hover:text-white border-white/5 bg-white/[0.02]'
                  }`}
                >
                  {t('nav.about.process')}
                </a>
              </div>
            </div>

            {/* Services */}
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className={`block py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeSection === 'services'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'text-stone-300 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              {t('nav.services')}
            </a>

            {/* Gallery */}
            <a
              href="#gallery"
              onClick={(e) => handleNavClick(e, 'gallery')}
              className={`block py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeSection === 'gallery'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'text-stone-300 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              {t('nav.gallery')}
            </a>

            {/* Contact */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`block py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeSection === 'contact'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'text-stone-300 hover:text-white border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              {t('nav.contact')}
            </a>
            
            {/* Mobile Menu Language Switcher */}
            <div
              dir="ltr"
              className="p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center gap-1.5 mx-auto w-full max-w-xs select-none"
              role="group"
              aria-label="Dil seçenekleri"
            >
              {otherLanguages.map((target) => (
                <button
                  key={target.code}
                  type="button"
                  onClick={() => {
                    setLanguage(target.code)
                    setIsMobileMenuOpen(false)
                  }}
                  title={target.title}
                  aria-label={target.title}
                  className="flex-1 py-2 px-1.5 rounded-xl text-center font-bold tracking-wider transition-all duration-200 focus:outline-none touch-manipulation active:scale-95 bg-white/10 hover:bg-amber-500 text-white shadow-sm flex flex-col items-center justify-center"
                >
                  <span className="text-xs font-bold">{target.label}</span>
                  <span className="text-[10px] opacity-75 font-normal mt-0.5">({target.title})</span>
                </button>
              ))}
            </div>

            {/* WhatsApp CTA Button */}
            <div className="pt-4">
              <SafeWhatsAppButton
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-green-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>{t('hero.getQuote')}</span>
              </SafeWhatsAppButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

