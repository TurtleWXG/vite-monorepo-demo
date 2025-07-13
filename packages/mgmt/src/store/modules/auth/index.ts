import { useStateRef } from '@gx-web/tool'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const [state, setState, resetState] = useStateRef(() => ({
      access_token: '',
      token_type: '',
      refresh_token: '',
      expires_in: 0,
      scope: '',
      uid: '',
      jti: ''
    }))

    const getToken = computed(() => state.value.access_token)

    const getRefreshToken = computed(() => state.value.refresh_token)

    return {
      state,
      setState,
      resetState,
      getToken,
      getRefreshToken
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
