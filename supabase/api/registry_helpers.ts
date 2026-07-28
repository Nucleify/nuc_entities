import type { SupabaseClient } from '@supabase/supabase-js'

import { nowIso, trimStr } from 'nuc_api'

export type EntityTypeRow = {
  id: string
  slug: string
  name: string
  description: string | null
  icon: string | null
  category: string
  is_scoped: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  record_count?: number
}

export type EntityFieldRow = {
  id: string
  entity_type_id: string
  name: string
  label: string
  field_type: string
  sort_order: number
  required: boolean
  show_in_table: boolean
  show_in_form: boolean
  options: Record<string, unknown>
  created_at: string
  updated_at: string
}

export type EntityRecordRow = {
  id: number
  entity_type_id: string
  user_id: string | null
  data: Record<string, unknown>
  created_at: string
  updated_at: string
}

const SLUG_RE = /^[a-z][a-z0-9_-]{0,62}$/
const FIELD_NAME_RE = /^[a-z][a-z0-9_]{0,62}$/

export function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63)
}

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug)
}

export function isValidFieldName(name: string): boolean {
  return FIELD_NAME_RE.test(name)
}

export async function getTypeBySlug(
  supabase: SupabaseClient,
  slug: string,
  userId: string
): Promise<{ row: EntityTypeRow | null; error: string | null }> {
  const { data, error } = await supabase
    .from('entity_types')
    .select('*')
    .eq('slug', slug)
    .eq('created_by', userId)
    .maybeSingle()
  if (error) return { row: null, error: error.message }
  return { row: (data as EntityTypeRow | null) ?? null, error: null }
}

export async function listTypesForUser(
  supabase: SupabaseClient,
  userId: string
): Promise<{ rows: EntityTypeRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from('entity_types')
    .select('*')
    .eq('created_by', userId)
    .order('name', { ascending: true })
  if (error) return { rows: [], error: error.message }
  return { rows: (data as EntityTypeRow[]) ?? [], error: null }
}

export async function countRecordsForType(
  supabase: SupabaseClient,
  typeId: string,
  userId: string,
  isScoped: boolean
): Promise<number> {
  let q = supabase
    .from('entity_records')
    .select('id', { count: 'exact', head: true })
    .eq('entity_type_id', typeId)
  if (isScoped) q = q.eq('user_id', userId)
  const { count } = await q
  return count ?? 0
}

export async function listFields(
  supabase: SupabaseClient,
  typeId: string
): Promise<{ rows: EntityFieldRow[]; error: string | null }> {
  const { data, error } = await supabase
    .from('entity_fields')
    .select('*')
    .eq('entity_type_id', typeId)
    .order('sort_order', { ascending: true })
  if (error) return { rows: [], error: error.message }
  return { rows: (data as EntityFieldRow[]) ?? [], error: null }
}

export function flattenRecord(row: EntityRecordRow): Record<string, unknown> {
  const data =
    row.data && typeof row.data === 'object' && !Array.isArray(row.data)
      ? row.data
      : {}
  return {
    id: row.id,
    ...data,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function extractRecordData(
  body: Record<string, unknown>
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...body }
  delete next.id
  delete next.entity_type_id
  delete next.user_id
  delete next.created_at
  delete next.updated_at
  delete next.data
  if (body.data && typeof body.data === 'object' && !Array.isArray(body.data)) {
    return { ...(body.data as Record<string, unknown>), ...next }
  }
  return next
}

export function normalizeFieldInput(
  raw: Record<string, unknown>,
  index: number
): Omit<
  EntityFieldRow,
  'id' | 'entity_type_id' | 'created_at' | 'updated_at'
> | null {
  const name = trimStr(raw.name)
  const label = trimStr(raw.label) || name
  const field_type =
    trimStr(raw.field_type) || trimStr(raw.type) || 'input-text'
  if (!name || !isValidFieldName(name)) return null

  const options: Record<string, unknown> =
    raw.options &&
    typeof raw.options === 'object' &&
    !Array.isArray(raw.options)
      ? { ...(raw.options as Record<string, unknown>) }
      : {}

  const props = raw.props
  if (props && typeof props === 'object' && !Array.isArray(props)) {
    const propsOptions = (props as { options?: unknown }).options
    if (Array.isArray(propsOptions)) options.options = propsOptions
    const placeholder = (props as { placeholder?: unknown }).placeholder
    if (typeof placeholder === 'string') options.placeholder = placeholder
  }

  return {
    name,
    label,
    field_type,
    sort_order: Number(raw.sort_order ?? index) || index,
    required: Boolean(raw.required),
    show_in_table: raw.show_in_table !== false,
    show_in_form: raw.show_in_form !== false,
    options,
  }
}

export { nowIso }
