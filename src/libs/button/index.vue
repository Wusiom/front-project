<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      TYPE_ENUM[type],
      SIZE_ENUM[sizeKey].button,
      { 'active:scale-105': isActiveAnim }
    ]"
    @click.stop="onBtnClick"
  >
    <!-- loading 图标 -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    />
    <!-- icon 图标 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="SIZE_ENUM[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    />
    <!-- 按钮文字 -->
    <slot v-else></slot>
  </button>
</template>

<script>
// 模块作用域常量，defineProps 的 validator 可安全引用（defineProps 会被提升到 setup 外）
const TYPE_ENUM = {
  primary:
    'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
}

const SIZE_ENUM = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMIT_CLICK = 'click'
</script>

<script setup>
import { computed } from 'vue'
const emit = defineEmits([EMIT_CLICK])
const props = defineProps({
  icon: {
    type: String
  },
  iconColor: {
    type: String
  },
  type: {
    type: String,
    default: 'main',
    validator: (value) => {
      const keys = Object.keys(TYPE_ENUM)
      const isValid = keys.includes(value)
      if (!isValid) {
        throw new Error(`你的type必须是: ${keys.join(', ')} 中的一个`)
      }
      return isValid
    }
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => {
      const keys = Object.keys(SIZE_ENUM).filter((key) => !key.includes('icon'))
      const isValid = keys.includes(value)
      if (!isValid) {
        throw new Error(`你的size必须是: ${keys.join(', ')} 中的一个`)
      }
      return isValid
    }
  },
  // 按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },

  // 按钮是否加载中
  loading: {
    type: Boolean,
    default: false
  }
})

const sizeKey = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size
})
const onBtnClick = () => {
  if (props.loading) return
  emit(EMIT_CLICK)
}
</script>

<style lang="scss" scoped></style>
