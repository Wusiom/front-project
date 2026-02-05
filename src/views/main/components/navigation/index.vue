<template>
  <mobile-navigation
    v-if="isMobileTerminal"
    :data="categoryStore.categoryList"
  />
  <pc-navigation v-else :data="categoryStore.categoryList" />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { getCategory } from '@/api/category'
import { ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
import useCategoryStore from '@/store/category'
const categoryStore = useCategoryStore()
categoryStore.getCategoryData()
</script>

<style lang="scss" scoped></style>
