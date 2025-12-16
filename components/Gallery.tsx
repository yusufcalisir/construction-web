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
        theme === 'dark' ? 'bg-dark-900' : 'bg-white'
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
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-500 group ${
                  theme === 'dark'
                    ? 'border-dark-800 hover:border-dark-700'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imagePath}
                    alt={`${t('gallery.project')} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 ${
                    theme === 'dark'
                      ? 'from-dark-950/80 via-dark-950/0 to-transparent'
                      : 'from-stone-900/60 via-stone-900/0 to-transparent'
                  }`}>
                    <p className="text-white font-semibold text-base">
                      {t('gallery.project')} {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

