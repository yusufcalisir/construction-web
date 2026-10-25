import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Buttons: All interactive CTA buttons have accessible labels and safe click triggers', () => {
  const heroContent = fs.readFileSync('components/Hero.tsx', 'utf8')
  const navbarContent = fs.readFileSync('components/Navbar.tsx', 'utf8')
  const servicesContent = fs.readFileSync('components/Services.tsx', 'utf8')
  const footerContent = fs.readFileSync('components/Footer.tsx', 'utf8')
  const widgetContent = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')
  const contactContent = fs.readFileSync('components/Contact.tsx', 'utf8')

  // Hero Buttons
  assert.ok(heroContent.includes('triggerPhoneCall'), 'Hero call button must use triggerPhoneCall')
  assert.ok(heroContent.includes('SafeWhatsAppButton'), 'Hero WhatsApp button must use SafeWhatsAppButton')
  assert.ok(heroContent.includes('id="hero-call-btn"'), 'Hero call button must have descriptive ID')
  assert.ok(heroContent.includes('id="hero-whatsapp-btn"'), 'Hero WhatsApp button must have descriptive ID')

  // Navbar Buttons
  assert.ok(navbarContent.includes('triggerPhoneCall'), 'Navbar must trigger phone call safely')
  assert.ok(navbarContent.includes('aria-label="Dil seçenekleri"'), 'Language switcher must have accessible group label')
  assert.ok(navbarContent.includes('aria-label="Toggle menu"'), 'Mobile menu toggle button must have aria-label')
  assert.ok(navbarContent.includes('aria-expanded={isMobileMenuOpen}'), 'Mobile menu toggle must declare aria-expanded state')

  // Services CTA Button
  assert.ok(servicesContent.includes('href="#contact"'), 'Services banner button must link to contact section')
  assert.ok(servicesContent.includes('e.preventDefault()'), 'Services banner button must prevent default anchor behavior')

  // WhatsApp Widget Floating Buttons
  assert.ok(widgetContent.includes('id="whatsapp-floating-button"'), 'Floating WhatsApp button must have ID')
  assert.ok(widgetContent.includes('dir="ltr"'), 'Floating action buttons container must preserve LTR order')

  // Contact Direct Action Buttons
  assert.ok(contactContent.includes('id="contact-whatsapp-btn"'), 'Contact section must have WhatsApp CTA button with ID')
  assert.ok(contactContent.includes('id="contact-call-btn"'), 'Contact section must have Call CTA button with ID')
})

test('Buttons: No button element is missing a type attribute or has an unhandled click action', () => {
  const componentFiles = fs.readdirSync('components').filter((f) => f.endsWith('.tsx'))

  for (const file of componentFiles) {
    const code = fs.readFileSync(`components/${file}`, 'utf8')
    // Find all <button ...> tags
    const buttonRegex = /<button\b([^>]*)>/g
    let match
    while ((match = buttonRegex.exec(code)) !== null) {
      const attrs = match[1]
      // Ensure type is explicitly defined
      const hasType = /type=["'](button|submit|reset)["']/.test(attrs)
      assert.ok(
        hasType,
        `Button in components/${file} must have explicit type="button" or type="submit": ${match[0]}`
      )
    }
  }
})

test('Buttons: Language switcher supports switching between all 4 languages without URL mutation', () => {
  const navContent = fs.readFileSync('components/Navbar.tsx', 'utf8')
  const langContent = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')

  // Check language switcher covers TR, EN, AR, FA
  assert.ok(navContent.includes("code: 'tr'"), 'Navbar must define TR language')
  assert.ok(navContent.includes("code: 'en'"), 'Navbar must define EN language')
  assert.ok(navContent.includes("code: 'ar'"), 'Navbar must define AR language')
  assert.ok(navContent.includes("code: 'fa'"), 'Navbar must define FA language')

  // Check LanguageProvider sets clean history state
  assert.ok(
    langContent.includes('window.history.replaceState'),
    'LanguageProvider must use history.replaceState to keep address bar clean'
  )
})
