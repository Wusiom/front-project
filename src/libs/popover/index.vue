<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="referenceTarget">
      <!-- 具名插槽 -->
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示动画 -->
    <transition name="slide">
      <div
        ref="contentTarget"
        v-show="isVisible && hasDefaultSlot()"
        class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch, useSlots } from 'vue'
import { useElementSize } from '@vueuse/core'

const slots = useSlots()
// Vue 3 中 default 是函数，需要调用后取 length
const hasDefaultSlot = () => !!slots.default?.()?.length

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator: (value) => {
      const result = placementEnum.includes(value)
      if (!result) {
        throw new Error(
          `placement 的值必须是 ${placementEnum.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})
const isVisible = ref(false)
let leaveTimer = null

const DELAY_TIME = 150
// 防抖关闭：鼠标移出后延迟 150ms 再关闭，避免在 reference 与 content 间移动时闪烁
const onMouseEnter = () => {
  if (leaveTimer) {
    clearTimeout(leaveTimer)
    leaveTimer = null
  }
  isVisible.value = true
}
const onMouseLeave = () => {
  leaveTimer = setTimeout(() => {
    isVisible.value = false
    leaveTimer = null
  }, DELAY_TIME)
}

const contentTarget = ref(null)
const referenceTarget = ref(null)
const contentStyle = ref({
  top: 0,
  left: 0
})
watch(isVisible, (newVal) => {
  if (!newVal) {
    return
  }
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width.value + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left =
          useElementSize(contentTarget.value).width.value + 'px'
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height.value + 'px'
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width.value +
          useElementSize(referenceTarget.value).height.value +
          'px'
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height.value + 'px'
        contentStyle.value.left = 0 + 'px'
        break
    }
  })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
