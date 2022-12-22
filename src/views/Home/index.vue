<template>
  <div>
    <!-- 搜索栏 -->
    <van-nav-bar class="page-nav-bar" title="搜索">
      <template #title>
        <van-button class="seachbtn" type="info" to="/search">
          <template #icon>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #default> 搜索 </template>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- /搜索栏 -->

    <!-- 标签栏 -->
    <van-tabs v-model="active" class="channels" animated swipeable>
      <van-tab v-for="item in userChannels" :title="item.name" :key="item.id">
        <!-- 加载页面 -->
        <ListChannel :channel="item"></ListChannel>
        <!-- /加载页面 -->
      </van-tab>
    </van-tabs>

    <!-- 汉堡按钮 -->
    <div class="hamburgerbtn">
      <i class="iconfont icon-gengduo" @click="hamburger"></i>
    </div>
    <!-- /汉堡按钮 -->

    <!-- /标签栏 -->

    <!-- 弹出框 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <!-- 组件 -->
      <hamburger
        @close="close"
        :active="active"
        @ChannelEdit="ChannelEdit"
      ></hamburger>
      <!-- /组件 -->
    </van-popup>
    <!-- /弹出框 -->
  </div>
</template>
<script>
// 引入加载列表组件
import ListChannel from "./ListChannel";
// 引入频道编辑组件
import hamburger from "./hamburger";

// 引入vuex
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ListChannel,
    hamburger,
  },
  data() {
    return {
      active: 0, //控制频道
      show: false, //控制编辑框显示与隐藏
    };
  },
  created() {
    // 因为项目内不止这一个组件用到用户选择的频道,所以存到vuex中  (此处也可以使用 父子通信做  ,纯属练一下vuex的用法 )
    this.$store.dispatch("Home/getUserChannel");
  },
  computed: {
    // 获取用户选择的频道列表
    ...mapState("Home", ["userChannels"]),
    // 获取用户token
    ...mapState("Login", ["token"]),
  },
  methods: {
    // 点击汉堡按钮,使编辑框弹出
    hamburger() {
      this.show = true;
    },
    // 点击关闭按钮使编辑框关闭 (子组件自定义事件,因为影响编辑框打开与关闭的变量在父组件)
    close() {
      this.show = false;
    },
    // 点击让对应得频道内容显示 (子组件自定义事件)
    ChannelEdit(isShow, index) {
      if (isShow) {
        this.active = this.active - 1;
      } else {
        this.active = index;
        this.show = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.seachbtn {
  width: 555px;
  height: 64px;
  background-color: #5babfb;
  border-radius: 32px;
  .iconfont {
    font-size: 32px;
  }
}
.page-nav-bar {
  // 深度选择符
  //当你使用了第三方组件，修改样式改不了，就需要用到/deep/深度选择符
  /deep/ .van-button__text {
    color: #fff;
  }
  /deep/ .van-nav-bar__title {
    max-width: 100%;
  }
}
.channels {
  /deep/ .van-tab {
    min-width: 190px;
    border-right: 2px solid #edeff3;
  }
  /deep/ .van-tab__text {
    font-size: 30px;
  }
  /deep/ .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    border-radius: 3px;
  }
}
.hamburgerbtn {
  position: absolute;
  right: 0px;
  top: 92px;
  width: 66px;
  height: 88px;
  line-height: 80px;
  text-align: center;
  background: #ffffff;
  z-index: 100;
  .iconfont {
    font-size: 40px;
  }
}
</style>
