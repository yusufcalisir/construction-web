import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

// Allowed domain whitelist for all external links and integrations
const ALLOWED_DOMAIN_PATTERNS = [
  /^https?:\/\/(www\.)?bertadilat\.com/i,
  /^https?:\/\/(www\.)?instagram\.com/i,
  /^https?:\/\/(www\.)?wa\.me/i,
  /^https?:\/\/(api\.)?whatsapp\.com/i,
  /^https?:\/\/schema\.org/i,
  /^https?:\/\/(www\.)?google\.com(\.tr)?/i,
  /^https?:\/\/([a-z0-9.-]+\.)?googletagmanager\.com/i,
  /^https?:\/\/([a-z0-9.-]+\.)?google-analytics\.com/i,
  /^https?:\/\/fonts\.googleapis\.com/i,
  /^https?:\/\/fonts\.gstatic\.com/i,
  /^https?:\/\/(www\.)?w3\.org/i,
  /^https?:\/\/(www\.)?sitemaps\.org/i,
  /^https?:\/\/(images\.)?unsplash\.com/i,
]

// Recursively collect all frontend source code files
function collectSourceFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        collectSourceFiles(fullPath, fileList)
      }
    } else if (/\.(tsx|ts|jsx|js|css)$/.test(entry.name)) {
      fileList.push(fullPath)
    }
  }
  return fileList
}

test('Security Audit: Domain Whitelist - No unauthorized external URLs or injected backlinks', () => {
  const filesToCheck = [
    ...collectSourceFiles('components'),
    ...collectSourceFiles('app'),
    ...collectSourceFiles('lib'),
  ]

  // Regular expression to extract full http/https URLs
  const urlRegex = /https?:\/\/[a-zA-Z0-9.-]+(?::\d+)?(\/[^\s"'`<>{}]*)?/g

  const unauthorizedUrls = []

  for (const filePath of filesToCheck) {
    const content = fs.readFileSync(filePath, 'utf8')
    let match
    while ((match = urlRegex.exec(content)) !== null) {
      const detectedUrl = match[0]
      const isAllowed = ALLOWED_DOMAIN_PATTERNS.some((pattern) => pattern.test(detectedUrl))
      if (!isAllowed) {
        unauthorizedUrls.push({ file: filePath, url: detectedUrl })
      }
    }
  }

  assert.strictEqual(
    unauthorizedUrls.length,
    0,
    `Unauthorized external link(s) detected in source code: ${JSON.stringify(unauthorizedUrls, null, 2)}`
  )
})

test('Security Audit: Anti-Cloaking - No hidden off-screen or invisible link techniques', () => {
  const filesToCheck = [
    ...collectSourceFiles('components'),
    ...collectSourceFiles('app'),
  ]

  // Patterns used by unauthorized link injectors to hide anchors from human view while exposing them to crawlers
  const stealthPatterns = [
    { pattern: /left:\s*-[0-9]{4,}px/i, desc: 'Off-screen negative coordinate positioning' },
    { pattern: /top:\s*-[0-9]{4,}px/i, desc: 'Off-screen negative top coordinate positioning' },
    { pattern: /font-size:\s*0(\.0+)?(px|pt|em|rem)?/i, desc: 'Zero font size hiding technique' },
    { pattern: /text-\[0px\]/i, desc: 'Zero pixel text utility on link' },
    { pattern: /style=\{[^}]*opacity:\s*0[^}]*\}[^>]*href=/i, desc: 'Zero opacity anchor style' },
  ]

  const violations = []

  for (const filePath of filesToCheck) {
    const content = fs.readFileSync(filePath, 'utf8')
    for (const { pattern, desc } of stealthPatterns) {
      if (pattern.test(content)) {
        violations.push({ file: filePath, rule: desc })
      }
    }
  }

  assert.strictEqual(
    violations.length,
    0,
    `Stealth link hiding pattern(s) detected: ${JSON.stringify(violations, null, 2)}`
  )
})

test('Security Audit: Headers & CSP - Robust Content Security Policy and anti-tamper headers', () => {
  assert.ok(fs.existsSync('next.config.js'), 'next.config.js must exist')
  const nextConfigContent = fs.readFileSync('next.config.js', 'utf8')

  // Content Security Policy directives
  assert.ok(nextConfigContent.includes('Content-Security-Policy'), 'CSP header must be configured')
  assert.ok(nextConfigContent.includes("object-src 'none'"), 'CSP object-src must be none to prevent plugin exploits')
  assert.ok(nextConfigContent.includes("base-uri 'self'"), 'CSP base-uri must be self to prevent base tag hijacking')
  assert.ok(nextConfigContent.includes("frame-ancestors 'self'"), 'CSP frame-ancestors must be self to prevent framing')

  // Hardening headers
  assert.ok(nextConfigContent.includes('X-Frame-Options'), 'X-Frame-Options header must be defined')
  assert.ok(nextConfigContent.includes('X-Content-Type-Options'), 'X-Content-Type-Options nosniff must be defined')
  assert.ok(nextConfigContent.includes('Strict-Transport-Security'), 'HSTS header must be configured')
  assert.ok(nextConfigContent.includes('Referrer-Policy'), 'Referrer-Policy header must be defined')
})

test('Security Audit: Tabnabbing Protection - All external target="_blank" links include rel="noopener noreferrer"', () => {
  const componentFiles = collectSourceFiles('components')
  const blankTargetRegex = /<a\b([^>]*\btarget=["']_blank["'][^>]*)>/gi

  const missingRelLinks = []

  for (const filePath of componentFiles) {
    const content = fs.readFileSync(filePath, 'utf8')
    let match
    while ((match = blankTargetRegex.exec(content)) !== null) {
      const tagContent = match[1]
      const hasSafeRel = /rel=["'][^"']*\b(noopener|noreferrer)\b[^"']*["']/.test(tagContent)
      if (!hasSafeRel) {
        missingRelLinks.push({ file: filePath, tag: match[0] })
      }
    }
  }

  assert.strictEqual(
    missingRelLinks.length,
    0,
    `External link(s) missing rel="noopener noreferrer" protection: ${JSON.stringify(missingRelLinks, null, 2)}`
  )
})

test('Security Audit: Clean URL Integrity - Sanitization prevents reflected URL parameter exploitation', () => {
  const pageContent = fs.readFileSync('app/page.tsx', 'utf8')
  const langContent = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')

  // URL parameters and hashes must be stripped immediately on load to prevent SEO spam injection
  assert.ok(
    pageContent.includes('window.history.replaceState'),
    'app/page.tsx must sanitize address bar state'
  )
  assert.ok(
    langContent.includes('window.history.replaceState'),
    'LanguageProvider must sanitize address bar state'
  )

  // No dangerous direct HTML reflection of raw query string
  assert.strictEqual(
    pageContent.includes('dangerouslySetInnerHTML={{ __html: window.location'),
    false,
    'app/page.tsx must never reflect raw URL string into DOM'
  )
})
