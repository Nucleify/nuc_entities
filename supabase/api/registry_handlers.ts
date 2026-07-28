import type { ApiContext } from 'nuc_api'
import {
  apiError,
  apiMsg,
  apiOk,
  fromSupabaseError,
  readJsonBody,
  seg,
  trimStr,
} from 'nuc_api'
import type { ApiHandlerResult, Json } from 'nuc_server'

import {
  countRecordsForType,
  type EntityFieldRow,
  type EntityRecordRow,
  extractRecordData,
  flattenRecord,
  getTypeBySlug,
  isValidSlug,
  listFields,
  listTypesForUser,
  normalizeFieldInput,
  nowIso,
  slugifyName,
} from './registry_helpers'

export async function handleListTypes(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const { rows, error } = await listTypesForUser(ctx.supabase, userId)
  if (error) return apiError(500, error)

  const withCounts = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      record_count: await countRecordsForType(
        ctx.supabase,
        row.id,
        userId,
        row.is_scoped
      ),
    }))
  )
  return apiOk(ctx, withCounts)
}

export async function handleCreateType(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const body = (await readJsonBody(ctx)) as Record<string, unknown>
  const name = trimStr(body.name)
  if (!name) return apiError(422, 'Name is required')

  let slug = trimStr(body.slug) || slugifyName(name)
  slug = slug.toLowerCase()
  if (!isValidSlug(slug)) return apiError(422, 'Invalid slug')

  const now = nowIso()
  const { data, error } = await ctx.supabase
    .from('entity_types')
    .insert({
      slug,
      name,
      description: trimStr(body.description) || null,
      icon: trimStr(body.icon) || 'prime:box',
      category: trimStr(body.category) || 'custom',
      is_scoped: body.is_scoped !== false,
      created_by: userId,
      created_at: now,
      updated_at: now,
    })
    .select('*')
    .single()

  if (error) {
    if (error.code === '23505') return apiError(409, 'Slug already exists')
    return fromSupabaseError(error, 400)
  }
  return apiOk(ctx, data, 201)
}

export async function handleGetType(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')
  const record_count = await countRecordsForType(
    ctx.supabase,
    row.id,
    userId,
    row.is_scoped
  )
  return apiOk(ctx, { ...row, record_count })
}

export async function handleUpdateType(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const body = (await readJsonBody(ctx)) as Record<string, unknown>
  const patch: Record<string, unknown> = { updated_at: nowIso() }
  if (body.name !== undefined) patch.name = trimStr(body.name) || row.name
  if (body.description !== undefined)
    patch.description = trimStr(body.description) || null
  if (body.icon !== undefined) patch.icon = trimStr(body.icon) || 'prime:box'
  if (body.category !== undefined)
    patch.category = trimStr(body.category) || 'custom'
  if (body.is_scoped !== undefined) patch.is_scoped = Boolean(body.is_scoped)

  const { data, error: updErr } = await ctx.supabase
    .from('entity_types')
    .update(patch)
    .eq('id', row.id)
    .select('*')
    .single()
  if (updErr) return fromSupabaseError(updErr, 400)
  return apiOk(ctx, data)
}

export async function handleDeleteType(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const { error: delErr } = await ctx.supabase
    .from('entity_types')
    .delete()
    .eq('id', row.id)
  if (delErr) return fromSupabaseError(delErr, 400)
  return apiMsg('Entity type deleted')
}

export async function handleListFields(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const { rows, error: fieldsErr } = await listFields(ctx.supabase, row.id)
  if (fieldsErr) return apiError(500, fieldsErr)
  return apiOk(ctx, rows)
}

export async function handleReplaceFields(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const body = (await readJsonBody(ctx)) as Json
  const list = Array.isArray(body)
    ? body
    : Array.isArray((body as { fields?: unknown }).fields)
      ? (body as { fields: unknown[] }).fields
      : null
  if (!list) return apiError(422, 'Expected fields array')

  const normalized = list
    .map((item, i) =>
      normalizeFieldInput(
        item && typeof item === 'object' && !Array.isArray(item)
          ? (item as Record<string, unknown>)
          : {},
        i
      )
    )
    .filter(Boolean) as NonNullable<ReturnType<typeof normalizeFieldInput>>[]

  const names = new Set<string>()
  for (const f of normalized) {
    if (names.has(f.name))
      return apiError(422, `Duplicate field name: ${f.name}`)
    names.add(f.name)
  }

  const { error: delErr } = await ctx.supabase
    .from('entity_fields')
    .delete()
    .eq('entity_type_id', row.id)
  if (delErr) return fromSupabaseError(delErr, 400)

  if (normalized.length === 0) return apiOk(ctx, [])

  const now = nowIso()
  const inserts = normalized.map((f) => ({
    ...f,
    entity_type_id: row.id,
    created_at: now,
    updated_at: now,
  }))

  const { data, error: insErr } = await ctx.supabase
    .from('entity_fields')
    .insert(inserts)
    .select('*')
    .order('sort_order', { ascending: true })
  if (insErr) return fromSupabaseError(insErr, 400)
  return apiOk(ctx, (data as EntityFieldRow[]) ?? [])
}

export async function handleListRecords(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  let q = ctx.supabase
    .from('entity_records')
    .select('*')
    .eq('entity_type_id', row.id)
    .order('id', { ascending: false })
  if (row.is_scoped) q = q.eq('user_id', userId)

  const { data, error: listErr } = await q
  if (listErr) return fromSupabaseError(listErr)
  return apiOk(ctx, ((data as EntityRecordRow[]) ?? []).map(flattenRecord))
}

export async function handleCreateRecord(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const body = (await readJsonBody(ctx)) as Record<string, unknown>
  const data = extractRecordData(body)
  const now = nowIso()

  const { data: created, error: insErr } = await ctx.supabase
    .from('entity_records')
    .insert({
      entity_type_id: row.id,
      user_id: row.is_scoped ? userId : null,
      data,
      created_at: now,
      updated_at: now,
    })
    .select('*')
    .single()
  if (insErr) return fromSupabaseError(insErr, 400)
  return apiOk(ctx, flattenRecord(created as EntityRecordRow), 201)
}

export async function handleUpdateRecord(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const id = Number(seg(ctx, 3))
  if (!Number.isFinite(id) || id <= 0) return apiError(422, 'Invalid id')

  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  let q = ctx.supabase
    .from('entity_records')
    .select('*')
    .eq('entity_type_id', row.id)
    .eq('id', id)
  if (row.is_scoped) q = q.eq('user_id', userId)

  const { data: existing, error: getErr } = await q.maybeSingle()
  if (getErr) return fromSupabaseError(getErr)
  if (!existing) return apiError(404, 'Record not found')

  const body = (await readJsonBody(ctx)) as Record<string, unknown>
  const data = extractRecordData(body)

  const { data: updated, error: updErr } = await ctx.supabase
    .from('entity_records')
    .update({ data, updated_at: nowIso() })
    .eq('id', id)
    .select('*')
    .single()
  if (updErr) return fromSupabaseError(updErr, 400)
  return apiOk(ctx, flattenRecord(updated as EntityRecordRow))
}

export async function handleDeleteRecord(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const id = Number(seg(ctx, 3))
  if (!Number.isFinite(id) || id <= 0) return apiError(422, 'Invalid id')

  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  let q = ctx.supabase
    .from('entity_records')
    .delete()
    .eq('entity_type_id', row.id)
    .eq('id', id)
  if (row.is_scoped) q = q.eq('user_id', userId)

  const { error: delErr } = await q
  if (delErr) return fromSupabaseError(delErr, 400)
  return apiMsg('Record deleted')
}

export async function handleCountRecords(
  ctx: ApiContext,
  userId: string
): Promise<ApiHandlerResult | null> {
  const slug = trimStr(seg(ctx, 2))
  const { row, error } = await getTypeBySlug(ctx.supabase, slug, userId)
  if (error) return apiError(500, error)
  if (!row) return apiError(404, 'Entity type not found')

  const count = await countRecordsForType(
    ctx.supabase,
    row.id,
    userId,
    row.is_scoped
  )
  // created-last-week approximation: filter in memory for MVP simplicity
  let q = ctx.supabase
    .from('entity_records')
    .select('created_at')
    .eq('entity_type_id', row.id)
  if (row.is_scoped) q = q.eq('user_id', userId)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  q = q.gte('created_at', weekAgo)
  const { data } = await q
  const weekCount = data?.length ?? 0
  return apiOk(ctx, weekCount || count)
}
