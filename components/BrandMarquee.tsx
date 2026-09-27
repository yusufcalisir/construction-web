'use client'

import React from 'react'
import { useLanguage } from './LanguageProvider'

const ROW_1 = [
  'Vitra',
  'Rehau',
  'Designfloor',
  'Bvt Parke',
  'Çamsan',
  'Şerifoğlu',
  'Weber',
  'ABC',
  'Sika',
  'Jotun',
  'Dyo',
  'Geberit',
  'Duravit',
  'Grohe',
  'Artema',
  'Bien',
]

const ROW_2 = [
  'Knauf',
  'Kalekim',
  'Qua Granite',
  'Polisan',
  'Floorpan',
  'Hafele',
  'Neolith',
  'Winsa',
  'Asaş',
  'Albert Genau',
  'Siemens',
  'Viko',
  'Bosch',
  'Daikin',
  'LG',
]

export default function BrandMarquee() {
  const { t } = useLanguage()

  return (
    <section
      aria-label={t('brands.badge')}
      className="relative w-full py-12 sm:py-16 bg-stone-950 border-t border-stone-800/80 overflow-hidden select-none"
    >
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-radial-[ellipse_80%_80%_at_50%_-20%] from-amber-500/[0.03] to-transparent pointer-events-none" />

      {/* Subtle minimalist kicker / pill (no heavy h2 header) */}
      <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4">
        <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-amber-500/90 font-bold px-4 py-1.5 rounded-full bg-amber-500/[0.07] border border-amber-500/25 shadow-sm text-center">
          {t('brands.badge')}
        </span>
        <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      {/* Gradient Fade Masks on Edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-44 bg-gradient-to-l from-stone-950 via-stone-950/80 to-transparent z-20" />

      {/* Marquee Tracks Container */}
      <div className="relative flex flex-col gap-4 sm:gap-5 w-full overflow-hidden">
        {/* Row 1: Scrolling Left */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-3 sm:gap-4 py-1">
            {[...ROW_1, ...ROW_1].map((brand, idx) => (
              <div
                key={`r1-${brand}-${idx}`}
                className="group relative flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-850 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 cursor-default flex-shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
                <span className="text-sm sm:text-base font-bold tracking-wider text-stone-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap font-serif">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-3 sm:gap-4 py-1">
            {[...ROW_2, ...ROW_2].map((brand, idx) => (
              <div
                key={`r2-${brand}-${idx}`}
                className="group relative flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-850 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 cursor-default flex-shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300 flex-shrink-0" />
                <span className="text-sm sm:text-base font-bold tracking-wider text-stone-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap font-serif">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
