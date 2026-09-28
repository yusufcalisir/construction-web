'use client'

import React, { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import { redirectWhatsApp } from '@/lib/safeContact'

const DISTRICTS = [
  'Kadıköy',
  'Beşiktaş',
  'Sarıyer',
  'Bakırköy',
  'Üsküdar',
  'Ataşehir',
  'Şişli',
  'Beyoğlu',
  'Maltepe',
  'Beykoz',
  'Diğer İstanbul İlçesi',
]

const PROPERTY_TYPES = [
  {
    id: 'Daire',
    label: 'Daire',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
      </svg>
    ),
  },
  {
    id: 'Villa',
    label: 'Villa',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    id: 'Rezidans',
    label: 'Rezidans',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-8h1m-1 4h1m-1 4h1" />
      </svg>
    ),
  },
  {
    id: 'Müstakil Ev',
    label: 'Müstakil Ev',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 'Ofis / Ticari',
    label: 'Ofis / Ticari',
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 4h4v3h-4V4z" />
      </svg>
    ),
  },
]

const AREA_RANGES = ['50 – 100 m²', '100 – 150 m²', '150 – 250 m²', '250 m² ve Üzeri']

const SERVICES = [
  { id: 'Komple Anahtar Teslim Renovasyon', label: 'Komple Tadilat (Anahtar Teslim)', highlight: true },
  { id: 'Mutfak & Ada Tezgah', label: 'Mutfak & Ada Tezgah' },
  { id: 'Banyo & Tesisat', label: 'Banyo & Tesisat' },
  { id: 'Zemin & Parke', label: 'Zemin & Parke' },
  { id: 'Boya Badana', label: 'Boya Badana' },
  { id: 'Elektrik & Akıllı Ev', label: 'Elektrik & Akıllı Ev' },
  { id: 'Duvar & Alçıpan Tavan', label: 'Duvar & Alçıpan' },
  { id: 'Dış Cephe & Yalıtım', label: 'Dış Cephe & Yalıtım' },
]

const BUDGET_RANGES = [
  { id: '300.000 – 500.000 TL', label: '300.000 – 500.000 TL' },
  { id: '500.000 – 750.000 TL', label: '500.000 – 750.000 TL' },
  { id: '750.000 – 1.000.000 TL', label: '750.000 – 1.000.000 TL' },
  { id: '1.000.000 TL ve Üzeri', label: '1.000.000 TL ve Üzeri' },
]

const TIMELINES = [
  { id: 'Hemen (1-2 Hafta)', label: 'Hemen (1-2 Hafta)' },
  { id: '1 Ay İçinde', label: '1 Ay İçinde' },
  { id: '1 – 3 Ay İçinde', label: '1 – 3 Ay İçinde' },
  { id: 'Planlama Aşaması', label: 'Planlama Aşaması' },
]

export default function ProjectEvaluation() {
  const { t } = useLanguage()

  // Form State
  const [district, setDistrict] = useState('')
  const [propertyType, setPropertyType] = useState('Daire')
  const [area, setArea] = useState('100 – 150 m²')
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Komple Anahtar Teslim Renovasyon',
  ])
  const [budget, setBudget] = useState('500.000 – 750.000 TL')
  const [timeline, setTimeline] = useState('1 Ay İçinde')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isQualified, setIsQualified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((s) => s !== serviceId)
      } else {
        return [...prev, serviceId]
      }
    })
  }

  // Qualification Algorithm
  const calculateQualification = () => {
    // 1. Budget is 300.000 TL+ (all choices in form satisfy this)
    const hasValidBudget = Boolean(budget)
    // 2. Either 'Komple Anahtar Teslim Renovasyon' or at least 2 distinct services
    const hasScope =
      selectedServices.includes('Komple Anahtar Teslim Renovasyon') ||
      selectedServices.length >= 2
    // 3. District is specified
    const hasDistrict = Boolean(district)
    // 4. Valid phone
    const hasPhone = phone.replace(/\D/g, '').length >= 10

    return hasValidBudget && hasScope && hasDistrict && hasPhone
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!district) {
      setErrorMessage('Lütfen projenizin bulunduğu ilçeyi seçiniz.')
      return
    }

    if (selectedServices.length === 0) {
      setErrorMessage('Lütfen yapılacak işlerden en az birini seçiniz.')
      return
    }

    if (!name.trim()) {
      setErrorMessage('Lütfen adınızı ve soyadınızı belirtiniz.')
      return
    }

    const cleanPhone = phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setErrorMessage('Lütfen geçerli bir telefon numarası giriniz (en az 10 hane).')
      return
    }

    setIsSubmitting(true)
    const qualified = calculateQualification()
    setIsQualified(qualified)

    // GTM / Google Ads conversion tracking
    if (typeof window !== 'undefined') {
      const win = window as any
      win.dataLayer = win.dataLayer || []
      if (qualified) {
        win.dataLayer.push({
          event: 'qualified_lead_submitted',
          lead_district: district,
          lead_property: propertyType,
          lead_area: area,
          lead_scope: selectedServices.join(', '),
          lead_budget: budget,
          lead_timeline: timeline,
          lead_name: name.trim(),
          is_qualified: true,
        })
      }
      win.dataLayer.push({ event: 'lead_form_submitted', is_qualified: qualified })
    }

    // Direct single-click redirect to WhatsApp without intermediate screen
    redirectWhatsApp(generateWhatsAppMessage())

    // If user returns back to tab, re-enable button after short delay
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  // Generate structured message for WhatsApp pre-fill without emojis (prevents character corruption like  in wa.me redirects)
  const generateWhatsAppMessage = () => {
    const lines = [
      'Merhaba Ber Tadilat, web sitenizden Proje Ön Değerlendirme Formu doldurdum.',
      '',
      '*Proje Bilgileri:*',
      `- İlçe: ${district}`,
      `- Mekan: ${propertyType} (${area})`,
      `- Yapılacak İşler: ${selectedServices.join(', ')}`,
      `- Bütçe: ${budget}`,
      `- Hedef Başlama: ${timeline}`,
      `- Ad Soyad: ${name.trim()}`,
      `- Telefon: ${phone.trim()}`,
    ]

    if (notes && notes.trim()) {
      lines.push(`- Not: ${notes.trim()}`)
    }

    lines.push('', 'Detayları ve keşif takvimini görüşebilir miyiz?')

    return lines.join('\n')
  }

  return (
    <section
      id="on-degerlendirme"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-stone-950 text-white relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] text-amber-400 font-bold uppercase block mb-3">
            {t('evaluation.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-serif mb-6">
            {t('evaluation.title')}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t('evaluation.subtitle')}
          </p>

          {/* Explicit 300K+ Project Criterion Banner */}
          <div className="mt-8 mx-auto max-w-2xl bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-3.5 text-left">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-medium">
              <strong className="text-amber-300 font-bold">Önemli Bilgilendirme:</strong> Bu form{' '}
              <strong>300.000 TL ve üzeri</strong> kapsamlı tadilat ve renovasyon projeleri içindir.
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Interactive Pre-Evaluation Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Location & Property */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-3">
                  1. Proje Lokasyonu (İlçe Seçimi) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  required
                >
                  <option value="" disabled>
                    Lütfen İlçe Seçiniz
                  </option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Property Type & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-3">
                    2. Mekan Türü *
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {PROPERTY_TYPES.map((p) => {
                      const isSelected = propertyType === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPropertyType(p.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <span>{p.icon}</span>
                          <span>{p.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-3">
                    3. Yaklaşık Alan (m²) *
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {AREA_RANGES.map((a) => {
                      const isSelected = area === a
                      return (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setArea(a)}
                          className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          {a}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Services (Multi-select) */}
              <div>
                <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-1">
                  4. Yapılacak İşler (Çoklu Seçim Yapabilirsiniz) *
                </label>
                <span className="text-xs text-stone-400 block mb-3">
                  (En az birini seçiniz; komple renovasyon veya en az 2 kalem iş öncelikli değerlendirilir)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv.id)
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-sm'
                            : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-amber-500 border-amber-500 text-stone-950'
                              : 'border-stone-600'
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="line-clamp-1">{srv.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 4: Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-3">
                    5. Bütçe Aralığı *
                  </label>
                  <div className="space-y-2">
                    {BUDGET_RANGES.map((b) => {
                      const isSelected = budget === b.id
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.id)}
                          className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <span>{b.label}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-3">
                    6. Başlama Zamanı *
                  </label>
                  <div className="space-y-2">
                    {TIMELINES.map((tItem) => {
                      const isSelected = timeline === tItem.id
                      return (
                        <button
                          key={tItem.id}
                          type="button"
                          onClick={() => setTimeline(tItem.id)}
                          className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <span>{tItem.label}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Step 5: Contact Info */}
              <div className="pt-2 border-t border-stone-800">
                <label className="block text-xs font-mono tracking-widest text-amber-400 uppercase font-bold mb-4">
                  7. İletişim Bilgileriniz *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Adınız ve Soyadınız *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Telefon Numaranız (WhatsApp) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Varsa mekanla veya projeyle ilgili ek detaylar (opsiyonel)..."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs sm:text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-stone-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>WhatsApp&apos;a Yönlendiriliyorsunuz...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span>WhatsApp ile Ön Değerlendirmeyi Gönder</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-400 mt-3">
                  Verileriniz gizlilik prensiplerimiz gereği korunur ve 3. şahıslarla paylaşılmaz.
                </p>
              </div>
            </form>
        </div>
      </div>
    </section>
  )
}
