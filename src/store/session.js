import { defineStore } from 'pinia'
defineStore('session', {
  state: () => ({
    session: null
  }),
  actions: {
    setSession(session) {
      this.session = session
    }
  }
})