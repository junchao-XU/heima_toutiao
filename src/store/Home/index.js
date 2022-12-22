import { getUserChannelsApi } from "@/api/Channel";
import { getItem } from "@/utils/storage";
import store from "..";
const actions = {
  // 获取用户选择的频道
  async getUserChannel({ commit }) {
    try {
      // 有token正常走,否则判断本地有没有数据,没有数据从新发请求(由于没有token所以不会和用户得数据一样)
      if (store.state.Login.token) {
        let { data } = await getUserChannelsApi();
        commit("GETUSERCHANNEL", data.channels);
      } else {
        if (getItem("USER_CHANNEL")) {
          commit("GETUSERCHANNEL", getItem("USER_CHANNEL"));
        } else {
          let { data } = await getUserChannelsApi();
          commit("GETUSERCHANNEL", data.channels);
        }
      }
    } catch (error) {
      error;
    }
  },
};
const mutations = {
  // 获取用户选择的频道
  GETUSERCHANNEL(state, userChannels) {
    state.userChannels = userChannels;
  },
  // 删除对应得频道
  REMOVECHANNEL(state, index) {
    state.userChannels.splice(index, 1);
  },
  // 添加对应得频道
  ADDCHANNEL(state, item) {
    state.userChannels.push(item);
  },
};
const state = {
  userChannels: [], //用户选择的频道
};

export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
