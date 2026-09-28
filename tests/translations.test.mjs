import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

// Helper to extract translations object from LanguageProvider.tsx
function getTranslations() {
  const content = fs.readFileSync('components/LanguageProvider.tsx', 'utf8')
  const startIdx = content.indexOf('const translations: Record')
  const endIdx = content.indexOf('export function LanguageProvider')
  assert.ok(startIdx !== -1 && endIdx !== -1, 'Could not locate translations definition in LanguageProvider.tsx')
  const block = content.slice(startIdx, endIdx)
  const objCode = block.substring(block.indexOf('{'), block.lastIndexOf('}') + 1)
  return new Function('return (' + objCode + ')')()
}

test('Translations: All 4 languages exist (TR, EN, AR, FA)', () => {
  const translations = getTranslations()
  const expectedLanguages = ['tr', 'en', 'ar', 'fa']
  
  for (const lang of expectedLanguages) {
    assert.ok(translations[lang], `Missing language dictionary: ${lang}`)
    assert.ok(Object.keys(translations[lang]).length > 50, `Language dictionary ${lang} has unexpectedly few keys`)
  }
})

test('Translations: All keys in TR exist in EN, AR, and FA', () => {
  const translations = getTranslations()
  const trKeys = Object.keys(translations.tr)
  const targetLanguages = ['en', 'ar', 'fa']

  for (const lang of targetLanguages) {
    const missingKeys = trKeys.filter((key) => !(key in translations[lang]))
    assert.deepStrictEqual(
      missingKeys,
      [],
      `Language "${lang}" is missing translation keys that exist in TR: ${missingKeys.join(', ')}`
    )
  }
})

test('Translations: No translation string is empty or undefined', () => {
  const translations = getTranslations()

  for (const [lang, dict] of Object.entries(translations)) {
    for (const [key, value] of Object.entries(dict)) {
      assert.strictEqual(
        typeof value,
        'string',
        `Translation key "${key}" in language "${lang}" is not a string`
      )
      assert.ok(
        value.trim().length > 0,
        `Translation key "${key}" in language "${lang}" has an empty string value`
      )
    }
  }
})

test('Translations: All static t("key") calls in components exist in translation dictionary', () => {
  const translations = getTranslations()
  const validKeys = new Set(Object.keys(translations.tr))

  // Find all component and app files
  const files = []
  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next') {
          scanDir(fullPath)
        }
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        if (!entry.name.includes('LanguageProvider')) {
          files.push(fullPath)
        }
      }
    }
  }

  scanDir('components')
  scanDir('app')

  const missingUsages = []
  const staticKeyRegex = /\bt\(\s*['"]([a-zA-Z0-9._-]+)['"]\s*\)/g

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf8')
    let match
    while ((match = staticKeyRegex.exec(code)) !== null) {
      const key = match[1]
      if (!validKeys.has(key)) {
        missingUsages.push({ file, key })
      }
    }
  }

  assert.deepStrictEqual(
    missingUsages,
    [],
    `Found t('key') calls referencing non-existent translation keys: ${JSON.stringify(missingUsages, null, 2)}`
  )
})
