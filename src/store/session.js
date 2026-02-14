import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM, CATEGORY_NOMAR_DATA } from '@/constants'
import md5 from 'md5'
import { loginUser, getProfile, registerUser } from '@/api/sys'
import { message } from '@/libs'
import { isMobileTerminal } from '@/utils/flexible'
export default defineStore('session', {
  state: () => ({
    categoryList: CATEGORY_NOMAR_DATA,
    currentCategory: ALL_CATEGORY_ITEM,
    searchText: '',
    token: '',
    userInfo: {},
    // 路由跳转类型
    routerType: 'none'
  }),
  actions: {
    async getCategoryData() {
      const { categorys } = await getCategory()
      console.log(categorys, 'categorys', ALL_CATEGORY_ITEM);
      this.categoryList = [ALL_CATEGORY_ITEM, ...categorys]
    },
    changeCurrentCategory(category) {
      this.currentCategory = category
    },
    changeSearchText(text) {
      this.searchText = text
    },
    async login(payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      if (data) {
        this.token = data.token
        await this.profile()
      }
    },
    async profile() {
      const data = await getProfile()
      if (data) {
        this.userInfo = data
        message('success', `欢迎您 ${data.vipLevel
          ? '尊贵的 VIP' + data.vipLevel + ' 用户 ' + data.nickname
          : data.nickname
          }`, 6000)
      }
    },
    logout() {
      this.token = ''
      this.userInfo = {}
      location.reload()
    },
    async register(payload) {
      const { password } = payload
      const data = await registerUser({
        ...payload,
        password: password ? md5(password) : ''
      })
      if (data) {
        this.token = data.token
        await this.profile()
      }
      return data
    },
    changeRouterType(type) {
      this.routerType = type
    }
  },
  getters: {
    currentCategoryIndex: (state) => {
      return state.categoryList.findIndex(item => item.id === state.currentCategory.id)
    },
    getRouterType: (state) => {
      if (!isMobileTerminal) {
        return 'none'
      }
      return state.routerType
    }
  },
  persist: true
})