import { describe, expect, it } from 'vitest'

import type { NucEntityTypeInterface } from 'nucleify'
import {
  fieldNameFromLabel,
  isValidEntityFieldName,
  isValidEntitySlug,
  matchesEntityQuery,
  slugifyEntityName,
  sortEntityTypes,
  summarizeEntityTypes,
  uniqueFieldName,
} from 'nucleify'

function type(
  partial: Partial<NucEntityTypeInterface> & { slug: string; name: string }
): NucEntityTypeInterface {
  return {
    id: partial.slug,
    category: 'custom',
    is_scoped: true,
    ...partial,
  }
}

describe('slugifyEntityName', () => {
  it('builds api friendly slugs', () => {
    expect(slugifyEntityName('My Notes')).toBe('my-notes')
    expect(slugifyEntityName('  Hello__World  ')).toBe('hello-world')
  })

  it('drops leading characters that are not letters', () => {
    expect(slugifyEntityName('2024 Reports')).toBe('reports')
    expect(slugifyEntityName('123')).toBe('')
  })
})

describe('isValidEntitySlug', () => {
  it('accepts slugs the api accepts', () => {
    expect(isValidEntitySlug('notes')).toBe(true)
    expect(isValidEntitySlug('my-notes_1')).toBe(true)
  })

  it('rejects slugs the api rejects', () => {
    expect(isValidEntitySlug('1bad')).toBe(false)
    expect(isValidEntitySlug('Bad')).toBe(false)
    expect(isValidEntitySlug('')).toBe(false)
  })
})

describe('field names', () => {
  it('derives snake_case names from labels', () => {
    expect(fieldNameFromLabel('Full name')).toBe('full_name')
    expect(fieldNameFromLabel('2nd address')).toBe('nd_address')
  })

  it('validates names', () => {
    expect(isValidEntityFieldName('title')).toBe(true)
    expect(isValidEntityFieldName('field_1')).toBe(true)
    expect(isValidEntityFieldName('1title')).toBe(false)
  })

  it('avoids collisions', () => {
    expect(uniqueFieldName('Title', [])).toBe('title')
    expect(uniqueFieldName('Title', ['title'])).toBe('title_2')
    expect(uniqueFieldName('Title', ['title', 'title_2'])).toBe('title_3')
    expect(uniqueFieldName('', [])).toBe('field')
  })
})

describe('matchesEntityQuery', () => {
  const notes = type({ slug: 'notes', name: 'Notes', description: 'Ideas' })

  it('matches on name, slug and description', () => {
    expect(matchesEntityQuery(notes, 'not')).toBe(true)
    expect(matchesEntityQuery(notes, 'IDEA')).toBe(true)
    expect(matchesEntityQuery(notes, 'invoices')).toBe(false)
  })

  it('keeps everything for an empty query', () => {
    expect(matchesEntityQuery(notes, '   ')).toBe(true)
  })
})

describe('sortEntityTypes', () => {
  const types = [
    type({
      slug: 'b',
      name: 'Beta',
      record_count: 1,
      created_at: '2026-01-01',
    }),
    type({
      slug: 'a',
      name: 'Alpha',
      record_count: 5,
      created_at: '2026-02-01',
    }),
  ]

  it('sorts by name, record count and creation date', () => {
    expect(sortEntityTypes(types, 'name').map((t) => t.slug)).toEqual([
      'a',
      'b',
    ])
    expect(sortEntityTypes(types, 'records').map((t) => t.slug)).toEqual([
      'a',
      'b',
    ])
    expect(sortEntityTypes(types, 'recent').map((t) => t.slug)).toEqual([
      'a',
      'b',
    ])
  })

  it('does not mutate the input', () => {
    const input = [...types]
    sortEntityTypes(input, 'name')
    expect(input.map((t) => t.slug)).toEqual(['b', 'a'])
  })
})

describe('summarizeEntityTypes', () => {
  it('counts entities, records and empty entities', () => {
    expect(
      summarizeEntityTypes([
        type({ slug: 'a', name: 'A', record_count: 3 }),
        type({ slug: 'b', name: 'B', record_count: 0 }),
        type({ slug: 'c', name: 'C' }),
      ])
    ).toEqual({ entities: 3, records: 3, empty: 2 })
  })
})
