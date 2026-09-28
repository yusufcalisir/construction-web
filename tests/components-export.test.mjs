import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

const REQUIRED_PAGE_COMPONENTS = [
  'Navbar.tsx',
  'Hero.tsx',
  'About.tsx',
  'WhyBer.tsx',
  'HowWeWork.tsx',
  'Services.tsx',
  'ProjectGallery.tsx',
  'Contact.tsx',
  'BrandMarquee.tsx',
  'Footer.tsx',
  'WhatsAppWidget.tsx',
  'SafePhoneLink.tsx',
  'SafeWhatsAppButton.tsx',
  'LanguageProvider.tsx'
]

test('Components: All required page components exist and export default or named components', () => {
  for (const componentFile of REQUIRED_PAGE_COMPONENTS) {
    const filePath = `components/${componentFile}`
    assert.ok(fs.existsSync(filePath), `Component file missing: ${filePath}`)
    
    const content = fs.readFileSync(filePath, 'utf8')
    assert.ok(
      content.includes('export default') || content.includes('export function'),
      `Component ${componentFile} does not export a component function`
    )
  }
})

test('Components: app/page.tsx imports and renders all required section components in order', () => {
  const pageContent = fs.readFileSync('app/page.tsx', 'utf8')

  const expectedComponents = [
    'Navbar',
    'Hero',
    'About',
    'WhyBer',
    'HowWeWork',
    'Services',
    'ProjectGallery',
    'Contact',
    'BrandMarquee',
    'Footer'
  ]

  let lastIndex = -1
  for (const comp of expectedComponents) {
    const importMatch = pageContent.includes(`import ${comp}`)
    assert.ok(importMatch, `app/page.tsx does not import component: ${comp}`)

    const renderIndex = pageContent.indexOf(`<${comp}`)
    assert.ok(renderIndex !== -1, `app/page.tsx does not render component: <${comp} />`)
    assert.ok(
      renderIndex > lastIndex,
      `Component ${comp} is rendered out of order in app/page.tsx`
    )
    lastIndex = renderIndex
  }
})

test('Components: LanguageProvider client directive and storage initialization', () => {
  const langContent = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')
  assert.ok(
    langContent.startsWith("'use client'") || langContent.startsWith('"use client"'),
    'LanguageProvider must be a client component'
  )
  assert.ok(
    langContent.includes('useLanguage'),
    'LanguageProvider must export useLanguage hook'
  )
})
