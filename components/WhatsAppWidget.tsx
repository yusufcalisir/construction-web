'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import { openWhatsApp, triggerPhoneCall } from '@/lib/safeContact'

export default function WhatsAppWidget() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Listen to mobile menu open state from document.body class
  useEffect(() => {
    const checkMobileMenu = () => {
      const isMenuOpen = document.body.classList.contains('mobile-menu-open')
      setIsMobileMenuOpen(isMenuOpen)
      if (isMenuOpen) {
        setIsOpen(false)
      }
    }

    checkMobileMenu()

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          checkMobileMenu()
        }
      }
    })

    observer.observe(document.body, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home')
      const contactSection = document.getElementById('contact')
      const footerSection = document.getElementById('footer')
      
      let shouldShow = true

      // Hide only when at the very top landing view (window.scrollY < 120)
      if (window.scrollY < 120) {
        shouldShow = false
      }

      // Hide only when scrolled well into the Contact section (does not hide while in Gallery!)
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect()
        if (contactRect.top <= 200 && contactRect.bottom >= 150) {
          shouldShow = false
        }
      }

      // Hide if footer is visible in the viewport
      if (footerSection) {
        const footerRect = footerSection.getBoundingClientRect()
        if (footerRect.top <= window.innerHeight - 50) {
          shouldShow = false
        }
      }

      if (!shouldShow) {
        setIsOpen(false)
      }

      setIsVisible(shouldShow)
    }

    // Check initial state
    handleScroll()

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleConnect = () => {
    openWhatsApp()
  }

  if (!isVisible || isMobileMenuOpen) {
    return null
  }

  return (
    <>
      {/* Floating Persistent Call & WhatsApp Actions */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3 select-none" dir="ltr">
        {/* Floating Call Button: Ücretsiz Keşif İçin Hemen Ara */}
        <button
          type="button"
          onClick={() => triggerPhoneCall()}
          className="group flex items-center gap-2 h-12 sm:h-14 px-3.5 sm:px-5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/40 cursor-pointer"
          title={t('hero.btnCall')}
          aria-label={t('hero.btnCall')}
        >
          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-950 text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
            </svg>
          </span>
          <span className="whitespace-nowrap font-extrabold hidden xs:inline">{t('nav.freeDiscoveryCall')}</span>
          <span className="whitespace-nowrap font-extrabold xs:hidden">{t('nav.callNow')}</span>
        </button>

        {/* Floating WhatsApp Button */}
        <button type="button"
          id="whatsapp-floating-button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-xl hover:shadow-2xl transition-all duration-300 items-center justify-center group shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label={t('whatsapp.ariaLabel')}
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-sm bg-white rounded-lg shadow-2xl overflow-hidden animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-white/20 flex items-center justify-center">
              <Image
                src="/logo/wp-logo.jpeg"
                alt="Ber Tadilat"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate">
                {t('whatsapp.title')}
              </h3>
              <p className="text-white/80 text-xs truncate">{t('whatsapp.status')}</p>
            </div>
            <button type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label={t('whatsapp.close')}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="bg-[#ECE5DD] px-4 py-6 min-h-[120px] flex items-center">
            <div className="w-full">
              <div className="bg-white rounded-lg px-4 py-3 shadow-sm max-w-[85%]">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('whatsapp.message')}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Button */}
          <div className="bg-white px-4 py-4 border-t border-gray-200">
            <button type="button"
              onClick={handleConnect}
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
