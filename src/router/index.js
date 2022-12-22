import Vue from "vue";
import VueRouter from "vue-router";

// 重写push | replace
let savepush = VueRouter.prototype.push;
let savereplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    savepush.call(this, location, resolve, reject);
  } else {
    savepush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    savereplace.call(this, location, resolve, reject);
  } else {
    savereplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 注册路由
Vue.use(VueRouter);

// 路由表
const routes = [
  // 重定向
  {
    path: "/",
    redirect: "/layout/home",
  },
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/article",
    component: () => import("@/views/Article"),
    props(route) {
      return {
        article_id: route.query.article_id,
      };
    },
  },
  {
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/useredit",
    component: () => import("@/views/User/component/user-edit"),
  },
  // 二级路由
  {
    path: "/layout",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home/:index?",
        name: "home",
        meta: {
          keepAlive: true, //  需要缓存
        },
        component: () => import("@/views/Home"),
      },
      {
        path: "question",
        name: "question",
        component: () => import("@/views/Question"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/User/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
