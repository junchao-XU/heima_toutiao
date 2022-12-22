import { setItem, getItem } from "@/utils/storage";
const mutations = {
  // 将token值存储到仓库中
  SETTOKEN(state, token) {
    state.token = token;
    // 将用户的token值存到本地存储中
    setItem("USER_TOKEN", token);
  },
  // 退出登录将token值为空
  EXITLOGIN(state) {
    setItem("USER_TOKEN", null);
    state.token = getItem("USER_TOKEN");
  },
};
const state = {
  token: getItem("USER_TOKEN") || "", //用户登录的token值
};

export default {
  namespaced: true,
  state,
  mutations,
};
