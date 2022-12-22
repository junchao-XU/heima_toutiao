import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import "@/style/index.css";
// 引入移动适配
import "amfe-flexible";
// 引入时间处理工具
import "@/utils/dayjs";
// 引入github-markdown样式
import "@/style/github-markdown.css";
// 引入Vant组件库
import Vant from "vant";
// 引入Vant组件库样式
import "vant/lib/index.css";
// 全局注册Vant
Vue.use(Vant);
// 关闭生产提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
