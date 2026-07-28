import { beforeEach, describe, expect, it } from 'vitest'

import * as nucleify from 'nucleify'

describe('cookieSetItem', (): void => {
  beforeEach((): void => {
    globalThis.__TEST_CLIENT__ = true

    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0]?.trim()
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    }
  })

  it('sets the item', (): void => {
    nucleify.cookieSetItem('key', 'value')

    expect(nucleify.cookieGetItem('key')).toBe('value')
    expect(document.cookie).toContain('key=value')
  })
})
