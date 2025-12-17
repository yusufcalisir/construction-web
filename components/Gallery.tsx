'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'
import { useTheme } from './ThemeProvider'

// Get gallery image path from /public/calisma-galeri/
const getGalleryImage = (index: number) => {
  const imageNumber = index + 1
  return `/calisma-galeri/image-${imageNumber}.jpg`
}

export default function Gallery() {
  const { t } = useLanguage()
  const { theme } = useTheme()

  return (
    <section
      id="works"
      className={`py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-dark-900' : 'bg-stone-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-stone-900'
          }`}>
            {t('gallery.title')}
          </h2>
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            theme === 'dark' ? 'text-dark-400' : 'text-stone-600'
          }`}>
            {t('gallery.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => {
            const imagePath = getGalleryImage(index)

            return (
              <div
                key={index}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-500 group hover:scale-[1.02] hover:shadow-xl ${
                  theme === 'dark'
                    ? 'border-dark-800 hover:border-dark-700 shadow-lg shadow-dark-950/50'
                    : 'border-stone-300 hover:border-stone-400 shadow-lg shadow-stone-200/50'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imagePath}
                    alt={`${t('gallery.project')} ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

