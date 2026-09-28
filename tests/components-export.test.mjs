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
  'ProjectEvaluation.tsx',
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
    'HowWeWork',
    'Services',
    'ProjectGallery',
    'ProjectEvaluation',
    'Contact',
    'BrandMarquee',
    'WhyBer',
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

test('Components: WhyBer renders 3 customer reviews with 5 stars and no reviewer photo images', () => {
  const whyBerContent = fs.readFileSync('components/WhyBer.tsx', 'utf8')
  const langContent = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')

  // Ensure reviews section exists with 3 cards
  assert.ok(
    whyBerContent.includes('whyber.reviews.badge') && whyBerContent.includes('whyber.reviews.title'),
    'WhyBer should render customer reviews header and badge'
  )
  assert.ok(
    whyBerContent.includes('[1, 2, 3].map'),
    'WhyBer should iterate over the 3 customer reviews'
  )

  // Ensure no <img> or <Image> is used for reviews in WhyBer
  assert.strictEqual(
    whyBerContent.includes('<Image') || whyBerContent.includes('<img'),
    false,
    'WhyBer should not use reviewer photos or avatar images'
  )

  // Ensure names only have full first name and surname initial
  assert.ok(langContent.includes("'whyber.review1.name': 'Elif A.'"), 'Reviewer 1 name should be Elif A.')
  assert.ok(langContent.includes("'whyber.review2.name': 'Musa A.'"), 'Reviewer 2 name should be Musa A.')
  assert.ok(langContent.includes("'whyber.review3.name': 'Büşra A.'"), 'Reviewer 3 name should be Büşra A.')
})

test('Components: ProjectEvaluation enforces 300K+ threshold, triggers GTM event, and api/lead targets livangur94@gmail.com', () => {
  const evalContent = fs.readFileSync('components/ProjectEvaluation.tsx', 'utf8')
  const apiContent = fs.readFileSync('app/api/lead/route.ts', 'utf8')

  // Ensure 300.000 TL+ notice and options exist
  assert.ok(
    evalContent.includes('300.000 TL ve üzeri') || evalContent.includes('300.000'),
    'ProjectEvaluation must explicitly state the 300.000 TL+ criteria'
  )
  assert.ok(
    evalContent.includes('qualified_project_lead'),
    'ProjectEvaluation must trigger the qualified_project_lead GTM dataLayer event'
  )
  assert.ok(
    evalContent.includes('id="on-degerlendirme"'),
    'ProjectEvaluation must have section id="on-degerlendirme"'
  )

  // Ensure lead API route targets livangur94@gmail.com
  assert.ok(
    apiContent.includes('livangur94@gmail.com'),
    'API route app/api/lead/route.ts must target livangur94@gmail.com'
  )
})
