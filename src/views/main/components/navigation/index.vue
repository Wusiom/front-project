<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categoryData" />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import { getCategory } from '@/api/category'
import { ref } from 'vue'
import { ALL_CATEGORY_ITEM } from '@/constants'
const categoryData = ref([])
const getCategoryData = async () => {
  const { categorys } = await getCategory()
  categoryData.value = [ALL_CATEGORY_ITEM, ...categorys]
}
getCategoryData()
</script>

<style lang="scss" scoped></style>
