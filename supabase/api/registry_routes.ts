import type { ApiAuthRoute } from 'nuc_api'
import { whenAuth } from 'nuc_api'

import {
  handleCountRecords,
  handleCreateRecord,
  handleCreateType,
  handleDeleteRecord,
  handleDeleteType,
  handleGetType,
  handleListFields,
  handleListRecords,
  handleListTypes,
  handleReplaceFields,
  handleUpdateRecord,
  handleUpdateType,
} from './registry_handlers'

/** GET /entities/types */
export const routeListTypes = whenAuth(
  { method: 'GET', len: 2, path: [undefined, 'types'] },
  handleListTypes
)

/** POST /entities/types */
export const routeCreateType = whenAuth(
  { method: 'POST', len: 2, path: [undefined, 'types'] },
  handleCreateType
)

/** GET /entities/types/:slug */
export const routeGetType = whenAuth(
  { method: 'GET', len: 3, path: [undefined, 'types'] },
  handleGetType
)

/** PATCH /entities/types/:slug */
export const routeUpdateType = whenAuth(
  { method: 'PATCH', len: 3, path: [undefined, 'types'] },
  handleUpdateType
)

/** DELETE /entities/types/:slug */
export const routeDeleteType = whenAuth(
  { method: 'DELETE', len: 3, path: [undefined, 'types'] },
  handleDeleteType
)

/** GET /entities/types/:slug/fields */
export const routeListFields = whenAuth(
  { method: 'GET', len: 4, path: [undefined, 'types', undefined, 'fields'] },
  handleListFields
)

/** PUT /entities/types/:slug/fields */
export const routeReplaceFields = whenAuth(
  { method: 'PUT', len: 4, path: [undefined, 'types', undefined, 'fields'] },
  handleReplaceFields
)

/** GET /entities/records/:slug */
export const routeListRecords = whenAuth(
  { method: 'GET', len: 3, path: [undefined, 'records'] },
  handleListRecords
)

/** POST /entities/records/:slug */
export const routeCreateRecord = whenAuth(
  { method: 'POST', len: 3, path: [undefined, 'records'] },
  handleCreateRecord
)

/** GET /entities/records/:slug/count-by-created-last-week */
export const routeCountRecords = whenAuth(
  {
    method: 'GET',
    len: 4,
    path: [undefined, 'records', undefined, 'count-by-created-last-week'],
  },
  handleCountRecords
)

/** PUT /entities/records/:slug/:id  (via apiHandle id append) — also PATCH */
export const routeUpdateRecord = whenAuth(
  { method: ['PUT', 'PATCH'], len: 4, path: [undefined, 'records'] },
  handleUpdateRecord
)

/** DELETE /entities/records/:slug/:id */
export const routeDeleteRecord = whenAuth(
  { method: 'DELETE', len: 4, path: [undefined, 'records'] },
  handleDeleteRecord
)

export const entityRegistryRoutes: ApiAuthRoute[] = [
  routeListTypes,
  routeCreateType,
  routeListFields,
  routeReplaceFields,
  routeGetType,
  routeUpdateType,
  routeDeleteType,
  routeCountRecords,
  routeListRecords,
  routeCreateRecord,
  routeUpdateRecord,
  routeDeleteRecord,
]
