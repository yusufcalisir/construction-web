import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('SEO: Sitemap contains valid URLs and language alternates without dead anchors', () => {
  const sitemapContent = fs.readFileSync('app/sitemap.ts', 'utf8')
  
  // Ensure no deprecated anchors like #works are in sitemap
  assert.strictEqual(
    sitemapContent.includes('#works'),
    false,
    'Deprecated anchor #works should not exist in sitemap.ts'
  )

  // Ensure valid section anchors exist
  assert.ok(sitemapContent.includes('#about'), 'Sitemap should include #about section')
  assert.ok(sitemapContent.includes('#services'), 'Sitemap should include #services section')
  assert.ok(sitemapContent.includes('#gallery'), 'Sitemap should include #gallery section')
  assert.ok(sitemapContent.includes('#contact'), 'Sitemap should include #contact section')

  // Ensure all 4 languages are represented in alternates
  for (const lang of ['tr', 'en', 'ar', 'fa']) {
    assert.ok(
      sitemapContent.includes(`${lang}:`),
      `Sitemap should contain alternate URL for language: ${lang}`
    )
  }
})

test('SEO: Layout metadata and structured data have valid schema and no dead anchors', () => {
  const layoutContent = fs.readFileSync('app/layout.tsx', 'utf8')

  // Ensure no deprecated #works anchor in breadcrumb list
  assert.strictEqual(
    layoutContent.includes('#works'),
    false,
    'Deprecated anchor #works should not exist in layout.tsx breadcrumb schema'
  )

  // Ensure breadcrumb contains valid #about and #services
  assert.ok(
    layoutContent.includes('#about'),
    'Layout breadcrumbs should include #about'
  )
  assert.ok(
    layoutContent.includes('#services'),
    'Layout breadcrumbs should include #services'
  )

  // Ensure JSON-LD schemas are embedded
  assert.ok(
    layoutContent.includes('application/ld+json'),
    'Layout should embed JSON-LD structured data'
  )
  assert.ok(
    layoutContent.includes('LocalBusiness'),
    'Layout should include LocalBusiness schema'
  )
  assert.ok(
    layoutContent.includes('GeneralContractor'),
    'Layout should include GeneralContractor schema'
  )
  assert.ok(
    layoutContent.includes('HomeAndConstructionBusiness'),
    'Layout should include HomeAndConstructionBusiness schema'
  )
  assert.ok(
    layoutContent.includes('areaServed'),
    'Layout should include areaServed specification'
  )
  assert.ok(
    layoutContent.includes('FAQPage'),
    'Layout should include FAQPage schema for rich snippets'
  )

  // Ensure alternates include ar and x-default
  assert.ok(
    layoutContent.includes("'x-default': baseUrl"),
    'Layout metadata should specify x-default hreflang'
  )
  assert.ok(
    layoutContent.includes("'ar': `${baseUrl}/?lang=ar`"),
    'Layout metadata should include Arabic hreflang alternate'
  )
})

test('SEO: robots.ts is properly configured for web crawlers and sitemap', () => {
  assert.ok(fs.existsSync('app/robots.ts'), 'app/robots.ts should exist')
  const robotsContent = fs.readFileSync('app/robots.ts', 'utf8')
  assert.ok(robotsContent.includes('sitemap.xml'), 'robots.ts must reference sitemap.xml')
  assert.ok(robotsContent.includes('Googlebot'), 'robots.ts must define rules for Googlebot')
})

test('SEO: Image alt tags are descriptive and avoid generic fallbacks', () => {
  const heroContent = fs.readFileSync('components/Hero.tsx', 'utf8')
  assert.strictEqual(
    heroContent.includes('alt="Ber Tadilat Portfolio Slide"'),
    false,
    'Hero images should have descriptive SEO alt tags, not generic placeholders'
  )
  assert.ok(
    heroContent.includes('alt={image.alt}'),
    'Hero Image component should bind to image.alt'
  )

  const galleryContent = fs.readFileSync('components/ProjectGallery.tsx', 'utf8')
  assert.strictEqual(
    galleryContent.includes('alt="thumbnail"'),
    false,
    'Gallery thumbnails should have descriptive SEO alt tags'
  )
  assert.ok(
    galleryContent.includes('PROJECT_DESCRIPTIONS'),
    'ProjectGallery should define contextual project descriptions for image SEO'
  )
})
