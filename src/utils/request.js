// 封装axios请求模块
import axios from 'axios'
// 引入store，来获取token数据
import store from '@/store'

const request = axios.create({
  // 接口的基准地址
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // 将user解构出来
    const { user } = store.state
    // 用户存在且用户的token存在，再配置headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(err) {
    return Promise.reject(err)
  }
)

// 响应拦截器

export default request
