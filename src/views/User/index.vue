<template>
  <div>
    <div class="header">
      <div class="my-container">
        <!-- 已登录的dom结构 -->
        <div class="loginin" v-if="loginstate">
          <!-- 用户头像 -->
          <div class="logintop">
            <van-image class="img" round :src="userList.photo" />
            <div class="loginname">{{ userList.name }}</div>
            <van-button
              to="/useredit"
              class="loginbtn"
              size="mini"
              type="primary"
            >
              编辑资料
            </van-button>
          </div>
          <!-- 数据统计 -->
          <div class="datalist">
            <div class="item">
              <div>{{ userList.art_count }}</div>
              <div>头条</div>
            </div>
            <div class="item">
              <div>{{ userList.follow_count }}</div>
              <div>关注</div>
            </div>
            <div class="item">
              <div>{{ userList.fans_count }}</div>
              <div>粉丝</div>
            </div>
            <div class="item">
              <div>{{ userList.like_count }}</div>
              <div>获赞</div>
            </div>
          </div>
        </div>
        <!-- 未登录的dom结构 -->
        <div class="outlogin" v-else>
          <img
            @click="$router.push({ path: '/login' })"
            src="@/assets/img/mobile.png"
            alt=""
          />
          <div class="text">登录/注册</div>
        </div>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item class="columnitem">
        <template #icon>
          <span class="iconfont icon-shoucang"></span>
        </template>
        <template #text>
          <span class="text">收藏</span>
        </template>
      </van-grid-item>
      <van-grid-item class="columnitem">
        <template #icon>
          <span class="iconfont icon-lishi"></span>
        </template>
        <template #text>
          <span class="text">历史</span>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="line"></div>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <div class="line"></div>
    <div class="loginout" v-if="loginstate" @click="exitLogin">退出登录</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getUserApi } from "@/api/User";
import { getItem } from "@/utils/storage";
export default {
  name: "user",
  data() {
    return {
      loginstate: true,
      userList: {}, //用户的基本资料
    };
  },
  computed: {
    // 获取用户登录的token值
    ...mapState("Login", ["token"]),
  },
  async mounted() {
    if (!getItem("USER_TOKEN")) return;
    try {
      // 页面挂载发起请求获得用户基本资料
      let { data } = await getUserApi();
      this.userList = data;
    } catch (error) {
      error;
    }
  },
  methods: {
    // 退出登录
    exitLogin() {
      // 退出前询问提示
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "您确认退出登录吗?",
        })
        .then(() => {
          //  通知vuex将本地存储清除掉
          this.$store.commit("Login/EXITLOGIN");
        })
        .catch(() => {});
    },
  },
  watch: {
    // 监视用户token的变化
    token: {
      immediate: true,
      handler() {
        if (this.token) {
          this.loginstate = true;
        } else {
          this.loginstate = false;
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
.line {
  height: 10px;
  width: 100%;
}
.header {
  height: 390px;
  width: 100%;
  background: url("@/assets/img/banner.png");
  .outlogin {
    text-align: center;
    img {
      width: 132px;
      height: 132px;
      margin: 113px 0px 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
  .loginin {
    overflow: hidden;
    line-height: 132px;
    .logintop {
      margin-top: 80px;
      padding: 0px 32px;
      overflow: hidden;
      .img {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        float: left;
      }
      .loginname {
        font-size: 30px;
        color: #fff;
        float: left;
        margin-left: 22px;
      }
      .loginbtn {
        width: 116px;
        height: 33px;
        background-color: #ffffff;
        border-radius: 16px;
        color: #666666;
        font-size: 20px;
        float: right;
        margin-top: 50px;
      }
    }

    .datalist {
      padding: 0px 32px;
      .item {
        width: 25%;
        float: left;
        color: #fff;
        text-align: center;
        div:first-child {
          font-size: 36px;
          line-height: 36px;
          margin: 55px 0px 18px;
        }
        div:last-child {
          font-size: 23px;
          line-height: 24px;
        }
      }
    }
  }
}
.columnitem {
  .iconfont {
    font-size: 45px;
  }
  .icon-lishi {
    color: yellow;
  }
  .icon-shoucang {
    color: red;
  }
  .text {
    font-size: 28px;
    color: #333333;
    margin-top: 16px;
  }
}
.cel {
  margin: 9px 0px;
}
.loginout {
  height: 105px;
  font-size: 30px;
  letter-spacing: 2px;
  color: #d86262;
  text-align: center;
  background: #fff;
  line-height: 105px;
}
</style>
