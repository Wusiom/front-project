<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="isLoading"
        class="w-4 h-4 mx-auto animate-spin dark:fill-zinc-400"
        name="infinite-load"
      ></m-svg-icon>
    </div>
    <p v-if="isFinished" class="text-center text-base text-zinc-400">
      没有更多数据了!
    </p>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useVModel, useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    default: false
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  },
  // 实际发生滚动的容器元素（若列表在 overflow-auto 的 div 内，必须传入该 div 的 ref，否则会以视口为 root，导致 isIntersecting 一直为 true）
  scrollRoot: {
    type: [Object, null],
    default: null
  }
})

const emits = defineEmits(['update:modelValue', 'onLoad'])
const isLoading = useVModel(props, 'modelValue', emits)

// 滚动的元素
const loadingTarget = ref(null)
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  // 获取当前交叉状态
  console.log('isIntersecting', isIntersecting)
  targetIsIntersecting.value = isIntersecting
  // 触发 load
  emitLoad()
})

/**
 * 触发 load
 */
const emitLoad = () => {
  // 当加载更多的视图可见时，加载更多数据
  console.log(targetIsIntersecting.value)
  if (targetIsIntersecting.value && !isLoading.value && !props.isFinished) {
    // 修改加载数据标记
    isLoading.value = true
    // 触发加载更多行为
    emits('onLoad')
  }
}

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(isLoading, (val) => {
  // 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
  setTimeout(() => {
    emitLoad()
  }, 200)
})
</script>

<style lang="scss" scoped></style>
