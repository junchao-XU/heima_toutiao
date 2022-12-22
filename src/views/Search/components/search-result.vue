<template>
  <div>
    <van-list
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :finished="finished"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsApi } from "@/api/Search";
export default {
  name: "search-result",
  props: ["value"],
  data() {
    return {
      list: [], //渲染页面得数组
      error: false, //控制错误
      loading: false, //控制加载状态
      finished: false, //当数据加载完毕,为true
      page: 1, //当前页码数
      per_page: 20, //当前页需要的数据条数(如果不传后台默认返回10个)
    };
  },
  methods: {
    async onLoad() {
      try {
        let { data } = await getSearchResultsApi({
          page: this.page,
          per_page: this.per_page,
          q: this.value,
        });
        // 赋值给渲染数组
        this.list.push(...data.results);
        // 关闭本次加载
        this.loading = false;
        // 判断是否还有数据
        if (data.results.length !== 0) {
          this.page++;
        } else {
          // 数据全部加载完毕
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        // 监视搜索得内容,并传递出去 (因为只有搜索了,,搜索结果组件才会挂载,,,监视属性才能工作)
        if (this.value.trim() == "") return;
        this.$bus.$emit("SearchHistory", this.value);
      },
    },
  },
};
</script>

<style></style>
