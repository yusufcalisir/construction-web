'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const TOTAL_PHOTOS = 118
const TOTAL_CARDS = 16

interface LightboxState {
  cardIndex: number
  photoIndex: number
}

// Single animated card component
function GalleryCard({
  photos,
  cardIndex,
  onOpen,
  isPaused,
}: {
  photos: string[]
  cardIndex: number
  onOpen: (photoIdx: number) => void
  isPaused: boolean
}) {
  const [currentIdx, setCurrentIdx] = useState(0)

  // Staggered automatic rotation: each card has an offset so they don't all flip at the exact same moment
  useEffect(() => {
    if (isPaused || photos.length <= 1) return

    // Offset interval between 3600ms and 5200ms based on card index
    const intervalTime = 3600 + (cardIndex % 5) * 380

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % photos.length)
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPaused, photos.length, cardIndex])

  return (
    <div
      onClick={() => onOpen(currentIdx)}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-amber-400/60 bg-stone-900 cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(currentIdx)
        }
      }}
      aria-label={`Proje ${cardIndex + 1}`}
    >
      {/* Sliding / Crossfading Images inside Card */}
      <div className="relative w-full h-full">
        {photos.map((src, idx) => {
          const isActive = idx === currentIdx
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <Image
                src={src}
                alt={`Ber Tadilat Proje ${cardIndex + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading={cardIndex < 4 ? 'eager' : 'lazy'}
                quality={88}
              />
            </div>
          )
        })}

        {/* Clean Luxury Hover Overlay with Minimal Expand Icon (NO sağ/sol/dur text) */}
        <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-stone-900/75 text-amber-400 border border-white/20 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </div>
        </div>

        {/* Discreet bottom photo count badge */}
        <div className="absolute bottom-2.5 right-2.5 z-20 px-2 py-0.5 rounded-md bg-stone-950/70 backdrop-blur-md text-[10px] font-mono text-stone-200 border border-white/10 opacity-75 group-hover:opacity-100 transition-opacity">
          {photos.length}
        </div>
      </div>
    </div>
  )
}

export default function ProjectGallery() {
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  // 118 photos distributed across 16 cards (round-robin)
  // Ensures completely disjoint photo sets: no two cards ever show the same photo!
  const cardBuckets = useMemo(() => {
    const buckets: string[][] = Array.from({ length: TOTAL_CARDS }, () => [])
    for (let num = 1; num <= TOTAL_PHOTOS; num++) {
      const cardIdx = (num - 1) % TOTAL_CARDS
      buckets[cardIdx].push(`/galeri/image-${num}.jpg`)
    }
    return buckets
  }, [])

  const activePhotos = lightbox ? cardBuckets[lightbox.cardIndex] : []

  // Lightbox handlers
  const handleNextPhoto = useCallback(() => {
    if (!lightbox) return
    const photos = cardBuckets[lightbox.cardIndex]
    setLightbox((prev) =>
      prev ? { ...prev, photoIndex: (prev.photoIndex + 1) % photos.length } : null
    )
  }, [lightbox, cardBuckets])

  const handlePrevPhoto = useCallback(() => {
    if (!lightbox) return
    const photos = cardBuckets[lightbox.cardIndex]
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            photoIndex: (prev.photoIndex - 1 + photos.length) % photos.length,
          }
        : null
    )
  }, [lightbox, cardBuckets])

  const handleClose = useCallback(() => {
    setLightbox(null)
  }, [])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightbox) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNextPhoto()
      if (e.key === 'ArrowLeft') handlePrevPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightbox, handleClose, handleNextPhoto, handlePrevPhoto])

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextPhoto()
      } else {
        handlePrevPhoto()
      }
    }
    setTouchStartX(null)
  }

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-3">
            {t('gallery2.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif">
            {t('gallery2.subtitle')}
          </h2>
          <div className="h-[2px] w-12 bg-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* 16 Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardBuckets.map((photos, index) => (
            <GalleryCard
              key={index}
              photos={photos}
              cardIndex={index}
              onOpen={(photoIdx) => setLightbox({ cardIndex: index, photoIndex: photoIdx })}
              isPaused={lightbox !== null}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Enlarged View Modal */}
      {lightbox && activePhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-[fadeIn_0.2s_ease-out]"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Info and Close Button */}
          <div
            className="flex items-center justify-between w-full max-w-6xl mx-auto z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-bold text-white font-serif">
                {t('gallery2.title')} #{lightbox.cardIndex + 1}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-stone-300 font-mono">
                {lightbox.photoIndex + 1} / {activePhotos.length}
              </span>
            </div>

            {/* Minimal Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none touch-manipulation active:scale-95"
              aria-label={t('gallery2.close')}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Center: Main Image with Minimal Navigation Arrows */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow Button */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-stone-900/70 text-white hover:bg-amber-500 transition-all focus:outline-none border border-white/10 backdrop-blur-md shadow-xl touch-manipulation active:scale-95"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Current Active Image */}
            <div className="relative w-full h-full max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activePhotos[lightbox.photoIndex]}
                alt={`Proje ${lightbox.cardIndex + 1} Fotoğraf ${lightbox.photoIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                quality={95}
              />
            </div>

            {/* Next Arrow Button */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-stone-900/70 text-white hover:bg-amber-500 transition-all focus:outline-none border border-white/10 backdrop-blur-md shadow-xl touch-manipulation active:scale-95"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnails of this card's photos */}
          <div
            className="w-full max-w-2xl mx-auto z-10 pb-2 overflow-x-auto py-2 flex items-center justify-center gap-2 sm:gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {activePhotos.map((src, pIdx) => {
              const isCurrent = pIdx === lightbox.photoIndex
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setLightbox((prev) => (prev ? { ...prev, photoIndex: pIdx } : null))}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all focus:outline-none flex-shrink-0 touch-manipulation ${
                    isCurrent
                      ? 'ring-2 ring-amber-500 scale-105 opacity-100 shadow-md'
                      : 'opacity-50 hover:opacity-85 border border-white/10'
                  }`}
                  aria-label={`Fotoğraf ${pIdx + 1}`}
                >
                  <Image src={src} alt="thumbnail" fill className="object-cover" sizes="56px" />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
