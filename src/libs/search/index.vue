<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <m-svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] left-2 top-[50%]"
        color="#707070"
      />
      <!-- 输入框 -->
      <input
        type="text"
        class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
        placeholder="搜索"
        v-model="inputValue"
        @keydown.enter="onSearchClick"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <!-- 删除按钮  -->
      <m-svg-icon
        v-if="inputValue"
        @click="onClearClick"
        name="input-delete"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] right-9 top-[50%] duration-500 cursor-pointer"
      />
      <div
        class="opacity-0 h-1.5 w-px absolute top-[50%] translate-y-[-50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- todo: 搜索按钮（通用组件 -->
      <m-button
        class="absolute right-1 top-[50%] translate-y-[-50%] rounded-xl opacity-0 group-hover:opacity-100 duration-500"
        iconColor="#fff"
        icon="search"
        @click="onSearchClick"
      ></m-button>
    </div>
    <!-- 下拉区 -->
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 dark:border-zinc-600 absolute z-20 left-0 top-[56px] p-2 rounded border boreder-zinc-200 duration-200 hover:shadow-3xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search'

// 删除所有文本事件
const EMIT_CLEAR = 'clear'

// 输入事件
const EMIT_INPUT = 'input'

// 获取焦点事件
const EMIT_FOCUS = 'focus'

// 失去焦点事件
const EMIT_BLUR = 'blur'

const EMIT_UPDATE_MODEL_VALUE = 'update:modelValue'
</script>
<script setup>
import { ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
const emit = defineEmits([
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR,
  EMIT_UPDATE_MODEL_VALUE
])
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const inputValue = useVModel(props, 'modelValue', emit)

const onClearClick = () => {
  inputValue.value = ''
  emit(EMIT_CLEAR, '')
}
const onSearchClick = () => {
  emit(EMIT_SEARCH, inputValue.value)
}

// input 是否获取到焦点
const isFocus = ref(false)

// 输入框的值发生变化
watch(inputValue, (newVal) => {
  emit(EMIT_INPUT, newVal)
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
