import type { NucEntityTypeInterface } from 'nucleify'

const SLUG_RE = /^[a-z][a-z0-9_-]{0,62}$/
const FIELD_NAME_RE = /^[a-z][a-z0-9_]{0,62}$/

export type EntitySortMode = 'name' | 'records' | 'recent'

export function slugifyEntityName(value: string): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^[^a-z]+/, '')
    .replace(/-+$/, '')
    .slice(0, 63)
}

export function isValidEntitySlug(slug: string): boolean {
  return SLUG_RE.test(String(slug ?? ''))
}

export function fieldNameFromLabel(label: string): string {
  return String(label ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^[^a-z]+/, '')
    .replace(/_+$/, '')
    .slice(0, 63)
}

export function isValidEntityFieldName(name: string): boolean {
  return FIELD_NAME_RE.test(String(name ?? ''))
}

export function uniqueFieldName(
  base: string,
  taken: readonly string[]
): string {
  const seed = fieldNameFromLabel(base) || 'field'
  if (!taken.includes(seed)) return seed

  let suffix = 2
  while (taken.includes(`${seed}_${suffix}`)) suffix += 1
  return `${seed}_${suffix}`
}

export function matchesEntityQuery(
  type: NucEntityTypeInterface,
  query: string
): boolean {
  const needle = String(query ?? '')
    .trim()
    .toLowerCase()
  if (!needle) return true

  return [type.name, type.slug, type.description]
    .filter((value): value is string => typeof value === 'string')
    .some((value) => value.toLowerCase().includes(needle))
}

export function sortEntityTypes(
  types: readonly NucEntityTypeInterface[],
  mode: EntitySortMode
): NucEntityTypeInterface[] {
  const list = [...types]

  if (mode === 'records') {
    return list.sort((a, b) => (b.record_count ?? 0) - (a.record_count ?? 0))
  }
  if (mode === 'recent') {
    return list.sort((a, b) =>
      String(b.created_at ?? '').localeCompare(String(a.created_at ?? ''))
    )
  }
  return list.sort((a, b) => a.name.localeCompare(b.name))
}

export interface EntityHubSummaryInterface {
  entities: number
  records: number
  empty: number
}

export function summarizeEntityTypes(
  types: readonly NucEntityTypeInterface[]
): EntityHubSummaryInterface {
  return types.reduce<EntityHubSummaryInterface>(
    (summary, type) => {
      const count = type.record_count ?? 0
      return {
        entities: summary.entities + 1,
        records: summary.records + count,
        empty: summary.empty + (count === 0 ? 1 : 0),
      }
    },
    { entities: 0, records: 0, empty: 0 }
  )
}
