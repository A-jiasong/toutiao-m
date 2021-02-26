// 封装用户相关的请求模块
import request from '@/utils/request'

// 引入store，来获取token数据
import store from '@/store'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    // 发送请求头数据
    headers: {
      // 该接口需要授权才能访问
      // token的数据格式：Bearer token数据，Bearer后面有一个空格
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
