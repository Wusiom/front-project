<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>
<script>
const INTERVAL_COUNT = 1000
// 倒计时结束
const EMITS_FINISH = 'finish'
// 倒计时改变
const EMITS_CHANGE = 'change'
</script>
<script setup>
import { ref, watch, onUnmounted, computed } from 'vue'
import dayjs from './utils'
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

// 倒计时时长
const duration = ref(0)

// 倒计时行为
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  // 监听结束行为
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}
// 处理显示时间
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
// 关闭倒计时
let interval = null
const close = () => {
  clearInterval(interval)
}

// 倒计时开始
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
watch(
  () => props.time,
  (newVal) => {
    duration.value = newVal
    start()
  },
  { immediate: true }
)

onUnmounted(() => {
  close()
})
</script>

<style lang="scss" scoped></style>
