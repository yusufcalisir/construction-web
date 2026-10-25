'use client'

import React, { useState } from 'react'
import {
  getRawPhone,
  getDisplayPhone,
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
  const [copied, setCopied] = useState(false)

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

  // 3. Direct Phone Display & Call Variant (Contact & Footer)
  const isDark = theme === 'dark'

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Phone Number Display / Direct Call Trigger */}
      <button
        type="button"
        onClick={() => triggerPhoneCall()}
        className={`group text-left rtl:text-right font-bold tracking-wide transition-all duration-300 focus:outline-none flex items-center gap-2 cursor-pointer ${
          isDark
            ? 'text-stone-200 hover:text-amber-400'
            : 'text-stone-900 hover:text-amber-600'
        }`}
        title={t('contact.clickToCall')}
      >
        <span className="font-mono tracking-wider text-inherit whitespace-nowrap" dir="ltr">
          {getDisplayPhone()}
        </span>
      </button>

      {/* Copy Button */}
      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 cursor-pointer ${
            isDark
              ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
              : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
          }`}
          title={copied ? t('contact.copied') : 'Numarayı Kopyala'}
          aria-label={copied ? t('contact.copied') : 'Numarayı Kopyala'}
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
  )
}
