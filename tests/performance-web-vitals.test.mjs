import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'

test('Performance & Core Web Vitals: Hero component prioritizes LCP image', () => {
  const code = fs.readFileSync('components/Hero.tsx', 'utf8')

  assert.ok(
    code.includes('priority={index === 0}'),
    'Hero component must set priority on the initial image to optimize Largest Contentful Paint (LCP)'
  )
  assert.ok(
    code.includes('fill'),
    'Hero image must use fill layout for responsive viewport scaling'
  )
})

test('Performance & Core Web Vitals: Fonts are configured with display: swap', () => {
  const code = fs.readFileSync('app/layout.tsx', 'utf8')

  assert.ok(
    code.includes("display: 'swap'"),
    'Next.js Google Fonts must specify display: swap to eliminate Flash of Invisible Text (FOIT)'
  )
})

test('Performance & Core Web Vitals: next.config.js optimizes image formats and caching', () => {
  const code = fs.readFileSync('next.config.js', 'utf8')

  assert.ok(
    code.includes('poweredByHeader: false'),
    'next.config.js must disable poweredByHeader for performance and security'
  )
  assert.ok(
    code.includes("'image/avif'") && code.includes("'image/webp'"),
    'next.config.js must support AVIF and WebP image formats'
  )
  assert.ok(
    code.includes('minimumCacheTTL'),
    'next.config.js must set minimumCacheTTL for long-lived image caching'
  )
})

test('Performance & Core Web Vitals: Gallery uses responsive sizes and lazy loading for below-fold images', () => {
  const code = fs.readFileSync('components/Gallery.tsx', 'utf8')

  assert.ok(
    code.includes('sizes='),
    'Gallery must provide responsive sizes attribute to prevent downloading oversized images'
  )
  assert.ok(
    code.includes("'lazy'"),
    'Gallery must lazily load below-fold images to save initial bandwidth'
  )
})
