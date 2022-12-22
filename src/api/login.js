/**
 * @LoginAPI 登录验证/刷新token  (传入data参数就是登陆验证)
 */

import request from "@/utils/request";
import { getItem } from "@/utils/storage";

// 登录验证/刷新token  url:/authorizations  method:post/put
export const LoginAPI = (data) => {
  return request({
    url: "/authorizations",
    method: "post",
    data,
  });
};

export const getNewTokenAPI = () => {
  return request({
    url: "/authorizations",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getItem("USER_TOKEN")}`,
    },
  });
};
