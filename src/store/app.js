import { defineStore } from 'pinia'
import { THEME_LIGHT, THEME_DARK } from '@/constants'
const useAppStore = defineStore('app', {
  state: () => ({
    theme: THEME_LIGHT
  }),
  actions: {
    changeThemeType(theme) {
      this.theme = theme
    }
  },
  persist: true
})
export default useAppStore