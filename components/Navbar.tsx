'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from './LanguageProvider'
import SafePhoneLink from './SafePhoneLink'
import SafeWhatsAppButton from './SafeWhatsAppButton'
import { triggerPhoneCall } from '@/lib/safeContact'
export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const manualScrollUntilRef = useRef(0)

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

      // If user recently clicked a nav link, preserve the target active state during smooth scroll animation
      if (Date.now() < manualScrollUntilRef.current) {
        return
      }

      // Determine active section based on scroll position using exact viewport bounds
      const sections = ['home', 'about', 'services', 'how-we-work', 'gallery', 'contact', 'footer']
      let currentSection = sections[0]

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 140) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
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
    manualScrollUntilRef.current = Date.now() + 1200
    const element = document.getElementById(targetId)
    if (element) {
      const targetTop = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      })
    }
    // Clean URL so no #section or ?lang is ever appended to address bar
    if (typeof window !== 'undefined' && (window.location.hash || window.location.search)) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    setIsMobileMenuOpen(false)
  }

  // Check if current active section has a dark background
  const isDarkSection = (section: string) => {
    return ['home', 'services', 'contact', 'footer'].includes(section)
  }

  const isDark = !isScrolled || isMobileMenuOpen || isDarkSection(activeSection)
  const isAboutActive = activeSection === 'about'

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
        dir="ltr"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16 sm:h-18 lg:h-20' : 'h-18 sm:h-20 lg:h-24'}`}>
            {/* Logo */}
            <div className="flex-shrink-0 mr-2 sm:mr-4 lg:mr-6 xl:mr-8 whitespace-nowrap">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="flex items-center group focus:outline-none whitespace-nowrap"
              >
                <span className={`text-lg sm:text-2xl font-bold tracking-widest leading-none transition-colors duration-500 font-serif whitespace-nowrap ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  BER<span className={`${isDark ? 'text-amber-400' : 'text-amber-600'} font-light tracking-[0.15em] ml-1 transition-colors duration-500`}>TADİLAT</span>
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav aria-label="Ana Menü" className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6">
              {/* Home */}
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
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

              {/* About */}
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'about'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.about')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'about' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>

              {/* Services */}
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, 'services')}
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
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

              {/* How We Work (Sürecimiz) */}
              <a
                href="#how-we-work"
                onClick={(e) => handleNavClick(e, 'how-we-work')}
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
                  activeSection === 'how-we-work'
                    ? isDark ? 'text-amber-400 font-bold' : 'text-amber-600 font-bold'
                    : isDark ? 'text-stone-300 hover:text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t('nav.howwework')}
                <span className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] transition-all duration-300 rounded-full ${
                  activeSection === 'how-we-work' ? 'w-6 bg-amber-500' : 'w-0 group-hover:w-4 bg-amber-500/60'
                }`} />
              </a>

              {/* Gallery */}
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery')}
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
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
                className={`relative py-2 text-[11px] xl:text-xs uppercase font-semibold tracking-[0.12em] xl:tracking-[0.16em] whitespace-nowrap transition-all duration-300 group focus:outline-none ${
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
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0 ml-auto pl-2 xl:pl-4">
              {/* Free Discovery Call CTA ("Hemen Ara") */}
              <button
                type="button"
                onClick={() => triggerPhoneCall()}
                className="inline-flex items-center gap-1.5 px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-full font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-300 bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:scale-105 active:scale-95 cursor-pointer"
                title={t('nav.callNow')}
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
                <span className="whitespace-nowrap font-extrabold">{t('nav.callNow')}</span>
              </button>
              
              {/* Vertical separator */}
              <span className={`h-4 w-[1px] shrink-0 transition-colors duration-500 ${isDark ? 'bg-white/20' : 'bg-stone-300'}`} />

              <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
                {/* Modern Capsule Language Switcher ("Dil") */}
                <div
                  dir="ltr"
                  className={`h-9 xl:h-10 inline-flex items-center p-0.5 xl:p-1 rounded-xl border backdrop-blur-md transition-all duration-300 select-none shadow-sm shrink-0 ${
                    isDark
                      ? 'bg-stone-900/80 border-white/20'
                      : 'bg-stone-100/90 border-stone-200/90'
                  }`}
                  role="group"
                  aria-label="Dil seçenekleri"
                >
                  {otherLanguages.map((target, idx) => (
                    <span key={target.code} className="inline-flex items-center h-full shrink-0">
                      {idx > 0 && (
                        <span
                          className={`w-[1px] h-3.5 transition-colors duration-300 mx-0.5 shrink-0 ${
                            isDark ? 'bg-white/20' : 'bg-stone-300'
                          }`}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setLanguage(target.code)}
                        title={target.title}
                        aria-label={target.title}
                        className={`h-7 xl:h-8 px-2 xl:px-2.5 flex items-center justify-center min-w-[28px] xl:min-w-[32px] text-center rounded-lg text-xs font-bold tracking-wider transition-all duration-200 focus:outline-none touch-manipulation active:scale-95 shrink-0 ${
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

            {/* Mobile menu trigger & actions */}
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
                type="button"
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
        <div className="lg:hidden fixed inset-0 z-40 bg-stone-950/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto px-6 pt-24 pb-8" dir="ltr">
          <div className="max-w-sm mx-auto w-full flex flex-col justify-between min-h-full">
            {/* Minimalist Typographic Nav Links */}
            <nav className="flex flex-col space-y-1 py-3">
              {[
                { id: 'home', label: t('nav.home') },
                { id: 'about', label: t('nav.about') },
                { id: 'services', label: t('nav.services') },
                { id: 'how-we-work', label: t('nav.howwework') },
                { id: 'gallery', label: t('nav.gallery') },
                { id: 'contact', label: t('nav.contact') },
              ].map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-base font-serif tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-amber-400 font-bold bg-white/5 border border-amber-500/20'
                        : 'text-stone-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    ) : (
                      <svg className="w-4 h-4 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Bottom Actions: Simplified & Elegant */}
            <div className="pt-6 border-t border-stone-800/80 space-y-3.5">
              {/* WhatsApp & Call Buttons (Sleek Pair) */}
              <div className="grid grid-cols-2 gap-3">
                <SafeWhatsAppButton
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-green-500/20 active:scale-95 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>WhatsApp</span>
                </SafeWhatsAppButton>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    triggerPhoneCall()
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                  </svg>
                  <span>{t('nav.callNow')}</span>
                </button>
              </div>

              {/* Minimal Language Switcher Segmented Control */}
              <div
                dir="ltr"
                className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1 select-none"
                role="group"
                aria-label="Dil seçenekleri"
              >
                {ALL_LANGUAGES.map((target) => {
                  const isCurrent = target.code === language
                  return (
                    <button
                      key={target.code}
                      type="button"
                      onClick={() => {
                        setLanguage(target.code)
                        setIsMobileMenuOpen(false)
                      }}
                      title={target.title}
                      aria-label={target.title}
                      className={`flex-1 py-2 px-2 rounded-lg text-center text-xs font-bold tracking-wider transition-all duration-200 focus:outline-none ${
                        isCurrent
                          ? 'bg-amber-500 text-stone-950 shadow-sm'
                          : 'text-stone-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {target.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

