import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Pre-Acceleration Speed, Fluidity, and Zero-Jank Benchmark Suite.
 * Enforces non-blocking event loops, GPU-accelerated compositing, zero memory leaks,
 * instant mobile touch responsiveness, and strict non-destruction of any content.
 */

test('Speed & Jank-Free: All scroll and resize event listeners must be passive', () => {
  const componentFiles = [
    'components/Navbar.tsx',
    'components/WhatsAppWidget.tsx',
    'app/layout.tsx',
  ]

  for (const file of componentFiles) {
    if (!fs.existsSync(file)) continue
    const code = fs.readFileSync(file, 'utf8')

    // Find all occurrences of addEventListener for scroll and resize
    const searchTargets = ["addEventListener('scroll'", 'addEventListener("scroll"', "addEventListener('resize'", 'addEventListener("resize"']
    
    for (const target of searchTargets) {
      let startIndex = 0
      while ((startIndex = code.indexOf(target, startIndex)) !== -1) {
        // Look ahead 600 characters to locate the listener configuration
        const snippet = code.slice(startIndex, startIndex + 600)
        assert.ok(
          snippet.includes('passive: true'),
          `Event listener in ${file} at char ${startIndex} must specify { passive: true } to prevent main-thread scroll blocking: ${snippet.slice(0, 100)}...`
        )
        startIndex += target.length
      }
    }
  }
})

test('Speed & Jank-Free: Continuous animations must use GPU-only transform/opacity and declare will-change', () => {
  const cssPath = 'app/globals.css'
  assert.ok(fs.existsSync(cssPath), 'globals.css must exist')
  const css = fs.readFileSync(cssPath, 'utf8')

  // Marquee animations must specify will-change: transform to promote them to their own compositor layer
  assert.ok(
    css.includes('.animate-marquee-left') && css.includes('will-change: transform;'),
    'animate-marquee-left must use will-change: transform for 60fps GPU compositing'
  )
  assert.ok(
    css.includes('.animate-marquee-right') && css.includes('will-change: transform;'),
    'animate-marquee-right must use will-change: transform for 60fps GPU compositing'
  )

  // Reduced motion preference must be respected to eliminate animation overhead on constrained devices
  assert.ok(
    css.includes('@media (prefers-reduced-motion: reduce)'),
    'globals.css must respect prefers-reduced-motion to protect battery and reduce CPU frame cost'
  )
})

test('Speed & Jank-Free: Zero memory leaks - All timers and listeners have teardown cleanup', () => {
  const componentsToCheck = [
    'components/Navbar.tsx',
    'components/Hero.tsx',
    'components/WhatsAppWidget.tsx',
    'components/ProjectGallery.tsx',
    'app/page.tsx',
  ]

  for (const compPath of componentsToCheck) {
    if (!fs.existsSync(compPath)) continue
    const code = fs.readFileSync(compPath, 'utf8')

    // Check setInterval has clearInterval
    if (code.includes('setInterval(')) {
      assert.ok(
        code.includes('clearInterval('),
        `Component ${compPath} uses setInterval without clearInterval cleanup in useEffect`
      )
    }

    // Check setTimeout has clearTimeout if stored
    if (code.includes('const timer = setTimeout(')) {
      assert.ok(
        code.includes('clearTimeout('),
        `Component ${compPath} creates a timer without clearTimeout cleanup`
      )
    }

    // Check addEventListener has removeEventListener
    const addListenerCount = (code.match(/addEventListener\(/g) || []).length
    const removeListenerCount = (code.match(/removeEventListener\(/g) || []).length
    assert.strictEqual(
      addListenerCount,
      removeListenerCount,
      `Component ${compPath} has unmatched addEventListener (${addListenerCount}) vs removeEventListener (${removeListenerCount})`
    )

    // Check MutationObserver has disconnect
    if (code.includes('new MutationObserver(')) {
      assert.ok(
        code.includes('.disconnect()'),
        `Component ${compPath} creates a MutationObserver without disconnect() cleanup`
      )
    }
  }
})

test('Speed & Jank-Free: Image loading strategy prevents layout shift (CLS = 0) and reduces initial payload', () => {
  // Hero component LCP image priority
  const heroCode = fs.readFileSync('components/Hero.tsx', 'utf8')
  assert.ok(
    heroCode.includes('priority={index === 0}'),
    'Hero must prioritize the initial image to ensure sub-second Largest Contentful Paint (LCP)'
  )

  // Gallery component responsive sizes and lazy loading
  const galleryCode = fs.readFileSync('components/Gallery.tsx', 'utf8')
  assert.ok(
    galleryCode.includes('sizes='),
    'Gallery must provide responsive sizes to avoid serving desktop resolutions to mobile devices'
  )
  assert.ok(
    galleryCode.includes("'lazy'"),
    'Below-the-fold gallery images must use loading="lazy"'
  )

  // Services component responsive sizes
  const servicesCode = fs.readFileSync('components/Services.tsx', 'utf8')
  assert.ok(
    servicesCode.includes('sizes='),
    'Services component must provide responsive sizes for service category images'
  )
})

test('Speed & Jank-Free: Google Fonts are optimized with display swap and font preloading', () => {
  const layoutCode = fs.readFileSync('app/layout.tsx', 'utf8')

  // Both Inter and Playfair must have display: 'swap'
  const swapMatches = (layoutCode.match(/display:\s*['"]swap['"]/g) || []).length
  assert.ok(
    swapMatches >= 2,
    'All Google fonts in layout.tsx must specify display: swap to eliminate Flash of Invisible Text (FOIT)'
  )
})

test('Speed & Jank-Free: Mobile tap responsiveness eliminates 300ms double-tap delay', () => {
  const navbarCode = fs.readFileSync('components/Navbar.tsx', 'utf8')

  assert.ok(
    navbarCode.includes('touch-manipulation'),
    'Navbar interactive controls must use touch-manipulation to eliminate mobile browser 300ms tap delay'
  )

  // Primary interactive components must provide immediate visual feedback on tap/click
  const interactiveComponents = [
    'components/Navbar.tsx',
    'components/WhatsAppWidget.tsx',
    'components/Hero.tsx',
  ]

  for (const comp of interactiveComponents) {
    const code = fs.readFileSync(comp, 'utf8')
    assert.ok(
      code.includes('active:scale-') || code.includes('active:bg-'),
      `${comp} should provide instant visual active state feedback to prevent perceived tap lag`
    )
  }
})

test('Strict Non-Destruction: Zero content, section, or language deletion verification', () => {
  // 1. All core section components must exist and remain in page.tsx
  const pageCode = fs.readFileSync('app/page.tsx', 'utf8')
  const expectedSections = [
    '<Navbar />',
    '<Hero />',
    '<About />',
    '<Services />',
    '<HowWeWork />',
    '<WhyBer />',
    '<ProjectGallery />',
    '<Contact />',
    '<BrandMarquee />',
    '<Footer />',
  ]

  for (const section of expectedSections) {
    assert.ok(
      pageCode.includes(section),
      `CRITICAL: Section ${section} was removed from app/page.tsx. Nothing must be deleted!`
    )
  }

  // 2. All 4 languages and their keys must remain 100% intact
  const langPath = 'components/LanguageProvider.tsx'
  assert.ok(fs.existsSync(langPath), 'LanguageProvider.tsx must exist')
  const langCode = fs.readFileSync(langPath, 'utf8')

  for (const lang of ['tr:', 'en:', 'ar:', 'fa:']) {
    assert.ok(langCode.includes(lang), `Language ${lang} must not be deleted`)
  }

  // 3. All 16 gallery items are accounted for in Gallery
  const galleryCode = fs.readFileSync('components/Gallery.tsx', 'utf8')
  assert.ok(
    galleryCode.includes('length: 16'),
    'All 16 gallery showcase items must remain intact'
  )

  // 4. Safe contact triggers must remain intact
  const contactCode = fs.readFileSync('lib/safeContact.ts', 'utf8')
  assert.ok(contactCode.includes('triggerPhoneCall'), 'triggerPhoneCall must remain intact')
  assert.ok(contactCode.includes('openWhatsApp'), 'openWhatsApp must remain intact')
})
