# vue-ts-debounce [![](https://github.com/SmartsquareGmbH/vue-ts-debounce/workflows/CI/badge.svg)](https://github.com/SmartsquareGmbH/vue-ts-debounce/actions?query=workflow%3ACI) [![](https://badgen.net/npm/v/vue-ts-debounce)](https://www.npmjs.com/package/vue-ts-debounce)

Debounce decorator for Vue.js 2 using [`vue-class-component`](https://github.com/vuejs/vue-class-component). Based
on [`ts-debounce`](https://github.com/chodorowicz/ts-debounce).

### Install

```shell
yarn add vue-ts-debounce
```

### Usage

In the example below, `increment` is called at most every 500ms.

```vue

<template>
  <span>{{ value }}</span>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Debounce } from "vue-ts-debounce"

@Component
export default class MyComponent extends Vue {
  value = 0

  @Debounce(500)
  increment() {
    this.value += 1
  }
}
</script>
```

### Options

The `@Debounce` decorator either accepts a number or an object. The number represents the wait time in ms between each
call. The following options are available in the object:

| Name          | Description                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------|
| `wait`        | The wait time in ms.                                                                              |
| `isImmediate` | If the first call should be immediate instead of waiting for the given duration.                  |
| `maxWait`     | Call debounced function after this duration in ms, even if another call is currently in progress. |

### Thanks

Inspired by [vue-debounce-decorator](https://github.com/trepz/vue-debounce-decorator). The difference to that library is
the usage of [`ts-debounce`](https://github.com/chodorowicz/ts-debounce) and the ability to use the decorator across
multiple instances of the same component.
