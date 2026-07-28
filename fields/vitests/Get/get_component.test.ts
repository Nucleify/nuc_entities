import { expect, it } from 'vitest'

import * as nucleify from 'nucleify'

it('returns null for "textarea" until field wrappers land', (): void => {
  expect(nucleify.getComponent('textarea')).toBeNull()
})

it('returns null for "input-text" until field wrappers land', (): void => {
  expect(nucleify.getComponent('input-text')).toBeNull()
})

it('returns null for "date-picker" until field wrappers land', (): void => {
  expect(nucleify.getComponent('date-picker')).toBeNull()
})

it('returns null for "select" until field wrappers land', (): void => {
  expect(nucleify.getComponent('select')).toBeNull()
})

it('returns null for "password" until field wrappers land', (): void => {
  expect(nucleify.getComponent('password')).toBeNull()
})

it('returns null for unknown types until field wrappers land', (): void => {
  expect(
    nucleify.getComponent('unknown-type' as unknown as nucleify.ComponentType)
  ).toBeNull()
})

it('returns null for empty string until field wrappers land', (): void => {
  expect(
    nucleify.getComponent('' as unknown as nucleify.ComponentType)
  ).toBeNull()
})
