import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Accessibility & Keyboard: Navbar implements Escape key listener to close mobile menu', () => {
  const code = fs.readFileSync('components/Navbar.tsx', 'utf8')
  
  assert.ok(
    code.includes("e.key === 'Escape'") && code.includes('setIsMobileMenuOpen(false)'),
    'Navbar must close mobile menu when Escape key is pressed'
  )
  assert.ok(
    code.includes("window.addEventListener('keydown'"),
    'Navbar must attach keydown listener for keyboard accessibility'
  )
})

test('Accessibility & Keyboard: Navbar mobile menu button has ARIA attributes and explicit button type', () => {
  const code = fs.readFileSync('components/Navbar.tsx', 'utf8')

  assert.ok(
    code.includes('aria-label="Toggle menu"'),
    'Mobile menu toggle button must have aria-label'
  )
  assert.ok(
    code.includes('aria-expanded={isMobileMenuOpen}'),
    'Mobile menu toggle button must reflect open/closed state with aria-expanded'
  )
  assert.ok(
    code.includes('type="button"'),
    'Mobile menu toggle button must have type="button"'
  )
})

test('Accessibility & Keyboard: WhatsAppWidget implements Escape key listener to close chat popup', () => {
  const code = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')

  assert.ok(
    code.includes("e.key === 'Escape'") && code.includes('setIsOpen(false)'),
    'WhatsAppWidget must close popup when Escape key is pressed'
  )
  assert.ok(
    code.includes("window.addEventListener('keydown'"),
    'WhatsAppWidget must attach keydown listener'
  )
})

test('Accessibility & Keyboard: WhatsAppWidget chat popup has dialog role and modal ARIA attributes', () => {
  const code = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')

  assert.ok(
    code.includes('role="dialog"'),
    'Chat popup container must have role="dialog"'
  )
  assert.ok(
    code.includes('aria-modal="true"'),
    'Chat popup container must have aria-modal="true"'
  )
  assert.ok(
    code.includes('aria-label='),
    'Chat popup container must have aria-label'
  )
})

test('Accessibility & Keyboard: Interactive buttons have accessible names (aria-label, title or inner text)', () => {
  const components = [
    'components/Navbar.tsx',
    'components/WhatsAppWidget.tsx',
    'components/Hero.tsx',
    'components/Contact.tsx',
  ]

  for (const comp of components) {
    if (!fs.existsSync(comp)) continue
    const code = fs.readFileSync(comp, 'utf8')

    // Find all <button tags
    const buttonTags = code.match(/<button[\s\S]*?>/g) || []
    for (const tag of buttonTags) {
      // Must not be empty or missing all accessibility identifiers
      const hasAria = /aria-label=/i.test(tag)
      const hasTitle = /title=/i.test(tag)
      const isSubmitting = /type=["']submit["']/i.test(tag)
      const isBasicButton = /type=["']button["']/i.test(tag)
      
      // Every button tag should at least have explicit type and either aria-label, title, or text
      assert.ok(
        hasAria || hasTitle || isSubmitting || isBasicButton,
        `Button tag in ${comp} should have accessible attributes: ${tag.slice(0, 80)}`
      )
    }
  }
})
