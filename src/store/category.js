import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
export default defineStore('category', {
  state: () => ({
    categoryList: CATEGORY_NOMAR_DATA,
  }),
  actions: {
    async getCategoryData() {
      const { categorys } = await getCategory()
      this.categoryList = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  persist: true,
})