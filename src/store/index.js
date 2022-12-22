import Vue from "vue";
import Vuex from "vuex";
// 引入登录界面小仓库
import Login from "./Login";
// 引入首页界面小仓库
import Home from "./Home";
// 引入评论界面小仓库
import Comment from "./comment";
// 引入用户个人信息小仓库
import User from "./User";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Login,
    Home,
    Comment,
    User,
  },
});
