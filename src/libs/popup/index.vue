<template>
  <div>
    <teleport to="body">
      <!-- 背景蒙版 -->
      <transition name="fade">
        <div
          v-if="isOpen"
          class="fixed top-0 left-0 w-screen h-screen z-40 bg-zinc-900/80"
          @click="isOpen = false"
        ></div>
      </transition>
      <!-- 弹窗内容 -->
      <transition name="popup-down-up">
        <div
          v-if="isOpen"
          v-bind="$attrs"
          class="fixed z-50 w-screen bg-white bottom-0 dark:bg-zinc-800"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock, useVModel } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const isOpen = useVModel(props)

const isLocked = useScrollLock(document.body)
watch(
  isOpen,
  (newVal) => {
    if (newVal) {
      isLocked.value = true
    } else {
      isLocked.value = false
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
