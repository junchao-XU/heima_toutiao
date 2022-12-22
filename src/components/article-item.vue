<template>
  <div>
    <!-- 1张封面 -->
    <div
      class="itemone"
      @click="
        $router.push({ path: '/article', query: { article_id: item.art_id } })
      "
    >
      <div class="itemthree">
        <div class="title" :class="{ wd447: cover.type == 1 }">
          {{ item.title }}
        </div>
        <div class="imglist" :class="{ imgone: cover.type == 1 }">
          <van-image
            :class="{ imgitem: cover.type !== 1 }"
            :width="cover.type == 1 ? '100%' : '33.3%'"
            v-for="(img, index) in cover.images"
            :key="index"
            :src="img"
          />
        </div>
      </div>
      <div class="tip">
        <span>置顶</span>
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate | xiangduiTime }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "cover"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped lang="less">
.itemone {
  padding: 24px 28px;
  background: #fff;
  border-bottom: 2px solid #edeff3;
  .title {
    font-size: 32px;
    line-height: 32px;
    color: #3a3a3a;
    margin-bottom: 24px;
  }
  .tip {
    font-size: 24px;
    line-height: 24px;
    color: #b4b4b4;
    .red {
      color: red;
    }
    span {
      margin-right: 26px;
    }
  }
  .imglist {
    margin-bottom: 30px;
    .imgitem {
      width: 33.3%;
      height: 146px;
      padding: 0px 2px;
      box-sizing: border-box;
      // margin-right: 4px;
    }
  }
  .itemthree {
    overflow: hidden;
  }
  .wd447 {
    width: 446px;
    float: left;
  }
  .imgone {
    width: 232px;
    height: 146px;
    float: right;
  }
}
</style>
