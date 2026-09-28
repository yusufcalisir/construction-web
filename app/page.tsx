'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import HowWeWork from '@/components/HowWeWork'
import Services from '@/components/Services'
import ProjectGallery from '@/components/ProjectGallery'
import ProjectEvaluation from '@/components/ProjectEvaluation'
import Contact from '@/components/Contact'
import BrandMarquee from '@/components/BrandMarquee'
import WhyBer from '@/components/WhyBer'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <HowWeWork />
      <Services />
      <ProjectGallery />
      <ProjectEvaluation />
      <Contact />
      <BrandMarquee />
      <WhyBer />
      <Footer />
    </main>
  )
}
