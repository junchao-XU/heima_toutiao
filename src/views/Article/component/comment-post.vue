<template>
  <div>
    <div class="comment-post">
      <van-field
        class="postcomment"
        v-model="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button class="postbtn" @click="addCommentFun">发布</van-button>
    </div>
  </div>
</template>
<script>
import { addCommentApi } from "@/api/comments";
export default {
  data() {
    return {
      content: "",
    };
  },
  props: {
    artId: {
      type: [Number, String],
    },
    target: {
      type: [Number, String],
    },
  },
  methods: {
    // 发布评论
    async addCommentFun() {
      // 判断如果用户没有登录,则不会走接口
      if (!this.$store.state.Login.token) {
        this.$toast.fail("请登录后操作");
        this.$emit("isShowfun", false);
        this.content = "";
        return;
      }
      // 判断不能为空
      if (this.content.trim() == "")
        return this.$toast.fail("发布内容不能为空");
      try {
        let { data } = await addCommentApi({
          target: this.target,
          content: this.content,
          art_id: this.artId,
        });
        // 关闭弹窗
        this.$emit("isShowfun", false);
        // 将输入框指控
        this.content = "";
        this.$toast.success("发布成功");
        // 将数据存储到仓库中
        if (this.target == "a") {
          this.$store.commit("Comment/NEWOBJ", data.new_obj);
        } else {
          this.$store.commit("Comment/REPLYNEWOBJ", data.new_obj);
        }
      } catch (error) {
        error;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .postcomment {
    background-color: #f5f7f9;
  }
  .postbtn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
