import { debounce, Options } from "ts-debounce"
import Vue from "vue"
import { createDecorator, VueDecorator } from "vue-class-component"

export type DebounceOptions =
  | number
  | {
      wait: number
      isImmediate?: boolean
      maxWait?: number
    }

type VueWithIndex = Vue & { [key: string]: unknown }

/**
 * Instance-aware debounce decorator. Makes the annotated function debounced so that it gets called at
 * most `options.wait` ms.
 *
 * This works by replacing the annotated function by another one that delegates to a debounced function. This debounced
 * function is dynamically created in beforeCreate so that it is bound to the specific Vue instance. If we were to
 * directly debounce in the replacing function, all instances would be debounced at once.
 *
 * Usage:
 *
 * @Debounce(250)
 * async loadData() {
 *   ...
 * }
 */
export function Debounce(options: DebounceOptions): VueDecorator {
  return createDecorator((component, handler) => {
    if (!component.methods) throw new Error("This decorator must be used on a vue component method.")

    const wait = typeof options === "number" ? options : options.wait
    const debounceOptions: Options<unknown> = typeof options === "object" ? options : {}

    const handlerDelegateIndex = `_${handler}`
    const originalMethod = component.methods[handler]

    // Replace the method of the component. This affects the prototype and thus all instances.
    component.methods[handler] = function (...args: unknown[]) {
      const handlerDelegateFn = (this as VueWithIndex)[handlerDelegateIndex]

      if (typeof handlerDelegateFn === "function") {
        handlerDelegateFn.apply(this, args)
      } else {
        originalMethod.apply(this, args)
      }
    }

    // eslint-disable-next-line jest/unbound-method -- We do not have the context here.
    const originalBeforeCreate = component.beforeCreate

    // Replace the beforeCreate lifecycle hook with a custom one that creates our delegate function.
    component.beforeCreate = function () {
      ;(this as VueWithIndex)[handlerDelegateIndex] = debounce(originalMethod, wait, debounceOptions)

      originalBeforeCreate?.apply(this)
    }
  })
}
