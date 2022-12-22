<template>
  <div>
    <!-- 一级路由挂载点 -->
    <!-- <router-view></router-view> -->

    <!-- 只缓存需要缓存得路由 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less" scoped></style>
