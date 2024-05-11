import { computed, ref } from 'vue'
import { defineStore } from "pinia";

import tokenUtil from '@/utils/token'

export const useUserStore = defineStore('user', () => {
  // token
  const t = ref('')

  // 抛出的token
  const token = computed(() => t.value || tokenUtil.getToken() || '')


  const loginAction = () => {

  }

  const registerAction = () => {

  }

  /**
   * 获取用户信息
   */
  const getUserInfoAction = () => {

  }

  /**
   * 退出登录
   */
  const logoutAction = () => {

  }

  /**
   * 注销账号
   */
  const deregisterAction = () => {

  }


  return {
    token,
    loginAction,
    registerAction,
    getUserInfoAction,
    logoutAction,
    deregisterAction
  }
})
