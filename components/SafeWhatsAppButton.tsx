'use client'

import React from 'react'
import { openWhatsApp } from '@/lib/safeContact'

interface SafeWhatsAppButtonProps {
  children?: React.ReactNode
  message?: string
  className?: string
  ariaLabel?: string
  title?: string
  onClick?: (e?: React.MouseEvent) => void
}

export default function SafeWhatsAppButton({
  children,
  message,
  className = '',
  ariaLabel = 'WhatsApp',
  title = 'WhatsApp',
  onClick,
}: SafeWhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) onClick(e)
    openWhatsApp(message)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  )
}
