import { describe, expect, it } from 'vitest'

function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63)
}

const SLUG_RE = /^[a-z][a-z0-9_-]{0,62}$/
const FIELD_NAME_RE = /^[a-z][a-z0-9_]{0,62}$/

describe('entity registry helpers', () => {
  it('slugifies names', () => {
    expect(slugifyName('My Notes')).toBe('my-notes')
    expect(slugifyName('  Hello__World  ')).toBe('hello-world')
  })

  it('validates slugs', () => {
    expect(SLUG_RE.test('notes')).toBe(true)
    expect(SLUG_RE.test('my-notes_1')).toBe(true)
    expect(SLUG_RE.test('1bad')).toBe(false)
    expect(SLUG_RE.test('Bad')).toBe(false)
  })

  it('validates field names', () => {
    expect(FIELD_NAME_RE.test('title')).toBe(true)
    expect(FIELD_NAME_RE.test('field_1')).toBe(true)
    expect(FIELD_NAME_RE.test('1title')).toBe(false)
  })
})
