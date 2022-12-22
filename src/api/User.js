/**
 * @getUserApi 获取用户基本信息
 * @updateUserApi 更新-用户个人简介
 * @getUserProfileApi 获取-用户个人简介
 * @getUserFocusApi 获取-用户关注列表
 * @getUserFansApi 获取-用户粉丝列表
 * @updateUserPhoto 跟新用户的头像
 */

// 引入配置
import request from "@/utils/request";

// 获取用户基本信息  url:/user  mehtod:get
export const getUserApi = () => {
  return request({
    url: "/user",
    method: "get",
  });
};

// 更新-用户个人简介   url:/user/profile  method:PATCH
export const updateUserApi = (data) => {
  return request({
    url: "/user/profile",
    method: "PATCH",
    data,
  });
};

// 获取-用户个人简介 url:/user/profile  method:get
export const getUserProfileApi = () => {
  return request({
    url: "/user/profile",
    method: "get",
  });
};

// 获取-用户关注列表 url:/user/followings  method:get
export const getUserFocusApi = (params) => {
  return request({
    url: "/user/followings",
    method: "get",
    params,
  });
};

// 获取-用户粉丝列表 url:/user/followers  method:get
export const getUserFansApi = (params) => {
  return request({
    url: "/user/followers",
    method: "get",
    params,
  });
};

// 跟新-用户头像  url:/user/photo  method:PATCH
export const updateUserPhoto = (photo) => {
  return request({
    url: "/user/photo",
    method: "PATCH",
    data: {
      photo,
    },
  });
};
