/**
 *@getSearchResultsApi  获取-搜索结果  参数:params(对象)
 *@getSuggestionApi 获取-搜索联想建议   参数: q (搜索关键词, 前缀)
 */

import request from "@/utils/request";

// 获取-搜索结果  url:/search  method:get
export const getSearchResultsApi = (params) => {
  return request({
    url: "/search",
    method: "get",
    params,
  });
};

// 获取-搜索联想建议  url:/suggestion  method:get
export const getSuggestionApi = (q) => {
  return request({
    url: "/suggestion",
    method: "get",
    params: {
      q,
    },
  });
};
