const actions = {};
const mutations = {
  // 发布得内容
  NEWOBJ(state, newObj) {
    state.newObj = newObj;
  },
  // 点击回复
  REPLECOMMENT(state, replyObj) {
    state.replyObj = replyObj;
  },
  // 对回复的评论
  REPLYNEWOBJ(state, replyNewObj) {
    state.replyNewObj = replyNewObj;
  },
};
const state = {
  newObj: {}, // 发布得内容
  replyObj: {},
  replyNewObj: {},
};
export default {
  namespaced: true,
  actions,
  mutations,
  state,
};
