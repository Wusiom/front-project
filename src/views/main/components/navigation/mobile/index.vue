<template>
  <div class="bg-white sticky top-0 z-10 dark:bg-zinc-900">
    <ul
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
      ref="ulTarget"
    >
      <!-- hamburger icon -->
      <li
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isPopupVisible = true"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5" />
      </li>
      <!-- 滑块 -->
      <li
        ref="sliderRef"
        class="absolute h-[22px] rounded-lg duration-200 bg-zinc-900 dark:bg-zinc-800"
        :style="sliderStyle"
      ></li>
      <!-- navigation items -->
      <li
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        @click="handleItemClick(index)"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isPopupVisible">
      <Menu :categorys="data" @onItemClick="handleItemClick" />
    </m-popup>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import Menu from '@/views/main/components/menu/index.vue'
defineProps({
  data: {
    type: Array,
    required: true
  }
})
const sliderRef = ref(null)
const sliderStyle = ref({
  width: '52px',
  transform: 'translateX(0px)'
})
// 选中的item下标
const currentCategoryIndex = ref(0)
// 获取所有的填充item
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})
const ulTarget = ref(null)
const { x: ulScrollleft } = useScroll(ulTarget)
watch(currentCategoryIndex, (newVal) => {
  const { left, width } = itemRefs[newVal].getBoundingClientRect()
  sliderStyle.value.width = `${width}px`
  sliderStyle.value.transform = `translateX(${
    left + ulScrollleft.value - 10
  }px)`
})
const handleItemClick = (index) => {
  currentCategoryIndex.value = index
  isPopupVisible.value = false
}
const isPopupVisible = ref(false)
</script>

<style lang="scss" scoped></style>
