import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 定义一个常量，方便复用
const tokenKey = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储用户的登录状态信息（token等信息）
    // user: JSON.parse(window.localStorage.getItem(tokenKey))
    user: getItem(tokenKey)
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      // 为了防止数据丢失，需要把数据存储到本地
      // window.localStorage.setItem(tokenKey, JSON.stringify(user))
      setItem(tokenKey, user)
    }
  },
  actions: {},
  modules: {}
})
