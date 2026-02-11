<template>
  <div class="sticky bg-white dark:bg-zinc-800 top-0 left-0 w-full z-10">
    <ul
      :class="[isUnfold ? 'h-[262px]' : 'h-[56px]']"
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
    >
      <div
        @click="triggerUnfold"
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      >
        <m-svg-icon
          :name="isUnfold ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        />
      </div>
      <li
        v-for="(item, index) in sessionStore.categoryList"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        @click="onItemClick(item)"
        :class="[
          sessionStore.currentCategoryIndex === index
            ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-900'
            : ''
        ]"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import useSessionStore from '@/store/session'
import { ref } from 'vue'
const sessionStore = useSessionStore()

// 折叠菜单
const isUnfold = ref(false)
const triggerUnfold = () => {
  isUnfold.value = !isUnfold.value
}
const onItemClick = (item) => {
  sessionStore.changeCurrentCategory(item)
}
</script>

<style lang="scss" scoped></style>
