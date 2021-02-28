<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
      >
        <span
          class="text"
          slot="text"
          :class="{ active: active === index }"
          @click="onMyChannelClick(channel, index)"
          >{{ channel.name }}</span
        >
        <van-icon
          v-show="isEditShow && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        icon="plus"
        @click="onAddChannel(channel)"
      >
        <span class="text" slot="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/article.js'

export default {
  name: 'channelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [],
      isEditShow: false, // 控制编辑状态的显示与隐藏
      fiexdChannels: [0] // 固定频道不允许被删除
    }
  },
  computed: {
    recommendChannels() {
      // 数组的filter方法：遍历数组，把符合条件的元素存储到新数组中
      return this.allChannels.filter(channel => {
        // const channels = []

        // 数组的find方法：遍历数据，把符合条件的第一个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find(myChannels => {
    //       return myChannels.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    // 加载所有的频道
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },

    // 点击下面频道推荐
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },

    // 点击我的频道
    onMyChannelClick(channel, index) {
      if (this.isEditShow) {
        // 执行删除操作
        // 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) return

        // splice参数1：要删除的元素的开始索引；参数2：删除的个数，如果不指定，则从参数1开始一直删除
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          // 删除的元素在当前元素的前面，就将active减一
          this.$emit('update-active', this.active - 1, true)
        }
      } else {
        // 执行跳转操作
        // 此时是子组件向父组件传值
        this.$emit('update-active', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
