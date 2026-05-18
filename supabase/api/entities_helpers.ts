import type { GatewayListScope, Json } from 'nuc_server'
import { formatRowResponseTimestamps } from 'nuc_server'

export const ENTITY_TABLES = new Set(['articles', 'contacts', 'money'])

function contactFullName(row: Record<string, unknown>): string | null {
  const existing = row.full_name
  if (typeof existing === 'string' && existing.trim()) return existing.trim()
  const first = String(row.first_name ?? '').trim()
  const last = String(row.last_name ?? '').trim()
  const joined = `${first} ${last}`.trim()
  return joined || null
}

function enrichContactRow(row: unknown): unknown {
  if (!row || typeof row !== 'object') return row
  const r = row as Record<string, unknown>
  return { ...r, full_name: contactFullName(r) }
}

function stripContactWriteBody(body: Json): Json {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body
  const { full_name: _, ...rest } = body as Record<string, unknown>
  return rest as Json
}

export function entityFormatRow(table: string, row: unknown): unknown {
  const shaped = table === 'contacts' ? enrichContactRow(row) : row
  return formatRowResponseTimestamps(shaped)
}

export function entityFormatRows(table: string, rows: unknown[]): unknown[] {
  return rows.map((row) => entityFormatRow(table, row))
}

export function entityPrepareCreateBody(
  table: string,
  body: Json,
  scope: GatewayListScope
): Json {
  let next = table === 'contacts' ? stripContactWriteBody(body) : body
  if (scope.mode === 'own') next = { ...next, user_id: scope.userId }
  return next
}

export function entityPrepareUpdateBody(table: string, body: Json): Json {
  return table === 'contacts' ? stripContactWriteBody(body) : body
}
