import { readBody } from 'h3'

import type {
  ApiContext,
  ApiHandlerResult,
  Json,
} from '../../../../nuxt/server/api/_types'
import { formatRowResponseTimestamps } from '../../../../nuxt/server/api/format_timestamptz_response'
import { resolveGatewayListScope } from '../../../../nuxt/server/api/gateway_auth'

const tables = ['articles', 'contacts', 'money']

function contactFullName(row: Record<string, unknown>): string | null {
  const existing = row.full_name
  if (typeof existing === 'string' && existing.trim() !== '')
    return existing.trim()
  const fn = typeof row.first_name === 'string' ? row.first_name.trim() : ''
  const ln = typeof row.last_name === 'string' ? row.last_name.trim() : ''
  const joined = `${fn} ${ln}`.trim()
  return joined === '' ? null : joined
}

function enrichContactRow(row: unknown): unknown {
  if (!row || typeof row !== 'object') return row
  const r = row as Record<string, unknown>
  return { ...r, full_name: contactFullName(r) }
}

function finalizeEntityRow(table: string, row: unknown): unknown {
  const withContact = table === 'contacts' ? enrichContactRow(row) : row
  return formatRowResponseTimestamps(withContact)
}

function finalizeEntityRows(table: string, rows: unknown[]): unknown[] {
  return rows.map((row) => finalizeEntityRow(table, row))
}

/** DB column is GENERATED; clients send `full_name` from forms — strip before write. */
function stripGeneratedContactColumns(body: Json): Json {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body
  const b = { ...(body as Record<string, unknown>) }
  delete b.full_name
  return b as Json
}

export async function handleEntitiesApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const { segments, method, supabase, ok } = ctx
  const table = segments[0]
  if (!tables.includes(table)) return { handled: false }

  if (method === 'GET' && segments.length === 1) {
    const scope = await resolveGatewayListScope(supabase, ctx.event)
    if ('error' in scope)
      return {
        handled: true,
        status: scope.status,
        body: { error: scope.error },
      }

    let q = supabase.from(table).select('*').order('id', { ascending: false })
    if (scope.mode === 'own') q = q.eq('user_id', scope.userId)
    const { data, error } = await q
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    const rows = data || []
    return {
      handled: true,
      body: ok(finalizeEntityRows(table, rows)),
    }
  }
  if (method === 'POST' && segments.length === 1) {
    const scope = await resolveGatewayListScope(supabase, ctx.event)
    if ('error' in scope)
      return {
        handled: true,
        status: scope.status,
        body: { error: scope.error },
      }

    const raw = (await readBody(ctx.event)) as Json | null
    let body: Json = { ...(raw ?? {}) }
    if (table === 'contacts') body = stripGeneratedContactColumns(body)
    if (scope.mode === 'own') body.user_id = scope.userId

    const { data, error } = await supabase
      .from(table)
      .insert(body)
      .select('*')
      .single()
    if (error)
      return { handled: true, status: 400, body: { error: error.message } }
    return {
      handled: true,
      status: 201,
      body: ok(data ? finalizeEntityRow(table, data) : data),
    }
  }
  if ((method === 'PUT' || method === 'PATCH') && segments.length === 2) {
    const scope = await resolveGatewayListScope(supabase, ctx.event)
    if ('error' in scope)
      return {
        handled: true,
        status: scope.status,
        body: { error: scope.error },
      }

    let body = (await readBody(ctx.event)) as Json
    if (table === 'contacts') body = stripGeneratedContactColumns(body)
    let q = supabase.from(table).update(body).eq('id', segments[1])
    if (scope.mode === 'own') q = q.eq('user_id', scope.userId)
    const { data, error } = await q.select('*').single()
    if (error)
      return { handled: true, status: 400, body: { error: error.message } }
    return {
      handled: true,
      body: ok(data ? finalizeEntityRow(table, data) : data),
    }
  }
  if (method === 'DELETE' && segments.length === 2) {
    const scope = await resolveGatewayListScope(supabase, ctx.event)
    if ('error' in scope)
      return {
        handled: true,
        status: scope.status,
        body: { error: scope.error },
      }

    let q = supabase.from(table).delete().eq('id', segments[1])
    if (scope.mode === 'own') q = q.eq('user_id', scope.userId)
    const { error } = await q
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    return { handled: true, body: { deleted: true } }
  }
  if (
    method === 'GET' &&
    segments.length === 2 &&
    segments[1] === 'count-by-created-last-week'
  ) {
    const scope = await resolveGatewayListScope(supabase, ctx.event)
    if ('error' in scope)
      return {
        handled: true,
        status: scope.status,
        body: { error: scope.error },
      }

    const since = new Date()
    since.setDate(since.getDate() - 7)
    let q = supabase
      .from(table)
      .select('id', { count: 'exact', head: true })
      .gte('created_at', since.toISOString())
    if (scope.mode === 'own') q = q.eq('user_id', scope.userId)
    const { count, error } = await q
    if (error)
      return { handled: true, status: 500, body: { error: error.message } }
    return { handled: true, body: ok(count ?? 0) }
  }
  return { handled: true, status: 405, body: { error: 'Method not allowed' } }
}
