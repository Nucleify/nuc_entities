import {
  apiMethodNotAllowed,
  apiNotHandled,
  dispatchAuthRoutes,
  withGatewayUser,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult } from 'nuc_server'

import { entityRegistryRoutes } from './registry_routes'

export async function handleEntitiesApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'entities') return apiNotHandled()

  return withGatewayUser(ctx, async (c, userId) => {
    const result = await dispatchAuthRoutes(entityRegistryRoutes, c, userId)
    return result ?? apiMethodNotAllowed()
  })
}
