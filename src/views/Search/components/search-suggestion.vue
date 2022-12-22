<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in SuggestionList"
      :key="index"
      @click="$emit('keyWord', item)"
    >
      <div>{{ item }}</div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionApi } from "@/api/Search";
export default {
  name: "search-suggestion",
  props: ["value"],
  data() {
    return {
      SuggestionList: [], //联想搜索渲染数组
    };
  },
  watch: {
    // 监听父组件搜索框得搜索数据
    value: {
      immediate: true,
      async handler(newvalue) {
        try {
          // 发送请求
          let { data } = await getSuggestionApi(newvalue);
          // 如果没有结果,那么联想搜索得数组也赋值为空
          if (data.options[0] == null) return (this.SuggestionList = []);
          // 将数据给到渲染数组
          this.SuggestionList = data.options;
        } catch (error) {
          error;
        }
      },
    },
  },
};
</script>

<style></style>
