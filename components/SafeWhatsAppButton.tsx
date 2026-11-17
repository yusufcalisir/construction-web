'use client'

import React from 'react'
import { getWhatsAppUrl } from '@/lib/safeContact'

interface SafeWhatsAppButtonProps {
  children?: React.ReactNode
  message?: string
  className?: string
  ariaLabel?: string
  title?: string
  id?: string
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function SafeWhatsAppButton({
  children,
  message,
  className = '',
  ariaLabel = 'WhatsApp',
  title = 'WhatsApp',
  id,
  onClick,
}: SafeWhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </a>
  )
}
