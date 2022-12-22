<template>
  <div>
    <van-nav-bar title="暂无评论"></van-nav-bar>
    <div class="scroll-wrap">
      <comment-item
        :autId="replyObj.com_id"
        :comItem="replyObj"
        :IsLiking.sync="replyObj.is_liking"
        :LikeCount.sync="replyObj.like_count"
      ></comment-item>
      <van-cell title="全部回复" />
      <CommentList
        :commentList="CommentList"
        :source="replyObj.com_id"
        type="c"
      ></CommentList>
    </div>
    <!-- 底部区域 -->
    <div class="reply-bottom" @click="show = true">
      <van-button class="write-btn" size="small" round>写评论</van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 回复评论弹层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '18%' }">
      <comment-post
        :artId="articleId"
        :target="replyObj.com_id"
        @isShowfun="show = $event"
      ></comment-post>
    </van-popup>
    <!-- /回复评论弹层 -->
  </div>
</template>

<script>
import CommentList from "./comment-list.vue";
import CommentItem from "./comment-item.vue";
import CommentPost from "./comment-post.vue";
import { mapState } from "vuex";
export default {
  components: { CommentItem, CommentList, CommentPost },
  computed: {
    ...mapState("Comment", ["replyObj", "replyNewObj"]),
  },
  props: {
    articleId: {
      type: [Number, String],
    },
  },
  data() {
    return {
      show: false,
      CommentList: [],
    };
  },
  watch: {
    replyNewObj() {
      this.CommentList.unshift(this.replyNewObj);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__content {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000 !important;
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
