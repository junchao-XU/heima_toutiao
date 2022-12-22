/**
 * @getArticleListApi  获取-文章列表         参数:params(对象)
 * @getArticleDetailsApi  获取-文章详情      参数:article_id(文章ID)
 * @followTheAuthorApi  文章-关注作者        参数:target(文章作者ID)
 * @deleteFocusOnApi  文章-取关作者          参数:target(文章作者ID)
 * @artileLikeApi  文章点赞                  参数:target(文章ID)
 * @deleteArtileLikeApi  文章-取消点赞       参数:target(文章ID)
 * @reportArtileApi  文章-举报               参数:data(对象)
 * @notInterestedInApi  文章-不感兴趣         参数:target(文章ID)
 * @addCollectApi  文章-收藏                  参数:target(文章ID)
 * @deleteCollectApi  文章-取消收藏           参数:target(文章ID)
 * @getUserHistoryApi  获取-用户阅读历史      参数:params(对象)
 * @getUserCollectionApi  获取-用户收藏列表   参数:params(对象)
 */

import request from "@/utils/request";

// 获取-文章列表  url:/articles  method:get
export const getArticleListApi = (params) => {
  return request({
    url: "/articles",
    method: "get",
    params,
  });
};

// 获取-文章详情  url:/articles/{article_id}  method:get
export const getArticleDetailsApi = (article_id) => {
  return request({
    url: `/articles/${article_id}`,
    method: "get",
  });
};

// 文章-关注作者  url:/user/followings   method:post
export const followTheAuthorApi = (target) => {
  return request({
    url: "/user/followings",
    method: "post",
    data: {
      target,
    },
  });
};

// 文章-取关作者  url:/user/followings/{target}  method:delete
export const deleteFocusOnApi = (target) => {
  return request({
    url: `/user/followings/${target}`,
    method: "delete",
  });
};

// 文章-点赞  url:/article/likings  method:post
export const artileLikeApi = (target) => {
  return request({
    url: "/article/likings",
    method: "post",
    data: {
      target,
    },
  });
};

// 文章-取消点赞  url:/article/likings/{target}  method:delete
export const deleteArtileLikeApi = (target) => {
  return request({
    url: `/article/likings/${target}`,
    method: "delete",
  });
};

// 文章-举报  url:/article/reports  method:post
export const reportArtileApi = (data) => {
  return request({
    url: "/article/reports",
    method: "post",
    data,
  });
};

// 文章-不感兴趣  url:/article/dislikes  method:post
export const notInterestedInApi = (target) => {
  return request({
    url: "/article/dislikes",
    method: "post",
    data: {
      target,
    },
  });
};

// 文章-收藏  url:/article/collections  method:post
export const addCollectApi = (target) => {
  return request({
    url: "/article/collections",
    method: "post",
    data: {
      target,
    },
  });
};

// 文章-取消收藏  url:/article/collections/{target}  method:delete
export const deleteCollectApi = (target) => {
  return request({
    url: `/article/collections/${target}`,
    method: "delete",
  });
};

// 获取-用户阅读历史  url:/user/histories  method:get
export const getUserHistoryApi = (params = {}) => {
  return request({
    url: "/user/histories",
    method: "get",
    params,
  });
};

// 获取-用户收藏列表  url:/article/collections  method:get
export const getUserCollectionApi = (params = {}) => {
  return request({
    url: "/article/collections",
    method: "get",
    params,
  });
};
