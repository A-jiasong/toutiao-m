// 文章接口模块
import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

// 1.获取所有频道
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 2.添加用户频道
export const addUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 3.删除用户指定频道
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}

// 4.获取文章
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 5.收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 6.取消收藏文章
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`
  })
}

// 7.点赞文章
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 8.取消点赞文章
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`
  })
}
