'use client'

import type {
  AppFramework,
  CloseDialogType,
  EntityFieldInterface,
  NucEntityFieldInterface,
  NucEntityRecordInterface,
  NucEntityRecordRequestsInterface,
  NucEntityTypeInterface,
  NucEntityTypeRequestsInterface,
  UseLoadingInterface,
} from 'nucleify'
import {
  apiHandle,
  apiRequest,
  createEntityRequestState,
  createEntityRequestsCore,
  resolveApiHandleData,
  useApiSuccess,
  useLoading,
} from 'nucleify'

/** Table column shape used by entity registry mappings (data-table compatible). */
export interface EntityTableColumnInterface {
  field: string
  header: string
  class?: string
  sortable?: boolean
}

const TYPES_URL = '/entities/types'
const recordsUrl = (slug: string) => `/entities/records/${slug}`

export function mapRegistryFieldsToEntityFields(
  fields: NucEntityFieldInterface[]
): {
  createAndEditFields: EntityFieldInterface[]
  showFields: { label: string; key: string }[]
  tableColumns: EntityTableColumnInterface[]
} {
  const formFields = fields.filter((f) => f.show_in_form !== false)
  const tableFields = fields.filter((f) => f.show_in_table !== false)

  const createAndEditFields: EntityFieldInterface[] = formFields.map((f) => {
    const options = f.options ?? {}
    const selectOptions = Array.isArray(options.options)
      ? (options.options as string[])
      : undefined
    return {
      name: f.name,
      label: f.label,
      type: f.field_type || 'input-text',
      props: {
        options: selectOptions,
        placeholder:
          typeof options.placeholder === 'string'
            ? options.placeholder
            : undefined,
      },
    }
  })

  const showFields = formFields.map((f) => ({
    label: f.label,
    key: f.name,
  }))

  const tableColumns: EntityTableColumnInterface[] = [
    ...tableFields.map((f) => ({
      field: f.name,
      header: f.label,
      class: `${f.name}-column`,
      sortable: true,
    })),
    {
      field: 'created_at',
      header: 'column-created-at',
      class: 'created-at-column',
      sortable: true,
    },
    {
      field: 'updated_at',
      header: 'column-updated-at',
      class: 'updated-at-column',
      sortable: true,
    },
  ]

  return { createAndEditFields, showFields, tableColumns }
}

export function entityTypeRequests(
  framework: AppFramework = 'nuxt'
): NucEntityTypeRequestsInterface {
  const { results, setResults } =
    createEntityRequestState<NucEntityTypeInterface>(framework)
  const { loading, setLoading }: UseLoadingInterface = useLoading()

  async function getAllTypes(showLoading?: boolean): Promise<void> {
    await apiHandle<NucEntityTypeInterface[]>({
      url: TYPES_URL,
      setLoading: showLoading ? setLoading : undefined,
      onSuccess: setResults,
    })
  }

  async function getType(slug: string): Promise<NucEntityTypeInterface | null> {
    try {
      const response = await apiRequest<NucEntityTypeInterface>(
        `${TYPES_URL}/${slug}`
      )
      return resolveApiHandleData<NucEntityTypeInterface>(response)
    } catch {
      return null
    }
  }

  async function createType(
    data: Partial<NucEntityTypeInterface>
  ): Promise<NucEntityTypeInterface | null> {
    try {
      const response = await apiRequest<NucEntityTypeInterface>(
        TYPES_URL,
        'POST',
        data
      )
      const created = resolveApiHandleData<NucEntityTypeInterface>(response)
      await getAllTypes()
      return created
    } catch {
      return null
    }
  }

  async function updateType(
    slug: string,
    data: Partial<NucEntityTypeInterface>
  ): Promise<void> {
    await apiRequest(`${TYPES_URL}/${slug}`, 'PATCH', data)
    await getAllTypes()
  }

  async function deleteType(slug: string): Promise<void> {
    await apiRequest(`${TYPES_URL}/${slug}`, 'DELETE')
    await getAllTypes()
  }

  async function getFields(slug: string): Promise<NucEntityFieldInterface[]> {
    const response = await apiRequest<NucEntityFieldInterface[]>(
      `${TYPES_URL}/${slug}/fields`
    )
    return resolveApiHandleData<NucEntityFieldInterface[]>(response) ?? []
  }

  async function saveFields(
    slug: string,
    fields: NucEntityFieldInterface[]
  ): Promise<NucEntityFieldInterface[]> {
    const response = await apiRequest<NucEntityFieldInterface[]>(
      `${TYPES_URL}/${slug}/fields`,
      'PUT',
      fields
    )
    return resolveApiHandleData<NucEntityFieldInterface[]>(response) ?? []
  }

  return {
    results,
    loading,
    getAllTypes,
    createType,
    updateType,
    deleteType,
    getType,
    getFields,
    saveFields,
  }
}

export function entityRecordRequests(
  slug: string,
  close?: CloseDialogType,
  framework: AppFramework = 'nuxt'
): NucEntityRecordRequestsInterface {
  const { results, createdLastWeek, setResults, setCreatedLastWeek } =
    createEntityRequestState<NucEntityRecordInterface>(framework)
  const { loading, setLoading }: UseLoadingInterface = useLoading()
  const { apiSuccess } = useApiSuccess()

  const core = createEntityRequestsCore<NucEntityRecordInterface>({
    baseUrl: recordsUrl(slug),
    close,
    apiSuccess,
    setResults,
    setCreatedLastWeek,
    setLoading,
    mapStoreData: (data) => {
      const { id: _id, created_at: _c, updated_at: _u, ...rest } = data
      return rest
    },
  })

  return {
    results,
    loading,
    createdLastWeek,
    getAllRecords: core.getAll,
    getCountByCreatedLastWeek: core.getCountByCreatedLastWeek,
    storeRecord: core.store,
    editRecord: core.edit,
    deleteRecord: core.remove,
  }
}
