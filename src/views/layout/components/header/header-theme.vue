<template>
  <m-popover>
    <template #reference>
      <m-svg-icon
        name="theme-light"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      />
    </template>
    <div>
      <div class="w-[120px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in themeArr"
          :key="item.id"
          @click="appStore.changeThemeType(item.type)"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          />
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants'
import useAppStore from '@/store/app'
import { computed } from 'vue'
const appStore = useAppStore()
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]
const svgIconName = computed(() => {
  const findTheme = themeArr.find((item) => item.type === appStore.theme)
  return findTheme.icon
})
</script>

<style lang="scss" scoped></style>
