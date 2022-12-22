<template>
  <div>
    <van-button
      :icon="isCollected ? 'star' : 'star-o'"
      class="starbtn"
      @click="collecfun"
      :loading="loadingState"
    />
    <!-- <van-icon color="#777" name="star-o" />
    <van-icon name="star" color="#fc5531" /> -->
  </div>
</template>

<script>
import { addCollectApi, deleteCollectApi } from "@/api/Article";
export default {
  props: ["isCollected", "artId"],
  data() {
    return {
      loadingState: false, //点击加载状态
      i: 0, //控制3s之内点击得次数
    };
  },
  methods: {
    async collecfun() {
      if (!this.$store.state.Login.token)
        return this.$toast.fail("请登录后操作");
      if (this.timer) clearTimeout(this.timer);
      if (this.i < 5) {
        this.i++;
        this.timer = setTimeout(() => {
          this.i = 0;
        }, 3000);
        // 开启加载状态
        this.loadingState = true;
        try {
          if (this.isCollected) {
            // 取消收藏
            await deleteCollectApi(this.artId);
            this.$toast.success("取消收藏!");
          } else {
            // 收藏
            await addCollectApi(this.artId);
            this.$toast.success("收藏成功!");
          }
          // 只要接口请求成功就去改变收藏状态
          this.$emit("update:isCollected", !this.isCollected);
          // 关闭加载状态
          this.loadingState = false;
        } catch (error) {
          // 关闭加载状态
          this.loadingState = false;
          this.$toast.fail("请登录后操作");
          error;
        }
      } else {
        this.$toast.fail("请勿频繁操作");
        this.timer = setTimeout(() => {
          this.i = 0;
        }, 2000);
      }
    },
  },
};
</script>

<style lang="less" scoped>
div {
  padding-bottom: 2px;
  /deep/ .starbtn {
    background-color: #fff;
    border: 0px;
    border-top: 1px solid rgb(217, 212, 212);
    color: #3a3a3a;
    width: 10px;
    .van-icon-star-o {
      color: #3a3a3a;
      font-size: 37px;
    }
    .van-icon-star {
      color: #ff9912;
      font-size: 37px;
    }
  }
  .van-button::before {
    background-color: transparent !important;
  }
}
</style>
