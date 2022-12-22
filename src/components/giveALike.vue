<template>
  <div>
    <!-- <van-icon color="#777" name="good-job-o" /> -->
    <van-button
      :icon="attitude > 0 ? 'good-job' : 'good-job-o'"
      class="starbtn"
      @click="giveaLikefun"
      :loading="loadingState"
    />
  </div>
</template>

<script>
import { deleteArtileLikeApi, artileLikeApi } from "@/api/Article";
import { mapState } from "vuex";
export default {
  props: ["attitude", "artId"],
  data() {
    return {
      loadingState: false, //点击加载状态
      i: 0, //控制3s之内点击得次数
    };
  },
  methods: {
    async giveaLikefun() {
      if (!this.token) return this.$toast.fail("请登录后操作");
      if (this.timer) clearTimeout(this.timer);
      if (this.i < 5) {
        this.i++;
        this.timer = setTimeout(() => {
          this.i = 0;
        }, 3000);
        // 打开加载状态
        this.loadingState = true;
        try {
          if (this.attitude == 1) {
            // 取消点赞
            await deleteArtileLikeApi(this.artId);
            // 改变点赞状态
            this.$emit("update:attitude", 0);
            this.$toast.success("取消点赞");
          } else {
            // 点赞
            await artileLikeApi(this.artId);
            // 改变点赞状态
            this.$emit("update:attitude", 1);
            this.$toast.success("点赞成功");
          }
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
  computed: {
    ...mapState("Login", ["token"]),
  },
};
</script>

<style lang="less" scoped>
div {
  padding-bottom: 2px;
  /deep/ .starbtn {
    background-color: #fff;
    border: 0px;
    border-top: 1px solid rgb(214, 207, 207);
    color: #3a3a3a;
    width: 0;
    .van-icon-good-job-o {
      color: #3a3a3a;
      font-size: 37px;
    }
    .van-icon-good-job {
      color: #ff9912;
      font-size: 37px;
    }
  }
  .van-button::before {
    background-color: transparent !important;
  }
}
</style>
