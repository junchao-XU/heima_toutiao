<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="onClickLeft"
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loadingShow">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleObj.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleObj.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleObj.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleObj.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleObj.pubdate | xiangduiTime }}
          </div>
          <!-- 关注 -->
          <FollowCom
            :is_followed="articleObj.is_followed"
            :art_id="articleObj.aut_id"
            @isFollowFn="isFollowFn"
          ></FollowCom>
          <!-- /未关注 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="articleDom"
          v-html="articleObj.content"
        >
          文章内容
        </div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <comment-list
          :commentList.sync="commentList"
          :source="articleObj.art_id"
          @comments-NumberFun="commentsNumber = $event"
          @onShow="isshow = true"
        ></comment-list>
        <!-- /评论列表 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="statusShow">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="retry">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
      >
        写评论
      </van-button>
      <van-icon name="comment-o" :badge="commentsNumber" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <!-- 收藏 -->
      <collextedCom
        :isCollected.sync="articleObj.is_collected"
        :artId="articleObj.art_id"
      ></collextedCom>
      <!-- /收藏 -->

      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <!-- 点赞 -->
      <giveALike
        :artId="articleObj.art_id"
        :attitude.sync="articleObj.attitude"
      ></giveALike>
      <!-- /点赞 -->

      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '18%' }">
      <comment-post
        :artId="articleObj.art_id"
        :target="articleObj.art_id"
        @isShowfun="show = $event"
      ></comment-post>
    </van-popup>
    <!-- /发布评论 -->

    <!-- 回复评论 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply v-if="isshow" :articleId="article_id"></comment-reply>
    </van-popup>
    <!-- /回复评论 -->
  </div>
</template>

<script>
// vant组件库
import { ImagePreview } from "vant";

// 接口API
import { getArticleDetailsApi } from "@/api/Article";

// vuex
import { mapState } from "vuex";

// 组件
import FollowCom from "@/components/followCom.vue";
import collextedCom from "@/components/collectedCom.vue";
import giveALike from "@/components/giveALike.vue";
import CommentList from "./component/comment-list.vue";
import CommentPost from "./component/comment-post.vue";
import CommentReply from "./component/comment-reply.vue";

export default {
  name: "ArticleIndex",
  components: {
    FollowCom,
    collextedCom,
    giveALike,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: ["article_id"],
  data() {
    return {
      commentList: [],
      articleObj: {}, //渲染数据
      loadingShow: true, //控制加载中得显示于隐藏
      statusShow: false, //控制该资源不存在或删除显示于隐藏
      commentsNumber: 0, //评论数量
      show: false, //控制发布评论得弹层
      isshow: false, //控制发布评论得弹层
    };
  },
  computed: {
    // 获取token值
    ...mapState("Login", ["token"]),
    // 获取对文章发布评论新添加的对象
    ...mapState("Comment", ["newObj"]),
  },
  // 组件挂载获取到数据
  mounted() {
    this.retry();
  },
  methods: {
    // 点击回到主页
    onClickLeft() {
      this.$router.push({
        name: "home",
      });
    },
    // 更改关注得状态 (自定义事件)
    isFollowFn(is_followed) {
      this.articleObj.is_followed = is_followed;
    },
    // 点击重试
    async retry() {
      this.loadingShow = true;
      try {
        let { data } = await getArticleDetailsApi(this.article_id);
        // 将请求来的数据赋值给渲染页面得变量
        this.articleObj = data;
        // 接口请求成功,使加载中隐藏
        this.loadingShow = false;
        this.$nextTick(() => {
          // 获取文章的dom元素
          let article = this.$refs.articleDom;
          // 获取图片
          let imgs = article.querySelectorAll("img");
          // 定义一个图片路径得数组
          let imgsPath = [];
          // 遍历所有得图片,添加点击事件
          imgs.forEach((item, index) => {
            imgsPath.push(item.src);
            item.onclick = function () {
              ImagePreview({
                images: imgsPath,
                startPosition: index,
              });
            };
          });
        });
      } catch (error) {
        // 接口请求失败也应该让加载中关闭
        this.loadingShow = false;
        // 判断响应状态码,如果为404则证明请求得文章ID不存在
        if (error.response.status == 404) {
          // 将控制该资源不存在得变量  设置为true
          this.statusShow = true;
        }
        error;
      }
    },
  },
  watch: {
    newObj() {
      this.commentList.unshift(this.newObj);
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
