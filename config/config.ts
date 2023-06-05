import { defineConfig } from "umi";
import px2vw from 'postcss-px-to-viewport';
import pageRouter from './router.config';
import proxyConfig from './proxy.config';

// 获取环境变量
const { UMI_ENV, NODE_ENV, npm_package_version  } = process.env;
// node环境
const NODE_IS_DEV = NODE_ENV === 'development';

export default defineConfig({
  routes: pageRouter,
  npmClient: 'yarn',
  extraPostCSSPlugins: [
    px2vw({
      viewportWidth: 750, // 我的设计稿的视口宽度 750，也有350的设计稿
      unitPrecision: 3, //单位转换后保留的小数位数
      viewportUnit: "vw", //转换后的视口单位
      selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
      minPixelValue: 1, //设置最小的转换数值
      mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
      exclude: [/node_modules/], //忽略某些文件夹下的文件
    })
  ],
  proxy: proxyConfig,
  define: {
    UMI_ENV,
    NODE_IS_DEV,
    RELEASE_VERSION: npm_package_version
  },
});