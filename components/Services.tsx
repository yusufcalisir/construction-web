'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const services = [
  {
    key: 'turnkey',
    imageName: 'dekorasyon.jpg',
    icon: '🏠',
  },
  {
    key: 'interior',
    imageName: 'mutfak.jpg',
    icon: '✏️',
  },
  {
    key: 'commercial',
    imageName: 'dis-cephe.jpg',
    icon: '🏢',
  },
  {
    key: 'systems',
    imageName: 'akilli-sistemler.jpg',
    icon: '⚡',
  },
  {
    key: 'restoration',
    imageName: 'restorasyon.jpg',
    icon: '🏛️',
  },
  {
    key: 'exterior',
    imageName: 'isi-ses-yalitimi.jpg',
    icon: '🌿',
  },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold uppercase block mb-4">
            {t('services.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif">
            {t('services.title')}
          </h2>
          <p className="mt-6 text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
          <div className="h-[2px] w-16 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.key}
              className="relative rounded-2xl overflow-hidden border border-stone-800/60 shadow-2xl transition-all duration-500 group hover:scale-[1.02] hover:border-amber-500/40 bg-stone-900/50 flex flex-col"
            >
              {/* Amber top accent line */}
              <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300 w-0 group-hover:w-full transition-all duration-700 z-20" />

              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden shrink-0">
                <Image
                  src={`/hizmetler/${service.imageName}`}
                  alt={t(`service.${service.key}.name`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10" />
                {/* Index badge */}
                <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <span className="text-amber-400 text-xs font-bold font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-amber-400 transition-colors font-serif leading-snug">
                  {t(`service.${service.key}.name`)}
                </h3>
                <p className="leading-relaxed text-sm text-stone-400 flex-1">
                  {t(`service.${service.key}.desc`)}
                </p>

                {/* Scope tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    t(`service.${service.key}.tag1`),
                    t(`service.${service.key}.tag2`),
                    t(`service.${service.key}.tag3`),
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-stone-800/80 text-stone-400 border border-stone-700/50 group-hover:border-amber-500/30 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-stone-400 text-sm mb-4">{t('services.cta.label')}</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('contact')
              if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm border border-amber-500/60 text-amber-400 hover:bg-amber-500 hover:text-stone-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
          >
            {t('services.cta.button')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
