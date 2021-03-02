<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in suggestions"
      :key="index"
      :title="item"
      icon="search"
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    // 监听输入框的变化
    searchValue: {
      // debounce 函数
      // 参数1：函数
      // 参数2：防抖时间
      // 返回值：防抖之后的函数，和参数1功能是一样的
      handler: debounce(function(val) {
        this.loadSearchSuggestion(val)
      }, 1000),
      // handler(val) {
      //   this.loadSearchSuggestion(val)
      // },
      // 首次监视触发
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestion(q)
        console.log(data.data.options)
        this.suggestions = data.data.options
      } catch {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
