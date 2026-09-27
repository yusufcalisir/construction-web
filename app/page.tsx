'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WhyBer from '@/components/WhyBer'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'
import BrandMarquee from '@/components/BrandMarquee'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <WhyBer />
      <HowWeWork />
      <Services />
      <ProjectGallery />
      <Contact />
      <BrandMarquee />
      <Footer />
    </main>
  )
}
