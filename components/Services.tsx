'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const services = [
  {
    key: 'dekorasyon',
    imageName: 'dekorasyon.jpg',
  },
  {
    key: 'restorasyon',
    imageName: 'restorasyon.jpg',
  },
  {
    key: 'boya',
    imageName: 'boya-badana.jpg',
  },
  {
    key: 'alciplan',
    imageName: 'alcipan.jpg',
  },
  {
    key: 'fayans',
    imageName: 'fayans.jpg',
  },
  {
    key: 'mutfak',
    imageName: 'mutfak.jpg',
  },
  {
    key: 'parke',
    imageName: 'parke.jpg',
  },
  {
    key: 'isolation',
    imageName: 'isi-ses-yalitimi.jpg',
  },
  {
    key: 'facade',
    imageName: 'dis-cephe.jpg',
  },
  {
    key: 'akillisistem',
    imageName: 'akilli-sistemler.jpg',
  },
  {
    key: 'tesisat',
    imageName: 'tesisat.jpg',
  },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-stone-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Unified Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-bold uppercase block mb-4">
            {t('services.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight font-serif">
            {t('services.subtitle')}
          </h2>
          <div className="h-[2px] w-12 bg-amber-500 mx-auto mt-8 rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="relative rounded-3xl overflow-hidden border border-stone-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:border-stone-300/80 bg-white flex flex-col h-full w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]"
            >
              {/* Symmetrical Gold Line Sweep on hover */}
              <div className="absolute top-0 left-0 h-[3px] bg-amber-500 w-0 group-hover:w-full transition-all duration-500 z-20" />

              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={`/hizmetler/${service.imageName}`}
                  alt={t(`service.${service.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-stone-950/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 transition-colors text-stone-900 group-hover:text-amber-600 font-serif">
                  {t(`service.${service.key}`)}
                </h3>
                <p className="leading-relaxed text-sm text-stone-500">
                  {t(`service.${service.key}.desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

