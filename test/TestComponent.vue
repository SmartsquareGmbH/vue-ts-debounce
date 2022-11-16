<template>
  <div>
    <span>{{ value }}</span>
    <span>{{ otherValue }}</span>
  </div>
</template>

<script lang="ts">
import { Debounce } from "../src/index"
import Vue from "vue"
import Component from "vue-class-component"
import { Watch } from "vue-property-decorator"

@Component
export default class TestComponent extends Vue {
  value: number = 0
  otherValue: number = 0

  @Debounce(10)
  increaseValue(): void {
    this.value += 1
  }

  @Debounce({ wait: 20, isImmediate: true })
  increaseValueImmediate() {
    this.value += 1
  }

  increaseValueWithoutDebounce() {
    this.value += 1
  }

  @Debounce(10)
  @Watch("value")
  onValueChanged() {
    this.otherValue += 1
  }
}
</script>
