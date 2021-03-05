<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="followLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'

export default {
  name: 'FollowedUser',
  components: {},
  // 自定义 v-model 的数据名称
  model: {
    prop: 'isFollowed', // 默认是value
    event: 'update-is_followed' // 默认是input
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 关注与取消关注
    async onFollow() {
      // 展示关注的loading状态
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 如果已关注，点击取消关注
          await deleteFollow(this.user_id)
        } else {
          // 如果未关注，点击添加关注
          await addFollow(this.user_id)
        }
        // this.isFollowed = !this.isFollowed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      // 关闭关注的loading状态
      this.followLoading = false
    }
  }
}
</script>

<style scoped lang="less"></style>
