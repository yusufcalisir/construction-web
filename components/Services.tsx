'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const services = [
  {
    key: 'turnkey',
    imageName: 'dekorasyon.jpg',
  },
  {
    key: 'interior',
    imageName: 'mutfak.jpg',
  },
  {
    key: 'commercial',
    imageName: 'dis-cephe.jpg',
  },
  {
    key: 'systems',
    imageName: 'akilli-sistemler.jpg',
  },
  {
    key: 'restoration',
    imageName: 'restorasyon.jpg',
  },
  {
    key: 'exterior',
    imageName: 'isi-ses-yalitimi.jpg',
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

        {/* Middle of Page - Big "Teklif Al" CTA Card */}
        <div className="mt-12 sm:mt-20 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-stone-900/90 via-amber-950/20 to-stone-900/90 border border-amber-500/30 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="font-mono text-[11px] sm:text-sm tracking-[0.25em] text-amber-400 uppercase font-bold block mb-2 sm:mb-3">
              PREMİUM RENOVASYON & KEŞİF
            </span>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white font-serif mb-3 sm:mb-4 leading-tight">
              Projeniz İçin Hızlı Teklif Alın
            </h3>
            <p className="text-stone-300 text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Mekanınıza, ihtiyaçlarınıza ve bütçenize en uygun çözümleri belirlemek için projenizi hemen paylaşın, doğrudan WhatsApp üzerinden değerlendirme ve keşif takviminizi başlatalım.
            </p>
            <a
              href="#on-degerlendirme"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('on-degerlendirme')
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-12 py-3.5 sm:py-5 rounded-full font-black text-xs sm:text-base tracking-wider uppercase bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 cursor-pointer border-2 border-amber-400"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span>{t('nav.quote')}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
