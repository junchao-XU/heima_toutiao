<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <!-- /标题 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="mobile" name="mobile" placeholder="手机号">
      </van-field>
      <van-field v-model="code" name="code" placeholder="验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { LoginAPI } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      code: "",
    };
  },
  methods: {
    async onSubmit(values) {
      // 加载轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      try {
        let { data } = await LoginAPI(values);
        // 将token值存储到vuex仓库中
        this.$store.commit("Login/SETTOKEN", data.token);
        //登录成功提示
        this.$toast.success("登录成功!");
        // 登录成功之后路由跳转到个人中心
        this.$router.replace({ name: "user" });
      } catch (error) {
        // 登录失败提示
        this.$toast.fail("登录失败");
        // console.log(error.messsge);
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style></style>
