import { shallowMount } from "@vue/test-utils"
import TestComponent from "./TestComponent.vue"
import { RelaxedVue } from "./types"

describe("debounce decorator", () => {
  test("debounce method", async () => {
    const wrapper = shallowMount<RelaxedVue>(TestComponent)

    for (let i = 0; i < 5; i++) {
      wrapper.vm.increaseValue()
    }

    expect(wrapper.vm.value).toEqual(0)

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper.vm.value).toEqual(1)

    wrapper.vm.increaseValue()

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper.vm.value).toEqual(2)
  })

  test("debounce method with immediate", async () => {
    const wrapper = shallowMount<RelaxedVue>(TestComponent)

    for (let i = 0; i < 5; i++) {
      wrapper.vm.increaseValueImmediate()
    }

    expect(wrapper.vm.value).toEqual(1)

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper.vm.value).toEqual(1)
  })

  test("debounce watcher", async () => {
    const wrapper = shallowMount<RelaxedVue>(TestComponent)

    for (let i = 0; i < 5; i++) {
      wrapper.vm.increaseValueWithoutDebounce()
    }

    expect(wrapper.vm.value).toEqual(5)
    expect(wrapper.vm.otherValue).toEqual(0)

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper.vm.otherValue).toEqual(1)

    wrapper.vm.increaseValueWithoutDebounce()

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper.vm.otherValue).toEqual(2)
  })

  test("parallel debounce", async () => {
    const wrapper1 = shallowMount<RelaxedVue>(TestComponent)
    const wrapper2 = shallowMount<RelaxedVue>(TestComponent)

    for (let i = 0; i < 5; i++) {
      wrapper1.vm.increaseValue()
      wrapper2.vm.increaseValue()
    }

    expect(wrapper1.vm.value).toEqual(0)
    expect(wrapper2.vm.value).toEqual(0)

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper1.vm.value).toEqual(1)
    expect(wrapper2.vm.value).toEqual(1)

    wrapper1.vm.increaseValue()

    await new Promise((resolve) => setTimeout(resolve, 15))

    expect(wrapper1.vm.value).toEqual(2)
    expect(wrapper2.vm.value).toEqual(1)
  })
})
