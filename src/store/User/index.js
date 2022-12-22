import { getUserProfileApi, updateUserApi } from "@/api/User";
import { Toast } from "vant";
const actions = {
  // 获取用户的基本信息
  async userLits({ commit }) {
    try {
      let { data } = await getUserProfileApi();
      commit("USERLIST", data);
    } catch (error) {
      error;
    }
  },
  // 更改用户信息
  async updateUser({ commit }, obj) {
    Toast.loading({
      message: "更新中...",
      forbidClick: true,
    });
    try {
      await updateUserApi(obj);
      Toast.success("更新成功");
      commit("UPDATEUSER", obj);
    } catch (error) {
      Toast.fail("更新失败");
      error;
    }
  },
};
const mutations = {
  // 获取用户的基本信息
  USERLIST(state, userList) {
    state.userList = userList;
  },
  // 更新用户信息
  UPDATEUSER(state, obj) {
    state.userList = { ...state.userList, ...obj };
  },
};
const state = {
  userList: {}, //用户基本信息
};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
