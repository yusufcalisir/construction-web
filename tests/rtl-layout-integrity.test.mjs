import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('RTL Layout Integrity: Navbar retains LTR layout lock to preserve brand symmetry in all languages', () => {
  const navbarContent = fs.readFileSync('components/Navbar.tsx', 'utf8')

  // Desktop navigation container must lock dir="ltr"
  assert.ok(
    navbarContent.includes('dir="ltr"'),
    'Navbar component must enforce dir="ltr" to prevent RTL collision between brand logo and menu links'
  )

  // Mobile menu overlay must also lock dir="ltr"
  const mobileOverlayMatch = /isMobileMenuOpen\s*&&\s*\(\s*<div[^>]*dir="ltr"/s.test(navbarContent)
  assert.ok(
    mobileOverlayMatch,
    'Mobile navigation overlay must enforce dir="ltr" so mobile action pair does not reverse'
  )
})

test('RTL Layout Integrity: Hero CTA buttons container retains LTR lock and horizontal centering', () => {
  const heroContent = fs.readFileSync('components/Hero.tsx', 'utf8')

  // Find CTA buttons wrapper
  const hasCenteredLtrCta = /<div[^>]*flex flex-col sm:flex-row[^>]*justify-center[^>]*dir="ltr"/s.test(heroContent)
  assert.ok(
    hasCenteredLtrCta,
    'Hero CTA container must enforce both justify-center and dir="ltr" to prevent button swapping in RTL'
  )

  // WhatsApp must precede Call in DOM structure
  const waIndex = heroContent.indexOf('id="hero-whatsapp-btn"')
  const callIndex = heroContent.indexOf('id="hero-call-btn"')
  assert.ok(waIndex !== -1 && callIndex !== -1, 'Both Hero CTA buttons must exist')
  assert.ok(waIndex < callIndex, 'WhatsApp button must precede Call button in DOM order')
})

test('RTL Layout Integrity: Floating WhatsApp and Call widget retains LTR lock', () => {
  const widgetContent = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')

  // Floating button group must enforce dir="ltr"
  const hasFloatingLtrLock = /fixed bottom-[^>]*dir="ltr"/s.test(widgetContent)
  assert.ok(
    hasFloatingLtrLock,
    'Floating action widget must lock dir="ltr" so Call and WhatsApp buttons never flip in RTL'
  )
})

test('RTL Layout Integrity: LanguageProvider applies correct html dir and typography classes', () => {
  const langContent = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')

  // Check RTL condition definition
  assert.ok(
    langContent.includes("const isRTL = language === 'ar' || language === 'fa'"),
    'LanguageProvider must recognize Arabic and Persian as RTL'
  )
  assert.ok(
    langContent.includes("document.documentElement.dir = isRTL ? 'rtl' : 'ltr'"),
    'document dir attribute must dynamically switch between rtl and ltr'
  )

  // Check specific language CSS helper classes for custom typography
  assert.ok(langContent.includes("classList.add('lang-fa')"), 'Persian must add lang-fa class')
  assert.ok(langContent.includes("classList.add('lang-ar')"), 'Arabic must add lang-ar class')
})
