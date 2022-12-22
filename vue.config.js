const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置代理
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: "https://toutiao.itheima.net/v1_0",
  //     },
  //   },
  // },
});
