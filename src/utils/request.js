// 封装axios请求模块
import axios from 'axios'
// 引入store，来获取token数据
import store from '@/store'
// 处理大数字问题
import JSONBig from 'json-bigint'

const request = axios.create({
  // 接口的基准地址
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 自定义后端返回的原始数据
  // data： 后端返回的原始数据，就是json格式的字符串
  transformResponse: [
    function(data) {
      try {
        return JSONBig.parse(data)
      } catch (err) {
        return data
      }
      // axios 默认会在内部这样来处理后端返回的数据
    }
  ]
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
