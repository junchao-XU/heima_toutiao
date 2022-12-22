/**
 * @getCommentListApi  获取-文章评论列表   参数:params(对象)
 * @addCommentApi  增加-文章评论           参数:data(对象)
 * @addCommentLikeApi  评论-点赞           参数:target(评论id/回复id)
 * @deleteCommentLikeApi  评论-取消点赞     参数:target(评论id/回复id)
 */

import request from "@/utils/request";

// 获取-文章评论列表  url:/comments  method:get
export const getCommentListApi = (params) => {
  return request({
    url: "/comments",
    method: "get",
    params,
  });
};

// 增加-文章评论  url:/comments  method:post
export const addCommentApi = (data) => {
  return request({
    url: "/comments",
    method: "post",
    data,
  });
};

// 评论-点赞  url:/comment/likings  method:post
export const addCommentLikeApi = (target) => {
  return request({
    url: "/comment/likings",
    method: "post",
    data: { target },
  });
};

// 评论-取消点赞  url:/comment/likings/{target}  method:delete
export const deleteCommentLikeApi = (target) => {
  return request({
    url: `/comment/likings/${target}`,
    method: "delete",
  });
};
