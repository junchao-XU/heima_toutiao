<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isShow" :value="value"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想搜索 -->
    <search-suggestion
      v-else-if="value"
      :value="value"
      @keyWord="keyWord"
    ></search-suggestion>
    <!-- /联想搜索 -->

    <!-- 历史搜索 -->
    <keep-alive>
      <search-history
        v-if="!isShow && !value"
        @keyWord="keyWord"
      ></search-history>
    </keep-alive>
    <!-- /历史搜索 -->
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
export default {
  name: "search",
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      value: "",
      isShow: false, //控制这三个组件显示与隐藏
      // val: "",
    };
  },
  methods: {
    onSearch() {
      // 让搜索结果组件显示  搜索历史和联想搜索都隐藏
      this.isShow = true;
    },
    // 回到主界面
    onCancel() {
      this.$router.back();
    },
    // 点击搜索关键字
    keyWord(value) {
      // 将点击得联想搜索词,赋值给输入框
      this.value = value;
      this.onSearch();
    },
  },
};
</script>

<style></style>
