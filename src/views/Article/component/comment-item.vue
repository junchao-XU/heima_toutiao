<template>
  <div>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="comItem.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ comItem.aut_name }}</div>
        <van-button
          class="like-btn"
          :class="{ likeing: IsLiking }"
          icon="good-job"
          @click="onLike"
        >
          {{ comItem.like_count || "赞" }}
        </van-button>
      </div>

      <div slot="label">
        <p class="comment-content">{{ comItem.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{
            comItem.pubdate | xiangduiTime
          }}</span>
          <van-button
            class="reply-btn"
            round
            @click="
              $store.commit('Comment/REPLECOMMENT', comItem), $emit('onShow')
            "
          >
            回复 {{ comItem.reply_count }}
          </van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLikeApi, deleteCommentLikeApi } from "@/api/comments";
import { mapState } from "vuex";
export default {
  name: "CommentItem",
  components: {},
  props: {
    // 对象
    comItem: {
      type: Object,
    },
    // 文章Id
    autId: {
      type: [String, Number],
    },
    // 是否点赞
    IsLiking: {
      type: Boolean,
    },
    // 对评论得点赞得数量
    LikeCount: {
      type: Number,
    },
  },
  data() {
    return {
      dianzanCount: this.LikeCount, //对评论点赞得数量
    };
  },
  methods: {
    // 对回复得评论点赞
    async onLike() {
      if (!this.token) return this.$toast.fail("请登录后操作");
      try {
        // 判断登录用户是否对此评论点过赞
        if (this.IsLiking) {
          // 调取点赞接口
          await deleteCommentLikeApi(this.autId);
          this.$toast.success("取消点赞"); //轻体是
          this.dianzanCount--; //手动更新视图
        } else {
          // 调取取消点赞得接口
          await addCommentLikeApi(this.autId);
          this.$toast.success("点赞成功"); //轻体是
          this.dianzanCount++; //手动更新视图
        }
        // 将父组件数据得状态更新掉
        this.$emit("update:LikeCount", this.dianzanCount);
        this.$emit("update:IsLiking", !this.IsLiking);
      } catch (error) {
        error;
      }
    },
  },
  computed: {
    ...mapState("Login", ["token"]),
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .likeing {
    color: #e5645f;
  }
}
</style>
