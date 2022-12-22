<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="historyIsshow && SearchHistoryList.length > 0">
        <span @click="SearchHistoryList = []">全部删除</span>
        &nbsp;&nbsp;
        <span @click="historyIsshow = false">完成</span>
      </div>
      <van-icon
        v-else-if="SearchHistoryList.length > 0"
        name="delete"
        @click="historyIsshow = true"
      />
    </van-cell>
    <van-cell
      v-for="(item, index) in SearchHistoryList"
      :key="index"
      class="search-border"
      :title="item"
      @click="$emit('keyWord', item)"
    >
      <van-icon
        v-show="historyIsshow"
        name="close"
        @click="SearchHistoryList.splice(index, 1)"
      />
    </van-cell>
  </div>
</template>

<script>
import { setItem, getItem } from "@/utils/storage";
export default {
  name: "search-history",
  data() {
    return {
      historyIsshow: false, //控制删除和垃圾箱得显示与隐藏
      SearchHistoryList: getItem("SEARCH_HISTORY") || [], //搜索历史渲染数组
    };
  },
  mounted() {
    this.$bus.$on("SearchHistory", (value) => {
      // 传过来得值在数组中是否存在
      let index = this.SearchHistoryList.indexOf(value);
      // 存在则删除
      if (index !== -1) this.SearchHistoryList.splice(index, 1);
      // 添加到数组中
      this.SearchHistoryList.unshift(value);
    });
  },
  watch: {
    SearchHistoryList() {
      // 添加到本地存储
      setItem("SEARCH_HISTORY", this.SearchHistoryList);
    },
  },
};
</script>

<style lang="less" scoped>
.search-border {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
