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
})
