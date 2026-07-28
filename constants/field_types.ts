export const ENTITY_FIELD_TYPES = [
  { value: 'input-text', label: 'Text' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
  { value: 'date-picker', label: 'Date' },
  { value: 'password', label: 'Password' },
  { value: 'input-mask', label: 'Masked input' },
] as const

export const ENTITY_FIELD_TYPE_VALUES = ENTITY_FIELD_TYPES.map((t) => t.value)

export interface EntityFieldTypeMetaInterface {
  value: string
  label: string
  icon: string
  description: string
}

export const ENTITY_FIELD_TYPE_META: EntityFieldTypeMetaInterface[] = [
  {
    value: 'input-text',
    label: 'Text',
    icon: 'prime:pencil',
    description: 'Short value such as a title or a name',
  },
  {
    value: 'textarea',
    label: 'Long text',
    icon: 'prime:align-left',
    description: 'Multi-line content like a note or a summary',
  },
  {
    value: 'select',
    label: 'Select',
    icon: 'prime:list',
    description: 'One value picked from a predefined list',
  },
  {
    value: 'date-picker',
    label: 'Date',
    icon: 'prime:calendar',
    description: 'Day, month and year',
  },
  {
    value: 'password',
    label: 'Password',
    icon: 'prime:lock',
    description: 'Masked value hidden while typing',
  },
  {
    value: 'input-mask',
    label: 'Masked',
    icon: 'prime:hashtag',
    description: 'Phone, post code or any fixed pattern',
  },
]

export function entityFieldTypeMeta(
  value: string
): EntityFieldTypeMetaInterface {
  return (
    ENTITY_FIELD_TYPE_META.find((meta) => meta.value === value) ??
    ENTITY_FIELD_TYPE_META[0]
  )
}

export const ENTITY_ICON_PRESETS: string[] = [
  'prime:box',
  'prime:file',
  'prime:book',
  'prime:bookmark',
  'prime:briefcase',
  'prime:building',
  'prime:calendar',
  'prime:camera',
  'prime:chart-bar',
  'prime:check-square',
  'prime:clock',
  'prime:cloud',
  'prime:code',
  'prime:comments',
  'prime:credit-card',
  'prime:database',
  'prime:envelope',
  'prime:flag',
  'prime:folder',
  'prime:gift',
  'prime:globe',
  'prime:heart',
  'prime:home',
  'prime:image',
  'prime:inbox',
  'prime:key',
  'prime:map-marker',
  'prime:megaphone',
  'prime:mobile',
  'prime:money-bill',
  'prime:palette',
  'prime:phone',
  'prime:shield',
  'prime:shopping-bag',
  'prime:star',
  'prime:tag',
  'prime:ticket',
  'prime:truck',
  'prime:user',
  'prime:users',
  'prime:video',
  'prime:wrench',
]

export interface EntityStarterPresetInterface {
  name: string
  icon: string
  description: string
}

export const ENTITY_STARTER_PRESETS: EntityStarterPresetInterface[] = [
  {
    name: 'Articles',
    icon: 'prime:file',
    description: 'Blog posts, news and long form content',
  },
  {
    name: 'Contacts',
    icon: 'prime:users',
    description: 'People you keep in touch with',
  },
  {
    name: 'Tasks',
    icon: 'prime:check-square',
    description: 'Things to do, with a due date and status',
  },
  {
    name: 'Expenses',
    icon: 'prime:money-bill',
    description: 'Money going in and out',
  },
]
