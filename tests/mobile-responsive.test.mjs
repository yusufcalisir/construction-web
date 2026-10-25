import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Mobile Responsive: Navbar mobile menu handles state, scroll lock, and all 6 navigation links', () => {
  const navbarContent = fs.readFileSync('components/Navbar.tsx', 'utf8')

  // Check state toggle and body scroll lock
  assert.ok(navbarContent.includes('setIsMobileMenuOpen'), 'Navbar must manage mobile menu open state')
  assert.ok(navbarContent.includes('document.body.classList.add(\'mobile-menu-open\')'), 'Body must receive mobile-menu-open class')
  assert.ok(navbarContent.includes('document.body.style.overflow = \'hidden\''), 'Body overflow must be hidden when menu is open')

  // Check resize handler auto-closes on desktop
  assert.ok(navbarContent.includes('window.innerWidth >= 1024'), 'Mobile menu must auto-close on desktop breakpoint (1024px)')

  // Check mobile navigation overlay has dir="ltr" and all 6 section links
  const expectedMobileLinks = ['home', 'about', 'services', 'how-we-work', 'gallery', 'contact']
  for (const linkId of expectedMobileLinks) {
    assert.ok(
      navbarContent.includes(`id: '${linkId}'`),
      `Mobile menu must contain navigation link for ${linkId}`
    )
  }

  // Check mobile bottom action pair (WhatsApp and Call)
  assert.ok(navbarContent.includes('SafeWhatsAppButton'), 'Mobile menu must include WhatsApp action')
  assert.ok(navbarContent.includes('triggerPhoneCall()'), 'Mobile menu must include Call action')
})

test('Mobile Responsive: Hero and Services sections use responsive flex/grid wrappers', () => {
  const heroContent = fs.readFileSync('components/Hero.tsx', 'utf8')
  const servicesContent = fs.readFileSync('components/Services.tsx', 'utf8')
  const aboutContent = fs.readFileSync('components/About.tsx', 'utf8')

  // Hero responsiveness
  assert.ok(
    heroContent.includes('flex flex-col sm:flex-row'),
    'Hero CTA buttons must stack vertically on mobile and horizontally on sm+'
  )
  assert.ok(
    heroContent.includes('justify-center'),
    'Hero CTA buttons must be centered across viewports'
  )

  // Services responsive grid
  assert.ok(
    servicesContent.includes('grid-cols-1 md:grid-cols-2 lg:grid-cols-3'),
    'Services must render 1 col on mobile, 2 on tablet, 3 on desktop'
  )

  // About responsive grid
  assert.ok(
    aboutContent.includes('grid-cols-1 sm:grid-cols-3'),
    'About section must stack on mobile and split 3 columns on sm+'
  )
})

test('Mobile Responsive: Floating WhatsApp widget responds to mobile menu and page scroll bounds', () => {
  const widgetContent = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')

  // Hidden during mobile menu
  assert.ok(
    widgetContent.includes('mobile-menu-open'),
    'Widget must listen to mobile-menu-open body class to prevent overlapping mobile menu'
  )
  assert.ok(
    widgetContent.includes('!isVisible || isMobileMenuOpen'),
    'Widget must return null when mobile menu is open'
  )

  // Responsive padding and dimensions
  assert.ok(
    widgetContent.includes('bottom-4 right-4 sm:bottom-6 sm:right-6'),
    'Widget must have responsive bottom-right spacing'
  )
  assert.ok(
    widgetContent.includes('w-12 h-12 sm:w-14 sm:h-14'),
    'Floating buttons must have responsive diameter (min 48px touch target)'
  )
})
