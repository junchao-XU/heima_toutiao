<template>
  <div>
    <!-- 二级路由挂载点 -->
    <router-view></router-view>

    <!-- 底部导航栏 -->
    <van-tabbar route v-model="active">
      <van-tabbar-item replace :to="{ name: 'home' }">
        <span>首页</span>
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'question' }">
        <span>问答</span>
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'video' }">
        <span>视频</span>
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace :to="{ name: 'user' }">
        <span>{{ $store.state.Login.token ? "我的" : "未登录" }}</span>
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
</style>
