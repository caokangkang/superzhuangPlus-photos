/*
 * 路由配置
 * @Author: caokangkang
 * @Date: 2023-06-05
 */

export default [
  {
    path: "/",
    component: "@/layouts/index",
    routes: [
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: '/home',
        title: '首页',
        name: 'home',
        component: '@/pages/home',
      },
      {
        path: '/detail',
        title: '详情',
        name: 'detail',
        component: '@/pages/detail',
      }
    ],
  },
];
