import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', () => {
  let user = ref({})

  const isLogin = computed(() => user.value.tel && user.value.token)

  function setUser(data) {
    let entries = Object.entries(data);
    if(data.token) {
      Cookies.set('Admin-Token', data.token)
    }
    entries.forEach(item=>{
        if(!!item[1]){
            user.value[item[0]] = item[1]
        }
    })
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  function clearUser() {
    user.value = {}
    Cookies.remove('Admin-token')
    localStorage.setItem('user', '{}')
  }

  function initUser() {
    let local_user = localStorage.getItem('user') || '{}'
    local_user = JSON.parse(local_user)
    if(local_user.tel && local_user.token){
        isLogin.value = true
        user.value = local_user
    }
  }

  return { user, isLogin, setUser, initUser, clearUser }
})
