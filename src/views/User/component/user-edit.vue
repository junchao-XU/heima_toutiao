<template>
  <!-- <div>这是一个编辑资料页面</div> -->
  <div>
    <div>
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        title="个人信息"
        @click-left="$router.push({ path: '/layout/user' })"
      ></van-nav-bar>
      <!-- /导航栏 -->
    </div>
    <div class="celldiv">
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        hidden
        ref="imgUpload"
      />
      <van-cell center title="头像" is-link @click="$refs.imgUpload.click()">
        <template>
          <van-image
            round
            class="userphoto"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        is-link
        @click="NameShowFun"
        :value="userList.name"
      />
      <van-cell
        title="性别"
        is-link
        :value="userList.gender ? '女' : '男'"
        @click="genderShow = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="userList.birthday"
        @click="brithdayFun"
      />

      <!-- 昵称弹出框 -->
      <van-popup
        class="vanpopup"
        v-model="nameShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="设置昵称"
          left-text="取消"
          right-text="完成"
          @click-left="nameShow = false"
          @click-right="editNameFn"
        />
        <div class="popupname">
          <van-field
            v-model="nameMessage"
            row="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
          >
          </van-field>
        </div>
      </van-popup>
      <!-- /昵称弹出框 -->

      <!-- 性别弹出框 -->
      <van-popup
        position="bottom"
        v-model="genderShow"
        :style="{ height: '50%' }"
      >
        <van-picker
          title="标题"
          show-toolbar
          :columns="columns"
          :default-index="this.userList.gender"
          @confirm="EditgenderFun"
          @cancel="genderShow = false"
        />
      </van-popup>
      <!-- /性别弹出框 -->

      <!-- 生日弹出框 -->
      <van-popup
        v-model="brithdayShow"
        position="bottom"
        :style="{ height: '50%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="EditbrithdayFun"
          @cancel="brithdayShow = false"
        />
      </van-popup>
      <!-- /生日弹出框 -->

      <!-- 头像弹出框 -->
      <van-popup v-model="PhotoShow" style="height: 100%" position="bottom">
        <div class="photo-show">
          <div class="imgbox">
            <img class="img" :src="photo" ref="image" />
          </div>
          <van-nav-bar
            class="toolbar"
            left-text="关闭"
            right-text="完成"
            @click-left="PhotoShow = false"
            @click-right="EditPhtoFun"
          />
        </div>
      </van-popup>
      <!-- /头像弹出框 -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
// import { updateUserPhoto } from "@/api/User";
export default {
  data() {
    return {
      nameShow: false, //昵称弹出框
      nameMessage: "", //昵称设置
      genderShow: false, //性别弹出框
      PhotoShow: false, //头像弹出框
      columns: ["男", "女"],
      brithdayShow: false, //生日弹出层
      minDate: new Date(1900, 0, 1), //最小时间
      maxDate: new Date(), //最大时间
      currentDate: new Date(),
      photo: "", //当前选择的图片
      cropper: null, //cropper实例
    };
  },
  methods: {
    // 昵称弹出框
    NameShowFun() {
      this.nameShow = true;
      this.nameMessage = this.userList.name;
    },
    // 点击保存昵称设置
    editNameFn() {
      // 派发请求
      this.$store.dispatch("User/updateUser", { name: this.nameMessage });
      // 关闭弹出框
      this.nameShow = false;
    },
    // 性别完成按钮
    EditgenderFun(_, index) {
      // 派发请求
      this.$store.dispatch("User/updateUser", { gender: index });
      // 关闭弹出框
      this.genderShow = false;
    },
    // 生日弹出框
    brithdayFun() {
      this.currentDate = new Date(this.userList.birthday);
      this.brithdayShow = true;
    },
    // 编辑生日
    EditbrithdayFun() {
      this.$store.dispatch("User/updateUser", {
        birthday: dayjs(this.currentDate).format("YYYY-MM-DD"),
      });
      this.brithdayShow = false;
    },
    // 控制弹出框,获取当前图片
    onFileChange() {
      this.PhotoShow = true;
      const fileObject = this.$refs.imgUpload.files[0];
      this.photo = window.URL.createObjectURL(fileObject);

      this.$nextTick(() => {
        let image = this.$refs.image;
        this.cropper = new Cropper(image, {
          viewMode: 1,
          dragMode: "move",
          cropBoxMovable: false, //是否通过拖拽来移动剪裁框
          cropBoxResizable: false, //是否通过拖动来调整剪裁框的大小
          background: false, //是否显示容器的网格背景
        });
      });
    },
    // 封装一个getCroppedCanvas函数,获取剪裁后的图片
    getCroppedCanvas() {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob);
        });
      });
    },
    // 更改图片
    async EditPhtoFun() {},
  },
  created() {
    // 将用户的基本信息放到仓库里
    this.$store.dispatch("User/userLits");
  },
  computed: {
    ...mapState("User", ["userList"]),
  },
};
</script>
<style lang="less" scoped>
.vanpopup {
  background-color: #f5f7f9;
  .popupname {
    padding: 20px;
  }
  /deep/ .van-nav-bar__content {
    background-color: #fff;
    .van-nav-bar__title {
      color: #000 !important;
    }
  }
}
.userphoto {
  width: 60px;
  height: 60px;
}
.celldiv {
  position: relative;
  .userphotoimg {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    opacity: 0;
    height: 100px;
  }
}
.imgbg {
  width: 100%;
  height: 100%;
  background: #000;
  .imgbgphoto {
    display: block;
    max-width: 100%;
  }
}
.photo-show {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  bottom: 44px;
  background-color: #000;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }

  /deep/ .van-nav-bar__content {
    background-color: #000;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
