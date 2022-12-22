<template>
  <div @click="articleFocus">
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="!is_followed"
      :loading="isFollowLoding"
      >关注</van-button
    >
    <van-button
      v-else
      class="follow-btn"
      round
      size="small"
      :loading="isFollowLoding"
    >
      已关注
    </van-button>
  </div>
</template>

<script>
import { followTheAuthorApi, deleteFocusOnApi } from "@/api/Article";
export default {
  props: ["art_id", "is_followed"],
  data() {
    return {
      isFollowLoding: false, //按钮加载属性
      i: 0, //关注 / 取消关注连点次数
      isFollowed: this.is_followed, //接受父组件穿过来得关注状态
    };
  },
  methods: {
    // 点击关注 / 取消关注作者
    async articleFocus() {
      if (!this.$store.state.Login.token)
        return this.$toast.fail("请登录后操作");
      if (this.timer)
        // 有定时器,清掉
        clearTimeout(this.timer);
      // 用户不能在两秒之内点击五次
      this.timer = setTimeout(() => {
        this.i = 0;
      }, 2000);
      // 判断用户点击是否大于等于5次
      if (this.i < 5) {
        this.i++;
        // 点击使按钮处于加载状态
        this.isFollowLoding = true;
        try {
          // 判断参数字段,如果为true为已关注状态,则应走取关接口
          if (this.is_followed) {
            await deleteFocusOnApi(this.art_id);
            this.$toast.success("取消关注!"); //轻提示
          } else {
            // 否则走关注接口
            await followTheAuthorApi(this.art_id);
            this.$toast.success("关注成功!"); //轻提示
          }
          // 只要接口不出错,让字段取反
          this.isFollowed = !this.isFollowed;
          this.$emit("isFollowFn", this.isFollowed);
          // 接口成功之后结束按钮加载状态
          this.isFollowLoding = false;
        } catch (error) {
          error;
          // 接口失败之后也应该结束按钮加载状态
          this.isFollowLoding = false;
        }
      } else {
        // 优化操作
        this.$toast.fail("请勿频繁操作!");
        // 有定时器,清掉
        if (this.timer) clearTimeout(this.timer);
        // 2秒之后才可以点击
        this.timer = setTimeout(() => {
          this.i = 0;
        }, 2000);
      }
    },
  },
};
</script>

<style></style>
