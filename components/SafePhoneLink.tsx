'use client'

import React, { useState } from 'react'
import {
  getRawPhone,
  getDisplayPhone,
  MASKED_PHONE_DISPLAY,
  triggerPhoneCall,
  copyPhoneNumber,
} from '@/lib/safeContact'
import { useLanguage } from './LanguageProvider'

interface SafePhoneLinkProps {
  variant?: 'reveal' | 'icon-button' | 'button'
  theme?: 'light' | 'dark'
  className?: string
  buttonClassName?: string
  iconSize?: string
  ariaLabel?: string
  showCopy?: boolean
  autoCallOnMobile?: boolean
}

export default function SafePhoneLink({
  variant = 'reveal',
  theme = 'light',
  className = '',
  buttonClassName = '',
  iconSize = 'h-4 w-4',
  ariaLabel,
  showCopy = true,
  autoCallOnMobile = true,
}: SafePhoneLinkProps) {
  const { t } = useLanguage()
  const [isRevealed, setIsRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  // Handle revealing the phone number
  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isRevealed) {
      setIsRevealed(true)
      // Check if mobile device; if autoCallOnMobile is true, trigger call on first touch/click
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
      if (isMobile && autoCallOnMobile) {
        triggerPhoneCall()
      }
    } else {
      triggerPhoneCall()
    }
  }

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const success = await copyPhoneNumber()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // 1. Icon-only Button (For Navbar & Headers)
  if (variant === 'icon-button') {
    return (
      <button
        type="button"
        onClick={() => triggerPhoneCall()}
        className={className}
        aria-label={ariaLabel || t('contact.callNow')}
        title={t('contact.callNow')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={iconSize}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </button>
    )
  }

  // 2. Full Action Button
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={() => triggerPhoneCall()}
        className={buttonClassName || className}
        aria-label={ariaLabel || t('contact.callNow')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>{t('contact.callNow')}</span>
      </button>
    )
  }

  // 3. Click-to-Reveal Variant (Contact & Footer)
  const isDark = theme === 'dark'

  return (
    <div className={`inline-flex flex-wrap items-center gap-3 ${className}`}>
      {/* Phone Number Display / Trigger */}
      <button
        type="button"
        onClick={handleReveal}
        className={`group text-left font-bold tracking-wide transition-all duration-300 focus:outline-none flex items-center gap-2.5 ${
          isDark
            ? 'text-stone-200 hover:text-amber-400'
            : 'text-stone-900 hover:text-amber-600'
        }`}
        title={isRevealed ? t('contact.clickToCall') : t('contact.revealPhone')}
      >
        <span className="font-mono tracking-wider text-inherit">
          {isRevealed ? getDisplayPhone() : MASKED_PHONE_DISPLAY}
        </span>

        {/* Small subtle badge */}
        {!isRevealed && (
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium tracking-normal transition-all duration-200 border flex items-center gap-1 ${
              isDark
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 group-hover:bg-amber-500/20'
                : 'bg-amber-50 text-amber-700 border-amber-200 group-hover:bg-amber-100'
            }`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span>{t('contact.revealPhone')}</span>
          </span>
        )}
      </button>

      {/* Action buttons once revealed */}
      {isRevealed && (
        <div className="flex items-center gap-1.5 animate-fadeIn">
          {/* Direct Call Button */}
          <button
            type="button"
            onClick={() => triggerPhoneCall()}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 shadow-sm'
            }`}
            title={t('contact.callNow')}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="hidden sm:inline">{t('contact.callNow')}</span>
          </button>

          {/* Copy Button */}
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                isDark
                  ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                  : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
              }`}
              title={copied ? t('contact.copied') : 'Numarayı Kopyala'}
            >
              {copied ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[11px] text-emerald-500 font-medium">
                    {t('contact.copied')}
                  </span>
                </>
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
