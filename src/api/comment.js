// 评论请求模块
import request from '@/utils/request'

// 获取文章评论列表
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
    // GET 参数使用params进行传递
    // 我们写的时候是对象，但最终发给后端的数据是？
    // axios 会把params对象转为key=value？ key=value 的格式放到 url中
  })
}

// 评论点赞
export const getCommentLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消评论点赞
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

// 添加评论回复
export const addComment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: target
  })
}
