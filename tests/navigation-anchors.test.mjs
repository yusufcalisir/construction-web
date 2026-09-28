import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Navigation: All anchor links in Navbar point to existing section IDs', () => {
  const navbarContent = fs.readFileSync('components/Navbar.tsx', 'utf8')
  
  // Extract all href="#..." anchors
  const hrefRegex = /href="#([a-zA-Z0-9_-]+)"/g
  const navbarAnchors = new Set()
  let match
  while ((match = hrefRegex.exec(navbarContent)) !== null) {
    navbarAnchors.add(match[1])
  }

  // Scan all components for section id="..."
  const sectionIdRegex = /id="([a-zA-Z0-9_-]+)"/g
  const existingSectionIds = new Set()

  const componentFiles = fs.readdirSync('components').filter((f) => f.endsWith('.tsx'))
  for (const file of componentFiles) {
    const code = fs.readFileSync(`components/${file}`, 'utf8')
    let idMatch
    while ((idMatch = sectionIdRegex.exec(code)) !== null) {
      existingSectionIds.add(idMatch[1])
    }
  }

  for (const anchor of navbarAnchors) {
    assert.ok(
      existingSectionIds.has(anchor),
      `Navbar contains dead anchor link: #${anchor} (no component has id="${anchor}")`
    )
  }
})

test('Navigation: All anchor links in Footer point to existing section IDs', () => {
  const footerContent = fs.readFileSync('components/Footer.tsx', 'utf8')
  
  // Extract all href="#..." or hash: '#...'
  const hashRegex = /hash:\s*['"]#([a-zA-Z0-9_-]+)['"]/g
  const footerAnchors = new Set()
  let match
  while ((match = hashRegex.exec(footerContent)) !== null) {
    footerAnchors.add(match[1])
  }

  // Scan all components for section id="..."
  const sectionIdRegex = /id="([a-zA-Z0-9_-]+)"/g
  const existingSectionIds = new Set()

  const componentFiles = fs.readdirSync('components').filter((f) => f.endsWith('.tsx'))
  for (const file of componentFiles) {
    const code = fs.readFileSync(`components/${file}`, 'utf8')
    let idMatch
    while ((idMatch = sectionIdRegex.exec(code)) !== null) {
      existingSectionIds.add(idMatch[1])
    }
  }

  for (const anchor of footerAnchors) {
    assert.ok(
      existingSectionIds.has(anchor),
      `Footer contains dead anchor link: #${anchor} (no component has id="${anchor}")`
    )
  }
})

test('Navigation: Navbar scroll-spy sections order matches physical page DOM order', () => {
  const navbarContent = fs.readFileSync('components/Navbar.tsx', 'utf8')
  const sectionsMatch = navbarContent.match(/const sections = \[([^\]]+)\]/)
  assert.ok(sectionsMatch, 'Could not locate sections array in Navbar.tsx')

  const parsedSections = sectionsMatch[1]
    .split(',')
    .map((s) => s.trim().replace(/['"]/g, ''))
    .filter(Boolean)

  // Expected physical order on app/page.tsx
  const expectedOrder = [
    'home',
    'about',
    'how-we-work',
    'services',
    'gallery',
    'contact',
    'footer'
  ]

  assert.deepStrictEqual(
    parsedSections,
    expectedOrder,
    `Navbar sections array does not match physical DOM page order. Current: ${JSON.stringify(parsedSections)}, Expected: ${JSON.stringify(expectedOrder)}`
  )
})

test('Navigation: WhatsAppWidget hides on Home, Contact, and Footer sections', () => {
  const widgetContent = fs.readFileSync('components/WhatsAppWidget.tsx', 'utf8')
  
  assert.ok(
    widgetContent.includes("document.getElementById('home')"),
    'WhatsAppWidget should check home section to avoid duplicate button on Hero'
  )
  assert.ok(
    widgetContent.includes("document.getElementById('contact')"),
    'WhatsAppWidget should check contact section to avoid duplicate button in Contact'
  )
  assert.ok(
    widgetContent.includes("document.getElementById('footer')"),
    'WhatsAppWidget should check footer section to avoid duplicate button in Footer'
  )
  assert.ok(
    widgetContent.includes('mobile-menu-open'),
    'WhatsAppWidget should detect mobile-menu-open state to avoid duplicating button in mobile menu'
  )
})
