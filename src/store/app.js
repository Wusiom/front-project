import { defineStore } from 'pinia'
import { THEME_LIGHT, THEME_DARK } from '@/constants'
const useAppStore = defineStore('app', {
  state: () => ({
    theme: THEME_LIGHT,
    historySearch: []
  }),
  actions: {
    changeThemeType(theme) {
      this.theme = theme
    },
    addHistorySearch(newHistory) {
      const isFindIndex = this.historySearch.findIndex(item => item === newHistory)
      if (isFindIndex !== -1) {
        this.historySearch.splice(isFindIndex, 1)
      }
      this.historySearch.unshift(newHistory)
    },
    deleteHistorySearch(index) {
      this.historySearch.splice(index, 1)
    },
    clearHistorySearch() {
      this.historySearch = []
    }
  },
  persist: true
})
export default useAppStore