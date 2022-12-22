<template>
  <div>
    <!-- 关闭按钮 -->
    <div class="close" @click="$emit('close')">
      <span class="iconfont icon-guanbi"></span>
    </div>
    <!-- 我的频道 -->
    <div class="mycha">
      <div>我的频道</div>
      <van-button
        class="editbtn"
        plain
        type="danger"
        round
        @click="isShow = !isShow"
      >
        {{ isShow ? "完成" : "编辑" }}
      </van-button>
    </div>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in userChannels"
        :key="item.id"
        :text="item.name"
        :class="{ red: active == index }"
        @click="editor(index)"
      >
        <template #icon>
          <van-icon
            name="clear"
            class="clearbtn"
            v-show="isShow && item.id !== 0"
          />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <div class="mycha">
      <div>频道推荐</div>
    </div>
    <van-grid direction="horizontal" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="item in recommendedList"
        :key="item.id"
        :text="item.name"
        @click="$store.commit('Home/ADDCHANNEL', item)"
        icon="plus"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { getChannelListApi, setChannelListApi } from "@/api/Channel";
import { setItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  props: ["active", "index"],
  data() {
    return {
      AllChannels: [], //所有得频道列表数据
      isShow: false, //控制删除图标和编辑按钮
    };
  },
  async mounted() {
    // 页面挂载获取所有得频道数据  因为现在所有频道数据只在这个页面使用,所以直接在此组件获取即可
    try {
      let { data } = await getChannelListApi();
      this.AllChannels = data.channels;
    } catch (error) {
      error;
    }
  },
  computed: {
    // 获取用户选择得频道
    ...mapState("Home", ["userChannels"]),
    // 获取用户得token
    ...mapState("Login", ["token"]),
    // 进行数组去重获取推荐频道
    recommendedList() {
      return this.AllChannels.filter((item) => {
        return !this.userChannels.find((obj) => {
          return item.id == obj.id;
        });
      });
    },
  },
  methods: {
    // 编辑频道
    editor(index) {
      // 当isShow为true时,为删除操作  通知Vuex去删除对应得频道数据
      if (this.isShow) {
        this.$store.commit("Home/REMOVECHANNEL", index);
        if (this.active > index) return this.$emit("ChannelEdit", this.isShow);
      } else {
        // 向父组件说明点击是哪一个
        this.$emit("ChannelEdit", this.isShow, index);
      }
    },
  },
  watch: {
    // 监视用户频道数据得变化
    userChannels: {
      immediate: true,
      handler() {
        // 有token值就去调接口更新用户得频道数据
        if (this.token) {
          setChannelListApi(this.userChannels);
        } else {
          // 没有则跟新到本地
          setItem("USER_CHANNEL", this.userChannels);
        }
      },
    },
  },
};
</script>
<style scoped lang="less">
.close {
  margin: 30px 0px 0px 30px;
  .iconfont {
    font-size: 28px;
    line-height: 28px;
    display: block;
  }
}

.mycha {
  height: 48px;
  margin-top: 40px;
  padding: 0px 24px;
  margin-bottom: 46px;
  div:first-child {
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 2px;
    color: #333333;
    float: left;
  }
  .editbtn {
    height: 48px;
    width: 120px;
    float: right;
    /deep/.van-button__text {
      font-size: 25px;
      color: red;
    }
  }
}
.mt75 {
  margin-top: 75px;
}
.grid-item {
  width: 160px;
  height: 86px;
  /deep/.van-grid-item__content {
    background-color: #f4f5f6;
    .van-grid-item__text {
      font-size: 28px;
      color: #222222;
      margin-left: 6px;
    }
    .van-icon {
      font-size: 24px;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
      .clearbtn {
        position: absolute;
        top: -12px;
        right: -12px;
        z-index: 9;
        color: #cacaca;
      }
    }
  }
}
/deep/.red {
  .van-grid-item__content {
    .van-grid-item__text {
      color: red;
    }
  }
}
</style>
