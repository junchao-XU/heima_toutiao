<template>
  <div class="artlistcon">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      swipeable
      animated
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :item="item"
          :cover="item.cover"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListApi } from "@/api/Article";
import ArticleItem from "@/components/article-item.vue";
export default {
  props: ["channel"],
  name: "ListChannel",
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [], //列表数据数组
      loading: false, //加载中loading 状态
      finished: false, //加载结束的状态
      refreshing: false, //控制下拉刷新的loading状态
      error: false, //错误提示
      timer: null, //请求下一页数据的时间戳
    };
  },
  methods: {
    // 下拉加载
    async onLoad() {
      try {
        let { data } = await getArticleListApi({
          channel_id: this.channel.id, //频道ID
          timestamp: this.timer || Date.now(), //请求数据的时间戳
        });
        // 利用展开运算符,将数据添加到list数组中
        this.list.push(...data.results);
        // 结束本次加载
        this.loading = false;
        // 判断数据是否全部加载完成
        if (data.results.length) {
          // 更新获取下一组数据的时间戳
          this.timer = data.pre_timestamp;
        } else {
          // 没有数据了，将 finished 设置为 true
          this.finished = true;
        }
      } catch (error) {
        // 展示错误提示状态
        this.error = true;
        this.loading = false;
      }
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.artlistcon {
  overflow-y: auto;
  height: 1060px;
}
/deep/.van-tabs__wrap {
  touch-action: manipulation;
}
</style>
