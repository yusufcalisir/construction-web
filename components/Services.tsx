'use client'

import Image from 'next/image'
import { useLanguage } from './LanguageProvider'

const services = [
  {
    key: 'dekorasyon',
    imageName: 'dekorasyon.png',
  },
  {
    key: 'restorasyon',
    imageName: 'restorasyon.png',
  },
  {
    key: 'boya',
    imageName: 'boya-badana.png',
  },
  {
    key: 'alciplan',
    imageName: 'alcipan.png',
  },
  {
    key: 'fayans',
    imageName: 'fayans.png',
  },
  {
    key: 'mutfak',
    imageName: 'mutfak.png',
  },
  {
    key: 'parke',
    imageName: 'parke.png',
  },
  {
    key: 'isolation',
    imageName: 'isi-ses-yalitimi.png',
  },
  {
    key: 'facade',
    imageName: 'dis-cephe.png',
  },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 bg-stone-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 text-stone-900">
            {t('services.title')}
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 text-stone-600">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.key}
              className="rounded-xl overflow-hidden border-2 transition-all duration-500 group hover:scale-[1.02] hover:shadow-xl bg-white border-stone-300 hover:border-stone-400 shadow-lg shadow-stone-200/50"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={`/hizmetler/${service.imageName}`}
                  alt={t(`service.${service.key}`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-stone-900/40 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 transition-colors text-stone-900">
                  {t(`service.${service.key}`)}
                </h3>
                <p className="leading-relaxed text-base transition-colors text-stone-600">
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

