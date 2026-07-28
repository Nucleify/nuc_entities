import type { Component } from 'vue'

import type { ComponentType } from '../../types/component/variables'

/** Atomic Ad* inputs were wiped — map types until nui-* field wrappers land. */
export function getComponent(_type: ComponentType): Component | null {
  return null
}
