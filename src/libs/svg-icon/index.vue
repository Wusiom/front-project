<template>
  <svg aria-hidden="true">
    <use :class="fillClass" :fill="color" :xlink:href="`${symbolId}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 剔除 icon 前缀
  name: {
    type: String,
    required: true
  },
  // 直接指定svg颜色
  color: {
    type: String
  },
  // 通过 tailwind 类名填充颜色
  fillClass: {
    type: String
  }
})
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped></style>
