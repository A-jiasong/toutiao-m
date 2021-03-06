<template>
  <div class="comment-list">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :erroe="error"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
      >
      </van-cell> -->
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      >
      </comment-item>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => {}
    },
    type: {
      type: String,
      // 自定义prop数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      // totalCount: 0, // 总数据条数
      error: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loading = true
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getComments({
          // 获取文章的评论和获取评论的回复是同一接口
          // 唯一的区别是接口参数不一样
          // type
          // a 文章的评论
          // c 评论的回复
          // source
          // 文章的评论，则传递文章的ID
          // 评论的回复，则传递评论的ID
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 每页大小
        })

        // console.log(data)

        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 把文章评论的总数量传递到父组件
        this.$emit('onload-success', data.data)

        // 3. 将加载更多的 loading 设置为 false
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，关闭加载更多
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
