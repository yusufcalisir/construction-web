'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Gallery from '@/components/Gallery'
import Services from '@/components/Services'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Gallery />
      <Services />
      <ProjectGallery />
      <Contact />
      <Footer />
    </main>
  )
}

