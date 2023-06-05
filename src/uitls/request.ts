import { Toast } from "antd-mobile";
import { history } from "umi";
import { extend } from "umi-request";

/** 异常处理程序 */
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const errorHandler = (error: any) => {
  const { response } = error as any;
  if (response && response.code) {
    const errorText = codeMessage[response.code] || response.message;
    // const { code, url } = response;
    Toast.show({
      icon: "fail",
      content: errorText,
    });
  } else if (!response) {
    Toast.show({
      icon: "fail",
      content: `网络异常，无法连接服务器`,
    });
  }
  return response;
};
// 对 extend 实例进行简单的封装
const request = extend({
  timeout: 3000,
  headers: {
    "Content-type": "application/json;charset=utf-8",
  },
  // 处理错误逻辑 调用上面的错误处理逻辑
  errorHandler: errorHandler,
});

export default request