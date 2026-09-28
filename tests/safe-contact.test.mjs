import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import {
  getRawPhone,
  getDisplayPhone,
  getWhatsAppUrl,
  redirectWhatsApp,
  MASKED_PHONE_DISPLAY
} from '../lib/safeContact.ts'

test('SafeContact: getRawPhone returns valid E.164 Turkish phone number', () => {
  const raw = getRawPhone()
  assert.strictEqual(typeof raw, 'string')
  assert.strictEqual(raw, '+905458259495')
  assert.match(raw, /^\+90[0-9]{10}$/)
})

test('SafeContact: getDisplayPhone returns properly formatted phone number', () => {
  const display = getDisplayPhone()
  assert.strictEqual(typeof display, 'string')
  assert.strictEqual(display, '0545 825 94 95')
})

test('SafeContact: getWhatsAppUrl returns valid wa.me URL with optional message encoding', () => {
  const defaultUrl = getWhatsAppUrl()
  assert.strictEqual(defaultUrl, 'https://wa.me/905458259495')

  const customMessage = 'Merhaba, keşif talebinde bulunmak istiyorum.'
  const customUrl = getWhatsAppUrl(customMessage)
  assert.strictEqual(
    customUrl,
    `https://wa.me/905458259495?text=${encodeURIComponent(customMessage)}`
  )
})

test('SafeContact: redirectWhatsApp is defined and handles message argument safely in Node', () => {
  assert.strictEqual(typeof redirectWhatsApp, 'function')
  // Should execute without throwing in non-browser environment
  assert.doesNotThrow(() => {
    redirectWhatsApp('Test message')
  })
})

test('SafeContact: MASKED_PHONE_DISPLAY correctly masks middle digits', () => {
  assert.strictEqual(MASKED_PHONE_DISPLAY, '0545 ••• •• 95')
  assert.ok(MASKED_PHONE_DISPLAY.includes('•••'))
})

test('SafeContact: No unmasked plain phone number is leaked directly into component JSX', () => {
  const sensitiveComponents = [
    'components/Contact.tsx',
    'components/Navbar.tsx',
    'components/Footer.tsx',
    'components/Hero.tsx'
  ]

  // Looking for literal unprotected phone number strings
  const plainPhoneRegex = /0545[\s-]?825[\s-]?94[\s-]?95/

  for (const compPath of sensitiveComponents) {
    if (fs.existsSync(compPath)) {
      const code = fs.readFileSync(compPath, 'utf8')
      assert.strictEqual(
        plainPhoneRegex.test(code),
        false,
        `Plain unmasked phone number found in ${compPath}. Use SafePhoneLink or safeContact utilities to prevent bot scraping.`
      )
    }
  }
})
