<template>
  <div>
    <!-- 用户评论 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item
        v-for="(comItem, index) in commens"
        :key="index"
        :comItem="comItem"
        :IsLiking.sync="comItem.is_liking"
        :LikeCount.sync="comItem.like_count"
        :autId="comItem.com_id"
        v-on="$listeners"
      ></comment-item>
    </van-list>
    <!-- /用户评论 -->
  </div>
</template>

<script>
// 组件
import CommentItem from "./comment-item.vue";

// API
import { getCommentListApi } from "@/api/comments";

export default {
  props: {
    commentList: {
      type: Array,
    },
    source: {
      //文章ID
      type: [Number, String, Object],
      required: true,
    },
    type: {
      // 评论类型
      type: [String],
      default: "a",
    },
  },
  components: { CommentItem },
  data() {
    return {
      commens: this.commentList, //渲染数组
      offset: null, //偏移量
      limit: 10, //获取评论数量
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        let { data } = await getCommentListApi({
          type: this.type, //评论类型
          source: this.source, //文章ID
          offset: this.offset, //偏移量
          limit: this.limit, //获取评论得数量
        });
        let { results, last_id, total_count } = data;
        // 将新添加得数据,添加到数组中
        this.commens.push(...results);
        this.$emit("update:commentList", this.commens);
        // 设置偏移量
        this.offset = last_id;
        // 关闭本次加载
        this.loading = false;
        // 给父组件传递加载得总数
        this.$emit("comments-NumberFun", total_count);
        if (results.length == 0) {
          // 如没有新数据了,则直接关闭加载事件
          this.finished = true;
        }
      } catch (error) {
        error;
      }
    },
  },
};
</script>

<style></style>
