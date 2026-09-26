'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const FIRST_PHOTOS = [118, 109, 104, 93, 67, 50, 25, 24, 10, 5, 47, 12]
const EXCLUDED_PHOTOS = new Set([16, 20, 30, 31, 35, 38, 42, 46, 54, 78])
const TOTAL_CARDS = 12

interface LightboxState {
  cardIndex: number
  photoIndex: number
}

interface GalleryCardProps {
  photos: string[]
  cardIndex: number
  photoIndex: number
  onOpen: (photoIndex: number) => void
}

function GalleryCard({ photos, cardIndex, photoIndex, onOpen }: GalleryCardProps) {
  const [currentIdx, setCurrentIdx] = useState(photoIndex)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    if (photoIndex !== currentIdx) {
      setPrevIdx(currentIdx)
      setCurrentIdx(photoIndex)
      setIsSliding(true)

      const timer = setTimeout(() => {
        setIsSliding(false)
        setPrevIdx(null)
      }, 700)

      return () => clearTimeout(timer)
    }
  }, [photoIndex, currentIdx])

  return (
    <div
      onClick={() => onOpen(currentIdx)}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-amber-400/50 bg-stone-900 cursor-pointer select-none"
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
      {/* Sliding Outgoing Photo */}
      {isSliding && prevIdx !== null && (
        <div className="absolute inset-0 animate-gallery-slide-out z-0">
          <Image
            src={photos[prevIdx]}
            alt={`Ber Tadilat Proje ${cardIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            quality={75}
          />
        </div>
      )}

      {/* Active / Incoming Photo */}
      <div
        className={`absolute inset-0 ${isSliding ? 'animate-gallery-slide-in z-10' : 'z-0'}`}
      >
        <Image
          src={photos[currentIdx]}
          alt={`Ber Tadilat Proje ${cardIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading={cardIndex < 4 ? 'eager' : 'lazy'}
          quality={75}
        />
      </div>

      {/* Subtle luxury hover overlay without buttons or text */}
      <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
    </div>
  )
}

export default function ProjectGallery() {
  const { t } = useLanguage()
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  // 12 cards, starting with FIRST_PHOTOS, excluding EXCLUDED_PHOTOS
  // 108 total photos distributed evenly (9 photos per card, no duplicates between cards)
  const cardBuckets = useMemo(() => {
    const firstSet = new Set(FIRST_PHOTOS)
    const remaining: number[] = []

    for (let i = 1; i <= 118; i++) {
      if (!EXCLUDED_PHOTOS.has(i) && !firstSet.has(i)) {
        remaining.push(i)
      }
    }

    return FIRST_PHOTOS.map((first, cardIdx) => {
      const others = remaining.filter((_, idx) => idx % TOTAL_CARDS === cardIdx)
      const allNumbers = [first, ...others]
      return allNumbers.map((num) => `/galeri/image-${num}.jpg`)
    })
  }, [])

  // Track the active photo index for each of the 12 cards
  const [cardIndices, setCardIndices] = useState<number[]>(() =>
    Array(TOTAL_CARDS).fill(0)
  )

  // Occasional sliding transition:
  // Instead of all cards changing at once, only ONE card slides at a time every 6 seconds.
  useEffect(() => {
    if (lightbox !== null || isHovered) return

    const timer = setInterval(() => {
      setCardIndices((prev) => {
        const randomCard = Math.floor(Math.random() * TOTAL_CARDS)
        const next = [...prev]
        const cardPhotos = cardBuckets[randomCard]
        next[randomCard] = (next[randomCard] + 1) % cardPhotos.length
        return next
      })
    }, 6000)

    return () => clearInterval(timer)
  }, [lightbox, isHovered, cardBuckets])

  const activePhotos = lightbox ? cardBuckets[lightbox.cardIndex] : []

  // Lightbox navigation handlers
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

  // Keyboard navigation
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

        {/* 12 Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardBuckets.map((photos, cardIndex) => (
            <GalleryCard
              key={cardIndex}
              photos={photos}
              cardIndex={cardIndex}
              photoIndex={cardIndices[cardIndex]}
              onOpen={(photoIdx) =>
                setLightbox({ cardIndex, photoIndex: photoIdx })
              }
            />
          ))}
        </div>
      </div>

      {/* Lightbox Enlarged View Modal (Opens when any card is clicked) */}
      {lightbox && activePhotos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none animate-[fadeIn_0.2s_ease-out]"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Title & Minimal Close Icon (No text) */}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Center: Main Image with Minimal Chevron Arrows */}
          <div
            className="relative flex-1 w-full max-w-5xl mx-auto my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow (Only minimal icon) */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-stone-900/70 text-white hover:bg-amber-500 transition-all focus:outline-none border border-white/10 backdrop-blur-md shadow-xl touch-manipulation active:scale-95"
                aria-label="Previous"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Active Image */}
            <div className="relative w-full h-full max-h-[72vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activePhotos[lightbox.photoIndex]}
                alt={`Proje ${lightbox.cardIndex + 1} Fotoğraf ${lightbox.photoIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
                quality={85}
              />
            </div>

            {/* Next Arrow (Only minimal icon) */}
            {activePhotos.length > 1 && (
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-stone-900/70 text-white hover:bg-amber-500 transition-all focus:outline-none border border-white/10 backdrop-blur-md shadow-xl touch-manipulation active:scale-95"
                aria-label="Next"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnails of all 9 photos for this card */}
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
                  onClick={() =>
                    setLightbox((prev) =>
                      prev ? { ...prev, photoIndex: pIdx } : null
                    )
                  }
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all focus:outline-none flex-shrink-0 touch-manipulation ${
                    isCurrent
                      ? 'ring-2 ring-amber-500 scale-105 opacity-100 shadow-md'
                      : 'opacity-50 hover:opacity-85 border border-white/10'
                  }`}
                  aria-label={`Fotoğraf ${pIdx + 1}`}
                >
                  <Image
                    src={src}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                    sizes="56px"
                    quality={60}
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
