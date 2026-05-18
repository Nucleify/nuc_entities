import { apiMethodNotAllowed, apiNotHandled, tryScopedCrud } from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import {
  ENTITY_TABLES,
  entityFormatRow,
  entityFormatRows,
  entityPrepareCreateBody,
  entityPrepareUpdateBody,
} from './entities_helpers'

export async function handleEntitiesApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const table = ctx.segments[0]
  if (!ENTITY_TABLES.has(table)) return apiNotHandled()

  const result = await tryScopedCrud(ctx, {
    table,
    orderBy: { column: 'id', ascending: false },
    formatRow: (row) => entityFormatRow(table, row),
    formatRows: (rows) => entityFormatRows(table, rows),
    prepareCreateBody: (body, scope) =>
      entityPrepareCreateBody(table, body, scope),
    prepareUpdateBody: (body) => entityPrepareUpdateBody(table, body),
  })

  return result ?? apiMethodNotAllowed()
}
