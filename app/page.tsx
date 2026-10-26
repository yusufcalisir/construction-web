'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import WhyBer from '@/components/WhyBer'
import ProjectGallery from '@/components/ProjectGallery'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import BrandMarquee from '@/components/BrandMarquee'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    const handleUrlCleanAndScroll = () => {
      if (typeof window === 'undefined') return

      const rawHash = window.location.hash.replace('#', '')
      if (rawHash) {
        const el = document.getElementById(rawHash)
        if (el) {
          const targetTop = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth',
          })
        }
      }

      if (window.location.search || window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname)
      }
    }

    // Run on initial mount to clean any initial ?lang=... or #...
    const timer = setTimeout(handleUrlCleanAndScroll, 80)
    window.addEventListener('hashchange', handleUrlCleanAndScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('hashchange', handleUrlCleanAndScroll)
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowWeWork />
      <WhyBer />
      <ProjectGallery />
      <FAQ />
      <Contact />
      <BrandMarquee />
      <Footer />
    </main>
  )
}
