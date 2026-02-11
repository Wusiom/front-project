<template>
  <mobile-navigation
    v-if="isMobileTerminal"
    :data="sessionStore.categoryList"
  />
  <pc-navigation v-else :data="sessionStore.categoryList" />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { getCategory } from '@/api/category'
import { ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
import useSessionStore from '@/store/session'
const sessionStore = useSessionStore()
sessionStore.getCategoryData()
</script>

<style lang="scss" scoped></style>
