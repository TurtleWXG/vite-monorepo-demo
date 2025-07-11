import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    access_token: '',
    token_type: '',
    refresh_token: '',
    expires_in: 0,
    scope: '',
    uid: '',
    jti: ''
  }),
  persist: {
    storage: sessionStorage
  }
})
