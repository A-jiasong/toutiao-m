<template>
  <div class="search-container">
    <!-- 搜索栏 事件监听 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchValue="searchValue" />

    <!-- 联想建议 -->
    <search-suggestion
      @search="onSearch"
      v-else-if="searchValue"
      :searchValue="searchValue"
    />

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @clearHisories="searchHistories = []"
      @search="onSearch"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'searchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchValue: '',
      isResultShow: false, // 控制搜索的结果展示
      searchHistories: getItem('searchHistories') || [] // 搜索的历史记录数据
    }
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setItem('searchHistories', val)
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      // 更新文本框的内容
      this.$toast(val)
      // 存储搜索历史记录
      // 不能有重复的历史记录，最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 106px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search {
    background-color: #3395fa;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
