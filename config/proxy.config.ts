/*
 * 代理配置
 */
interface processType {
  UMI_ENV?: string;
  [propName: string]: any;
}
const { UMI_ENV }: processType = process.env;

/* 接口前缀 用于代理 */
const ProConfig = {
  dev: "https://plusapi-test.chuhaikankan.com/",
  test: "https://plusapi-test.chuhaikankan.com/",
  pro: "https://plusapi-test.chuhaikankan.com/",
};

export default {
   "/api": {
    target: ProConfig[UMI_ENV],
    // target: 'https://plusapi-test.chuhaikankan.com/',
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
};
