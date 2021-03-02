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
      handler(val) {
        this.loadSearchSuggestion(val)
      },
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
