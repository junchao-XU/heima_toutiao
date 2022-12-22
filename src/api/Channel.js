/**
 * @getChannelListApi  获取-所有频道列表
 * @setChannelListApi  设置-频道列表       参数:channels[数组]
 * @getUserChannelsApi  获取-用户选择的频道
 */

import request from "@/utils/request";

// 获取-所有频道列表  url:/channels  method:get
export const getChannelListApi = () => {
  return request({
    url: "/channels",
    method: "get",
  });
};

// 设置-频道列表  url:/user/channels  method:put
export const setChannelListApi = (channels) => {
  return request({
    url: "/user/channels",
    method: "put",
    data: {
      channels,
    },
  });
};

// 获取-用户选择的频道  url:/user/channels  method:get
export const getUserChannelsApi = () => {
  return request({
    url: "/user/channels",
    method: "get",
  });
};
