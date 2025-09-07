import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref('dasdas12354sdada')
  const token = ref(localStorage.getItem('token'))
  const roles = ref([])
  const permissions = ref([])

  const login = async () => {
    console.log('登录')
    return new Promise((resolve,reject) => {
      let user = {id: '1',name: '张三',token: '123456'}
      if (user.token !== '') {
        console.log(11)
        userInfo.value = user
        resolve()
      } else {
        console.log(22)
        reject('123456')
      }
    })
  }

  const getUserInfo = async () => {
    console.log('获取用户权限')
    // const res = await getUserInfoApi()
    roles.value = ['admin']
    permissions.value = ['admin']
  }

  const loginOut = async () => {
    userInfo.value = {}
  }

  return { userInfo, login,loginOut,getUserInfo,token,roles, permissions, }
}, {
  persist: true
})
