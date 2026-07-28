import type {
  EntityCountResultsType,
  EntityResultsType,
  LoadingType,
} from 'nucleify'

export type EntityFieldType =
  | 'input-text'
  | 'textarea'
  | 'select'
  | 'date-picker'
  | 'password'
  | 'input-mask'

export interface NucEntityTypeInterface {
  id: string
  slug: string
  name: string
  description?: string | null
  icon?: string | null
  category: string
  is_scoped: boolean
  created_by?: string | null
  created_at?: string
  updated_at?: string
  record_count?: number
}

export interface NucEntityFieldInterface {
  id?: string
  entity_type_id?: string
  name: string
  label: string
  field_type: string
  sort_order?: number
  required?: boolean
  show_in_table?: boolean
  show_in_form?: boolean
  options?: Record<string, unknown>
}

export interface NucEntityRecordInterface {
  id: number
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

export interface NucEntityTypeRequestsInterface {
  results: EntityResultsType<NucEntityTypeInterface>
  loading: LoadingType
  getAllTypes: (showLoading?: boolean) => Promise<void>
  createType: (
    data: Partial<NucEntityTypeInterface>
  ) => Promise<NucEntityTypeInterface | null>
  updateType: (
    slug: string,
    data: Partial<NucEntityTypeInterface>
  ) => Promise<void>
  deleteType: (slug: string) => Promise<void>
  getType: (slug: string) => Promise<NucEntityTypeInterface | null>
  getFields: (slug: string) => Promise<NucEntityFieldInterface[]>
  saveFields: (
    slug: string,
    fields: NucEntityFieldInterface[]
  ) => Promise<NucEntityFieldInterface[]>
}

export interface NucEntityRecordRequestsInterface {
  results: EntityResultsType<NucEntityRecordInterface>
  loading: LoadingType
  createdLastWeek: EntityCountResultsType
  getAllRecords: (showLoading?: boolean) => Promise<void>
  getCountByCreatedLastWeek: (showLoading?: boolean) => Promise<void>
  storeRecord: (
    data: NucEntityRecordInterface,
    getData: () => Promise<void>
  ) => Promise<void>
  editRecord: (
    data: NucEntityRecordInterface,
    getData: () => Promise<void>
  ) => Promise<void>
  deleteRecord: (id: number, getData: () => Promise<void>) => Promise<void>
}
